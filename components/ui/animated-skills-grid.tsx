"use client";

import {Code2, Server, Smartphone, ShoppingCart, Plug, Rocket, Wrench, BarChart3, Sparkles, Database} from "lucide-react";
import SectionHeader from "@/components/landing-page/section-header";

const skillCategories: {
  title: string;
  icon: typeof Code2;
  items: string[];
}[] = [
  {
    title: "Frontend development",
    icon: Code2,
    items: [
      "React.js",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "Chakra UI",
      "Material UI",
      "Responsive design",
      "Mobile-first development",
    ],
  },
  {
    title: "Backend development",
    icon: Server,
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "GraphQL",
      "Prisma ORM",
      "Authentication systems",
      "RBAC",
      "Webhooks",
    ],
  },
  {
    title: "Mobile development",
    icon: Smartphone,
    items: ["React Native", "Expo"],
  },
  {
    title: "Databases",
    icon: Database,
    items: ["PostgreSQL", "SQL"],
  },
  {
    title: "API & integrations",
    icon: Plug,
    items: [
      "Stripe API",
      "Shopify API",
      "Shopify GraphQL",
      "HubSpot API",
      "ClickUp API",
      "Hostaway API",
      "Microsoft Graph API",
      "Azure Blob Storage",
      "REST APIs",
      "Webhooks",
    ],
  },
  {
    title: "DevOps & deployment",
    icon: Rocket,
    items: ["Docker", "GitHub Actions", "PM2", "Nginx", "Vercel", "CI/CD pipelines"],
  },
  {
    title: "Ecommerce (Shopify & more)",
    icon: ShoppingCart,
    items: [
      "Shopify",
      "Shopify Liquid",
      "Shopify theme development",
      "Shopify 2.0",
      "Metafields",
      "JSON templates",
      "Shopify custom sections",
      "Ecommerce integrations",
      "Squarespace",
    ],
  },
  {
    title: "Development tools",
    icon: Wrench,
    items: ["Git", "GitHub", "Postman", "Figma", "VS Code", "Cursor AI", "Claude AI", "ChatGPT"],
  },
  {
    title: "Analytics & tracking",
    icon: BarChart3,
    items: ["Google Analytics", "GA4", "Google Tag Manager", "Meta Pixel", "Conversion tracking"],
  },
  {
    title: "Automation & productivity",
    icon: Sparkles,
    items: ["API automation", "Workflow automation", "Business process automation", "AI-assisted development"],
  },
];

export function AnimatedSkillsGrid() {
  return (
    <div id="skills" className="my-20 scroll-mt-24 space-y-10">
      <SectionHeader
        eyebrow="Stack"
        title="Technical"
        titleAccent="skills"
        description="Hands-on depth across the stack—shipping UI, APIs, data, deployment, and automation—with measurable outcomes on performance, reliability, and time-to-release. Shopify and ecommerce tooling when the roadmap includes a storefront."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {skillCategories.map(({title, icon: Icon, items}) => (
          <div
            key={title}
            className="group rounded-2xl border border-border/90 bg-gradient-to-br from-card to-muted/15 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 dark:to-muted/10">
            <div className="flex items-center gap-3 mb-4">
              <Icon className="h-6 w-6 text-primary shrink-0" aria-hidden />
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            </div>
            <ul className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <li
                  key={skill}
                  className="text-xs sm:text-sm font-medium rounded-md bg-muted px-2.5 py-1.5 text-foreground border border-border/80">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
