"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export interface ShowcaseItemProps {
  index: number;
  total: number;
  slug: string;
  category: string;
  title: string;
  description: string;
  specs: string[];
  videoSrc: string;
  posterSrc: string;
  reverse?: boolean; // false = video left / text right, true = video right / text left
}

export function ShowcaseItem({
  index,
  total,
  slug,
  category,
  title,
  description,
  specs,
  videoSrc,
  posterSrc,
  reverse = false,
}: ShowcaseItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ============================================================
  // TIMELINE ARCHITECTURE:
  // 0.00 - 0.20: PURE VIDEO. NO TITLES. ZERO TEXT OVERLAY.
  // 0.20 - 0.50: Video scales and moves out of the way.
  // 0.50 - 0.70: Titles and editorial content arrive in the cleared space.
  // 0.70 - 0.88: Reading lock.
  // 0.88 - 1.00: Exit & cover.
  // ============================================================

  // DESKTOP TRANSFORMS (>= 768px Viewports)
  const desktopVideoWidth = useTransform(
    scrollYProgress,
    [0.18, 0.48],
    ["100vw", "48vw"]
  );
  const desktopVideoHeight = useTransform(
    scrollYProgress,
    [0.18, 0.48],
    ["100vh", "65vh"]
  );
  const desktopVideoRadius = useTransform(
    scrollYProgress,
    [0.18, 0.48],
    ["0px", "16px"]
  );
  const desktopVideoX = useTransform(
    scrollYProgress,
    [0.18, 0.48],
    ["0vw", reverse ? "24vw" : "-24vw"]
  );

  // Desktop Content: ONLY fades in AFTER the video has moved out of the way
  const desktopContentOpacity = useTransform(
    scrollYProgress,
    [0.48, 0.68],
    [0, 1]
  );
  const desktopContentY = useTransform(
    scrollYProgress,
    [0.48, 0.68],
    [50, 0]
  );
  const desktopContentDisplay = useTransform(scrollYProgress, (val) =>
    val < 0.42 ? "none" : "flex"
  );

  // MOBILE TRANSFORMS (< 768px Anamorphic Screening Room)
  const mobileVideoScale = useTransform(
    scrollYProgress,
    [0.18, 0.48],
    [1.0, 0.88]
  );
  const mobileVideoRadius = useTransform(
    scrollYProgress,
    [0.18, 0.48],
    [0, 16]
  );
  const mobileVideoY = useTransform(
    scrollYProgress,
    [0.18, 0.48],
    ["0dvh", "-14dvh"]
  );
  const mobileVideoBorder = useTransform(
    scrollYProgress,
    [0.18, 0.48],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.12)"]
  );

  // Mobile Content: ONLY fades in AFTER the video has recessed upward
  const mobileContentOpacity = useTransform(
    scrollYProgress,
    [0.48, 0.68],
    [0, 1]
  );
  const mobileContentY = useTransform(
    scrollYProgress,
    [0.48, 0.68],
    [50, 0]
  );
  const mobileContentDisplay = useTransform(scrollYProgress, (val) =>
    val < 0.42 ? "none" : "flex"
  );

  // Minimal Scroll Indicator (Fades out immediately as user scrolls)
  const scrollPromptOpacity = useTransform(
    scrollYProgress,
    [0.02, 0.15],
    [1, 0]
  );

  // Exit & Cover Scale (0.88 -> 1.00)
  const stageScale = useTransform(scrollYProgress, [0.88, 1.0], [1, 0.96]);

  return (
    <div
      ref={containerRef}
      className="relative h-[260vh] md:h-[300vh] w-full"
      style={{ zIndex: index + 10 }}
    >
      {/* Sticky Canvas Frame */}
      <motion.div
        style={{ scale: stageScale }}
        className="sticky top-0 h-[100dvh] w-screen max-w-full overflow-hidden bg-[#050A1A] flex flex-col justify-center items-center px-0 select-none"
      >
        {/* Ambient Film Grain & Radial Backdrop */}
        <div className="absolute inset-0 pointer-events-none z-0 bg-radial from-transparent via-[#050A1A]/30 to-[#050A1A]/85" />

        {/* Minimal Scroll Hint at the very bottom edge (Fades out immediately upon first scroll) */}
        <motion.div
          style={{ opacity: scrollPromptOpacity }}
          className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-30 flex justify-center pointer-events-none"
        >
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-slate-400/80 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            Scroll to Direct ↓
          </span>
        </motion.div>

        {isDesktop ? (
          // ==========================================================
          // DESKTOP LAYOUT (>= 768px)
          // ==========================================================
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Morphing Video Player (Starts 100% Clean Full-Bleed, Zero Titles) */}
            <motion.div
              style={{
                width: desktopVideoWidth,
                height: desktopVideoHeight,
                borderRadius: desktopVideoRadius,
                x: desktopVideoX,
              }}
              className="relative overflow-hidden shadow-2xl border border-white/10 will-change-transform transform-gpu z-10 bg-canvas-surface"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={posterSrc}
                className="w-full h-full object-cover object-center"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            </motion.div>

            {/* Editorial Content: ONLY appears when scrolling down, on the opposite side */}
            <motion.div
              style={{
                opacity: desktopContentOpacity,
                y: desktopContentY,
                x: reverse ? "-24vw" : "24vw",
                display: desktopContentDisplay,
              }}
              className="absolute z-20 pointer-events-auto w-[42vw] max-w-xl flex flex-col justify-center text-left"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E575] mb-2 block font-semibold">
                {category}
              </span>

              {/* Monospace Spec Pills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {specs.map((spec) => (
                  <span
                    key={spec}
                    className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider px-2.5 py-1 bg-[#0A112A] border border-white/10 text-slate-300 rounded shadow-sm"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Title: Reveals cleanly in the open space */}
              <h3 className="text-3xl md:text-5xl font-bold font-display text-[#EDEDED] tracking-tight mb-4 leading-tight">
                {title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 font-sans">
                {description}
              </p>

              {/* Action CTA */}
              <Link
                href={`/work/${slug}`}
                className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#EDEDED] text-[#050A1A] font-semibold text-xs uppercase tracking-wider hover:bg-[#00E575] hover:text-[#050A1A] transition-all duration-300 shadow-lg cursor-pointer group"
              >
                <span>Explore Sector</span>
                <span className="group-hover:translate-x-0.5 transition-transform font-mono">
                  [ + ]
                </span>
              </Link>
            </motion.div>
          </div>
        ) : (
          // ==========================================================
          // MOBILE ANAMORPHIC SCREENING ROOM (< 768px Viewports)
          // ==========================================================
          <div className="relative w-full h-full flex flex-col justify-center items-center px-0">
            {/* Ambient Glow behind the video */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25 blur-3xl">
              <div className="w-[80vw] h-[45vw] bg-gradient-to-tr from-[#1E3A8A] to-[#00E575] rounded-full" />
            </div>

            {/* 16:9 Cinematic Video Container (Edge-to-Edge 100vw, Zero Cropping, Zero Titles) */}
            <motion.div
              style={{
                scale: mobileVideoScale,
                borderRadius: mobileVideoRadius,
                borderColor: mobileVideoBorder,
                y: mobileVideoY,
              }}
              className="relative z-10 w-full aspect-video overflow-hidden border shadow-2xl transition-shadow bg-canvas-surface"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={posterSrc}
                className="w-full h-full object-cover object-center"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            </motion.div>

            {/* Editorial Content: ONLY appears when scrolling down, in the space below */}
            <motion.div
              style={{
                opacity: mobileContentOpacity,
                y: mobileContentY,
                display: mobileContentDisplay,
              }}
              className="absolute bottom-8 left-6 right-6 z-20 flex flex-col gap-3 pointer-events-auto text-left"
            >
              <span className="font-mono text-[10px] text-[#00E575] tracking-widest uppercase flex items-center gap-1.5 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E575] animate-pulse" />
                {category}
              </span>

              {/* Specs Pills */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {specs.map((spec: string) => (
                  <span
                    key={spec}
                    className="shrink-0 font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 bg-white/5 border border-white/10 text-slate-300 rounded"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Title: Appears in the cleared space below */}
              <h3 className="text-2xl font-bold font-display text-[#EDEDED] tracking-tight leading-snug">
                {title}
              </h3>

              {/* Description */}
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 font-sans">
                {description}
              </p>

              {/* Primary CTA */}
              <Link
                href={`/work/${slug}`}
                className="w-full mt-2 h-[46px] rounded-full bg-[#EDEDED] text-[#050A1A] font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 active:bg-[#00E575] hover:bg-[#00E575] transition-colors cursor-pointer"
              >
                <span>View Production Specs</span>
                <span className="font-mono">[ + ]</span>
              </Link>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
