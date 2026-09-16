"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; a: number; r: number; speed: number; hue: number; life: number; max: number };

// Dependency-free swirling "vortex" field. Particles ride a tangential flow
// around the centre with sine-based turbulence, leaving soft trails.
export function Vortex({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 0, h = 0, cx = 0, cy = 0;
    const small = window.innerWidth < 820;
    const lowCore = (navigator.hardwareConcurrency || 4) <= 4;
    const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // scale the particle budget to the device so low-end phones don't choke
    const COUNT = reduce ? 240 : small ? 340 : lowCore ? 520 : 820;
    const particles: Particle[] = [];

    const spawn = (p: Particle) => {
      const r = Math.pow(Math.random(), 0.5) * Math.min(w, h) * 0.62;
      const a = Math.random() * Math.PI * 2;
      p.x = cx + Math.cos(a) * r;
      p.y = cy + Math.sin(a) * r;
      p.a = a;
      p.r = r;
      p.speed = 0.4 + Math.random() * 1.2;
      p.hue = 190 + Math.random() * 80; // cyan -> blue -> violet
      p.max = 120 + Math.random() * 200;
      p.life = Math.random() * p.max;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      cx = w / 2; cy = h / 2;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#05070f";
      ctx.fillRect(0, 0, w, h);
    };

    for (let i = 0; i < COUNT; i++) { const p = {} as Particle; spawn(p); particles.push(p); }
    resize();

    let t = 0;
    const step = () => {
      if (document.hidden) { raf = 0; return; } // pause in background tabs
      t += 0.006;
      // fade previous frame -> trails
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(5,7,15,0.085)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (const p of particles) {
        const dx = p.x - cx, dy = p.y - cy;
        const dist = Math.hypot(dx, dy) || 0.001;
        const base = Math.atan2(dy, dx);
        // tangential swirl + turbulence + gentle inward pull
        const turb = Math.sin(dist * 0.012 + t * 2 + p.a * 1.3) * 0.5;
        const ang = base + Math.PI / 2 + turb;
        const inward = 0.35 + Math.sin(t + dist * 0.01) * 0.15;
        const v = p.speed * (1.1 + (1 - Math.min(dist / (Math.min(w, h) * 0.7), 1)) * 1.6);
        p.x += Math.cos(ang) * v - (dx / dist) * inward;
        p.y += Math.sin(ang) * v - (dy / dist) * inward;
        p.life++;

        const fade = 1 - p.life / p.max;
        const near = 1 - Math.min(dist / (Math.min(w, h) * 0.6), 1);
        const alpha = Math.max(0, fade) * (0.4 + near * 0.55);
        const size = 0.7 + near * 2.1;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 90%, ${58 + near * 18}%, ${alpha})`;
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.max || dist < 6 || p.x < -40 || p.x > w + 40 || p.y < -40 || p.y > h + 40) spawn(p);
      }

      // core glow
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.5);
      g.addColorStop(0, "rgba(130,185,255,0.06)");
      g.addColorStop(0.4, "rgba(110,130,255,0.025)");
      g.addColorStop(1, "rgba(5,7,15,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const onVisibility = () => { if (!document.hidden && !raf) raf = requestAnimationFrame(step); };
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
