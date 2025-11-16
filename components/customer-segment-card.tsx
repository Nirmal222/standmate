import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

interface CustomerSegmentCardProps {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  usedBy: string
}

export function CustomerSegmentCard({
  icon,
  title,
  description,
  features,
  usedBy,
}: CustomerSegmentCardProps) {
  return (
    <Card className="flex h-full flex-col rounded-2xl border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardHeader className="flex flex-col items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-110">
          {icon}
        </div>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between">
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 border-t border-border/50 pt-4">
          <p className="text-xs font-medium tracking-wide text-accent">
            {usedBy}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
