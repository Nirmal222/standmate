import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Clock, Smile, Eye } from "lucide-react"

export function Benefits() {
  const benefits = [
    { stat: "3x Faster", desc: "Delivery Speed", icon: Clock },
    { stat: "85% Reduction", desc: "In Missed Deadlines", icon: TrendingUp },
    { stat: "60% Less", desc: "Team Burnout", icon: Smile },
    { stat: "100% Real-time", desc: "Project Visibility", icon: Eye },
  ]

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-border bg-background overflow-hidden">
      <div className="relative max-w-6xl mx-auto space-y-16 text-center">
        {/* Header */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            The <span className="text-accent">Huzlr</span> Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real outcomes driven by autonomous delivery intelligence.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <Card
                key={idx}
                className="group relative p-8 border-border/60 bg-card backdrop-blur-sm shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden"
              >
                <CardContent className="relative flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-md group-hover:scale-110 transition-transform">
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <div className="text-4xl font-extrabold tracking-tight text-primary">
                    {benefit.stat}
                  </div>
                  <p className="text-foreground font-medium">{benefit.desc}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
