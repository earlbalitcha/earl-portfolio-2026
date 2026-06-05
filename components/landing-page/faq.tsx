"use client";

import Link from "next/link";
import {Check} from "lucide-react";
import SectionHeader from "./section-header";

const industries = [
  "SaaS & internal web platforms",
  "Ecommerce & Shopify stores",
  "Hospitality & property management",
  "Operations management & work order systems",
  "CRM & business automation",
  "Marketing sites & lead generation",
];

const whatIBring = [
  "Full-stack web development with React, Next.js, Node.js, and TypeScript—shipping features that map to revenue, retention, or operational savings.",
  "REST and GraphQL APIs, databases, auth, and real-time systems that reduce manual handoffs and support clearer ownership of data.",
  "Shopify and ecommerce expertise (themes, Liquid, integrations) aligned with merchandising and conversion goals.",
  "Strong problem-solving skills",
  "Real-world third-party API integration experience",
  "Enterprise application development",
  "Business process automation",
  "Performance optimization with measurable impact on load time and iteration speed",
  "Mobile-first development",
  "Clean and maintainable code",
  "Ability to work independently",
  "Fast learner and adaptable developer",
];

const surfaceCard =
  "group rounded-2xl border border-border/90 bg-gradient-to-br from-card to-muted/15 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 dark:to-muted/10 md:p-8";

export default function AboutSection() {
  return (
    <section id="about" className="my-20 scroll-mt-24 space-y-10 md:space-y-14">
      <SectionHeader
        eyebrow="Profile"
        title="About"
        titleAccent="me"
        description="Professional summary, background, and the kinds of products and teams I work best with."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className={surfaceCard}>
          <h3 className="text-lg font-semibold text-foreground">
            Professional summary
          </h3>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            <p>
              Full Stack Developer with{" "}
              <span className="font-medium text-foreground">three years</span>{" "}
              of professional experience building scalable web and mobile applications
              with{" "}
              <span className="font-medium text-foreground">
                React.js, Next.js, Node.js, TypeScript, and React Native
              </span>
              .
            </p>
            <p>
              Skilled across frontend and backend—components, data fetching,
              APIs, databases, auth, real-time systems, deployments, and
              automation. That work spans enterprise dashboards and SaaS;{" "}
              <span className="font-medium text-foreground">Shopify</span>{" "}
              (Liquid, themes, integrations) is part of the toolkit when
              projects need ecommerce alongside internal tools.
            </p>
          </div>
        </div>
        <div className={surfaceCard}>
          <h3 className="text-lg font-semibold text-foreground">About me</h3>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            <p>
              Based in the{" "}
              <span className="font-medium text-foreground">Philippines</span>,
              I ship web and mobile apps, ecommerce, dashboards, and
              automation—frontend, backend, integrations, and cloud included.
            </p>
            <p>
              I like turning messy business problems into clear software:
              customer-facing stores, internal tools, API wiring, and fewer
              manual steps.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
        <div className={surfaceCard}>
          <h3 className="text-lg font-semibold text-foreground">Industries</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {industries.map((item) => (
              <li key={item} className="flex gap-2">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={surfaceCard}>
          <h3 className="text-lg font-semibold text-foreground">
            What I bring
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {whatIBring.map((item) => (
              <li key={item} className="flex gap-2">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={surfaceCard}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/90">
            Education & background
          </p>
          <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
            <div>
              <p className="font-semibold text-foreground">Full Stack Developer</p>
              <p className="mt-1">Falcon Global Services</p>
              <p className="mt-1 text-xs text-muted-foreground/90 sm:text-sm">
                2023 – 2026 · Tarlac City
              </p>
            </div>
            <div className="border-t border-border/60 pt-6">
              <p className="font-semibold text-foreground">
                Bachelor of Science in Information Technology
              </p>
              <p className="mt-1">Central Luzon State University</p>
              <p className="mt-1 text-xs text-muted-foreground/90 sm:text-sm">
                2019 – 2023 · Science City of Muñoz, Nueva Ecija
              </p>
            </div>
            <div className="border-t border-border/60 pt-6">
              <p className="font-semibold text-foreground">Secondary</p>
              <p className="mt-1">Victoria National High School</p>
              <p className="mt-1 text-xs text-muted-foreground/90 sm:text-sm">
                2013 – 2019 · Victoria, Tarlac
              </p>
            </div>
            <div className="border-t border-border/60 pt-6">
              <p className="font-semibold text-foreground">Elementary</p>
              <p className="mt-1">Masalasa Elementary School</p>
              <p className="mt-1 text-xs text-muted-foreground/90 sm:text-sm">
                2007 – 2013 · Masalasa, Victoria, Tarlac
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
