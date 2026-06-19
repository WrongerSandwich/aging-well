import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Aging Well — Research Brief",
  description:
    "A current snapshot of the Aging Well evidence review: findings, actions, and open questions.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
