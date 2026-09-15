"use client";

import { useEffect, useRef } from "react";

export function CanvasRevealEffect({ active, className = "" }: { active: boolean; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => { const canvas = canvasRef.current; if (!canvas || !active) return; const context = canvas.getContext("2d"); if (!context) return; let frame = 0; const started = performance.now(); const draw = (time: number) => { const elapsed = time - started; context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight); for (let index = 0; index < 70; index++) { const x = (index * 67 + elapsed * .025) % canvas.clientWidth; const y = (index * 41 + Math.sin(elapsed * .002 + index) * 24 + canvas.clientHeight) % canvas.clientHeight; const opacity = Math.max(0, 1 - elapsed / 850); context.globalAlpha = opacity * (.25 + (index % 4) * .12); context.fillStyle = index % 2 ? "#8b5cf6" : "#3b82f6"; context.fillRect(x, y, 2, 2); } context.globalAlpha = 1; if (elapsed < 900) frame = requestAnimationFrame(draw); }; frame = requestAnimationFrame(draw); return () => cancelAnimationFrame(frame); }, [active]);
  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
