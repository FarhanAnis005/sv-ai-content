"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Link from "next/link";

interface ShowcaseData {
  slug: string;
  category: string;
  title: string;
  description: string;
  specs: string[];
  videoSrc: string;
  posterSrc: string;
  reverse?: boolean;
}

const SHOWCASE_ITEMS: ShowcaseData[] = [
  {
    slug: "synthetic-humans",
    category: "01 // SYNTHETIC HUMANS",
    title: "Digital Actors. Real Emotion.",
    description: "Photoreal likeness. 32 languages. Zero uncanny valley.",
    specs: ["4K Facial Detail", "Emotion Mapping", "Global Voice"],
    videoSrc: "/videos/unit01-synthetic.mp4",
    posterSrc: "/assets/unit01-poster.jpg",
    reverse: false,
  },
  {
    slug: "neural-environments",
    category: "02 // NEURAL ENVIRONMENTS",
    title: "Worlds Without Maps.",
    description: "Ancient eras to outer orbits. No travel. No permits.",
    specs: ["Neural Depth", "Gaussian Volumes", "Dynamic Sun"],
    videoSrc: "/videos/unit02-environments.mp4",
    posterSrc: "/assets/unit02-poster.jpg",
    reverse: true,
  },
  {
    slug: "dynamic-physics",
    category: "03 // DYNAMIC PHYSICS",
    title: "Controlled Chaos.",
    description:
      "High-velocity destruction and fluid dynamics. Mastered in 8K DCI.",
    specs: ["Fluid Dynamics", "Unreal Engine 5", "8K DCI"],
    videoSrc: "/videos/unit03-physics.mp4",
    posterSrc: "/assets/unit03-poster.jpg",
    reverse: false,
  },
];

interface ShowcaseSlideProps {
  item: ShowcaseData;
  index: number;
  total: number;
  videoY: MotionValue<string>;
  videoScale: MotionValue<number>;
  videoOpacity: MotionValue<number>;
  textY: MotionValue<string>;
  textOpacity: MotionValue<number>;
  isDesktop: boolean;
}

// ============================================================================
// DESKTOP SLIDE (>= 768px): Monumental Widescreen Cinema Theater
// ============================================================================
function DesktopShowcaseSlide({
  item,
  index,
  total,
  videoY,
  videoScale,
  videoOpacity,
  textY,
  textOpacity,
}: Omit<ShowcaseSlideProps, "isDesktop">) {
  return (
    <div className="relative z-10 w-full mx-auto px-8 lg:px-12 flex flex-col justify-center items-center pointer-events-auto h-full py-6 lg:py-8">
      {/* 1. TOP STAGE: Eyebrow, Master Headline & Live Codec Badge */}
      <motion.div
        style={{
          y: textY,
          opacity: textOpacity,
        }}
        className="w-full max-w-[min(1152px,calc((100dvh-190px)*16/9))] flex items-end justify-between mb-3 lg:mb-4 will-change-transform transform-gpu"
      >
        <div className="flex flex-col gap-1 text-left">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E575] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E575] font-semibold">
              {item.category}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[#EDEDED] tracking-tight leading-none mt-0.5">
            {item.title}
          </h3>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
          <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[#00E575] text-[11px] font-semibold tracking-wider">
            4K DCI MASTER
          </span>
          <span className="text-slate-500">0{index + 1} // 0{total}</span>
        </div>
      </motion.div>

      {/* 2. CENTER STAGE: Monumental 16:9 Cinema Monitor */}
      <motion.div
        style={{
          y: videoY,
          scale: videoScale,
          opacity: videoOpacity,
        }}
        className="relative w-full max-w-[min(1152px,calc((100dvh-190px)*16/9))] aspect-video rounded-2xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] border border-white/15 bg-canvas-surface group will-change-transform transform-gpu my-1"
      >
        {/* Ambient Bloom Backdrop */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
          <div className="w-[115%] h-[115%] bg-gradient-to-tr from-[#1E3A8A]/50 via-[#00E575]/25 to-transparent rounded-full blur-3xl opacity-60 transform-gpu" />
        </div>

        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={item.posterSrc}
          className="w-full h-full object-cover object-center"
        >
          <source src={item.videoSrc} type="video/mp4" />
        </video>

        {/* Live HUD Badges */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050A1A]/85 backdrop-blur-md border border-white/10 text-xs font-mono text-white/90">
          <span className="w-2 h-2 rounded-full bg-[#00E575] animate-pulse" />
          <span>NEURAL RENDER // 4K</span>
        </div>

        <div className="absolute bottom-4 right-4 z-20 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050A1A]/85 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300">
          <span>60 FPS • PRORES 4444</span>
        </div>
      </motion.div>

      {/* 3. BOTTOM STAGE: Studio Telemetry & Action Bar */}
      <motion.div
        style={{
          y: textY,
          opacity: textOpacity,
        }}
        className="w-full max-w-[min(1152px,calc((100dvh-190px)*16/9))] flex items-center justify-between mt-3 lg:mt-4 will-change-transform transform-gpu"
      >
        {/* Left: Punchy One-Line Synopsis */}
        <p className="text-slate-300 text-sm lg:text-base font-sans leading-relaxed max-w-md text-left">
          {item.description}
        </p>

        {/* Center: Specs Badges */}
        <div className="flex items-center gap-2">
          {item.specs.map((spec) => (
            <span
              key={spec}
              className="font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 bg-[#0A112A] border border-white/10 text-slate-300 rounded-lg shadow-sm"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Right: Sleek Action Button */}
        <Link
          href={`/work/${item.slug}`}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#EDEDED] text-[#050A1A] font-semibold text-xs uppercase tracking-wider hover:bg-[#00E575] hover:text-[#050A1A] transition-all duration-300 shadow-lg cursor-pointer group"
        >
          <span>Explore Sector</span>
          <span className="group-hover:translate-x-0.5 transition-transform font-mono font-bold">
            [ + ]
          </span>
        </Link>
      </motion.div>
    </div>
  );
}

// ============================================================================
// MOBILE SLIDE (< 768px): Handheld Kinetic Cascade (Zero Dead Space)
// ============================================================================
function MobileShowcaseSlide({
  item,
  index,
  total,
  videoY,
  videoScale,
  videoOpacity,
  textY,
  textOpacity,
}: Omit<ShowcaseSlideProps, "isDesktop">) {
  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center px-4 pt-14 pb-5 z-10 max-w-lg mx-auto pointer-events-auto">
      {/* 1. TOP ZONE: Eyebrow & Master Headline (Floats UP on scroll) */}
      <motion.div
        style={{
          y: textY,
          opacity: textOpacity,
        }}
        className="w-full flex flex-col gap-1 text-left mb-2 z-20 will-change-transform transform-gpu"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] sm:text-xs text-[#00E575] tracking-widest uppercase flex items-center gap-1.5 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E575] animate-pulse" />
            {item.category}
          </span>
          <span className="font-mono text-[10px] text-slate-400 tracking-wider">
            0{index + 1} / 0{total}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#EDEDED] tracking-tight leading-tight mt-0.5">
          {item.title}
        </h3>
      </motion.div>

      {/* 2. CENTER ZONE: Pristine 16:9 Cinema Monitor (Glides UP independently) */}
      <motion.div
        style={{
          y: videoY,
          scale: videoScale,
          opacity: videoOpacity,
        }}
        className="relative w-full aspect-video rounded-[22px] overflow-hidden border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] bg-canvas-surface my-1 z-10 will-change-transform transform-gpu"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
          <div className="w-[85vw] h-[45vw] bg-gradient-to-tr from-[#1E3A8A]/50 via-[#00E575]/30 to-transparent rounded-full blur-3xl opacity-60 transform-gpu" />
        </div>

        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={item.posterSrc}
          className="w-full h-full object-cover object-center"
        >
          <source src={item.videoSrc} type="video/mp4" />
        </video>

        <div className="absolute top-3 left-3 z-20 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#050A1A]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/90">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E575] animate-pulse" />
          <span>4K DCI</span>
        </div>

        <div className="absolute bottom-3 right-3 z-20 pointer-events-none flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#050A1A]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300">
          <span>60 FPS</span>
        </div>
      </motion.div>

      {/* 3. BOTTOM ZONE: Balanced Specs, Synopsis & Action CTA (Floats UP on scroll) */}
      <motion.div
        style={{
          y: textY,
          opacity: textOpacity,
        }}
        className="w-full flex flex-col gap-2.5 mt-2 z-20 text-left will-change-transform transform-gpu"
      >
        <div className="grid grid-cols-3 gap-2 w-full">
          {item.specs.slice(0, 3).map((spec) => (
            <div
              key={spec}
              className="flex items-center justify-center text-center px-1.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-[10px] font-mono uppercase tracking-wider text-slate-300 shadow-sm"
            >
              {spec}
            </div>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2 font-sans">
          {item.description}
        </p>

        <Link
          href={`/work/${item.slug}`}
          className="w-full h-[46px] rounded-full bg-[#EDEDED] text-[#050A1A] font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 active:bg-[#00E575] hover:bg-[#00E575] transition-all shadow-lg cursor-pointer group mt-0.5"
        >
          <span>Explore Sector</span>
          <span className="font-mono font-bold group-hover:translate-x-0.5 transition-transform">
            [ + ]
          </span>
        </Link>

        <div className="flex items-center justify-center gap-2 pt-0.5">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-[#00E575]" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
          <span className="font-mono text-[10px] text-slate-400 ml-1">
            0{index + 1} / 0{total}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function ShowcaseSlide(props: ShowcaseSlideProps) {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
      {props.isDesktop ? (
        <DesktopShowcaseSlide {...props} />
      ) : (
        <MobileShowcaseSlide {...props} />
      )}
    </div>
  );
}

export function ShowcaseSection() {
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

  // Smooth spring physics for weighted, liquid Apple inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    restDelta: 0.001,
  });

  // ============================================================
  // STAGGERED KINETIC CASCADE CHOREOGRAPHY
  //
  // Chapter 0 (Synthetic Humans):
  // • Locked 0.00 -> 0.22
  // • Text 0 floats up & dissolves: 0.20 -> 0.34
  // • Video 0 recedes/dims: 0.26 -> 0.42
  //
  // Chapter 1 (Neural Environments):
  // • Video 1 glides up from bottom: 0.26 -> 0.42
  // • Text 1 docks into place: 0.38 -> 0.48
  // • Locked 0.48 -> 0.64
  // • Text 1 floats up & dissolves: 0.64 -> 0.76
  // • Video 1 recedes/dims: 0.68 -> 0.84
  //
  // Chapter 2 (Dynamic Physics):
  // • Video 2 glides up from bottom: 0.68 -> 0.84
  // • Text 2 docks into place: 0.80 -> 0.90
  // • Locked 0.90 -> 1.00
  // ============================================================

  // Slide 0 Transforms
  const text0Y = useTransform(smoothProgress, [0.20, 0.34], ["0px", "-70px"]);
  const text0Opacity = useTransform(smoothProgress, [0.20, 0.32], [1, 0]);
  const video0Y = useTransform(smoothProgress, [0.26, 0.42], ["0%", "-6%"]);
  const video0Scale = useTransform(smoothProgress, [0.26, 0.42], [1.0, 0.94]);
  const video0Opacity = useTransform(smoothProgress, [0.26, 0.42], [1.0, 0.25]);

  // Slide 1 Transforms
  const video1Y = useTransform(
    smoothProgress,
    [0.26, 0.42, 0.68, 0.84],
    ["100%", "0%", "0%", "-6%"]
  );
  const video1Scale = useTransform(
    smoothProgress,
    [0.26, 0.42, 0.68, 0.84],
    [0.94, 1.0, 1.0, 0.94]
  );
  const video1Opacity = useTransform(
    smoothProgress,
    [0.26, 0.36, 0.68, 0.84],
    [0, 1.0, 1.0, 0.25]
  );
  const text1Y = useTransform(
    smoothProgress,
    [0.38, 0.48, 0.64, 0.76],
    ["50px", "0px", "0px", "-70px"]
  );
  const text1Opacity = useTransform(
    smoothProgress,
    [0.38, 0.46, 0.64, 0.74],
    [0, 1.0, 1.0, 0]
  );

  // Slide 2 Transforms
  const video2Y = useTransform(smoothProgress, [0.68, 0.84], ["100%", "0%"]);
  const video2Scale = useTransform(smoothProgress, [0.68, 0.84], [0.94, 1.0]);
  const video2Opacity = useTransform(smoothProgress, [0.68, 0.78], [0, 1.0]);
  const text2Y = useTransform(smoothProgress, [0.80, 0.90], ["50px", "0px"]);
  const text2Opacity = useTransform(smoothProgress, [0.80, 0.88], [0, 1.0]);

  return (
    <section
      ref={containerRef}
      id="capabilities"
      className="relative h-[350vh] w-full bg-[#050A1A]"
    >
      {/* Pinned Viewport Stage: Stays locked at top: 0 throughout the entire showcase */}
      <div className="sticky top-0 h-[100dvh] w-screen max-w-full overflow-hidden bg-[#050A1A] flex items-center justify-center select-none">
        {/* Ambient Radial Vignette */}
        <div className="absolute inset-0 pointer-events-none z-0 bg-radial from-transparent via-[#050A1A]/30 to-[#050A1A]/85" />

        {/* Slide 0: Synthetic Humans */}
        <ShowcaseSlide
          item={SHOWCASE_ITEMS[0]}
          index={0}
          total={3}
          videoY={video0Y}
          videoScale={video0Scale}
          videoOpacity={video0Opacity}
          textY={text0Y}
          textOpacity={text0Opacity}
          isDesktop={isDesktop}
        />

        {/* Slide 1: Neural Environments */}
        <ShowcaseSlide
          item={SHOWCASE_ITEMS[1]}
          index={1}
          total={3}
          videoY={video1Y}
          videoScale={video1Scale}
          videoOpacity={video1Opacity}
          textY={text1Y}
          textOpacity={text1Opacity}
          isDesktop={isDesktop}
        />

        {/* Slide 2: Dynamic Physics */}
        <ShowcaseSlide
          item={SHOWCASE_ITEMS[2]}
          index={2}
          total={3}
          videoY={video2Y}
          videoScale={video2Scale}
          videoOpacity={video2Opacity}
          textY={text2Y}
          textOpacity={text2Opacity}
          isDesktop={isDesktop}
        />
      </div>
    </section>
  );
}
