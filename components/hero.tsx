import { HeroWithMockup } from "@/components/blocks/hero-with-mockup"

export default function Hero() {
  return (
    <HeroWithMockup
      title="Deliver AI-Powered projects in days, not months"
      description="Create sophisticated AI applications with our intuitive platform. No ML expertise required."
      primaryCta={{
        text: "Start Building",
        href: "/signup",
      }}
      secondaryCta={{
        text: "View on GitHub",
        href: "https://github.com/your-ai-platform",
      }}
      mockupImage={{
        alt: "AI Platform Dashboard",
        width: 1248,
        height: 765,
        src: "https://www.launchuicomponents.com/app-light.png"
      }}
    />
  )
}