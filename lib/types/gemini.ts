export interface GeminiServerMessage {
    serverContent?: {
        modelTurn?: {
            parts: GeminiPart[];
        };
        turnComplete?: boolean;
        interrupted?: boolean;
        inputTranscription?: {
            text: string;
        };
        outputTranscription?: {
            text: string;
        };
    };
    toolUse?: any;
}

export interface GeminiPart {
    text?: string;
    inlineData?: {
        mimeType: string;
        data: string;
    };
}

export interface Transcript {
    role: "user" | "model";
    text: string;
    isComplete: boolean;
}
