import { Building, Rocket, User } from "lucide-react"
import { CustomerSegmentCard } from "@/components/customer-segment-card"
import { LogoCloud } from "@/components/logo-cloud"

export function IdealCustomers() {
  const segments = [
    {
      icon: <Building className="h-6 w-6" />,
      title: "Enterprise Teams",
      description:
        "Scale project delivery across multiple teams and departments.",
      features: [
        "Portfolio management",
        "Cross-team dependencies",
        "Executive dashboards",
        "Enterprise integrations",
      ],
      usedBy: "Used by: Microsoft, Salesforce, Adobe",
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Startups &amp; Agencies",
      description: "Move fast without breaking things.",
      features: [
        "Rapid sprint planning",
        "Client project tracking",
        "Resource optimization",
        "Budget forecasting",
      ],
      usedBy: "Used by: Y Combinator startups, agencies",
    },
    {
      icon: <User className="h-6 w-6" />,
      title: "D2C Creators &amp; Solopreneurs",
      description: "Your personal AI project assistant.",
      features: [
        "Solo project management",
        "Content calendar planning",
        "Goal tracking &amp; accountability",
        "Time optimization",
      ],
      usedBy: "Perfect for: Creators, consultants, freelancers",
    },
  ]

  return (
    <section className="border-t border-border bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-lg font-semibold leading-8 text-primary">
              Trusted by Teams at Leading Companies
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              From Fortune 500 enterprises to fast-growing startups
            </p>
          </div>
          <div className="mt-16">
            <LogoCloud />
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {segments.map((segment, idx) => (
              <CustomerSegmentCard key={idx} {...segment} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
