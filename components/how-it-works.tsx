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
            <div className="w-48 h-48 rounded-full border border-dashed border-primary/30 animate-spin-slow" />
          </div>
          <div className="relative z-10 h-16 w-16 rounded-2xl bg-primary/10 backdrop-blur-md flex items-center justify-center shadow-xl border border-primary/20">
            <span className="text-2xl font-bold text-primary">H</span>
          </div>
          {/* Orbiting Icons */}
          <div className="absolute top-1/4 left-1/4 p-2 rounded-xl bg-chart-1/10 backdrop-blur-md border border-chart-1/20 shadow-sm animate-bounce-slow">
            <GitBranch className="h-5 w-5 text-chart-1" />
          </div>
          <div className="absolute bottom-1/4 right-1/4 p-2 rounded-xl bg-chart-2/10 backdrop-blur-md border border-chart-2/20 shadow-sm animate-bounce-slow delay-100">
            <Slack className="h-5 w-5 text-chart-2" />
          </div>
          <div className="absolute top-1/3 right-1/3 p-2 rounded-xl bg-chart-3/10 backdrop-blur-md border border-chart-3/20 shadow-sm animate-bounce-slow delay-200">
            <Trello className="h-5 w-5 text-chart-3" />
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
      <div className="h-full w-full p-2 flex items-center justify-center text-foreground">
        <div className="w-full max-w-md">
          <div className="grid grid-cols-3 gap-3">
            <div className="aspect-square rounded-lg bg-chart-1/10 border border-chart-1/20 flex flex-col items-center justify-center p-3">
              <div className="text-xs text-chart-1/70 mb-2">Velocity</div>
              <div className="text-3xl font-bold text-chart-1">84%</div>
            </div>
            <div className="aspect-square rounded-lg bg-chart-2/10 border border-chart-2/20 flex flex-col items-center justify-center p-3">
              <div className="text-xs text-chart-2/70 mb-2">Review</div>
              <div className="text-3xl font-bold text-chart-2">2.3h</div>
            </div>
            <div className="aspect-square rounded-lg bg-chart-3/10 border border-chart-3/20 flex flex-col items-center justify-center p-3">
              <div className="text-xs text-chart-3/70 mb-2">Capacity</div>
              <div className="text-3xl font-bold text-chart-3">91%</div>
            </div>
            <div className="aspect-square rounded-lg bg-primary/10 border border-primary/20 flex flex-col items-center justify-center p-3">
              <Activity className="h-6 w-6 text-primary mb-2" />
              <div className="text-2xl font-bold text-foreground">12</div>
              <div className="text-[10px] text-muted-foreground mt-1">Active PRs</div>
            </div>
            <div className="aspect-square rounded-lg bg-chart-4/10 border border-chart-4/20 flex flex-col items-center justify-center p-3">
              <GitBranch className="h-6 w-6 text-chart-4 mb-2" />
              <div className="text-2xl font-bold text-foreground">45</div>
              <div className="text-[10px] text-muted-foreground mt-1">Commits</div>
            </div>
            <div className="aspect-square rounded-lg bg-chart-5/10 border border-chart-5/20 flex flex-col items-center justify-center p-3">
              <CheckCircle className="h-6 w-6 text-chart-5 mb-2" />
              <div className="text-2xl font-bold text-foreground">8</div>
              <div className="text-[10px] text-muted-foreground mt-1">Merged</div>
            </div>
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
      <div className="h-full w-full p-2 flex items-center justify-center text-foreground">
        <div className="w-full max-w-md">
          <div className="grid grid-cols-6 gap-2 mb-2">
            <div className="aspect-square rounded-lg bg-chart-1/10 border border-chart-1/20 flex items-end justify-center p-2">
              <div className="w-full h-[40%] bg-chart-1 rounded-t" />
            </div>
            <div className="aspect-square rounded-lg bg-chart-2/10 border border-chart-2/20 flex items-end justify-center p-2">
              <div className="w-full h-[60%] bg-chart-2 rounded-t" />
            </div>
            <div className="aspect-square rounded-lg bg-chart-3/10 border border-chart-3/20 flex items-end justify-center p-2">
              <div className="w-full h-[50%] bg-chart-3 rounded-t" />
            </div>
            <div className="aspect-square rounded-lg bg-chart-4/10 border border-chart-4/20 flex items-end justify-center p-2">
              <div className="w-full h-[80%] bg-chart-4 rounded-t" />
            </div>
            <div className="aspect-square rounded-lg bg-chart-5/10 border border-chart-5/20 flex items-end justify-center p-2">
              <div className="w-full h-[30%] bg-chart-5 rounded-t" />
            </div>
            <div className="aspect-square rounded-lg bg-muted border border-border flex items-end justify-center p-2">
              <div className="w-full h-[25%] bg-muted-foreground/30 border-2 border-dashed border-muted-foreground/40 rounded-t" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="aspect-square rounded-lg bg-chart-5/10 border border-chart-5/20 flex flex-col items-center justify-center p-3">
              <AlertTriangle className="h-6 w-6 text-chart-5 mb-2" />
              <div className="text-xs text-chart-5/70">Risk Alert</div>
            </div>
            <div className="aspect-square rounded-lg bg-accent border border-border flex flex-col items-center justify-center p-3">
              <div className="text-xs text-muted-foreground mb-2">Delay</div>
              <div className="text-2xl font-bold text-foreground">3-5d</div>
            </div>
            <div className="aspect-square rounded-lg bg-primary/10 border border-primary/20 flex flex-col items-center justify-center p-3">
              <div className="text-xs text-primary/70 mb-2">Confidence</div>
              <div className="text-2xl font-bold text-primary">85%</div>
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
      <div className="h-full w-full p-2 flex items-center justify-center text-foreground">
        <div className="w-full max-w-md">
          <div className="grid grid-cols-3 gap-3">
            <div className="aspect-square rounded-lg bg-chart-1/10 border border-chart-1/20 flex flex-col items-center justify-center p-3">
              <AlertTriangle className="h-6 w-6 text-chart-1 mb-2" />
              <div className="text-xs text-muted-foreground text-center">Workload</div>
            </div>
            <div className="aspect-square rounded-lg bg-chart-2/10 border border-chart-2/20 flex flex-col items-center justify-center p-3">
              <Activity className="h-6 w-6 text-chart-2 mb-2" />
              <div className="text-xs text-muted-foreground text-center">Reviews</div>
            </div>
            <div className="aspect-square rounded-lg bg-primary/10 border border-primary/20 flex flex-col items-center justify-center p-3">
              <CheckCircle className="h-6 w-6 text-primary mb-2" />
              <div className="text-xs text-muted-foreground text-center">Capacity</div>
            </div>
            <div className="aspect-square rounded-lg bg-chart-3/10 border border-chart-3/20 flex flex-col items-center justify-center p-3">
              <div className="text-xs text-chart-3/70 mb-2">Fixes</div>
              <div className="text-3xl font-bold text-chart-3">3</div>
            </div>
            <div className="aspect-square rounded-lg bg-chart-4/10 border border-chart-4/20 flex flex-col items-center justify-center p-3">
              <div className="text-xs text-chart-4/70 mb-2">Auto</div>
              <div className="text-3xl font-bold text-chart-4">2</div>
            </div>
            <div className="aspect-square rounded-lg bg-chart-5/10 border border-chart-5/20 flex flex-col items-center justify-center p-3">
              <div className="text-xs text-chart-5/70 mb-2">Manual</div>
              <div className="text-3xl font-bold text-chart-5">1</div>
            </div>
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
      <div className="h-full w-full p-2 flex items-center justify-center text-foreground">
        <div className="w-full max-w-md">
          <div className="grid grid-cols-3 gap-3">
            <div className="aspect-square rounded-lg bg-primary/10 border border-primary/20 flex flex-col items-center justify-center p-3">
              <div className="text-xs text-primary/70 mb-2">Gain</div>
              <div className="text-3xl font-bold text-primary">+24%</div>
            </div>
            <div className="aspect-square rounded-lg bg-chart-1/10 border border-chart-1/20 flex flex-col items-center justify-center p-3">
              <div className="text-xs text-chart-1/70 mb-2">Accuracy</div>
              <div className="text-3xl font-bold text-chart-1">92%</div>
            </div>
            <div className="aspect-square rounded-lg bg-chart-2/10 border border-chart-2/20 flex flex-col items-center justify-center p-3">
              <div className="text-xs text-chart-2/70 mb-2">Velocity</div>
              <div className="text-3xl font-bold text-chart-2">38</div>
            </div>
            <div className="aspect-square rounded-lg bg-chart-3/10 border border-chart-3/20 flex flex-col items-center justify-center p-3">
              <TrendingUp className="h-6 w-6 text-chart-3 mb-2" />
              <div className="text-xs text-muted-foreground text-center">Trending Up</div>
            </div>
            <div className="aspect-square rounded-lg bg-chart-4/10 border border-chart-4/20 flex flex-col items-center justify-center p-3">
              <div className="text-xs text-chart-4/70 mb-2">Sprints</div>
              <div className="text-3xl font-bold text-chart-4">6</div>
            </div>
            <div className="aspect-square rounded-lg bg-chart-5/10 border border-chart-5/20 flex flex-col items-center justify-center p-3">
              <div className="text-xs text-chart-5/70 mb-2">Teams</div>
              <div className="text-3xl font-bold text-chart-5">4</div>
            </div>
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
