import type { Metadata } from "next";
import { Poppins, Cairo } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Arabic coach messages in the leaderboard need an Arabic-capable face. */
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ITLegend Courses",
    template: "%s | ITLegend",
  },
  description: "Watch lessons, track your progress and climb the leaderboard.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${cairo.variable}`}>{children}</body>
    </html>
  );
}
