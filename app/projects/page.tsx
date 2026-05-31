import ProjectsPage from "@/components/portfolio/projects-page";
import {fetchPortfolioData} from "@/utils/csv-parser";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Projects | Earl Gerald R. Balitcha",
  description:
    "Shipped work—React, Next.js, Node.js, TypeScript, dashboards, APIs, and integrations—plus ecommerce and Shopify-related builds in the archive.",
};

export default async function Projects() {
  const portfolioData = await fetchPortfolioData();

  return <ProjectsPage initialData={portfolioData} />;
}
