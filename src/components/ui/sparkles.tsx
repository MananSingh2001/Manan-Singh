"use client";

import { useEffect, useRef } from "react";

export function SparklesCore({ className = "", particleColor = "#ffffff", particleDensity = 90 }: { className?: string; particleColor?: string; particleDensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let frame = 0;
    let particles: { x: number; y: number; size: number; speed: number; phase: number }[] = [];
    const resize = () => { const dpr = Math.min(window.devicePixelRatio || 1, 2); canvas.width = canvas.clientWidth * dpr; canvas.height = canvas.clientHeight * dpr; context.setTransform(dpr, 0, 0, dpr, 0, 0); particles = Array.from({ length: particleDensity }, (_, index) => ({ x: (index * 83) % canvas.clientWidth, y: (index * 47) % canvas.clientHeight, size: 1 + (index % 3) * .5, speed: .2 + (index % 5) * .08, phase: index })); };
    const draw = (time: number) => { context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight); for (const particle of particles) { const alpha = .25 + (Math.sin(time * .001 * particle.speed + particle.phase) + 1) * .25; context.globalAlpha = alpha; context.fillStyle = particleColor; context.fillRect(particle.x, particle.y, particle.size, particle.size); } context.globalAlpha = 1; frame = requestAnimationFrame(draw); };
    resize(); window.addEventListener("resize", resize); frame = requestAnimationFrame(draw); return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, [particleColor, particleDensity]);
  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
