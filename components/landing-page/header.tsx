"use client";

import type React from "react";

import {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {Menu} from "lucide-react";
import ThemeToggle from "./theme-toggle";
import {useTheme} from "next-themes";
import MobileMenu from "./mobile-menu";
import {ScrollProgress} from "../ui/scroll-progress";
import {landingProjectsNav, landingScrollNavItems} from "./nav-config";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const {resolvedTheme} = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll, {passive: true});
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/");
  };

  const logoSrc =
    mounted && resolvedTheme === "dark" ? "/darkmode.png" : "/lightmode.png";

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-[box-shadow,background-color,border-color] duration-300 ${
          isScrolled
            ? "border-b border-border/70 bg-background/80 shadow-sm shadow-black/[0.04] backdrop-blur-xl dark:bg-background/75 dark:shadow-black/40"
            : "border-b border-transparent bg-background/35 backdrop-blur-md dark:bg-background/20"
        }`}>
        <div className="container py-3 md:py-3.5">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="flex shrink-0 items-center rounded-lg outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
              onClick={handleLogoClick}>
              {mounted ? (
                <Image
                  src={logoSrc || "/placeholder.svg"}
                  alt="Earl Balitcha — portfolio"
                  width={300}
                  height={50}
                  className="h-11 w-auto md:h-12"
                  priority
                />
              ) : (
                <div className="h-11 w-[220px] md:h-12" aria-hidden />
              )}
            </Link>

            <div className="flex items-center gap-2 md:gap-3">
              <ScrollProgress />

              <nav
                className="hidden items-center rounded-2xl border border-border/60 bg-muted/40 p-1 shadow-inner shadow-black/[0.03] backdrop-blur-sm dark:border-white/[0.08] dark:bg-muted/25 md:flex"
                aria-label="Primary">
                <ul className="flex items-center gap-0.5">
                  {landingScrollNavItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-background/90 hover:text-foreground dark:hover:bg-background/10">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <span className="mx-1 hidden h-5 w-px bg-border/80 sm:block" aria-hidden />
                <Link
                  href={landingProjectsNav.href}
                  className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                    pathname === "/projects" || pathname?.startsWith("/projects/")
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "text-muted-foreground hover:bg-background/90 hover:text-foreground dark:hover:bg-background/10"
                  }`}>
                  {landingProjectsNav.label}
                </Link>
              </nav>

              <div className="flex items-center gap-1 rounded-2xl border border-border/60 bg-muted/30 p-0.5 dark:border-white/[0.08] dark:bg-muted/20">
                <ThemeToggle className="rounded-xl" />
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-muted/30 text-foreground transition-colors hover:bg-muted/50 md:hidden dark:border-white/[0.08]"
                aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
