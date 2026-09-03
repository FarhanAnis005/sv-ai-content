import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Storyvord — AI Creative Production Studio",
  description:
    "We combine director-level human artistry with generative neural pipelines to produce cinema-grade visuals for visionary global brands.",
};

export const viewport: Viewport = {
  themeColor: "#050A1A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} bg-canvas-base text-type-primary`}
    >
      <body className="bg-canvas-base text-type-primary font-sans antialiased min-h-screen selection:bg-brand-accent selection:text-canvas-base">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
