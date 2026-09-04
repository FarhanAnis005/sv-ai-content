"use client";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import { Manifesto } from "@/components/Manifesto";
import { Metrics } from "@/components/Metrics";
import { Footer } from "@/components/Footer";
import { DirectCommsWidget } from "@/components/DirectCommsWidget";

export default function Home() {
  const scrollToTerminal = () => {
    const el = document.getElementById("terminal");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative w-full min-h-screen bg-canvas-base text-type-primary flex flex-col">
      {/* Top Navbar */}
      <Header onInitiateClick={scrollToTerminal} />

      {/* Section 1: Zero-Border Hero */}
      <Hero
        onScrollClick={() => {
          const capabilities = document.getElementById("capabilities");
          capabilities?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Section 2: Apple-Style Sticky Scrub Showcase (Zero-Border Morph) */}
      <ShowcaseSection />

      {/* Section 3: Kinetic Manifesto */}
      <Manifesto />

      {/* Section 4: Performance Metrics & Proof Matrix */}
      <Metrics />

      {/* Section 5: Interactive Production Terminal */}
      <Footer />

      {/* Floating Comms Widget: Book a Call or Message */}
      <DirectCommsWidget />
    </main>
  );
}
