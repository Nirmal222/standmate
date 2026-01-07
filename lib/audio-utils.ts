export const WORKLET_CODE = `
class RecorderProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (input.length > 0) {
      const channelData = input[0];
      this.port.postMessage(channelData);
    }
    return true;
  }
}
registerProcessor("recorder-processor", RecorderProcessor);
`;

export class AudioRecorder {
  private context: AudioContext | null = null;
  private stream: MediaStream | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private worklet: AudioWorkletNode | null = null;
  private onAudioData: (base64: string, volume: number) => void;
  private sampleRate = 16000;

  // Buffering properties
  private audioBuffer: Int16Array[] = [];
  private volumeBuffer: number[] = [];
  private bufferIntervalId: ReturnType<typeof setInterval> | null = null;
  private bufferIntervalMs = 300;

  constructor(onAudioData: (base64: string, volume: number) => void) {
    this.onAudioData = onAudioData;
  }

  async start() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        echoCancellation: true,
        autoGainControl: true,
        noiseSuppression: true,
      },
    });

    this.context = new AudioContext({ sampleRate: this.sampleRate });

    await this.context.audioWorklet.addModule(
      URL.createObjectURL(new Blob([WORKLET_CODE], { type: "application/javascript" }))
    );

    this.source = this.context.createMediaStreamSource(this.stream);
    this.worklet = new AudioWorkletNode(this.context, "recorder-processor");

    this.worklet.port.onmessage = (event) => {
      const float32Data = event.data;

      // Calculate RMS volume
      let sumSquares = 0;
      for (let i = 0; i < float32Data.length; i++) {
        sumSquares += float32Data[i] * float32Data[i];
      }
      const rms = Math.sqrt(sumSquares / float32Data.length);

      // Convert to Int16 and buffer
      const int16Data = this.float32ToInt16(float32Data);
      this.audioBuffer.push(int16Data);
      this.volumeBuffer.push(rms);
    };

    // Start the buffer flush interval
    this.bufferIntervalId = setInterval(() => {
      this.flushBuffer();
    }, this.bufferIntervalMs);

    this.source.connect(this.worklet);
    this.worklet.connect(this.context.destination);
  }

  private flushBuffer() {
    if (this.audioBuffer.length === 0) return;

    // Combine all buffered Int16 arrays into one
    const totalLength = this.audioBuffer.reduce((sum, arr) => sum + arr.length, 0);
    const combined = new Int16Array(totalLength);
    let offset = 0;
    for (const chunk of this.audioBuffer) {
      combined.set(chunk, offset);
      offset += chunk.length;
    }

    // Calculate average volume from buffered samples
    const avgVolume = this.volumeBuffer.length > 0
      ? this.volumeBuffer.reduce((sum, v) => sum + v, 0) / this.volumeBuffer.length
      : 0;

    // Convert to Base64 and send
    const base64 = this.arrayBufferToBase64(combined.buffer);
    this.onAudioData(base64, avgVolume);

    // Clear buffers
    this.audioBuffer = [];
    this.volumeBuffer = [];
  }

  stop() {
    // Clear the buffer interval
    if (this.bufferIntervalId) {
      clearInterval(this.bufferIntervalId);
      this.bufferIntervalId = null;
    }
    // Flush any remaining buffered audio
    this.flushBuffer();

    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    if (this.context) {
      this.context.close();
      this.context = null;
    }
    this.source = null;
    this.worklet = null;
  }

  private float32ToInt16(float32: Float32Array): Int16Array {
    const int16 = new Int16Array(float32.length);
    for (let i = 0; i < float32.length; i++) {
      const s = Math.max(-1, Math.min(1, float32[i]));
      int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return int16;
  }

  private arrayBufferToBase64(buffer: ArrayBuffer | SharedArrayBuffer): string {
    let binary = "";
    const bytes = new Uint8Array(buffer as ArrayBuffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}

export class AudioPlayer {
  private context: AudioContext;
  private sampleRate = 24000; // Gemini Output Rate
  private nextStartTime = 0;
  private onPlay?: (volume: number) => void;
  private analyser: AnalyserNode;
  private gainNode: GainNode;

  constructor(onPlay?: (volume: number) => void) {
    this.context = new AudioContext();
    this.onPlay = onPlay;
    this.analyser = this.context.createAnalyser();
    this.analyser.fftSize = 256;
    this.gainNode = this.context.createGain();
    this.gainNode.connect(this.context.destination);

    // Periodically check volume if callback is provided
    if (this.onPlay) {
      this.checkVolume();
    }
  }

  setVolume(volume: number) {
    if (this.gainNode) {
      // Ramp to value to prevent clicking
      const currentTime = this.context.currentTime;
      this.gainNode.gain.cancelScheduledValues(currentTime);
      this.gainNode.gain.setTargetAtTime(volume, currentTime, 0.1);
    }
  }

  private checkVolume() {
    if (!this.context || this.context.state === 'closed') return;

    const dataArray = new Uint8Array(this.analyser.fftSize);
    this.analyser.getByteTimeDomainData(dataArray);

    let sumSquares = 0;
    for (let i = 0; i < dataArray.length; i++) {
      const normalized = (dataArray[i] - 128) / 128; // -1 to 1
      sumSquares += normalized * normalized;
    }
    const rms = Math.sqrt(sumSquares / dataArray.length);

    this.onPlay?.(rms);
    requestAnimationFrame(() => this.checkVolume());
  }

  async play(base64Data: string) {
    if (this.context.state === 'suspended') {
      await this.context.resume();
    }
    const audioData = this.base64ToArrayBuffer(base64Data);
    const int16Data = new Int16Array(audioData);
    const float32Data = this.int16ToFloat32(int16Data);

    const buffer = this.context.createBuffer(1, float32Data.length, this.sampleRate);
    buffer.getChannelData(0).set(float32Data);

    const source = this.context.createBufferSource();
    source.buffer = buffer;

    // Connect to analyser for volume detection and then to gain node -> destination
    source.connect(this.analyser);
    this.analyser.connect(this.gainNode);

    // Schedule playback
    const currentTime = this.context.currentTime;
    if (this.nextStartTime < currentTime) {
      this.nextStartTime = currentTime;
    }
    source.start(this.nextStartTime);
    this.nextStartTime += buffer.duration;
  }

  stop() {
    if (this.context) {
      this.context.close();
      this.context = new AudioContext();
      this.nextStartTime = 0;
      // Recreate nodes for new context
      this.analyser = this.context.createAnalyser();
      this.analyser.fftSize = 256;
      this.gainNode = this.context.createGain();
      this.gainNode.connect(this.context.destination);
    }
  }

  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  private int16ToFloat32(int16: Int16Array): Float32Array {
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) {
      const int = int16[i];
      float32[i] = int >= 0 ? int / 0x7fff : int / 0x8000;
    }
    return float32;
  }
}
