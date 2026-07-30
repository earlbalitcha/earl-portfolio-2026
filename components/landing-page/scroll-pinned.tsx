"use client";

import {useCallback, useEffect, useRef, useState, type ReactNode} from "react";
import {cn} from "@/lib/utils";

/** Scroll distance per item — enough to feel pinned, fast enough to skim */
export const PIN_VH_PER_ITEM = 70;

export function useScrollPinnedIndex(itemCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (itemCount <= 0) return;

    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setActive(0);
        return;
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = scrolled / total;
      const next = Math.min(
        itemCount - 1,
        Math.floor(progress * itemCount + 1e-6),
      );
      setActive((prev) => (prev === next ? prev : next));
    };

    update();
    window.addEventListener("scroll", update, {passive: true});
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [itemCount]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = containerRef.current;
      if (!el || itemCount <= 0) return;
      const total = Math.max(0, el.offsetHeight - window.innerHeight);
      const clamped = Math.max(0, Math.min(itemCount - 1, index));
      const absoluteTop = window.scrollY + el.getBoundingClientRect().top;
      const target = absoluteTop + (total * (clamped + 0.45)) / itemCount;
      window.scrollTo({top: Math.max(0, target), behavior: "smooth"});
    },
    [itemCount],
  );

  return {containerRef, active, scrollToIndex};
}

interface ScrollPinnedProps {
  itemCount: number;
  /** Sits directly above the pinned panel — scrolls as one unit with the content */
  header?: ReactNode;
  children: (ctx: {
    active: number;
    scrollToIndex: (i: number) => void;
  }) => ReactNode;
  className?: string;
}

/**
 * Title + panel stay grouped. The whole block is centered in the viewport while
 * scroll advances items — no floating title separated from the section.
 */
export function ScrollPinned({
  itemCount,
  header,
  children,
  className,
}: ScrollPinnedProps) {
  const {containerRef, active, scrollToIndex} = useScrollPinnedIndex(itemCount);

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{height: `${Math.max(itemCount, 1) * PIN_VH_PER_ITEM}vh`}}>
      <div className="sticky top-0 flex h-[100svh] items-center justify-center">
        <div className="container w-full py-8 md:py-10">
          <div className="mx-auto w-full max-w-6xl">
            {header ? <div className="mb-5 md:mb-6">{header}</div> : null}
            {children({active, scrollToIndex})}
          </div>
        </div>
      </div>
    </div>
  );
}
