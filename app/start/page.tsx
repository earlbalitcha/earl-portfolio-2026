import Header from "@/components/landing-page/header"
import StartProject from "@/components/landing-page/start-project"
import Footer from "@/components/landing-page/footer"

export const metadata = {
  title: "Start a Project | Earl Gerald R. Balitcha",
  description:
    "Tell me about your web app, ecommerce, dashboard, or integration needs—then we can schedule a follow-up.",
}

export default function StartPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <StartProject />
      <Footer />
    </main>
  )
}
