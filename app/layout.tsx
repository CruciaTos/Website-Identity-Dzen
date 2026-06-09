import type { ReactNode } from "react";
import { DM_Sans, DM_Serif_Display, IBM_Plex_Mono } from "next/font/google";
import { siteMetadata, structuredData } from "@/lib/metadata";
import "@/app/globals.css";

// ─── Font loading ─────────────────────────────────────────────────────────────
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-mono",
  display: "swap",
});

// ─── Metadata export ──────────────────────────────────────────────────────────
export const metadata = siteMetadata;

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmSerifDisplay.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-bg-primary text-stone-100 font-sans font-light leading-relaxed overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
