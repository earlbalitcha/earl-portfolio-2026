import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/react"
import "@/components/landing-page/styles.css"
import { Suspense } from "react"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "Earl Gerald R. Balitcha | Full Stack Web Developer",
  description:
    "Full stack web developer in the Philippines with three years of professional experience. I build products with React, Next.js, Node.js, TypeScript, REST and GraphQL APIs, PostgreSQL, auth, and real-time features—plus React Native and Shopify storefronts when the work includes ecommerce.",
  icons: {
    icon: [{ url: "/automatic-favicon-no-bg.png", type: "image/png" }],
    apple: [{ url: "/automatic-favicon-no-bg.png" }],
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <Suspense fallback={null}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="portfolio-theme"
            disableTransitionOnChange>
            {children}
            <Toaster richColors closeButton position="top-center" />
          </ThemeProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
