
import { CustomerSegmentCard } from "@/components/customer-segment-card"
import { LogoCloud } from "@/components/logo-cloud"

export function IdealCustomers() {
  const segments = [
    {
      imageSrc: "/placeholder.jpg",
      category: "Enterprise",
      title: "Scale Governance & Security",
      description:
        "Empower your organization with unified portfolio management, advanced security controls, and cross-team dependency tracking. Ensure compliance and alignment at scale.",
      time: "2 hours ago",
      readTime: "5 min read",
    },
    {
      imageSrc: "/placeholder.jpg",
      category: "Startups",
      title: "Move Fast & Iterate",
      description:
        "Accelerate your product cycles with rapid planning tools and resource optimization. Keep your team focused on shipping features while maintaining code quality and velocity.",
      time: "4 hours ago",
      readTime: "4 min read",
    },
    {
      imageSrc: "/placeholder.jpg",
      category: "Agencies",
      title: "Manage Multiple Clients",
      description:
        "Streamline client communication and project delivery. Switch contexts effortlessly between different client workspaces while maintaining a unified view of your agency's performance.",
      time: "6 hours ago",
      readTime: "3 min read",
    },
    {
      imageSrc: "/placeholder.jpg",
      category: "Solopreneurs",
      title: "Your AI Co-founder",
      description:
        "Manage your entire business with an AI partner. From content calendars to product roadmaps, stay accountable and productive without the overhead of a large team.",
      time: "1 day ago",
      readTime: "3 min read",
    },
  ]

  return (
    <section className="border-t border-border bg-background py-16 sm:py-24">
      <div className="w-full">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-lg leading-8 text-foreground">
              Our focus for the next 6 months
            </h2>
            <p className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Building for the modern workforce
            </p>
          </div>
          <div className="mt-4">
            <LogoCloud />
          </div>
        </div>
        <div className="mt-16 flex w-full overflow-hidden py-10">
          <div className="pause-on-hover flex animate-marquee gap-8 pl-8">
            {[...segments, ...segments].map((segment, idx) => (
              <div
                key={idx}
                className="w-[400px] flex-shrink-0 md:w-[800px] h-full"
              >
                <CustomerSegmentCard {...segment} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
