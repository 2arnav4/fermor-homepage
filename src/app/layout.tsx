import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Fermor: understand your money, then act on it",
  description:
    "Fermor puts your spending, savings and investments in one clear picture, explains it in plain language, and helps you take the next step. Built for India.",
};

export const viewport: Viewport = {
  themeColor: "#f5f2ea",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${sans.variable} ${serif.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
