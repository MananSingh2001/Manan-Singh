"use client";

import React, { useEffect, useRef } from "react";

export type PixelatedCanvasProps = {
  src: string;
  width?: number;
  height?: number;
  cellSize?: number;
  dotScale?: number;
  className?: string;
  interactive?: boolean;
  distortionStrength?: number;
  distortionRadius?: number;
  tintColor?: string;
  tintStrength?: number;
};

type Sample = { x: number; y: number; color: string; alpha: number; seed: number };

export function PixelatedCanvas({ src, width = 500, height = 620, cellSize = 4, dotScale = .9, className, interactive = true, distortionStrength = 8, distortionRadius = 110, tintColor = "#ffffff", tintStrength = .08 }: PixelatedCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let frame = 0;
    let disposed = false;
    const image = new Image();
    image.src = src;
    image.onload = () => {
      if (disposed) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const context = canvas.getContext("2d");
      if (!context) return;
      context.scale(dpr, dpr);
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const source = offscreen.getContext("2d");
      if (!source) return;
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      source.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
      const pixels = source.getImageData(0, 0, width, height).data;
      const samples: Sample[] = [];
      for (let y = 0; y < height; y += cellSize) {
        for (let x = 0; x < width; x += cellSize) {
          const index = (y * width + x) * 4;
          const r = pixels[index]; const g = pixels[index + 1]; const b = pixels[index + 2]; const alpha = pixels[index + 3] / 255;
          const tint = tintColor === "#ffffff" ? [255, 255, 255] : [255, 255, 255];
          const mix = Math.max(0, Math.min(1, tintStrength));
          samples.push({ x, y, color: `rgb(${Math.round(r * (1 - mix) + tint[0] * mix)}, ${Math.round(g * (1 - mix) + tint[1] * mix)}, ${Math.round(b * (1 - mix) + tint[2] * mix)})`, alpha, seed: Math.random() });
        }
      }
      const pointer = { x: -1000, y: -1000 };
      const move = (event: PointerEvent) => { const bounds = canvas.getBoundingClientRect(); pointer.x = event.clientX - bounds.left; pointer.y = event.clientY - bounds.top; };
      const leave = () => { pointer.x = -1000; pointer.y = -1000; };
      if (interactive) { canvas.addEventListener("pointermove", move); canvas.addEventListener("pointerleave", leave); }
      const draw = (time: number) => {
        if (disposed) return;
        context.clearRect(0, 0, width, height);
        for (const sample of samples) {
          const centerX = sample.x + cellSize / 2; const centerY = sample.y + cellSize / 2;
          const dx = centerX - pointer.x; const dy = centerY - pointer.y; const distance = Math.sqrt(dx * dx + dy * dy); const influence = Math.max(0, 1 - distance / distortionRadius);
          const wave = Math.sin(time * .003 + sample.seed * 20) * influence * 1.5;
          const offsetX = interactive ? (dx / Math.max(distance, 1)) * distortionStrength * influence + wave : 0;
          const offsetY = interactive ? (dy / Math.max(distance, 1)) * distortionStrength * influence + wave : 0;
          context.globalAlpha = sample.alpha;
          context.fillStyle = sample.color;
          const size = Math.max(1, cellSize * dotScale);
          context.fillRect(centerX - size / 2 + offsetX, centerY - size / 2 + offsetY, size, size);
        }
        context.globalAlpha = 1;
        frame = requestAnimationFrame(draw);
      };
      frame = requestAnimationFrame(draw);
      return () => { canvas.removeEventListener("pointermove", move); canvas.removeEventListener("pointerleave", leave); };
    };
    return () => { disposed = true; cancelAnimationFrame(frame); };
  }, [src, width, height, cellSize, dotScale, interactive, distortionStrength, distortionRadius, tintColor, tintStrength]);
  return <canvas ref={canvasRef} className={className} aria-label="Pixelated portrait of Manan Singh" role="img" />;
}
