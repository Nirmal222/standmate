"use client";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import {
  GitBranch,
  Slack,
  Trello,
  Activity,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

const content = [
  {
    title: "Connect Your Ecosystem",
    description:
      "Unify your entire engineering stack in minutes, not days. Huzzler seamlessly integrates with Jira, GitHub, Slack, Linear, and 50+ other tools to create a single source of truth. No more context switching, no more data silos. Get instant visibility into every aspect of your project—from code commits to team conversations—all in one intelligent dashboard. Our MCP-powered integration layer ensures real-time synchronization across all your platforms, giving you the complete picture without the complexity.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-foreground">
        <div className="relative flex items-center justify-center w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border border-dashed border-foreground/20 animate-spin-slow" />
          </div>
          <div className="relative z-10 h-16 w-16 rounded-2xl bg-foreground/10 backdrop-blur-md flex items-center justify-center shadow-xl">
            <span className="text-2xl font-bold text-foreground">H</span>
          </div>
          {/* Orbiting Icons */}
          <div className="absolute top-1/4 left-1/4 p-2 rounded-xl bg-foreground/10 backdrop-blur-md border border-foreground/10 shadow-sm animate-bounce-slow">
            <GitBranch className="h-5 w-5 text-foreground" />
          </div>
          <div className="absolute bottom-1/4 right-1/4 p-2 rounded-xl bg-foreground/10 backdrop-blur-md border border-foreground/10 shadow-sm animate-bounce-slow delay-100">
            <Slack className="h-5 w-5 text-foreground" />
          </div>
          <div className="absolute top-1/3 right-1/3 p-2 rounded-xl bg-foreground/10 backdrop-blur-md border border-foreground/10 shadow-sm animate-bounce-slow delay-200">
            <Trello className="h-5 w-5 text-foreground" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Monitor in Real-Time",
    description:
      "Gain X-ray vision into your project's pulse with AI-powered analytics. Track commit velocity, PR cycle times, code review patterns, and team communication sentiment—all in real-time. Our intelligent monitoring system doesn't just show you metrics; it understands context. Spot bottlenecks before they become blockers, identify at-risk deliverables weeks in advance, and understand team workload distribution at a glance. Every metric is actionable, every insight is timely, and every alert is meaningful.",
    content: (
      <div className="h-full w-full p-6 flex flex-col justify-center text-foreground">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-foreground/80">Project Health</span>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">Healthy</span>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs">
            <span>Velocity</span>
            <span className="font-medium">84%</span>
          </div>
          <div className="h-2 w-full bg-foreground/10 rounded-full overflow-hidden">
            <div className="h-full bg-foreground w-[84%]" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-foreground/10 rounded-lg backdrop-blur-sm">
            <Activity className="h-5 w-5 text-foreground mb-2" />
            <div className="text-xl font-bold">12</div>
            <div className="text-[10px] text-foreground/60">Active PRs</div>
          </div>
          <div className="p-3 bg-foreground/10 rounded-lg backdrop-blur-sm">
            <GitBranch className="h-5 w-5 text-foreground mb-2" />
            <div className="text-xl font-bold">45</div>
            <div className="text-[10px] text-foreground/60">Commits</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Predict Timeline Risks",
    description:
      "See the future before it happens with predictive AI that learns from your team's patterns. Our machine learning models analyze thousands of data points—from historical velocity trends to current sprint dynamics—to forecast timeline drifts with 85% accuracy. Know exactly when a project is veering off track, understand why it's happening, and get specific recommendations to course-correct. Stop reacting to problems and start preventing them. Huzzler's predictive engine turns uncertainty into confidence.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-foreground p-6">
        <div className="relative w-full">
          <div className="absolute -top-6 -right-2 p-3 bg-red-500/20 rounded-xl border border-red-500/30 backdrop-blur-md z-20 animate-pulse">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-200 font-bold">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs">Risk Detected</span>
            </div>
          </div>
          <div className="bg-foreground/10 backdrop-blur-md rounded-xl border border-foreground/10 shadow-lg p-6 overflow-hidden">
            <div className="h-24 w-full flex items-end gap-2">
              <div className="w-6 h-[40%] bg-foreground/20 rounded-t-sm" />
              <div className="w-6 h-[60%] bg-foreground/40 rounded-t-sm" />
              <div className="w-6 h-[50%] bg-foreground/30 rounded-t-sm" />
              <div className="w-6 h-[80%] bg-foreground/60 rounded-t-sm" />
              <div className="w-6 h-[30%] bg-red-400 rounded-t-sm animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Prevent Issues Proactively",
    description:
      "Automate solutions, don't just identify problems. Huzzler doesn't stop at alerts—it takes action. When workload imbalances are detected, we suggest task reassignments. When sprint scope creeps beyond capacity, we recommend adjustments. When code review bottlenecks form, we notify the right people. Every intervention is smart, contextual, and one-click executable. Transform your team from firefighting to forward-thinking. Let automation handle the routine so your team can focus on innovation.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-foreground p-6">
        <div className="w-full bg-foreground/10 backdrop-blur-md rounded-xl border border-foreground/10 shadow-lg p-6">
          <div className="flex items-start gap-4">
            <div className="h-8 w-8 rounded-full bg-foreground/20 flex items-center justify-center flex-shrink-0">
              <div className="h-2 w-2 rounded-full bg-foreground animate-ping" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-sm">Optimization</h4>
              <p className="text-xs text-foreground/60">Re-balance workload for Sprint 4.</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button className="flex-1 bg-foreground text-background text-[10px] font-bold py-2 rounded-lg hover:bg-foreground/90 transition-colors">
              Auto-Fix
            </button>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Improve Continuously",
    description:
      "Turn every sprint into a learning opportunity with ML-powered insights. Huzzler's continuous improvement engine analyzes your team's performance patterns, identifies optimization opportunities, and provides actionable recommendations. Refine estimation accuracy sprint over sprint. Optimize team velocity based on real data, not gut feelings. Understand what works, what doesn't, and why. Our platform learns from every project, every commit, every conversation—making your team smarter and faster with each delivery cycle. Get better, automatically.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-foreground">
        <div className="relative flex flex-col items-center justify-center">
          <TrendingUp className="h-32 w-32 text-foreground/10 absolute" strokeWidth={1} />
          <div className="relative z-20 bg-foreground/10 backdrop-blur-md border border-foreground/10 shadow-xl rounded-2xl p-6 text-center space-y-2">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-green-400/20 text-green-400 mb-1">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div className="text-2xl font-bold text-foreground">+24%</div>
            <div className="text-xs text-foreground/60">Efficiency Gain</div>
          </div>
        </div>
      </div>
    ),
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-24 border-t border-border bg-background overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          The Huzlr Delivery Loop
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A continuous intelligence loop designed to connect, predict, and
          improve every delivery cycle.
        </p>
      </div>
      <div className="p-10">
        <StickyScroll content={content} />
      </div>
    </section>
  );
}
