"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export function MacbookScroll({ title, children, className }: { title?: React.ReactNode; children?: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0.12, 0.38], [-24, 0]);
  const scale = useTransform(scrollYProgress, [0.12, 0.42], [0.72, 1]);
  const lift = useTransform(scrollYProgress, [0.2, 0.55], [120, 0]);
  const opacity = useTransform(scrollYProgress, [0.16, 0.34], [0, 1]);

  return (
    <section ref={ref} className={cn("macbook-stage", className)}>
      <motion.div className="macbook-title" style={{ opacity }}><span>{title}</span></motion.div>
      <motion.div className="macbook-wrap" style={{ rotateX: rotate, scale, y: lift }}>
        <div className="macbook-lid"><div className="macbook-screen"><div className="screen-camera" />{children}</div></div>
        <div className="macbook-base"><div className="keyboard"><div /><div /><div /><div /><div /></div><div className="trackpad" /></div>
      </motion.div>
    </section>
  );
}
