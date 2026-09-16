"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { projects } from "@/lib/portfolio-data";

export function ProjectShowcase() {
  return (
    <section className="showcase-section">
      <AuroraBackground className="showcase-aurora">
        <div className="showcase-heading">
          <p className="eyebrow">05 / Source &amp; projects</p>
          <h2>Everything I&apos;ve<br /><em>built along the way.</em></h2>
        </div>
        <div className="showcase-grid">
          {projects.map((p) => (
            <BackgroundGradient key={p.title} className="showcase-card">
              <article>
                <span>{p.tag}</span>
                {p.live && <a className="showcase-live" href={p.live} target="_blank" rel="noreferrer">Live ↗</a>}
                <h3>{p.title}</h3>
                <p>{p.blurb}</p>
                <a href={p.repo} target="_blank" rel="noreferrer">View repository ↗</a>
              </article>
            </BackgroundGradient>
          ))}
        </div>
      </AuroraBackground>
    </section>
  );
}
