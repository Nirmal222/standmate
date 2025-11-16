import { HeroWithMockup } from "@/components/blocks/hero-with-mockup"

export default function Hero() {
  return (
    <HeroWithMockup
      title="Your AI Project Manager That Delivers 10X Faster"
      description="Autonomous project intelligence that predicts risks, prevents delays, and accelerates delivery—without the management overhead."
      primaryCta={{
        text: "Start Your Free Trial",
        href: "/signup",
      }}
      secondaryCta={{
        text: "See How It Works",
        href: "#how-it-works",
      }}
      mockupImage={{
        alt: "AI Project Manager Dashboard",
        width: 1248,
        height: 765,
        src: "https://www.launchuicomponents.com/app-light.png",
      }}
    />
  )
}
