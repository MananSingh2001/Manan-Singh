"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "motion/react";
import { IconArrowNarrowRight, IconChevronDown } from "@tabler/icons-react";
import { Vortex } from "@/components/modern/vortex";
import { TechTree } from "@/components/modern/tech-tree";
import { SpotlightCard } from "@/components/modern/spotlight-card";
import { experience, projects, caseStudy } from "@/lib/portfolio-data";

function DiveScene({ progress, index, total, active, children }: {
  progress: MotionValue<number>; index: number; total: number; active: boolean; children: ReactNode;
}) {
  const first = index === 0;
  const last = index === total - 1;
  // Each scene owns a band [s, e]. Most of the band is a stable "hold"
  // (scale 1, opacity 1) so stopping anywhere rests on one clean scene;
  // transitions happen only in the short window `tw` at the band seams.
  const s = index / total;
  const e = (index + 1) / total;
  const tw = 0.055;
  const OUT = 2.2;

  const scaleInput = first ? [e - tw, e] : last ? [s, s + tw] : [s, s + tw, e - tw, e];
  const scaleOutput = first ? [1, OUT] : last ? [0.34, 1] : [0.34, 1, 1, OUT];
  const opacityInput = first ? [e - tw, e] : last ? [s, s + tw] : [s, s + tw, e - tw, e];
  const opacityOutput = first ? [1, 0] : last ? [0, 1] : [0, 1, 1, 0];

  const scale = useTransform(progress, scaleInput, scaleOutput);
  const opacity = useTransform(progress, opacityInput, opacityOutput);
  const visibility = useTransform(opacity, (o) => (o < 0.015 ? "hidden" : "visible"));

  return (
    <motion.div
      className="dive-scene"
      data-active={active}
      inert={active ? undefined : true}
      style={{ scale, opacity, visibility, zIndex: total - index, pointerEvents: active ? "auto" : "none" }}
    >
      <div className="dive-scene-inner">{children}</div>
    </motion.div>
  );
}

export function ModernPortfolio() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  // On phones/tablets, drop the scroll-jacked dive and stack sections normally
  // so nothing gets clipped inside a pinned viewport.
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 820px), (pointer: coarse), (prefers-reduced-motion: reduce)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const scenes: ReactNode[] = [
    // 0 — HERO
    <div className="m-hero" key="hero">
      <span className="m-status"><i />Open to SDE II · L4 roles</span>
      <span className="modern-kicker">Software Engineer — Bengaluru, India</span>
      <h1>Systems that<br /><em>move ideas forward.</em></h1>
      <p>I build production-grade platforms, full-stack products, and agentic AI systems for teams solving difficult problems.</p>
      <div className="m-hero-cta">
        <a className="m-btn m-btn-primary" href="mailto:singhmanan2001@gmail.com">Let&apos;s talk <IconArrowNarrowRight size={18} /></a>
        <a className="m-btn" href="https://github.com/MananSingh2001" target="_blank" rel="noreferrer">GitHub</a>
        <a className="m-btn" href="https://linkedin.com/in/manan-singh-sde" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
      <div className="m-hero-stats"><span><b>3</b> yrs shipping</span><i /><span><b>10+</b> product teams</span><i /><span>MCP registry <b>contributor</b></span></div>
      <div className="m-scroll-hint"><IconChevronDown size={18} /> scroll to dive in</div>
    </div>,

    // 1 — TECH TREE
    <TechTree key="tree" />,

    // 2 — EXPERIENCE
    <div className="m-section" key="exp">
      <div className="m-section-head"><span className="modern-kicker">03 — Experience</span><h2>Built at <em>HCLSoftware.</em></h2><p>Senior Software Engineer I · Oct 2023 — Present · platform &amp; applied-AI engineering for 10+ product teams.</p></div>
      <div className="m-bento">
        {experience.map((e, i) => (
          <div className={`m-glass m-card ${["b-3 b-feature", "b-3", "b-2", "b-2", "b-2", "b-6 b-wide"][i]}`} key={e.title}>
            <span className="m-card-num">0{i + 1}</span>
            <div className="m-card-body"><h3>{e.title}</h3><p>{e.blurb}</p></div>
            <div className="m-card-foot">
              <div className="m-metric"><strong>{e.metric}</strong><span>{e.metricLabel}</span></div>
              <div className="m-chips">{e.tags.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>,

    // 3 — PROJECTS
    <div className="m-section" key="proj">
      <div className="m-section-head"><span className="modern-kicker">04 — Selected work</span><h2>Things I&apos;ve <em>shipped.</em></h2></div>
      <div className="m-bento">
        {projects.map((p, i) => (
          <SpotlightCard className={`m-glass m-card m-proj ${["b-3 b-feature", "b-3", "b-2", "b-2", "b-2", "b-6 b-wide"][i]}`} href={p.repo} key={p.title}>
            <span className="m-card-tag">{p.tag}{p.live && <em> · live</em>}</span>
            <div className="m-card-body"><h3>{p.title}</h3><p>{p.blurb}</p></div>
            <div className="m-card-foot">
              {p.metric && <div className="m-metric"><strong>{p.metric}</strong><span>{p.metricLabel}</span></div>}
              <div className="m-chips">{p.stack.map((t) => <span key={t}>{t}</span>)}</div>
              <span className="m-card-arrow" aria-hidden="true"><IconArrowNarrowRight size={17} /></span>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>,

    // 4 — CASE STUDY
    <div className="m-section m-case" key="case">
      <div className="m-section-head"><span className="modern-kicker">05 — {caseStudy.tag}</span><h2>{caseStudy.title} <em>{caseStudy.titleEm}</em></h2></div>
      <div className="m-glass cs-panel">
        <div className="cs-left">
          <p className="cs-problem">{caseStudy.problem}</p>
          <div className="cs-block">
            <h4>Architecture</h4>
            <div className="cs-flow">{caseStudy.arch.map((s) => <span key={s}>{s}</span>)}</div>
          </div>
          <div className="cs-block">
            <h4>Key decisions</h4>
            <ul className="cs-list">{caseStudy.decisions.map((d) => <li key={d}>{d}</li>)}</ul>
          </div>
        </div>
        <div className="cs-right">
          <div className="cs-metrics">
            {caseStudy.results.map((r) => (
              <div className="cs-metric" key={r.k}><strong>{r.v}</strong><span className="cs-k">{r.k}</span><span className="cs-note">{r.note}</span></div>
            ))}
          </div>
          <p className="cs-caveat">{caseStudy.caveat}</p>
          <div className="cs-block cs-next">
            <h4>What I&apos;d improve next</h4>
            <div className="cs-chips">{caseStudy.next.map((n) => <span key={n}>{n}</span>)}</div>
          </div>
          <div className="cs-links">
            <a className="m-btn m-btn-sm" href={caseStudy.repo} target="_blank" rel="noreferrer">Repo <IconArrowNarrowRight size={15} /></a>
            <a className="m-btn m-btn-sm" href={caseStudy.live} target="_blank" rel="noreferrer">Live demo <IconArrowNarrowRight size={15} /></a>
          </div>
        </div>
      </div>
    </div>,

    // 5 — CONTACT
    <div className="m-contact" key="contact">
      <span className="modern-kicker">06 — Let&apos;s build</span>
      <h2>Have a hard<br /><em>problem?</em></h2>
      <a className="m-mail" href="mailto:singhmanan2001@gmail.com">singhmanan2001@gmail.com <IconArrowNarrowRight size={26} /></a>
      <div className="m-contact-foot"><span>© 2026 Manan Singh</span><span>Open source · MCP registry · npm</span></div>
    </div>,
  ];

  const total = scenes.length;
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(total - 1, Math.max(0, Math.floor(p * total)));
    setActive(idx);
  });

  const jumpTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const start = el.offsetTop;
    const scrollable = el.offsetHeight - window.innerHeight;
    // scroll to the middle of scene i's hold band
    const target = start + ((i + 0.5) / total) * scrollable;
    window.scrollTo({ top: target, behavior: "auto" });
  };

  const labels = ["Intro", "Stack", "Experience", "Work", "Case study", "Contact"];

  return (
    <div className="modern-root">
      <Vortex className="modern-vortex" />
      <div className="modern-veil" />
      <div className="modern-grain" aria-hidden="true" />

      <header className="modern-header">
        <a className="modern-word" href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "auto" }); }}>MANAN SINGH<span>.</span></a>
        <a className="m-btn m-btn-sm" href="mailto:singhmanan2001@gmail.com">Let&apos;s talk</a>
      </header>

      {!compact && (
        <nav className="modern-dots" aria-label="Sections">
          {labels.map((l, i) => (
            <button key={l} className={active === i ? "on" : ""} onClick={() => jumpTo(i)} aria-label={l}><span>{l}</span><i /></button>
          ))}
        </nav>
      )}

      {compact ? (
        <div className="m-flat">
          {scenes.map((node, i) => (
            <section className="m-flat-scene" key={i}><div className="dive-scene-inner">{node}</div></section>
          ))}
        </div>
      ) : (
        <div ref={trackRef} className="dive-track" style={{ height: `${total * 125}vh` }}>
          <div className="dive-sticky">
            {scenes.map((node, i) => (
              <DiveScene key={i} progress={scrollYProgress} index={i} total={total} active={active === i}>{node}</DiveScene>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
