import { AudioPlayer } from "@/lib/audio-utils";
import { GeminiPart, GeminiServerMessage, Transcript } from "@/lib/types/gemini";

export function handleAudioStream(part: GeminiPart, player: AudioPlayer | null) {
    if (part.inlineData?.data && player) {
        player.play(part.inlineData.data);
    }
}

export function isInterruption(msg: GeminiServerMessage): boolean {
    return !!msg.serverContent?.interrupted;
}

export function calculateNewTranscripts(
    msg: GeminiServerMessage,
    currentTranscripts: Transcript[]
): Transcript[] {
    const { inputTranscription, outputTranscription, turnComplete } =
        msg.serverContent || {};

    if (!inputTranscription && !outputTranscription && !turnComplete) {
        return currentTranscripts;
    }

    const newTranscripts = [...currentTranscripts];

    // Handle Input Transcription (User)
    if (inputTranscription) {
        const text = inputTranscription.text || "";
        let userIndex = -1;
        // Find last active user transcript
        for (let i = newTranscripts.length - 1; i >= 0; i--) {
            if (newTranscripts[i].role === "user" && !newTranscripts[i].isComplete) {
                userIndex = i;
                break;
            }
        }

        if (userIndex >= 0) {
            newTranscripts[userIndex] = {
                ...newTranscripts[userIndex],
                text: newTranscripts[userIndex].text + text,
            };
        } else {
            newTranscripts.push({ role: "user", text, isComplete: false });
        }
    }

    // Handle Output Transcription (Model)
    if (outputTranscription) {
        const text = outputTranscription.text || "";
        let modelIndex = -1;
        // Find last active model transcript
        for (let i = newTranscripts.length - 1; i >= 0; i--) {
            if (newTranscripts[i].role === "model" && !newTranscripts[i].isComplete) {
                modelIndex = i;
                break;
            }
        }

        if (modelIndex >= 0) {
            newTranscripts[modelIndex] = {
                ...newTranscripts[modelIndex],
                text: newTranscripts[modelIndex].text + text,
            };
        } else {
            newTranscripts.push({ role: "model", text, isComplete: false });
        }
    }

    // Handle Turn Completion
    if (turnComplete) {
        for (let i = 0; i < newTranscripts.length; i++) {
            // Mark all incomplete as complete when turn is done
            // OR typically just the last one.
            // The original logic marked ALL as complete. We keep that behavior.
            if (!newTranscripts[i].isComplete) {
                newTranscripts[i] = { ...newTranscripts[i], isComplete: true };
            }
        }
    }

    return newTranscripts;
}
