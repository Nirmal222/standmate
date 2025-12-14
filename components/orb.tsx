"use client"

import React, { useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface OrbProps {
    status: "idle" | "connecting" | "connected" | "error"
    agentVolume?: number
    userVolume?: number
    className?: string
}

export function Orb({ status, agentVolume = 0, userVolume = 0, className }: OrbProps) {
    const agentVolumeMotion = useMotionValue(0)
    const userVolumeMotion = useMotionValue(0)
    const wobbleRotation = useMotionValue(0)

    useEffect(() => {
        agentVolumeMotion.set(agentVolume)
        if (agentVolume > 0.02) {
            const wobbleAmount = agentVolume * 30
            wobbleRotation.set((Math.random() - 0.5) * wobbleAmount)
        } else {
            wobbleRotation.set(0)
        }
    }, [agentVolume, agentVolumeMotion, wobbleRotation])

    useEffect(() => {
        userVolumeMotion.set(userVolume)
    }, [userVolume, userVolumeMotion])

    const springConfig = { stiffness: 400, damping: 15, mass: 0.5 }
    const smoothAgentVolume = useSpring(agentVolumeMotion, springConfig)
    const smoothUserVolume = useSpring(userVolumeMotion, springConfig)
    const smoothWobble = useSpring(wobbleRotation, { stiffness: 500, damping: 10 })

    const agentScale = useTransform(smoothAgentVolume, [0, 0.1], [1, 1.3])
    const userRingOpacity = useTransform(smoothUserVolume, [0, 0.05], [0.3, 1])
    const userRingScale = useTransform(smoothUserVolume, [0, 0.08], [1, 1.15])

    return (
        <div className={cn("relative flex items-center justify-center w-48 h-48", className)}>
            <div className="relative flex items-center justify-center">

                {/* IDLE STATE - Flat circle */}
                {status === "idle" && (
                    <motion.div
                        animate={{ scale: [0.98, 1.02, 0.98] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="w-20 h-20 rounded-full bg-slate-400/40 border border-slate-400/30"
                    />
                )}

                {/* CONNECTING STATE - Pulsing flat circle */}
                {status === "connecting" && (
                    <motion.div
                        animate={{
                            scale: [0.9, 1.1, 0.9],
                            opacity: [0.6, 1, 0.6]
                        }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-20 h-20 rounded-full bg-indigo-500/50 border border-indigo-400/40"
                    />
                )}

                {/* CONNECTED STATE - Reactive flat circles */}
                {status === "connected" && (
                    <>
                        {/* Listening indicator - outer ring */}
                        <motion.div
                            style={{
                                scale: userRingScale,
                                opacity: userRingOpacity,
                            }}
                            className="absolute w-24 h-24 rounded-full border-2 border-cyan-400/50"
                        />

                        {/* Core - wobbles when agent speaks */}
                        <motion.div
                            style={{
                                scale: agentScale,
                                rotate: smoothWobble,
                            }}
                            animate={{
                                borderRadius: agentVolume > 0.02
                                    ? ["50%", "45% 55% 55% 45%", "55% 45% 45% 55%", "50%"]
                                    : "50%"
                            }}
                            transition={{
                                borderRadius: { duration: 0.3, repeat: agentVolume > 0.02 ? Infinity : 0 }
                            }}
                            className="w-20 h-20 bg-indigo-500/60 border border-indigo-400/50"
                        />
                    </>
                )}

                {/* ERROR STATE - Flat red circle */}
                {status === "error" && (
                    <motion.div
                        animate={{ scale: [0.98, 1.02, 0.98] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-20 h-20 rounded-full bg-red-500/50 border border-red-400/40"
                    />
                )}
            </div>
        </div>
    )
}
