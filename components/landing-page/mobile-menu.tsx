"use client";

import {useEffect, useRef} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {X} from "lucide-react";
import {landingProjectsNav, landingScrollNavItems} from "./nav-config";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({isOpen, onClose}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 md:hidden" style={{display: isOpen ? "block" : "none"}}>
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-[85%] max-w-sm overflow-y-auto border-l border-border/80 bg-background shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-end border-b border-border/80 bg-background/95 px-4 py-3 pr-[max(1rem,env(safe-area-inset-right))] pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-sm">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-3 pb-[max(1rem,env(safe-area-inset-bottom))]" aria-label="Primary">
          <ul className="space-y-0.5 rounded-2xl border border-border/60 bg-muted/25 p-1 dark:border-white/[0.08] dark:bg-muted/15">
            {landingScrollNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-background/90 hover:text-foreground dark:hover:bg-background/10"
                  onClick={onClose}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="border-t border-border/70 pt-1 dark:border-white/[0.08]">
              <Link
                href={landingProjectsNav.href}
                className={`block rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                  pathname === "/projects" || pathname?.startsWith("/projects/")
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:bg-background/90 hover:text-foreground dark:hover:bg-background/10"
                }`}
                onClick={onClose}>
                {landingProjectsNav.label}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
