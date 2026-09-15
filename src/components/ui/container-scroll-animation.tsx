"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function ContainerScroll({ titleComponent, children }: { titleComponent: React.ReactNode; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0.1, 0.45], [12, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.45], [0.88, 1]);
  const translate = useTransform(scrollYProgress, [0.1, 0.45], [70, 0]);
  return <div ref={ref} className="container-scroll"><motion.div className="container-scroll-title" style={{ y: translate }}>{titleComponent}</motion.div><motion.div className="container-scroll-card" style={{ rotateX: rotate, scale, y: translate }}>{children}</motion.div></div>;
}
