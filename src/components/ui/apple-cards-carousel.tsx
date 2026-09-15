"use client";

import { useRef, useState } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Terminal } from "@/components/ui/terminal";

export type SkillCard = { label: string; title: string; description: string; skills: string[]; tone: string };

export function Carousel({ items }: { items: SkillCard[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<SkillCard | null>(null);
  const move = (amount: number) => ref.current?.scrollBy({ left: amount, behavior: "smooth" });
  return <div className="apple-carousel"><div ref={ref} className="apple-carousel-track">{items.map((item) => <div className={cn("skill-carousel-card", item.tone)} key={item.label} role="button" tabIndex={0} onClick={() => setActive(item)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setActive(item); }}><span className="card-label">{item.label}</span><h3>{item.title}</h3><p>{item.description}</p><Terminal command="skills --list" output={item.skills.map((skill) => `✔ ${skill}`)} /></div>)}</div><div className="carousel-controls"><button onClick={() => move(-380)} aria-label="Previous skill"><IconArrowNarrowLeft /></button><button onClick={() => move(380)} aria-label="Next skill"><IconArrowNarrowRight /></button></div>{active && <SkillModal card={active} close={() => setActive(null)} />}</div>;
}

function SkillModal({ card, close }: { card: SkillCard; close: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, close);
  return <div className="skill-modal-backdrop"><div ref={ref} className={cn("skill-modal", card.tone)}><button className="modal-close" onClick={close} aria-label="Close skill details"><IconX /></button><span className="card-label">{card.label}</span><h3>{card.title}</h3><p>{card.description}</p><ul className="skill-list skill-list-modal">{card.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></div></div>;
}

export function Card({ card }: { card: SkillCard }) { return <div>{card.title}</div>; }