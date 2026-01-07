"use client";
import React, { useState } from "react";
import Link from "next/link";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkle, Sparkles, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "./ui/button";

export function Navigation() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-3xl mx-auto z-50 px-4", className)}
    >
      <Menu setActive={setActive}>
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center h-full">
            <span className="text-xl font-bold text-foreground">huzlr.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <MenuItem setActive={setActive} active={active} item="Solutions">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/solutions/engineering">For Engineering Teams</HoveredLink>
                <HoveredLink href="/solutions/product">For Product Managers</HoveredLink>
                <HoveredLink href="/solutions/executives">For Executives</HoveredLink>
                <HoveredLink href="/solutions/agencies">For Agencies</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Features">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/features/planning">Smart Planning</HoveredLink>
                <HoveredLink href="/features/risk">Risk Forecasting</HoveredLink>
                <HoveredLink href="/features/analytics">Team Analytics</HoveredLink>
                <HoveredLink href="/features/integrations">Integrations</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Pricing">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/pricing#starter">Starter</HoveredLink>
                <HoveredLink href="/pricing#professional">Professional</HoveredLink>
                <HoveredLink href="/pricing#team">Team</HoveredLink>
                <HoveredLink href="/pricing#enterprise">Enterprise</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Resources">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/docs">Documentation</HoveredLink>
                <HoveredLink href="/blog">Blog</HoveredLink>
                <HoveredLink href="/case-studies">Case Studies</HoveredLink>
                <HoveredLink href="/api">API Reference</HoveredLink>
              </div>
            </MenuItem>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/signup">
              <Button variant="outline" className="rounded-full cursor-pointer">
                Get started
                <Sparkles className="text-yellow-500 fill-yellow-500" />
              </Button>
            </Link>
            <AnimatedThemeToggler className="h-8 w-8 rounded-full border border-border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-1.5 flex items-center justify-center" />
          </div>

          {/* Mobile Menu - Sheet Component */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button className="p-2" aria-label="Open menu">
                <svg className="h-6 w-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
              <SheetHeader className="pb-6 border-b">
                <div className="flex items-center justify-between w-full">
                  <SheetTitle className="text-left">
                    <span className="text-xl font-bold">huzlr.</span>
                  </SheetTitle>
                  <AnimatedThemeToggler className="h-8 w-8 rounded-full border border-border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-1.5" />
                </div>
              </SheetHeader>

              <div className="mt-6 flex flex-col space-y-2">
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {/* Solutions Accordion */}
                  <AccordionItem value="solutions" className="border-none">
                    <AccordionTrigger className="text-base font-semibold py-4 px-3 hover:bg-accent rounded-lg hover:no-underline">
                      Solutions
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="flex flex-col space-y-1 pl-3 pt-2">
                        <Link href="/solutions/engineering" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 px-3 hover:bg-accent rounded-md" onClick={() => setOpen(false)}>For Engineering Teams</Link>
                        <Link href="/solutions/product" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 px-3 hover:bg-accent rounded-md" onClick={() => setOpen(false)}>For Product Managers</Link>
                        <Link href="/solutions/executives" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 px-3 hover:bg-accent rounded-md" onClick={() => setOpen(false)}>For Executives</Link>
                        <Link href="/solutions/agencies" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 px-3 hover:bg-accent rounded-md" onClick={() => setOpen(false)}>For Agencies</Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Features Accordion */}
                  <AccordionItem value="features" className="border-none">
                    <AccordionTrigger className="text-base font-semibold py-4 px-3 hover:bg-accent rounded-lg hover:no-underline">
                      Features
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="flex flex-col space-y-1 pl-3 pt-2">
                        <Link href="/features/planning" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 px-3 hover:bg-accent rounded-md" onClick={() => setOpen(false)}>Smart Planning</Link>
                        <Link href="/features/risk" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 px-3 hover:bg-accent rounded-md" onClick={() => setOpen(false)}>Risk Forecasting</Link>
                        <Link href="/features/analytics" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 px-3 hover:bg-accent rounded-md" onClick={() => setOpen(false)}>Team Analytics</Link>
                        <Link href="/features/integrations" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 px-3 hover:bg-accent rounded-md" onClick={() => setOpen(false)}>Integrations</Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Pricing Accordion */}
                  <AccordionItem value="pricing" className="border-none">
                    <AccordionTrigger className="text-base font-semibold py-4 px-3 hover:bg-accent rounded-lg hover:no-underline">
                      Pricing
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="flex flex-col space-y-1 pl-3 pt-2">
                        <Link href="/pricing#starter" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 px-3 hover:bg-accent rounded-md" onClick={() => setOpen(false)}>Starter</Link>
                        <Link href="/pricing#professional" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 px-3 hover:bg-accent rounded-md" onClick={() => setOpen(false)}>Professional</Link>
                        <Link href="/pricing#team" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 px-3 hover:bg-accent rounded-md" onClick={() => setOpen(false)}>Team</Link>
                        <Link href="/pricing#enterprise" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 px-3 hover:bg-accent rounded-md" onClick={() => setOpen(false)}>Enterprise</Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Resources Accordion */}
                  <AccordionItem value="resources" className="border-none">
                    <AccordionTrigger className="text-base font-semibold py-4 px-3 hover:bg-accent rounded-lg hover:no-underline">
                      Resources
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="flex flex-col space-y-1 pl-3 pt-2">
                        <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 px-3 hover:bg-accent rounded-md" onClick={() => setOpen(false)}>Documentation</Link>
                        <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 px-3 hover:bg-accent rounded-md" onClick={() => setOpen(false)}>Blog</Link>
                        <Link href="/case-studies" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 px-3 hover:bg-accent rounded-md" onClick={() => setOpen(false)}>Case Studies</Link>
                        <Link href="/api" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 px-3 hover:bg-accent rounded-md" onClick={() => setOpen(false)}>API Reference</Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Mobile CTA */}
                <div className="pt-6 pb-4 px-3">
                  <Link href="/signup" className="w-full block" onClick={() => setOpen(false)}>
                    <button className="w-full bg-secondary text-primary font-semibold px-6 py-3 rounded-3xl hover:opacity-90 transition-opacity">
                      Get started
                    </button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Menu>
    </div>
  );
}
