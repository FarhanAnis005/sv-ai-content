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
  // DESKTOP TRANSFORMS (>= 768px Viewports)
  // ============================================================
  const desktopVideoWidth = useTransform(
    scrollYProgress,
    [0.25, 0.55],
    ["100vw", "48vw"]
  );
  const desktopVideoHeight = useTransform(
    scrollYProgress,
    [0.25, 0.55],
    ["100vh", "65vh"]
  );
  const desktopVideoRadius = useTransform(
    scrollYProgress,
    [0.25, 0.55],
    ["0px", "16px"]
  );
  const desktopVideoX = useTransform(
    scrollYProgress,
    [0.25, 0.55],
    ["0vw", reverse ? "24vw" : "-24vw"]
  );

  const desktopContentOpacity = useTransform(
    scrollYProgress,
    [0.32, 0.55],
    [0, 1]
  );
  const desktopContentY = useTransform(
    scrollYProgress,
    [0.32, 0.55],
    [60, 0]
  );
  const desktopContentDisplay = useTransform(scrollYProgress, (val) =>
    val < 0.22 ? "none" : "flex"
  );

  // ============================================================
  // MOBILE TRANSFORMS (< 768px Anamorphic Screening Room)
  // ============================================================
  const mobileVideoScale = useTransform(
    scrollYProgress,
    [0.25, 0.55],
    [1.0, 0.88]
  );
  const mobileVideoRadius = useTransform(
    scrollYProgress,
    [0.25, 0.55],
    [0, 16]
  );
  const mobileVideoY = useTransform(
    scrollYProgress,
    [0.25, 0.55],
    ["0dvh", "-14dvh"]
  );
  const mobileVideoBorder = useTransform(
    scrollYProgress,
    [0.25, 0.55],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.12)"]
  );

  const mobileHudOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.30],
    [1, 0]
  );

  const mobileContentOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.55],
    [0, 1]
  );
  const mobileContentY = useTransform(
    scrollYProgress,
    [0.35, 0.55],
    [60, 0]
  );
  const mobileContentDisplay = useTransform(scrollYProgress, (val) =>
    val < 0.22 ? "none" : "flex"
  );

  // ============================================================
  // PHASE 4: EXIT & COVER SCALE (0.88 -> 1.00)
  // ============================================================
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

        {isDesktop ? (
          // ==========================================================
          // DESKTOP LAYOUT (>= 768px)
          // ==========================================================
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Morphing Video Player (Starts Full-Bleed, Scales & Shifts) */}
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

              {/* Minimal Live Status Tag */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2 px-3 py-1 rounded-full bg-[#050A1A]/75 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E575] animate-pulse" />
                <span>4K CINEMA MASTER</span>
              </div>
            </motion.div>

            {/* Editorial Content (Reveals on the opposite side on scroll) */}
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

              {/* Title */}
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
            {/* Upper Matte HUD */}
            <motion.div
              style={{ opacity: mobileHudOpacity }}
              className="absolute top-8 left-6 right-6 flex justify-between items-center pointer-events-none z-20"
            >
              <span className="font-mono text-[10px] text-[#00E575] tracking-widest uppercase flex items-center gap-1.5 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E575] animate-pulse" />
                {category}
              </span>
              <span className="font-mono text-[10px] text-slate-400 tracking-wider">
                [ 16:9 DCI MASTER ]
              </span>
            </motion.div>

            {/* Ambient Glow (Eliminates dead letterbox feel) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25 blur-3xl">
              <div className="w-[80vw] h-[45vw] bg-gradient-to-tr from-[#1E3A8A] to-[#00E575] rounded-full" />
            </div>

            {/* 16:9 Cinematic Video Container (Edge-to-Edge 100vw, Zero Cropping) */}
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

            {/* Lower Matte HUD: Prompt */}
            <motion.div
              style={{ opacity: mobileHudOpacity }}
              className="absolute bottom-10 left-0 right-0 text-center pointer-events-none z-20"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                SCROLL TO DIRECT ↓
              </span>
            </motion.div>

            {/* Editorial Content (Revealed in the space below on scroll) */}
            <motion.div
              style={{
                opacity: mobileContentOpacity,
                y: mobileContentY,
                display: mobileContentDisplay,
              }}
              className="absolute bottom-8 left-6 right-6 z-20 flex flex-col gap-3 pointer-events-auto text-left"
            >
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

              {/* Title */}
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
