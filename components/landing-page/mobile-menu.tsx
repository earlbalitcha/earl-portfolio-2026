"use client";

import {useEffect, useRef} from "react";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {X} from "lucide-react";
import {landingProjectsNav, landingScrollNavItems} from "./nav-config";
import {cn} from "@/lib/utils";
import {navigateToSection} from "@/lib/section-nav";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({isOpen, onClose}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const projectsActive =
    pathname === "/projects" || pathname?.startsWith("/projects/");

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 lg:hidden">
      <div
        ref={menuRef}
        className="fixed inset-y-0 right-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-border bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-4 py-3 pr-[max(1rem,env(safe-area-inset-right))] pt-[max(0.75rem,env(safe-area-inset-top))]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            Menu
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav
          className="flex-1 overflow-y-auto p-3 pb-[max(1rem,env(safe-area-inset-bottom))]"
          aria-label="Primary">
          <ul className="space-y-0.5">
            {landingScrollNavItems.map((item) => (
              <li key={"href" in item ? item.href : item.sectionId}>
                {"href" in item ? (
                  <Link
                    href={item.href}
                    className="block rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    onClick={onClose}>
                    {item.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="block w-full rounded-md px-3 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    onClick={() => {
                      navigateToSection(item.sectionId, pathname, router);
                      onClose();
                    }}>
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
          <Link
            href={landingProjectsNav.href}
            className={cn(
              "mt-4 block rounded-md px-3 py-2.5 text-center text-sm font-semibold transition-colors",
              projectsActive
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-foreground hover:border-primary/40",
            )}
            onClick={onClose}>
            {landingProjectsNav.label}
          </Link>
        </nav>
      </div>
    </div>
  );
}
