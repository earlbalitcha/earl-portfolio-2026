"use client";

import {useEffect, useRef, useState} from "react";
import {usePathname} from "next/navigation";

type CurtainPhase = "hold" | "open" | "gone";
type CurtainMode = "intro" | "loading";

const TIMINGS = {
  intro: {hold: 1600, total: 2900},
  loading: {hold: 380, total: 1680},
} as const;

/**
 * Horizontal curtain — full intro on first visit, shorter loading curtain on route changes.
 */
export default function IntroCurtain() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<CurtainPhase>("hold");
  const [mode, setMode] = useState<CurtainMode>("intro");
  const hasPlayedIntro = useRef(false);

  useEffect(() => {
    const nextMode: CurtainMode = hasPlayedIntro.current ? "loading" : "intro";
    const {hold, total} = TIMINGS[nextMode];

    setMode(nextMode);
    setPhase("hold");

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const openId = window.setTimeout(() => setPhase("open"), hold);
    const goneId = window.setTimeout(() => {
      setPhase("gone");
      hasPlayedIntro.current = true;
      document.documentElement.style.overflow = prevOverflow;
      document.body.style.overflow = "";
    }, total);

    return () => {
      window.clearTimeout(openId);
      window.clearTimeout(goneId);
      document.documentElement.style.overflow = prevOverflow;
      document.body.style.overflow = "";
    };
  }, [pathname]);

  if (phase === "gone") return null;

  const open = phase === "open";
  const isLoading = mode === "loading";

  return (
    <div
      className="fixed inset-0 z-[9999]"
      style={{pointerEvents: open ? "none" : "auto"}}
      aria-hidden={open}
      aria-live="polite"
      aria-busy={!open}>
      <div
        className="absolute inset-x-0 top-0 z-10 flex h-[50%] items-end justify-center bg-[#101010] will-change-transform"
        style={{
          transform: open ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 1.15s cubic-bezier(0.76, 0, 0.24, 1)",
        }}>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      <div
        className="absolute inset-x-0 bottom-0 z-10 h-[50%] bg-[#101010] will-change-transform"
        style={{
          transform: open ? "translateY(100%)" : "translateY(0)",
          transition: "transform 1.15s cubic-bezier(0.76, 0, 0.24, 1)",
        }}>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6"
        style={{
          opacity: open ? 0 : 1,
          transition: "opacity 0.45s ease",
        }}>
        {isLoading ? (
          <>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
              Loading
            </p>
            <div className="mt-6 h-px w-28 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </>
        ) : (
          <>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
              Portfolio 2026
            </p>
            <h1 className="font-display mt-4 text-center text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              Earl Gerald Balitcha
            </h1>
            <p className="mt-4 text-center text-sm tracking-wide text-white/70 sm:text-lg">
              Full Stack Developer
            </p>
          </>
        )}
      </div>
    </div>
  );
}
