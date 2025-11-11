import {
  Plug,
  Activity,
  Brain,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import { FeaturesSectionWithHoverEffects } from "@/components/blocks/feature-section-with-hover-effects";

export function HowItWorks() {
  const steps = [
    {
      title: "Connect",
      description:
        "Seamlessly integrate your existing tools via MCP for unified visibility.",
      icon: <Plug size={22} strokeWidth={2} />,
    },
    {
      title: "Monitor",
      description:
        "Continuously track project data and communication across channels.",
      icon: <Activity size={22} strokeWidth={2} />,
    },
    {
      title: "Predict",
      description:
        "Identify timeline drifts and risk factors before they impact delivery.",
      icon: <Brain size={22} strokeWidth={2} />,
    },
    {
      title: "Prevent",
      description:
        "Automate proactive interventions to eliminate blockers in real-time.",
      icon: <ShieldCheck size={22} strokeWidth={2} />,
    },
    {
      title: "Improve",
      description:
        "Enhance performance each cycle through machine learning insights.",
      icon: <BarChart3 size={22} strokeWidth={2} />,
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-border bg-background overflow-hidden">
      <div className="relative max-w-6xl mx-auto space-y-16 text-center">
        {/* Header */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            The <span className="text-accent">Huzlr</span> Delivery Loop
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A continuous intelligence loop designed to connect, predict, and
            improve every delivery cycle.
          </p>
        </div>

        {/* Steps */}
        <FeaturesSectionWithHoverEffects features={steps} />
      </div>
    </section>
  );
}
