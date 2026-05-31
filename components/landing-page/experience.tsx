"use client";

import {Check, ChevronDown} from "lucide-react";
import SectionHeader from "./section-header";

const responsibilities = [
  "Developed scalable web applications using React.js, Next.js, TypeScript, and Node.js—supporting growth initiatives and faster release cycles for product teams.",
  "Built responsive frontend systems using Tailwind CSS, Bootstrap, Chakra UI, and Material UI, improving consistency and reducing UI rework across releases.",
  "Developed mobile application features using React Native and Expo",
  "Built REST APIs and GraphQL APIs, reducing redundant client requests and clarifying data contracts for frontend consumers.",
  "Managed PostgreSQL databases using Prisma ORM",
  "Implemented authentication and RBAC systems",
  "Built real-time applications using Socket.IO, reducing communication delays and improving operational visibility across dashboards.",
  "Worked on enterprise dashboard systems",
  "Created operational workflow management systems",
  "Integrated multiple third-party services and APIs",
  "Maintained CI/CD deployment pipelines",
  "Managed production deployments and infrastructure",
  "Improved application performance through lazy loading and API optimization, reducing perceived load times by over 40% on key routes.",
  "Maintained Shopify storefronts, Liquid themes, and ecommerce integrations alongside web apps",
];

const majorProjects = [
  {
    title: "Enterprise Operations Dashboard",
    summary:
      "Internal enterprise dashboard for operational management across teams and workflows—with faster access to status and fewer manual follow-ups.",
    features: [
      "User authentication",
      "Role-based access control",
      "Ticketing system",
      "Internal communication tools",
      "Work order management",
      "Real-time updates",
      "Reporting and analytics",
      "Third-party integrations",
    ],
    tech: ["React.js", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Socket.IO"],
  },
  {
    title: "Work Order Automation Platform",
    summary: "Automated work order management to reduce manual operational work and improve visibility.",
    features: [
      "Work order creation",
      "Assignment workflows",
      "Status tracking",
      "Notifications",
      "Reporting dashboards",
      "Process automation",
    ],
    tech: ["React.js", "Next.js", "Node.js", "PostgreSQL", "Socket.IO"],
  },
  {
    title: "Property Management Integration Platform",
    summary:
      "Integrations connecting property management systems and hospitality platforms with internal tooling.",
    integrations: ["Hostaway API", "Stripe API", "CRM systems", "Internal operational systems"],
    features: ["Reservation synchronization", "Payment processing", "Data automation", "Operational reporting"],
    tech: ["React.js", "Next.js", "Node.js", "REST APIs", "Webhooks"],
  },
  {
    title: "Ecommerce & Shopify Development",
    summary:
      "Shopify stores with custom themes, performance work, and integrations—improving storefront clarity and checkout-related conversion paths.",
    features: [
      "Shopify theme customization",
      "Liquid development",
      "Product page customization",
      "Landing page creation",
      "Mobile optimization",
      "Performance optimization",
      "Shopify app integrations",
      "Store maintenance",
      "Responsive design implementation",
    ],
    tech: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "Squarespace Website Development",
    summary: "Business and marketing sites on Squarespace with ongoing maintenance.",
    features: [
      "Landing pages",
      "Business websites",
      "Marketing pages",
      "Responsive design updates",
      "Content management",
      "SEO improvements",
    ],
    tech: ["Squarespace", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "Real-Time Communication Systems",
    summary:
      "Socket.IO–based features for live collaboration and monitoring—reducing stale dashboard data and improving response time for in-app updates.",
    features: ["Live chat systems", "Dashboard updates", "Instant notifications", "Real-time operational monitoring"],
    tech: ["Socket.IO", "Node.js", "React.js", "Next.js"],
  },
];

const surfaceCard =
  "group rounded-2xl border border-border/90 bg-gradient-to-br from-card to-muted/15 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 dark:to-muted/10 md:p-8";

const projectCard =
  "rounded-2xl border border-border/90 bg-gradient-to-br from-card to-muted/15 shadow-md transition-all duration-300 dark:to-muted/10";

export default function ProfessionalExperience() {
  return (
    <section id="experience" className="my-20 scroll-mt-24 space-y-10 md:space-y-14">
      <SectionHeader
        eyebrow="Career"
        title="Professional"
        titleAccent="experience"
        description="Full-time at Falcon Global Services—React and Next.js web apps, Node.js services, dashboards, automation, APIs, and integrations (including ecommerce and Shopify where relevant)."
      />

      <div className={surfaceCard}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/90">Current role</p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">Full Stack Developer</h3>
            <p className="mt-1 text-lg text-muted-foreground">Falcon Global Services</p>
          </div>
          <p className="text-sm font-medium text-muted-foreground sm:pb-0.5">2024 – Present · Philippines</p>
        </div>
      </div>

      <div>
        <h4 className="mb-6 text-lg font-semibold text-foreground">Responsibilities</h4>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {responsibilities.map((r) => (
            <li
              key={r}
              className="flex gap-3 rounded-2xl border border-border/90 bg-muted/20 p-4 text-sm leading-snug text-muted-foreground transition-colors hover:border-primary/25 dark:bg-muted/10">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="mb-6 text-lg font-semibold text-foreground">Major projects</h4>
        <div className="grid grid-cols-1 gap-6">
          {majorProjects.map((project) => (
            <div key={project.title} className={projectCard}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left font-medium text-foreground marker:content-none md:p-6 [&::-webkit-details-marker]:hidden">
                  <span className="pr-2 text-base md:text-lg">{project.title}</span>
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-muted-foreground transition group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <div className="border-t border-border/80 px-5 pb-5 pt-4 md:px-6 md:pb-6">
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{project.summary}</p>
                  {project.integrations ? (
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-foreground">Integrations</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.integrations.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-border/80 bg-muted/40 px-2.5 py-1 text-xs font-medium text-foreground dark:bg-muted/20">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-foreground">Highlights</p>
                    <ul className="mt-2 grid gap-1.5 text-sm text-muted-foreground sm:grid-cols-2 md:text-base">
                      {project.features.map((f) => (
                        <li key={f} className="flex gap-2">
                          <span className="text-primary">·</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border/80 bg-muted px-2.5 py-1.5 text-xs font-medium text-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
