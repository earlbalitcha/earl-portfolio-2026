"use client";

import Link from "next/link";
import {Github, Linkedin, Mail} from "lucide-react";

const social = [
  {
    href: "www.linkedin.com/in/earl-gerald-balitcha-a58b73407",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {href: "mailto:earlbalitcha@gmail.com", label: "Email", icon: Mail},
] as const;

const quickLinks = [
  {href: "/", label: "Home"},
  {href: "/projects", label: "Projects"},
  {href: "/#about", label: "About"},
  {href: "/#shopify", label: "Shopify"},
  {href: "/#contact", label: "Contact"},
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/60 bg-gradient-to-b from-muted/35 to-background pt-12 pb-10 dark:from-muted/12 dark:to-background md:pt-14 md:pb-12">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        aria-hidden
      />
      <div className="container">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="max-w-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/90">
              Earl Balitcha
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                Full Stack
              </span>{" "}
              <span className="text-foreground">Developer</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              Web apps, APIs, and dashboards with TypeScript—plus Shopify and
              ecommerce when the scope needs a storefront.
            </p>
            <p className="mt-8 text-xs text-muted-foreground">
              © {year} Earl Gerald R. Balitcha. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10 lg:flex-col lg:items-end">
            <nav aria-label="Footer" className="flex flex-wrap gap-2">
              {quickLinks.map(({href, label}) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-xl border border-border/60 bg-muted/30 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:bg-muted/50 hover:text-foreground dark:border-white/[0.08] dark:bg-muted/20">
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1 rounded-2xl border border-border/60 bg-muted/30 p-1 dark:border-white/[0.08] dark:bg-muted/20">
              {social.map(({href, label, icon: Icon}) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-background/90 hover:text-primary dark:hover:bg-background/10"
                  aria-label={label}>
                  <Icon className="h-5 w-5 shrink-0" aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
