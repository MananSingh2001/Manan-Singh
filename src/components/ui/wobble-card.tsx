"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function WobbleCard({ children, containerClassName, className }: { children: React.ReactNode; containerClassName?: string; className?: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  return <motion.article onMouseMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); setPosition({ x: (event.clientX - (rect.left + rect.width / 2)) / 24, y: (event.clientY - (rect.top + rect.height / 2)) / 24 }); }} onMouseEnter={() => setHovering(true)} onMouseLeave={() => { setHovering(false); setPosition({ x: 0, y: 0 }); }} animate={{ x: hovering ? position.x : 0, y: hovering ? position.y : 0 }} transition={{ duration: .12, ease: "easeOut" }} className={cn("wobble-card", containerClassName)}><div className="wobble-card-surface"><motion.div animate={{ x: hovering ? -position.x : 0, y: hovering ? -position.y : 0, scale: hovering ? 1.015 : 1 }} transition={{ duration: .12, ease: "easeOut" }} className={cn("wobble-card-content", className)}><div className="wobble-noise" />{children}</motion.div></div></motion.article>;
}
