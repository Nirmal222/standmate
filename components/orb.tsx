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

    const springConfig = { stiffness: 80, damping: 20, mass: 1.2 }
    const smoothAgentVolume = useSpring(agentVolumeMotion, springConfig)
    const smoothUserVolume = useSpring(userVolumeMotion, springConfig)
    const smoothWobble = useSpring(wobbleRotation, { stiffness: 500, damping: 10 })

    const agentScale = useTransform(smoothAgentVolume, [0, 0.1], [1, 1.3]) // Expands when agent speaks
    const listeningScale = useTransform(smoothUserVolume, [0, 0.1], [1, 0.9]) // Contracts when user speaks

    const userGlowScale = useTransform(smoothUserVolume, [0, 0.1], [0.8, 1.4]) // Scale up when hearing user
    const userGlowOpacity = useTransform(smoothUserVolume, [0, 0.05], [0, 0.6]) // Fade in when hearing user

    // Unified pastel palette (Periwinkle/Lavender/Blue) for all states as requested
    const commonGradient = "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, rgba(186,230,253,1) 20%, rgba(165,180,252,1) 50%, rgba(192,132,252,0.8) 100%)"

    // Shadow for depth
    const orbShadow = "inset -10px -10px 20px rgba(0,0,0,0.1), 0px 20px 40px rgba(0,0,0,0.15), 0px 0px 0px 1px rgba(255,255,255,0.2)"

    return (
        <div className={cn("relative flex items-center justify-center w-64 h-64", className)}>

            {/* SVG Filter for Noise/Grain */}
            <svg className="hidden">
                <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
                </filter>
            </svg>

            <div className="relative flex items-center justify-center w-full h-full">

                {/* IDLE STATE */}
                {status === "idle" && (
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                            rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                        }}
                        style={{
                            background: commonGradient,
                            boxShadow: orbShadow,
                        }}
                        className="w-32 h-32 rounded-full relative overflow-hidden"
                    >
                        {/* Grain Overlay */}
                        <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ filter: "url(#noiseFilter)" }} />
                    </motion.div>
                )}

                {/* CONNECTING STATE */}
                {status === "connecting" && (
                    <motion.div
                        animate={{
                            scale: [0.95, 1.05, 0.95],
                            opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            background: commonGradient,
                            boxShadow: orbShadow,
                        }}
                        className="w-32 h-32 rounded-full relative overflow-hidden"
                    >
                        {/* Grain Overlay */}
                        <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ filter: "url(#noiseFilter)" }} />
                    </motion.div>
                )}

                {/* CONNECTED STATE */}
                {status === "connected" && (
                    <div className="relative flex items-center justify-center">
                        {/* Decorative floating orbs (glassmorphism style) - Kept subtle */}
                        <motion.div
                            animate={{ y: [-5, 5, -5], rotate: 360 }}
                            transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
                            className="absolute -top-8 -right-8 w-12 h-12 rounded-full backdrop-blur-md bg-white/30 border border-white/40 shadow-sm z-10"
                        />
                        <motion.div
                            animate={{ y: [5, -5, 5], rotate: -360 }}
                            transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 25, repeat: Infinity, ease: "linear" } }}
                            className="absolute -bottom-6 -left-10 w-16 h-16 rounded-full backdrop-blur-md bg-purple-100/30 border border-white/40 shadow-sm z-0"
                        />

                        {/* Listening Aura - Reacts to User Volume */}
                        <motion.div
                            style={{
                                scale: userGlowScale,
                                opacity: userGlowOpacity,
                            }}
                            className="absolute w-40 h-40 rounded-full bg-white/40 blur-xl z-10"
                        />

                        {/* Main Agent Orb - Wrappers for composed scaling */}
                        <motion.div
                            style={{ scale: listeningScale }} // CONTRACTS when user speaks
                            className="relative z-20"
                        >
                            <motion.div
                                style={{
                                    scale: agentScale, // EXPANDS when agent speaks
                                    rotate: smoothWobble,
                                }}
                                animate={{
                                    borderRadius: agentVolume > 0.02
                                        ? ["50%", "47% 53% 53% 47%", "53% 47% 47% 53%", "50%"]
                                        : "50%",
                                }}
                                transition={{
                                    borderRadius: { duration: 0.5, repeat: agentVolume > 0.02 ? Infinity : 0 }
                                }}
                                className="w-40 h-40 rounded-full relative transition-colors duration-300 overflow-hidden"
                            >
                                {/* Inner gradient layer - CONSTANT COLOR */}
                                <motion.div
                                    className="w-full h-full rounded-full"
                                    style={{
                                        background: commonGradient, // Always use the common gradient
                                        boxShadow: orbShadow
                                    }}
                                >
                                    {/* Grain Overlay */}
                                    <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ filter: "url(#noiseFilter)" }} />
                                </motion.div>

                                {/* Specular highlight helper - Reduced opacity for less gloss */}
                                <div className="absolute top-[20%] left-[25%] w-10 h-6 bg-white/40 blur-md rounded-full transform -rotate-45" />
                            </motion.div>
                        </motion.div>
                    </div>
                )}

                {/* ERROR STATE */}
                {status === "error" && (
                    <motion.div
                        animate={{ x: [-2, 2, -2] }}
                        transition={{ duration: 0.2, repeat: Infinity }}
                        style={{
                            background: "radial-gradient(circle at 30% 30%, rgba(255,200,200,1) 0%, rgba(248,113,113,1) 100%)",
                            boxShadow: orbShadow
                        }}
                        className="w-32 h-32 rounded-full relative overflow-hidden"
                    >
                        {/* Grain Overlay */}
                        <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ filter: "url(#noiseFilter)" }} />
                    </motion.div>
                )}
            </div>
        </div>
    )
}
