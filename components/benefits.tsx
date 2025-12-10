import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Clock, Smile, Eye } from "lucide-react"

export function Benefits() {
  const benefits = [
    {
      stat: "3x Faster",
      desc: "Delivery Speed",
      icon: Clock,
      className: "bg-primary text-primary-foreground",
      iconBg: "bg-primary-foreground/20",
      arrowBg: "bg-primary-foreground text-primary",
    },
    {
      stat: "85% Reduction",
      desc: "In Missed Deadlines",
      icon: TrendingUp,
      className: "bg-foreground text-background",
      iconBg: "bg-background/20",
      arrowBg: "bg-background text-foreground",
    },
    {
      stat: "60% Less",
      desc: "Team Burnout",
      icon: Smile,
      className: "bg-secondary text-secondary-foreground",
      iconBg: "bg-secondary-foreground/10",
      arrowBg: "bg-secondary-foreground text-secondary",
    },
    {
      stat: "100% Real-time",
      desc: "Project Visibility",
      icon: Eye,
      className: "bg-card text-card-foreground border",
      iconBg: "bg-muted",
      arrowBg: "bg-foreground text-background",
    },
  ]

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-border bg-background overflow-hidden">
      <div className="relative max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4 text-left">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            The Huzlr Impact
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Real outcomes driven by autonomous delivery intelligence.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <Card
                key={idx}
                className={`group relative p-6 border-0 ${benefit.className} rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform duration-200`}
              >
                <CardContent className="p-0 space-y-6">
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 rounded-xl ${benefit.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={20} strokeWidth={2} />
                    </div>
                    <div className={`w-8 h-8 rounded-full ${benefit.arrowBg} flex items-center justify-center`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xl font-bold tracking-tight">
                      {benefit.stat}
                    </div>
                    <p className="text-xs opacity-80">
                      {benefit.desc}
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
