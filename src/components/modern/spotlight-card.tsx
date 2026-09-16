"use client";

import { useRef, type ReactNode } from "react";

// Anchor card with a cursor-following spotlight glow.
export function SpotlightCard({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <a ref={ref} href={href} target="_blank" rel="noreferrer" className={className} onMouseMove={onMove}>
      <span className="spotlight" aria-hidden="true" />
      {children}
    </a>
  );
}
