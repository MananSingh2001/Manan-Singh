"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function Terminal({ command, output, className }: { command: string; output: string[]; className?: string }) {
  const [text, setText] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setStarted(true); }, { threshold: .2 }); if (ref.current) observer.observe(ref.current); return () => observer.disconnect(); }, []);
  useEffect(() => { if (!started || text.length >= command.length) return; const timeout = setTimeout(() => setText(command.slice(0, text.length + 1)), 32); return () => clearTimeout(timeout); }, [started, text, command]);
  return <div ref={ref} className={cn("terminal-window", className)}><div className="terminal-bar"><i /><i /><i /><span>terminal — bash</span></div><div className="terminal-body"><p><b>manan@dev</b>:<strong>~</strong>$ {text}{text.length < command.length && <em>_</em>}</p>{text.length === command.length && output.map((item) => <p className="terminal-output" key={item}>{item}</p>)}</div></div>;
}
