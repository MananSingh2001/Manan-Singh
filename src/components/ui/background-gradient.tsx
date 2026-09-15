"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

export function BackgroundGradient({ children, className, containerClassName, animate = true }: { children?: React.ReactNode; className?: string; containerClassName?: string; animate?: boolean }) {
  return <div className={cn("background-gradient-wrap", containerClassName)}><motion.div className="background-gradient-glow" animate={animate ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] } : undefined} transition={animate ? { duration: 5, repeat: Infinity, repeatType: "reverse" } : undefined} /><div className={cn("background-gradient-surface", className)}>{children}</div></div>;
}
