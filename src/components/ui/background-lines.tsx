"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const paths = [
  "M720 450C560 360 420 220 80 80",
  "M720 450C500 420 280 390 -20 360",
  "M720 450C580 520 400 690 120 850",
  "M720 450C860 360 1040 210 1400 60",
  "M720 450C930 430 1170 400 1480 350",
  "M720 450C850 540 1080 700 1380 860",
  "M720 450C660 300 650 160 620 -20",
  "M720 450C790 590 820 730 850 930",
  "M720 450C470 300 320 170 180 40",
  "M720 450C970 300 1120 180 1290 20",
];

export function BackgroundLines({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("background-lines", className)}><motion.svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="background-lines-svg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} aria-hidden="true">{paths.map((path, index) => <motion.path key={path} d={path} className="background-line" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: [.08, .4, .08] }} transition={{ duration: 9 + index * .4, repeat: Infinity, delay: index * .35, ease: "linear" }} />)}</motion.svg><div className="background-lines-content">{children}</div></div>;
}
