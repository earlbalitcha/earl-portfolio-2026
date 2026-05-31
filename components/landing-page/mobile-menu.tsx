"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"
import { useTheme } from "next-themes"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()

  // Ensure component is mounted before rendering theme-dependent elements
  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkMode = mounted && resolvedTheme === "dark"

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Determine which logo to show based on theme
  const logoSrc = isDarkMode ? "/logo-light.png" : "/logo-dark.png"

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 md:hidden" style={{ display: isOpen ? "block" : "none" }}>
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-background shadow-xl overflow-y-auto"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border bg-background">
          <Link href="/" className="flex items-center" onClick={onClose}>
            {mounted ? (
              <Image
                src={logoSrc || "/placeholder.svg"}
                alt="Earl Balitcha — portfolio"
                width={150}
                height={40}
                className="h-8 w-auto"
              />
            ) : (
              <div className="h-8 w-[150px]" />
            )}
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-muted-foreground" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                className={`flex items-center rounded-lg px-4 py-3 text-base ${
                  pathname === "/"
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-accent"
                }`}
                onClick={onClose}>
                Home
              </Link>
            </li>
            {[
              {href: "/#about", label: "About"},
              {href: "/#shopify", label: "Shopify"},
              {href: "/#experience", label: "Experience"},
              {href: "/#projects", label: "Work"},
              {href: "/#skills", label: "Skills"},
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center rounded-lg px-4 py-3 text-base text-foreground hover:bg-accent"
                  onClick={onClose}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/projects"
                className={`flex items-center rounded-lg px-4 py-3 text-base ${
                  pathname === "/projects" || pathname?.startsWith("/projects/")
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-accent"
                }`}
                onClick={onClose}>
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/start"
                className={`flex items-center rounded-lg px-4 py-3 text-base ${
                  pathname === "/start"
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-accent"
                }`}
                onClick={onClose}>
                Start a project
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-4 border-t border-border p-4">
          <Link
            href="/#contact"
            className="flex w-full items-center justify-center rounded-full bg-primary px-4 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:opacity-95"
            onClick={onClose}>
            Contact
          </Link>
        </div>
      </div>
    </div>
  )
}
