export function LogoCloud() {
  const companies = [
    { name: "Microsoft", logo: "M" },
    { name: "Google", logo: "G" },
    { name: "Amazon", logo: "A" },
    { name: "Stripe", logo: "S" },
    { name: "Salesforce", logo: "SF" },
    { name: "Adobe", logo: "Ad" },
    { name: "Atlassian", logo: "At" },
    { name: "GitHub", logo: "GH" },
  ]

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center w-full max-w-4xl">
        {companies.map((company) => (
          <div
            key={company.name}
            className="flex items-center justify-center w-24 h-16 text-muted-foreground/40 hover:text-muted-foreground/80 transition-colors duration-300"
            title={company.name}
          >
            <div className="text-3xl font-bold">{company.logo}</div>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Trusted by teams in 50+ countries
      </p>
    </div>
  )
}
