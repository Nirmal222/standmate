"use client"

import React, { forwardRef, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import {
    Gauge,
    Brain,
    ShieldAlert,
    RefreshCcw,
    Users,
    LineChart,
    GitBranch,
    MessageSquare,
    FileText,
    Calendar,
    Database,
    Workflow,
} from "lucide-react"

const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 flex items-center justify-center overflow-hidden bg-background",
                className
            )}
        >
            {children}
        </div>
    )
})

Circle.displayName = "Circle"

const FeatureCard = forwardRef<
    HTMLDivElement,
    {
        className?: string
        title: string
        description: string
        icon: React.ElementType
    }
>(({ className, title, description, icon: Icon }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 flex flex-col items-center justify-center gap-2 rounded-lg border bg-card p-2 shadow-sm hover:shadow-md transition-shadow h-28 w-28",
                className
            )}
        >
            <div className="w-6 h-6 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                <Icon size={14} strokeWidth={2} className="text-foreground" />
            </div>
            <div className="flex flex-col gap-0.5 text-center">
                <h3 className="text-[10px] font-semibold text-foreground leading-tight">{title}</h3>
                <p className="text-[9px] text-muted-foreground leading-snug line-clamp-2">{description}</p>
            </div>
        </div>
    )
})

FeatureCard.displayName = "FeatureCard"

export function AnimatedBeamFeatures() {
    const containerRef = useRef<HTMLDivElement>(null)

    // Left side - Inputs
    const input1Ref = useRef<HTMLDivElement>(null)
    const input2Ref = useRef<HTMLDivElement>(null)
    const input3Ref = useRef<HTMLDivElement>(null)
    const input4Ref = useRef<HTMLDivElement>(null)
    const input5Ref = useRef<HTMLDivElement>(null)
    const input6Ref = useRef<HTMLDivElement>(null)

    // Center - RHuzlr connector
    const centerRef = useRef<HTMLDivElement>(null)

    // Right side - Core Innovations
    const output1Ref = useRef<HTMLDivElement>(null)
    const output2Ref = useRef<HTMLDivElement>(null)
    const output3Ref = useRef<HTMLDivElement>(null)
    const output4Ref = useRef<HTMLDivElement>(null)
    const output5Ref = useRef<HTMLDivElement>(null)
    const output6Ref = useRef<HTMLDivElement>(null)

    const inputs = [
        { ref: input1Ref, icon: GitBranch, title: "Code Commits", description: "Track development progress" },
        { ref: input2Ref, icon: MessageSquare, title: "Team Communication", description: "Slack, Teams, Discord" },
        { ref: input3Ref, icon: FileText, title: "Documentation", description: "Specs, requirements, notes" },
        { ref: input4Ref, icon: Calendar, title: "Sprint Data", description: "Velocity and timelines" },
        { ref: input5Ref, icon: Database, title: "Historical Data", description: "Past project patterns" },
        { ref: input6Ref, icon: Workflow, title: "Workflow Events", description: "CI/CD, deployments" },
    ]

    const outputs = [
        { ref: output1Ref, icon: Gauge, title: "Autonomous Monitoring", description: "Track progress automatically" },
        { ref: output2Ref, icon: Brain, title: "Smart Planning", description: "AI-powered estimates" },
        { ref: output3Ref, icon: ShieldAlert, title: "Risk Management", description: "Early blocker detection" },
        { ref: output4Ref, icon: RefreshCcw, title: "Knowledge Sync", description: "Consistent artifacts" },
        { ref: output5Ref, icon: Users, title: "Resource Optimization", description: "Balanced workload" },
        { ref: output6Ref, icon: LineChart, title: "Continuous Learning", description: "Self-improving delivery" },
    ]

    return (
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-background border-t border-border">
            <div className="relative max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center space-y-3">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                        Intelligence Pipeline
                    </h2>
                    <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                        Huzlr transforms raw project data into actionable intelligence through our autonomous delivery engine
                    </p>
                </div>

                {/* Animated Beam Diagram */}
                <div
                    className="relative flex w-full items-center justify-center overflow-visible py-8"
                    ref={containerRef}
                    style={{ minHeight: "350px" }}
                >
                    <div className="flex w-full max-w-5xl items-center justify-between gap-8">
                        {/* Left Column - Inputs */}
                        <div className="grid grid-cols-2 gap-4 flex-1 place-items-center">
                            {inputs.map((input, idx) => (
                                <FeatureCard
                                    key={`input-${idx}`}
                                    ref={input.ref}
                                    title={input.title}
                                    description={input.description}
                                    icon={input.icon}
                                />
                            ))}
                        </div>

                        {/* Center - RHuzlr Logo/Connector */}
                        <div className="flex items-center justify-center flex-shrink-0">
                            <Circle ref={centerRef} className="w-12 h-12 rounded-lg border-2 border-border">
                                <Image
                                    src="/favicon.png"
                                    alt="RHuzlr"
                                    width={36}
                                    height={36}
                                    className="object-contain"
                                />
                            </Circle>
                        </div>

                        {/* Right Column - Core Innovations */}
                        <div className="grid grid-cols-2 gap-4 flex-1 place-items-center">
                            {outputs.map((output, idx) => (
                                <FeatureCard
                                    key={`output-${idx}`}
                                    ref={output.ref}
                                    title={output.title}
                                    description={output.description}
                                    icon={output.icon}
                                />
                            ))}
                        </div>
                    </div>
                    {/* Animated Beams - Left to Center */}
                    {inputs.map((input, idx) => (
                        <AnimatedBeam
                            key={`beam-in-${idx}`}
                            containerRef={containerRef}
                            fromRef={centerRef}
                            toRef={input.ref}
                            curvature={0}
                            duration={4}
                            delay={0}
                            pathColor="#52525b"
                            pathWidth={2}
                            pathOpacity={0.3}
                            gradientStartColor="#18181b"
                            gradientStopColor="#71717a"
                        />
                    ))}

                    {/* Animated Beams - Center to Right */}
                    {outputs.map((output, idx) => (
                        <AnimatedBeam
                            key={`beam-out-${idx}`}
                            containerRef={containerRef}
                            fromRef={centerRef}
                            toRef={output.ref}
                            curvature={0}
                            duration={4}
                            delay={0}
                            pathColor="#52525b"
                            pathWidth={2}
                            pathOpacity={0.3}
                            gradientStartColor="#18181b"
                            gradientStopColor="#71717a"
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
