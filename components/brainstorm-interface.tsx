"use client"

import * as React from "react"
import { Loader2, Plus, Paperclip, ChevronDown, AudioLines, ArrowUp } from "lucide-react"
import { Orb } from "@/components/orb"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useGeminiLive } from "@/hooks/use-gemini-live" // Import custom hook

export function BrainstormInterface() {
    const [inputValue, setInputValue] = React.useState("")

    // Use the custom hook for all Gemini logic
    const {
        status,
        isListening,
        agentVolume,
        userVolume,
        transcripts,
        toggleMic,
        sendText,
    } = useGeminiLive()

    // Debug: Log volume changes (Optional preservation of debug log)
    React.useEffect(() => {
        if (agentVolume > 0.01 || userVolume > 0.01) {
            // console.log("📊 Volume:", { agent: agentVolume.toFixed(3), user: userVolume.toFixed(3) })
        }
    }, [agentVolume, userVolume])

    const handleSendMessage = () => {
        if (!inputValue.trim()) return
        sendText(inputValue)
        setInputValue("")
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <div className="flex flex-col h-[calc(100vh-theme(spacing.20))] relative bg-background font-sans">
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center relative bg-background">


                {/* Center Visual / Status */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                    {/* Visual Indicator */}
                    <div className="relative flex items-center justify-center">
                        <Orb status={status} agentVolume={agentVolume} userVolume={userVolume} />
                    </div>

                    {/* Active Transcript */}
                    {transcripts.length > 0 && (
                        <div className="h-[10rem] w-[25rem]">
                            <div className="bg-secondary rounded-2xl p-4 w-full text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-300 overflow-scroll">
                                {(() => {
                                    const latest = transcripts[transcripts.length - 1]
                                    if (!latest || !latest.text) return null
                                    return (
                                        <p className={`text-sm text-left font-medium leading-relaxed ${latest.role === "user" ? "text-muted-foreground" : "text-foreground"
                                            }`}>
                                            <span className="italic font-bold mr-1">{latest.role === "user" ? "You:" : "Gemini:"}</span>
                                            {latest.text}
                                        </p>
                                    )
                                })()}
                            </div>
                        </div>
                    )}

                    <div className="px-6 py-2 rounded-full bg-background border shadow-sm text-sm font-medium text-muted-foreground">
                        {status === "connected" ? "Listening..." : status === "connecting" ? "Connecting..." : "Start voice chat"}
                    </div>

                </div>

                {/* Bottom Input Area */}
                <div className="absolute bottom-10 w-full max-w-3xl px-4">
                    <div className="relative rounded-[32px] p-[2px] bg-gradient-to-r from-sky-300 via-indigo-300 to-purple-300 shadow-[0_0_15px_rgba(167,139,250,0.3)] hover:shadow-[0_0_20px_rgba(167,139,250,0.5)] transition-all duration-300">
                        <div className="relative bg-card rounded-[29px] p-2 flex flex-col">
                            {/* Upper Section: Text Input */}
                            <div className="px-2 pt-2 pb-0">
                                <Textarea
                                    placeholder="Talk to standmate and get things done effortlessly..."
                                    className="min-h-[50px] border-0 focus-visible:ring-0 resize-none shadow-none p-2 text-base bg-transparent dark:bg-transparent placeholder:text-muted-foreground/60 w-full"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>

                            {/* Lower Section: Actions */}
                            <div className="flex items-center justify-between p-2">
                                {/* Left Actions */}
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full h-10 w-10 text-muted-foreground hover:bg-muted/50"
                                    >
                                        <Plus className="h-5 w-5" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="rounded-full h-10 px-4 text-muted-foreground border-border/40 hover:bg-muted/50 font-normal gap-2"
                                    >
                                        <Paperclip className="h-4 w-4" />
                                        Attach
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="rounded-full h-10 px-4 text-muted-foreground border-border/40 hover:bg-muted/50 font-normal gap-2"
                                    >
                                        Gemini 2.0
                                        <ChevronDown className="h-3 w-3 opacity-50" />
                                    </Button>
                                </div>

                                {/* Right Actions */}
                                <div className="flex items-center gap-3">
                                    {/* Voice Trigger */}
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className={`rounded-full h-12 w-12 transition-all duration-300 ${isListening
                                            ? "bg-red-100 text-red-600 hover:bg-red-200 ring-2 ring-red-100 ring-offset-2"
                                            : "hover:bg-muted/50 text-muted-foreground"
                                            }`}
                                        onClick={toggleMic}
                                    >
                                        {status === "connecting" ? (
                                            <Loader2 className="h-6 w-6 animate-spin" />
                                        ) : (
                                            <AudioLines className="h-6 w-6" />
                                        )}
                                    </Button>

                                    {/* Send Button */}
                                    <Button
                                        size="icon"
                                        className={`rounded-full h-12 w-12 transition-all duration-200 ${inputValue.trim()
                                            ? "bg-primary text-primary-foreground shadow-md hover:translate-y-[-1px]"
                                            : "bg-muted text-muted-foreground"
                                            }`}
                                        onClick={handleSendMessage}
                                        disabled={!inputValue.trim()}
                                    >
                                        <ArrowUp className="h-6 w-6" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
