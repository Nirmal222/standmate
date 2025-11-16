import { Benefits } from "@/components/benefits"
import { CTA } from "@/components/cta"
import { FAQ } from "@/components/faq"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"
import Hero from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { IdealCustomers } from "@/components/ideal-customers"
import { Navigation } from "@/components/navigation"

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Huzlr",
    applicationCategory: "ProjectManagement",
    operatingSystem: "Web",
    description:
      "Autonomous AI project management that predicts risks, prevents delays, and accelerates delivery.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "88",
    },
    offers: {
      "@type": "Offer",
      price: "29.00",
      priceCurrency: "USD",
    },
  }

  return (
    <main className="bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <Hero />
      <IdealCustomers />
      <HowItWorks />
      <Features />
      <Benefits />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
