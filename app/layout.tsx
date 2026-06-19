import "./globals.css";
import type { ReactNode } from "react";
import { Manrope, Newsreader, DM_Mono } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Aging Well — Research Brief",
  description:
    "A current snapshot of the Aging Well evidence review: findings, actions, and open questions.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${newsreader.variable} ${dmMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
