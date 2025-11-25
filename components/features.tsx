import { Card, CardHeader, CardContent } from "@/components/ui/card"
import {
  Gauge,
  Brain,
  ShieldAlert,
  RefreshCcw,
  Users,
  LineChart,
} from "lucide-react"

export function Features() {
  const features = [
    {
      title: "Autonomous Project Monitoring",
      description:
        "Huzlr's agents track progress, detect deviations, and recalibrate delivery timelines automatically.",
      outcome: "Continuous alignment without manual tracking",
      icon: Gauge,
    },
    {
      title: "Smart Planning & Estimation",
      description:
        "AI learns from historical project data to create evidence-based estimates and scenario simulations.",
      outcome: "Predictable delivery, grounded in data",
      icon: Brain,
    },
    {
      title: "Automated Risk & Dependency Management",
      description:
        "AI agents scan dependencies across tasks, commits, and workflows to detect blockers early.",
      outcome: "Bottlenecks solved before they surface",
      icon: ShieldAlert,
    },
    {
      title: "Knowledge Synchronization",
      description:
        "Huzlr keeps all project artifacts consistent and updated across your tools automatically.",
      outcome: "Everyone always has the same information",
      icon: RefreshCcw,
    },
    {
      title: "Resource Optimization",
      description:
        "Tracks workload and skill distribution across the team, identifying capacity imbalances.",
      outcome: "Balanced teams and efficient resource usage",
      icon: Users,
    },
    {
      title: "Continuous Learning & Improvement",
      description:
        "Every completed project feeds Huzlr's intelligence layer for smarter delivery cycles.",
      outcome: "Self-improving project delivery",
      icon: LineChart,
    },
  ]

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-border bg-background overflow-hidden">
      <div className="relative max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Our Core Innovations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each capability represents a leap toward autonomous, intelligent delivery — designed to make modern project execution seamless.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <Card
                key={idx}
                className="group relative h-full border-border/60 bg-card backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <CardHeader className="flex flex-col items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-md group-hover:scale-110 transition-transform">
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-xs text-accent font-medium tracking-wide">
                      Outcome: {feature.outcome}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
