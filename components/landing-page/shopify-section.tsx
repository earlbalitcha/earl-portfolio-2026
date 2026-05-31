"use client";

import {Check} from "lucide-react";
import SectionHeader from "./section-header";

const shopifyExperience = [
  "Shopify Online Store 2.0",
  "Liquid development",
  "Custom sections",
  "JSON templates",
  "Metafields",
  "Theme customization",
  "PageFly",
  "Responsive design",
  "Store speed optimization",
  "Product page development",
  "Landing pages",
  "Shopify app integrations",
  "Shopify GraphQL API",
];

const surfaceCard =
  "group rounded-2xl border border-border/90 bg-gradient-to-br from-card to-muted/15 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 dark:to-muted/10 md:p-8";

export default function ShopifySection() {
  return (
    <section id="shopify" className="my-20 scroll-mt-24 space-y-10 md:space-y-14">
      <SectionHeader
        eyebrow="Ecommerce"
        title="Shopify"
        titleAccent="experience"
        description="Hands-on storefront work—Online Store 2.0, Liquid, performance, and integrations—so Shopify-focused teams can see depth at a glance."
      />

      <div className={surfaceCard}>
        <h3 className="text-lg font-semibold text-foreground">Shopify experience</h3>
        <ul className="mt-4 grid grid-cols-1 gap-2.5 text-sm text-muted-foreground sm:grid-cols-2">
          {shopifyExperience.map((item) => (
            <li key={item} className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
