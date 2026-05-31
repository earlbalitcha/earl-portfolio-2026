import Header from "./header";
import Hero from "./hero";
import Projects from "./projects";
import AboutSection from "./faq";
import ShopifySection from "./shopify-section";
import ProfessionalExperience from "./experience";
import CallToAction from "./call-to-action";
import Footer from "./footer";
import ContactFormButton from "./contact-form-button";
import StartProject from "./start-project";
import type {LandingPageProps} from "./types";
import {AnimatedSkillsGrid} from "../ui/animated-skills-grid";

export {
  Header,
  Hero,
  Projects,
  AboutSection,
  ShopifySection,
  ProfessionalExperience,
  CallToAction,
  Footer,
  ContactFormButton,
  StartProject,
};

export default function LandingPage({
  showHeader = true,
  showFooter = true,
}: LandingPageProps) {
  return (
    <main className="relative min-h-screen bg-background">
      {showHeader && <Header />}
      <Hero />
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-gradient-to-b from-primary/[0.12] to-transparent dark:from-primary/10"
          aria-hidden
        />
        <div className="container relative z-10 pt-6">
        <AboutSection />
        <ShopifySection />
        <ProfessionalExperience />
        <Projects />
        <AnimatedSkillsGrid />
        <CallToAction />
        </div>
      </div>
      {showFooter && <Footer />}
    </main>
  );
}
