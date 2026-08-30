import type { Metadata } from "next";

import { SkipBar } from "@/components/sections/skip-bar";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { profile } from "@/lib/content";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.statement,
  keywords: [
    "Nadia Abdel Sater",
    "architecture portfolio",
    "architectural engineer",
    "RIBA Part I",
    "Beirut Arab University",
    "Lebanon architecture",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.statement,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="type-label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-signal focus:px-5 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>
          <SkipBar />
          <main id="main">{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
