import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      question: "What is an AI Project Manager?",
      answer:
        "An AI Project Manager, like Huzlr, is an autonomous system that uses artificial intelligence to plan, execute, and oversee projects. It automates administrative tasks, predicts risks, optimizes resources, and provides data-driven insights to accelerate delivery and improve outcomes.",
    },
    {
      question: "How does Huzlr integrate with my existing tools?",
      answer:
        "Huzlr connects to your existing project management tools (like Jira and Asana), communication platforms (like Slack and Teams), and code repositories (like GitHub) through secure APIs. This allows it to gather data and provide insights without disrupting your team's workflow.",
    },
    {
      question: "Is my project data secure?",
      answer:
        "Yes, security is our top priority. We use industry-standard encryption for data at rest and in transit. Huzlr is designed with privacy in mind, and we are compliant with major data protection regulations like GDPR and SOC 2.",
    },
    {
      question: "Can Huzlr be customized for my team's workflow?",
      answer:
        "Absolutely. Huzlr is designed to be flexible. You can configure its settings to match your team's specific methodologies, whether you're using Agile, Scrum, Kanban, or a hybrid approach. The AI learns from your team's patterns to provide increasingly tailored recommendations over time.",
    },
    {
      question: "What kind of ROI can I expect?",
      answer:
        "Teams using Huzlr typically see a significant return on investment through accelerated project timelines (up to 3x faster), reduced budget overruns, and increased team productivity. By automating manual project management tasks, your team can focus on high-value work.",
    },
    {
      question: "Do I need technical expertise to use Huzlr?",
      answer:
        "Not at all. Huzlr is designed with a user-friendly interface that makes it easy for anyone to get started. While it's powerful enough for complex technical projects, it's accessible to non-technical users and project managers.",
    },
  ]

  return (
    <section className="border-t border-border bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Can't find the answer you're looking for? Reach out to our{" "}
            <a href="#" className="font-semibold text-primary">
              customer support
            </a>{" "}
            team.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-4xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
