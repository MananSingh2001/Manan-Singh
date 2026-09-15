"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function LampContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("lamp-container", className)}><div className="lamp-beams" aria-hidden="true"><motion.div initial={{ opacity: .35, width: "15rem" }} whileInView={{ opacity: 1, width: "30rem" }} transition={{ duration: .8, ease: "easeInOut" }} className="lamp-beam lamp-beam-left" /><motion.div initial={{ opacity: .35, width: "15rem" }} whileInView={{ opacity: 1, width: "30rem" }} transition={{ duration: .8, ease: "easeInOut" }} className="lamp-beam lamp-beam-right" /><div className="lamp-haze" /><motion.div initial={{ width: "8rem" }} whileInView={{ width: "16rem" }} transition={{ duration: .8, ease: "easeInOut" }} className="lamp-glow" /><motion.div initial={{ width: "15rem" }} whileInView={{ width: "30rem" }} transition={{ duration: .8, ease: "easeInOut" }} className="lamp-line" /></div><div className="lamp-content">{children}</div></div>;
}
