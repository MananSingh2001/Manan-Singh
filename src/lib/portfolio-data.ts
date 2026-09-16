// Shared content for the Modern portfolio experience.
// `icon` maps to a @tabler/icons-react "IconBrand*"/glyph name (resolved in tech-tree.tsx).

export type TechNode = { label: string; icon: string | null };
export type TechBranch = { id: string; title: string; blurb: string; nodes: TechNode[] };

// Tightened to the tools I'd actually defend on a whiteboard (was ~30, now the core).
export const techTree: TechBranch[] = [
  {
    id: "languages",
    title: "Languages",
    blurb: "Typed foundations",
    nodes: [
      { label: "TypeScript", icon: "IconBrandTypescript" },
      { label: "JavaScript", icon: "IconBrandJavascript" },
      { label: "Python", icon: "IconBrandPython" },
      { label: "Java", icon: null },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Interfaces that hold up",
    nodes: [
      { label: "React", icon: "IconBrandReact" },
      { label: "Next.js", icon: "IconBrandNextjs" },
      { label: "Redux Toolkit", icon: null },
      { label: "Tailwind", icon: "IconBrandTailwind" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Data",
    blurb: "The engine room",
    nodes: [
      { label: "Node.js", icon: "IconBrandNodejs" },
      { label: "GraphQL", icon: "IconBrandGraphql" },
      { label: "Spring Boot", icon: null },
      { label: "PostgreSQL", icon: null },
      { label: "Redis", icon: null },
    ],
  },
  {
    id: "ai",
    title: "Agentic AI",
    blurb: "Tools that think",
    nodes: [
      { label: "LangGraph", icon: null },
      { label: "Google ADK", icon: null },
      { label: "MCP servers", icon: null },
      { label: "RAG · pgvector", icon: null },
      { label: "LLM eval", icon: null },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    blurb: "Commit to cloud",
    nodes: [
      { label: "GCP Cloud Run", icon: null },
      { label: "AWS", icon: "IconBrandAws" },
      { label: "Docker", icon: "IconBrandDocker" },
      { label: "GitHub Actions", icon: "IconBrandGithub" },
    ],
  },
  {
    id: "identity",
    title: "Identity",
    blurb: "Trust by default",
    nodes: [
      { label: "Keycloak", icon: null },
      { label: "OIDC / OAuth2", icon: null },
      { label: "JWT / RBAC", icon: null },
    ],
  },
];

export type Experience = { title: string; blurb: string; metric: string; metricLabel: string; tags: string[] };
export const experience: Experience[] = [
  { title: "Micro-frontend platform", blurb: "Architected a registry-driven micro-frontend platform adopted across product teams for independent deployments — a top contributor over its lifetime.", metric: "~3 wks → 1–2 days", metricLabel: "release coordination", tags: ["React", "TypeScript", "Module Federation"] },
  { title: "Agentic AI service", blurb: "Production LangGraph multi-agent service running CI/CD & DevOps ops through MCP tool servers, with Postgres-backed persistence and resume-from-checkpoint for long tasks.", metric: "MCP", metricLabel: "tool-calling agents", tags: ["LangGraph", "Python", "PostgreSQL"] },
  { title: "Enterprise identity", blurb: "Keycloak SSO (OIDC/OAuth2) across 10+ apps with synchronized sessions and server-side RBAC — retired a recurring class of cross-app auth failures.", metric: "10+ apps", metricLabel: "single sign-on", tags: ["Keycloak", "OIDC", "RBAC"] },
  { title: "Backend-for-frontend", blurb: "Node.js/GraphQL BFF aggregating upstream services into one typed schema, replacing per-app REST fan-out and cutting page round trips to one.", metric: "1 round trip", metricLabel: "per page", tags: ["Node.js", "GraphQL"] },
  { title: "Web performance", blurb: "Improved the Next.js shell's Core Web Vitals via server rendering, preloading, route-level code splitting, and shared-dependency de-duplication across federated modules.", metric: "4.2s → 1.7s", metricLabel: "largest contentful paint", tags: ["Next.js", "Core Web Vitals"] },
  { title: "Technical leadership", blurb: "Led a 4-engineer squad shipping real-time CI/CD telemetry dashboards end to end — design reviews, breakdown, review, release — while staying hands-on.", metric: "4-eng squad", metricLabel: "led end to end", tags: ["Leadership", "Delivery"] },
];

export type Project = { tag: string; title: string; blurb: string; repo: string; live?: string; metric?: string; metricLabel?: string; stack: string[] };
export const projects: Project[] = [
  { tag: "MCP", title: "figma-react-mcp-server", blurb: "An MCP server that turns Figma designs into React components — it pulls design tokens and component structure over the Model Context Protocol so an agent can scaffold UI. Published to npm and the official MCP registry.", repo: "https://github.com/MananSingh2001/figma-react-mcp-server", metric: "npm + MCP registry", metricLabel: "published", stack: ["MCP", "npm", "TypeScript"] },
  { tag: "Platform", title: "Nexus Dashboard Platform", blurb: "A micro-frontend platform where a PostgreSQL registry drives runtime widget injection — add a feature without rebuilding the host shell. Next.js shell + Spring Boot registry. My own exploration of the MFE orchestration I work on at scale.", repo: "https://github.com/MananSingh2001/nexus-dashboard-platform", stack: ["Next.js", "Spring Boot", "PostgreSQL"] },
  { tag: "Agentic AI · Google ADK", title: "Google ADK agent series", blurb: "A set of Google ADK agents on Cloud Run: a healthcare-inventory assistant (AlloyDB), a location-intelligence agent over MCP (Maps + Wikipedia), a GitHub-MCP agent, and a text summarizer.", repo: "https://github.com/MananSingh2001/MananAgent-ADK-Project", live: "https://github.com/MananSingh2001?tab=repositories", metric: "5 agents", metricLabel: "on Cloud Run", stack: ["Google ADK", "MCP", "Cloud Run"] },
  { tag: "Agentic AI", title: "Manan Agent", blurb: "Multi-agent project-management system — a Supabase task agent, a GitHub repository agent, and a notes agent behind a React/Vite UI, containerized for Cloud Run.", repo: "https://github.com/MananSingh2001/MananAgent-ProjectMgmt", live: "https://manan-agent-332997736058.us-central1.run.app", stack: ["Gemini", "React", "Cloud Run"] },
  { tag: "Identity", title: "Secure-Nexus IAM", blurb: "An IAM dashboard built to practice the identity patterns I ship at work: OIDC + Keycloak, JWT/RBAC, and synchronized session management with server-side validation.", repo: "https://github.com/MananSingh2001/secure-IAM", stack: ["Keycloak", "OIDC", "RBAC"] },
  { tag: "Infrastructure", title: "Nexus Core", blurb: "An async audit-logging pipeline: a Redis message broker moving 5k+ logs/sec at sub-10ms latency, with a producer/consumer split, Docker infra, and Zod contracts.", repo: "https://github.com/MananSingh2001/nexus-core", metric: "5k+ logs/sec", metricLabel: "sub-10ms latency", stack: ["TypeScript", "Redis", "Docker"] },
];

// Flagship deep-dive. Numbers + caveats taken verbatim from the repo's own eval harness.
export const caseStudy = {
  tag: "Case study · Sourcebound",
  title: "Grounded RAG,",
  titleEm: "measured honestly.",
  repo: "https://github.com/MananSingh2001/Sourcebound",
  live: "https://sourcebound-one.vercel.app",
  problem:
    "Most RAG demos hallucinate and can't say \"I don't know.\" Sourcebound answers strictly from a document corpus, cites every claim back to its source chunk, and refuses honestly when retrieval finds nothing above threshold.",
  arch: [
    "read → chunk (512 / 64 overlap)",
    "embed → pgvector (HNSW index)",
    "query → top-k vector search",
    "Cohere cross-encoder rerank",
    "cited context → LLM answer",
  ],
  decisions: [
    "pgvector over Pinecone — one ACID database, no extra infra at this scale",
    "HNSW over IVFFlat — better recall under ~1M rows for a one-time build cost",
    "OpenRouter + Groq — both OpenAI-compatible, so provider-agnostic model swaps",
  ],
  results: [
    { k: "hit-rate@5", v: "91.9% → 100%", note: "after Cohere rerank" },
    { k: "MRR", v: "0.731 → 0.941", note: "fixes 2nd/3rd-place ranking" },
    { k: "p50 latency", v: "11.2s", note: "p95 15.2s, end-to-end" },
    { k: "false refusals", v: "0%", note: "on the control set" },
  ],
  caveat:
    "Honest scope: these are measured on a 37-pair golden set over an 18-chunk corpus. 100% means the reranker cleanly resolves ordering here — not proof it generalizes at scale. The harness is a regression signal, not a claim of real-world accuracy.",
  next: ["Hybrid keyword + vector search", "Eval in CI (scaffolded)", "Streaming + per-request cost logging"],
};
