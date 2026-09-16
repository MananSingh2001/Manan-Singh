"use client";

import { useEffect, useState } from "react";
import { ClassicPortfolio } from "@/components/classic-portfolio";
import { ModernPortfolio } from "@/components/modern/modern-portfolio";
import { ModeToggle } from "@/components/mode-toggle";

type Mode = "modern" | "classic";

export default function Home() {
  const [mode, setMode] = useState<Mode>("modern");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-mode");
      if (saved === "classic" || saved === "modern") setMode(saved);
    } catch {}
  }, []);

  const toggle = () =>
    setMode((m) => {
      const next: Mode = m === "modern" ? "classic" : "modern";
      try { localStorage.setItem("portfolio-mode", next); } catch {}
      // reset scroll so the incoming layout starts at the top
      window.scrollTo({ top: 0, behavior: "auto" });
      return next;
    });

  return (
    <>
      <ModeToggle mode={mode} onToggle={toggle} />
      {mode === "modern" ? <ModernPortfolio /> : <ClassicPortfolio />}
    </>
  );
}
