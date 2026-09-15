"use client";

import { cn } from "@/lib/utils";
import React from "react";

export function AuroraBackground({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("aurora-background", className)}><div className="aurora-layer" aria-hidden="true" />{children}</div>;
}
