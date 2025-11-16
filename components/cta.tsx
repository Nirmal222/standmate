import Link from "next/link"

export function CTA() {
  return (
    <section className="border-t border-border py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8 text-center">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">
            Ready to Transform Your Project Delivery?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join teams delivering projects 10X faster with AI-powered project
            management.
          </p>
        </div>
        <div className="space-y-6 rounded-lg border border-border bg-card p-8">
          <p className="text-lg text-foreground">
            Your projects don&apos;t just get managed — they get intelligently{" "}
            <span className="text-accent">self-optimized</span>.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Link href="/signup">
              <button className="w-full rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground transition hover:opacity-90 sm:w-auto">
                Start Free 14-Day Trial
              </button>
            </Link>
            <p className="text-xs text-muted-foreground">
              No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
