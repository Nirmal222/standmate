import { useState, useRef, useEffect, useCallback } from "react";
import { GoogleGenAI, Modality } from "@google/genai";
import { AudioRecorder, AudioPlayer } from "@/lib/audio-utils";
import { Transcript } from "@/lib/types/gemini";
import {
    handleAudioStream,
    calculateNewTranscripts,
    isInterruption,
} from "@/lib/gemini-handlers";

// Configuration constants
const MODEL_NAME = "gemini-2.5-flash-native-audio-preview-12-2025";
const API_VERSION = "v1alpha";

export function useGeminiLive() {
    const [status, setStatus] = useState<
        "idle" | "connecting" | "connected" | "error"
    >("idle");
    const [isListening, setIsListening] = useState(false);
    const [agentVolume, setAgentVolume] = useState(0);
    const [userVolume, setUserVolume] = useState(0);
    const [transcripts, setTranscripts] = useState<Transcript[]>([]);

    const recorderRef = useRef<AudioRecorder | null>(null);
    const playerRef = useRef<AudioPlayer | null>(null);
    const sessionRef = useRef<any>(null);

    const disconnect = useCallback(() => {
        recorderRef.current?.stop();
        playerRef.current?.stop();
        if (sessionRef.current) {
            try {
                sessionRef.current.close();
            } catch (e) {
                console.error("Error closing session:", e);
            }
            sessionRef.current = null;
        }
        setIsListening(false);
        setStatus("idle");
        setAgentVolume(0);
        setUserVolume(0);
    }, []);

    const connect = useCallback(async () => {
        setStatus("connecting");
        try {
            // 1. Get Token
            const tokenResp = await fetch("/api/gemini/token");
            const data = await tokenResp.json();
            if (!data.token) throw new Error("Failed to get token");

            // 2. Init Client
            const client = new GoogleGenAI({
                apiKey: data.token,
                httpOptions: { apiVersion: API_VERSION },
            });

            // 3. Init Audio
            playerRef.current = new AudioPlayer((volume) => {
                setAgentVolume(volume);
            });

            recorderRef.current = new AudioRecorder((base64, volume) => {
                setUserVolume(volume);
                if (sessionRef.current) {
                    try {
                        sessionRef.current.sendRealtimeInput({
                            audio: {
                                data: base64,
                                mimeType: "audio/pcm;rate=16000",
                            },
                        });
                    } catch (e) {
                        console.error("Error sending audio:", e);
                    }
                }
            });

            // 4. Connect
            sessionRef.current = await client.live.connect({
                model: MODEL_NAME,
                config: {
                    responseModalities: [Modality.AUDIO],
                    outputAudioTranscription: {},
                },
                callbacks: {
                    onopen: () => {
                        console.log("Connected to Gemini Live");
                        setStatus("connected");
                        setIsListening(true);
                        recorderRef.current?.start();
                        new Audio("/water-drop.mp3")
                            .play()
                            .catch((e) => console.error("Failed to play connection sound:", e));
                    },
                    onmessage: (msg: any) => {
                        // Handle Audio
                        if (msg.serverContent?.modelTurn?.parts) {
                            for (const part of msg.serverContent.modelTurn.parts) {
                                handleAudioStream(part, playerRef.current);
                            }
                        }

                        // Handle Transcripts
                        setTranscripts((prev) => calculateNewTranscripts(msg, prev));

                        // Handle Interruption
                        if (isInterruption(msg)) {
                            console.log("Interrupted");
                            playerRef.current?.stop();
                        }
                    },
                    onclose: (e: any) => {
                        console.log("Session closed", e);
                        disconnect();
                    },
                    onerror: (e: any) => {
                        console.error("Session error", e);
                        disconnect();
                    },
                },
            });
        } catch (e) {
            console.error("Connection failed:", e);
            setStatus("error");
            setIsListening(false);
        }
    }, [disconnect]);

    const toggleMic = useCallback(() => {
        if (isListening || status === "connecting") {
            disconnect();
        } else {
            connect();
        }
    }, [isListening, status, connect, disconnect]);

    const sendText = useCallback((text: string) => {
        if (!text.trim()) return;

        // Add to transcripts immediately
        setTranscripts((prev) => [
            ...prev,
            { role: "user", text, isComplete: true },
        ]);

        if (sessionRef.current) {
            sessionRef.current.sendClientContent({ turns: [text] });
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => disconnect();
    }, [disconnect]);

    return {
        status,
        isListening,
        agentVolume,
        userVolume,
        transcripts,
        connect,
        disconnect,
        toggleMic,
        sendText,
    };
}
