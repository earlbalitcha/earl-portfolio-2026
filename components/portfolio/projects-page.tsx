"use client";

import Header from "@/components/landing-page/header";
import Footer from "@/components/landing-page/footer";
import SectionHeader from "@/components/landing-page/section-header";
import PortfolioMasonryGridFinal from "./portfolio-masonry-grid-final";
import type {PortfolioItem} from "@/utils/csv-parser";

interface ProjectsPageProps {
  initialData: PortfolioItem[];
}

export default function ProjectsPage({initialData}: ProjectsPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-44 bg-gradient-to-b from-primary/[0.12] to-transparent dark:from-primary/10"
          aria-hidden
        />
        <div className="container relative z-10 pb-20 pt-10 md:pb-24 md:pt-14">
          <SectionHeader
            eyebrow="Archive"
            title="All"
            titleAccent="projects"
            description="Case studies and shipped work—React, Next.js, and Node.js apps, dashboards, APIs, automation, and internal tools—with Shopify and ecommerce examples where they apply. Open a card for details."
          />

          <div className="mt-10 md:mt-12">
            <PortfolioMasonryGridFinal items={initialData} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
