import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Set NEXT_PUBLIC_SITE_URL to your real deployed URL so social cards use absolute image links.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://manan-singh.vercel.app";
const description =
  "Manan Singh — software engineer building full-stack platforms, backend services, and agentic AI systems. Case study, selected work, and the stack behind it.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Manan Singh — Software Engineer",
    template: "%s · Manan Singh",
  },
  description,
  keywords: [
    "Manan Singh", "software engineer", "full-stack", "agentic AI", "LangGraph",
    "MCP", "RAG", "React", "Next.js", "Node.js", "micro-frontend", "portfolio",
  ],
  authors: [{ name: "Manan Singh", url: "https://github.com/MananSingh2001" }],
  creator: "Manan Singh",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: "Manan Singh",
    title: "Manan Singh — Software Engineer",
    description,
    images: [{ url: "/MANAN%20SINGH.png", width: 500, height: 620, alt: "Manan Singh" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manan Singh — Software Engineer",
    description,
    images: ["/MANAN%20SINGH.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
