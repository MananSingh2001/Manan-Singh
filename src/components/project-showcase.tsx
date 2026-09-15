"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { BackgroundGradient } from "@/components/ui/background-gradient";

const projects = [
  ["01 / Grounded AI", "Sourcebound", "Node.js + Supabase pgvector RAG assistant with inline citations. Cohere reranking raised hit-rate@5 from 91.9% to 100% and MRR from 0.73 to 0.94.", "https://github.com/MananSingh2001/Sourcebound", "https://sourcebound-one.vercel.app"],
  ["02 / MCP", "figma-react-mcp-server", "Published MCP server exposing Figma design data as tools so agents can generate React components from designs.", "https://github.com/MananSingh2001"],
  ["03 / Contributions", "Open source, upstream.", "Pull requests merged into Vite and the Model Context Protocol registry.", "https://github.com/MananSingh2001"],
  ["04 / Optimization", "Hotel Room Reservation", "React and Vite booking system for 97 rooms across 10 floors using combinatorial search to minimize travel time.", "https://github.com/MananSingh2001/hotel-room-reservation", "https://hotel-room-reservation-beta.vercel.app/"],
  ["05 / Product", "Project Atlas", "Luxury and adventure travel planner built with Next.js, Supabase, Three.js, GSAP, and Mapbox.", "https://github.com/MananSingh2001/project-atlas", "https://travelsite-indol.vercel.app/"],
  ["06 / Identity", "Secure-Nexus IAM", "Keycloak and Auth.js identity dashboard with OIDC federated logout, synchronized SSO, RBAC, and server-side session validation.", "https://github.com/MananSingh2001/secure-IAM"],
  ["07 / Infrastructure", "Nexus Core", "TypeScript Node.js event-processing backend using Express and Redis producer-consumer patterns for asynchronous audit logging.", "https://github.com/MananSingh2001/nexus-core"],
  ["08 / Platform", "Nexus Dashboard Platform", "Registry-driven micro-frontend platform with a Next.js shell, Spring Boot registry, PostgreSQL manifests, runtime widget injection, and API-level RBAC.", "https://github.com/MananSingh2001/nexus-dashboard-platform"],
  ["09 / Agentic AI", "Manan Agent", "Gemini 2.0 Flash multi-agent project-management system with React/Vite, Express, Supabase, GitHub, and Cloud Run.", "https://github.com/MananSingh2001/MananAgent-ProjectMgmt", "https://manan-agent-332997736058.us-central1.run.app"],
] as const;

export function ProjectShowcase() {
  return <section className="showcase-section"><AuroraBackground className="showcase-aurora"><div className="showcase-heading"><p className="eyebrow">05 / Source &amp; projects</p><h2>Everything I&apos;ve<br /><em>built along the way.</em></h2></div><div className="showcase-grid">{projects.map(([label, title, description, repository, live]) => <BackgroundGradient key={title} className="showcase-card"><article><span>{label}</span>{live && <a className="showcase-live" href={live} target="_blank" rel="noreferrer">Live build ↗</a>}<h3>{title}</h3><p>{description}</p><a href={repository} target="_blank" rel="noreferrer">View repository ↗</a>{live && title === "Manan Agent" && <a href={live} target="_blank" rel="noreferrer">Live demo ↗</a>}</article></BackgroundGradient>)}</div></AuroraBackground></section>;
}
