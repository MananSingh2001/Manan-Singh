"use client";

import { useState } from "react";
import {
  IconBrandTypescript, IconBrandJavascript, IconBrandPython, IconBrandReact,
  IconBrandNextjs, IconBrandTailwind, IconBrandNodejs, IconBrandGraphql,
  IconBrandMongodb, IconBrandAws, IconBrandDocker, IconBrandGithub,
  IconBrandRedux, IconBrandOauth, IconBrandGoogle,
  IconCoffee, IconDatabase, IconLeaf, IconServerBolt, IconPuzzle,
  IconBinaryTree, IconPlugConnected, IconVectorTriangle, IconChartDots,
  IconShip, IconKey, IconShieldLock, IconLock, IconRobot,
} from "@tabler/icons-react";
import { techTree } from "@/lib/portfolio-data";

type IconCmp = React.ComponentType<{ size?: number; stroke?: number }>;

// every node gets a real icon — brand logo where it exists, a fitting glyph otherwise
const ICON: Record<string, IconCmp> = {
  TypeScript: IconBrandTypescript, JavaScript: IconBrandJavascript, Python: IconBrandPython, Java: IconCoffee, SQL: IconDatabase,
  React: IconBrandReact, "Next.js": IconBrandNextjs, "Module Federation": IconPuzzle, "Redux Toolkit": IconBrandRedux, Tailwind: IconBrandTailwind,
  "Node.js": IconBrandNodejs, GraphQL: IconBrandGraphql, "Spring Boot": IconLeaf, PostgreSQL: IconDatabase, Redis: IconServerBolt, MongoDB: IconBrandMongodb,
  LangGraph: IconBinaryTree, "Google ADK": IconRobot, "MCP servers": IconPlugConnected, "RAG · pgvector": IconVectorTriangle, "LLM eval": IconChartDots,
  AWS: IconBrandAws, "GCP Cloud Run": IconBrandGoogle, Docker: IconBrandDocker, Kubernetes: IconShip, "GitHub Actions": IconBrandGithub,
  Keycloak: IconKey, "OIDC / OAuth2": IconBrandOauth, "SSO · RBAC": IconShieldLock, "JWT / RBAC": IconLock, JWT: IconLock,
};

const BRAND: Record<string, string> = {
  TypeScript: "#3b82f6", JavaScript: "#f7df1e", Python: "#4b9fe1", Java: "#e8894a", SQL: "#8fb8dd",
  React: "#61dafb", "Next.js": "#e6edf6", "Module Federation": "#8b7bf0", "Redux Toolkit": "#a06be0", Tailwind: "#38bdf8",
  "Node.js": "#7bc86c", GraphQL: "#e535ab", "Spring Boot": "#6db33f", PostgreSQL: "#5aa3e0", Redis: "#ff6a5c", MongoDB: "#47a248",
  LangGraph: "#8b7bf0", "Google ADK": "#5b9bf3", "MCP servers": "#e0a06a", "RAG · pgvector": "#6fb2ec", "LLM eval": "#8fe0c0",
  AWS: "#ff9d3c", "GCP Cloud Run": "#5b9bf3", Docker: "#3aa0f0", Kubernetes: "#5b8def", "GitHub Actions": "#e6edf6",
  Keycloak: "#6f9ee0", "OIDC / OAuth2": "#6fb2ec", "SSO · RBAC": "#8fe0c0", "JWT / RBAC": "#e07ab0", JWT: "#e07ab0",
};

const ANGLES = [-90, -30, 30, 90, 150, 210];
const RX = 37, RY = 32;
const anchors = ANGLES.map((deg) => {
  const r = (deg * Math.PI) / 180;
  return { x: 50 + Math.cos(r) * RX, y: 50 + Math.sin(r) * RY };
});

export function TechTree() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="tech-tree-wrap">
      <div className="tech-tree-head">
        <span className="modern-kicker">02 — The stack</span>
        <h2>A system <em>grown from many roots.</em></h2>
      </div>

      <div className="tech-tree-stage">
        <div className="tech-orbit" aria-hidden="true" />
        <div className="tech-orbit tech-orbit-2" aria-hidden="true" />

        <svg className="tech-tree-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {anchors.map((a, i) => (
            <line key={i} x1="50" y1="50" x2={a.x} y2={a.y} className={hover === i ? "on" : ""} />
          ))}
        </svg>

        <div className="tech-hub"><span>MS</span></div>

        {techTree.map((branch, i) => (
          <div
            key={branch.id}
            className="tech-branch"
            style={{ left: `${anchors[i].x}%`, top: `${anchors[i].y}%` }}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            <div className="tech-branch-title">{branch.title}</div>
            <div className="tech-tiles">
              {branch.nodes.map((n) => {
                const Icon = ICON[n.label] ?? IconVectorTriangle;
                const brand = BRAND[n.label] ?? "#8fb8dd";
                return (
                  <span className="tech-tile" key={n.label} style={{ "--brand": brand } as React.CSSProperties}>
                    <Icon size={26} stroke={1.7} />
                    <span className="tech-tip">{n.label}</span>
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
