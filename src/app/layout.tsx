import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Superpowers — the methodology that gives Claude Code a spine",
  description:
    "A Datasense workshop on obra/superpowers: the skills framework that turns Claude Code from an eager junior into a disciplined engineer. 14 skills, one workflow, zero hand-holding.",
  metadataBase: new URL("https://fnusatvik07.github.io"),
  openGraph: {
    title: "SuperPowers. Give Claude Code a spine.",
    description:
      "14 skills that turn your coding agent from an eager junior into a disciplined engineer. One plugin install. A Datasense workshop.",
    type: "website",
    siteName: "SuperPowers Workshop",
    images: [{ url: "/superpowers-claude/og.svg", width: 1200, height: 630, alt: "SuperPowers - Give Claude Code a spine" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SuperPowers. Give Claude Code a spine.",
    description:
      "14 skills. One plugin install. Better judgment.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
