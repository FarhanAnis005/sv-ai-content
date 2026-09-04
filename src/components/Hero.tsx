"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TerminalBadge } from "./TerminalBadge";
import Image from "next/image";

interface HeroProps {
  onScrollClick?: () => void;
}

export function Hero({ onScrollClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Exit Physics: smooth subtle scale down and soft corner rounding
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.7], ["0px", "24px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.95], [1, 0.35]);

  const handleScrollDown = () => {
    if (onScrollClick) {
      onScrollClick();
    } else {
      const nextSection = document.getElementById("capabilities");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-canvas-base select-none"
    >
      {/* Dynamic Animated Motion Container */}
      <motion.div
        style={{ scale, borderRadius, opacity }}
        className="relative w-full h-full overflow-hidden will-change-transform transform-gpu"
      >
        {/* Background Visual Reel: Poster + Video Element */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero-poster.jpg"
            alt="Storyvord AI Creative Production Studio Showreel"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center transform-gpu scale-105"
          />

          {/* High-speed looping simulation video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 w-full h-full object-cover object-center z-10 opacity-75 mix-blend-screen pointer-events-none"
            src="/videos/hero-reel.mp4"
          />
        </div>

        {/* Ambient Film Grain & Atmospheric Gradient Overlays */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-radial from-transparent via-canvas-base/30 to-canvas-base/80" />

        {/* Mobile Gradient Guard: Vertical CSS linear gradient mask across the lower 50% */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] z-20 pointer-events-none bg-gradient-to-t from-canvas-base via-canvas-base/75 to-transparent" />

        {/* Top Vignette for Navbar Legibility */}
        <div className="absolute inset-x-0 top-0 h-40 z-20 pointer-events-none bg-gradient-to-b from-canvas-base/80 to-transparent" />

        {/* Copy Overlay: Anchored Bottom-Left */}
        <div className="absolute bottom-8 sm:bottom-12 left-6 sm:left-12 z-30 max-w-3xl pr-4">
          {/* Eyebrow Badge */}
          <div className="mb-5">
            <TerminalBadge variant="pulse">
              Creative Production Studio
            </TerminalBadge>
          </div>

          {/* Main Headline: Warm, Confident Plus Jakarta Sans */}
          <h1 className="font-display font-bold text-type-primary text-[clamp(2.6rem,6.8vw,6rem)] tracking-tight leading-[0.98] drop-shadow-2xl">
            Neural Vision.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-type-primary via-white to-type-secondary">
              Unconstrained Scale.
            </span>
          </h1>

          {/* Sub-Headline: Clean Editorial Copy */}
          <p className="mt-5 text-type-secondary text-base sm:text-lg leading-relaxed max-w-lg font-sans">
            Cinema beyond physical limits. Directed by artists.
          </p>
        </div>

        {/* Scroll Trigger: Anchored Bottom-Right */}
        <div className="absolute bottom-8 sm:bottom-12 right-6 sm:right-12 z-30">
          <button
            onClick={handleScrollDown}
            className="group flex flex-col items-center gap-2.5 min-h-[44px] cursor-pointer"
            aria-label="Scroll down to explore work"
          >
            <span className="font-sans text-xs font-medium tracking-wide text-type-secondary group-hover:text-brand-accent transition-colors">
              Explore Work
            </span>
            {/* Minimal sleek indicator */}
            <div className="w-7 h-11 rounded-full border border-white/20 flex items-start justify-center p-1.5 group-hover:border-brand-accent/50 transition-colors">
              <div className="w-1 h-2.5 bg-brand-accent rounded-full animate-bounce" />
            </div>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
