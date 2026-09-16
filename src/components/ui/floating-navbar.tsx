"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

export function FloatingNav({ navItems, className }: { navItems: { name: string; link: string; icon?: React.ReactNode }[]; className?: string }) {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const previous = scrollYProgress.getPrevious() ?? 0;
    setVisible(current >= 0.16 && current < previous);
  });
  return <AnimatePresence mode="wait"><motion.nav initial={{ opacity: 0, y: -100 }} animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -100 }} transition={{ duration: .2 }} className={cn("floating-nav", className)} aria-label="Section navigation"><div className="floating-nav-inner">{navItems.map((item) => <a key={item.name} href={item.link}><span className="floating-nav-icon">{item.icon}</span><span className="floating-nav-label">{item.name}</span></a>)}</div></motion.nav></AnimatePresence>;
}
