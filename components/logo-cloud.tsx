import Image from "next/image"

type Company = {
  name: string
  src: string
}

export function LogoCloud() {
  const companies: Company[] = [
    { name: "Microsoft", src: "/microsoft.png" },
    { name: "Google", src: "/google.png" },
    { name: "Stripe", src: "/stripe.png" },
    { name: "Slack", src: "/slack.png" },
    { name: "GitHub", src: "/github.png" },
    { name: "Netflix", src: "/netflix.webp" },
    { name: "Vercel", src: "/vercel.svg" },
  ]

  return (
    <div className="w-full py-12">
      <div className="grid w-full grid-cols-7 gap-2 md:gap-8">
        {companies.map((company) => (
          <div
            key={company.name}
            className="flex h-12 w-full items-center justify-center rounded-lg border border-border/50 bg-muted/10 p-2 transition-all duration-300 hover:scale-105 hover:border-border hover:bg-muted/20 sm:h-24 sm:rounded-2xl sm:p-6"
            title={company.name}
          >
            <div className="relative h-full w-full">
              <Image
                src={company.src}
                alt={company.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
