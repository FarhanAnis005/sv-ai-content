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

interface DesktopShowcaseSlideProps {
  item: ShowcaseData;
  index: number;
  total: number;
  videoX: MotionValue<string>;
  videoScale: MotionValue<number>;
  videoOpacity: MotionValue<number>;
  videoRadius: MotionValue<string>;
  textX: MotionValue<string>;
  textOpacity: MotionValue<number>;
  reverse?: boolean;
}

// ============================================================================
// DESKTOP SLIDE (>= 768px): Full-Screen Edge-to-Edge Start & Kinetic Side Shift
// • Starts: True Full Screen (w-screen h-[100dvh], scale: 1.0, borderRadius: 0px)
// • On Scroll: Scales down to floating card (scale: 0.60), rounds corners (28px),
//   glides to side (x: 22% or -22%)
// • Text Reveal: In the opened space, text fades & glides in
// ============================================================================
function DesktopShowcaseSlide({
  item,
  index,
  total,
  videoX,
  videoScale,
  videoOpacity,
  videoRadius,
  textX,
  textOpacity,
  reverse = false,
}: DesktopShowcaseSlideProps) {
  return (
    <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-auto overflow-hidden">
      {/* 1. EDITORIAL TEXT: Appears in the opened negative space */}
      <motion.div
        style={{
          x: textX,
          opacity: textOpacity,
        }}
        className={`absolute ${
          reverse
            ? "right-10 lg:right-20 text-left"
            : "left-10 lg:left-20 text-left"
        } max-w-md lg:max-w-lg z-20 flex flex-col justify-center will-change-transform transform-gpu`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E575] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E575] font-semibold">
            {item.category}
          </span>
          <span className="font-mono text-xs text-slate-500 ml-2">
            0{index + 1} // 0{total}
          </span>
        </div>

        <h3 className="text-3xl lg:text-5xl font-bold font-display text-[#EDEDED] tracking-tight mb-4 leading-tight">
          {item.title}
        </h3>

        <p className="text-slate-300 text-sm lg:text-base leading-relaxed mb-6 font-sans">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {item.specs.map((spec) => (
            <span
              key={spec}
              className="font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 bg-[#0A112A] border border-white/10 text-slate-300 rounded-lg shadow-sm"
            >
              {spec}
            </span>
          ))}
        </div>

        <Link
          href={`/work/${item.slug}`}
          className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#EDEDED] text-[#050A1A] font-semibold text-xs uppercase tracking-wider hover:bg-[#00E575] hover:text-[#050A1A] transition-all duration-300 shadow-lg cursor-pointer group"
        >
          <span>Explore Sector</span>
          <span className="group-hover:translate-x-0.5 transition-transform font-mono font-bold">
            [ + ]
          </span>
        </Link>
      </motion.div>

      {/* 2. THE CINEMA MONITOR: Starts full-screen edge-to-edge, then shifts to the side */}
      <motion.div
        style={{
          x: videoX,
          scale: videoScale,
          opacity: videoOpacity,
          borderRadius: videoRadius,
        }}
        className="relative w-screen h-[100dvh] max-w-none overflow-hidden shadow-[0_35px_100px_rgba(0,0,0,0.95)] border border-white/15 bg-canvas-surface group will-change-transform transform-gpu flex items-center justify-center"
      >
        {/* Ambient Backlight Bloom */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
          <div className="w-[120%] h-[120%] bg-gradient-to-tr from-[#1E3A8A]/50 via-[#00E575]/25 to-transparent rounded-full blur-3xl opacity-60 transform-gpu" />
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
        <div className="absolute top-6 left-6 z-20 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050A1A]/85 backdrop-blur-md border border-white/10 text-xs font-mono text-white/90">
          <span className="w-2 h-2 rounded-full bg-[#00E575] animate-pulse" />
          <span>NEURAL RENDER // 4K</span>
        </div>

        <div className="absolute bottom-6 right-6 z-20 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050A1A]/85 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300">
          <span>60 FPS • PRORES 4444</span>
        </div>
      </motion.div>
    </div>
  );
}

interface MobileShowcaseSlideProps {
  item: ShowcaseData;
  index: number;
  total: number;
  videoY: MotionValue<string>;
  videoScale: MotionValue<number>;
  videoOpacity: MotionValue<number>;
  textY: MotionValue<string>;
  textOpacity: MotionValue<number>;
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
}: MobileShowcaseSlideProps) {
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
  // DESKTOP KINETIC SIDE-SHIFT TRANSFORMS (>= 768px)
  //
  // Chapter 0: Starts Full-Screen & Centered -> Shifts Right & Contracts -> Text Reveals on Left
  // ============================================================
  const desktopVideo0X = useTransform(
    smoothProgress,
    [0.00, 0.08, 0.20, 0.30],
    ["0%", "0%", "22%", "22%"]
  );
  const desktopVideo0Scale = useTransform(
    smoothProgress,
    [0.00, 0.08, 0.20, 0.30],
    [1.0, 1.0, 0.60, 0.60]
  );
  const desktopVideo0Radius = useTransform(
    smoothProgress,
    [0.00, 0.08, 0.20, 0.30],
    ["0px", "0px", "28px", "28px"]
  );
  const desktopVideo0Opacity = useTransform(
    smoothProgress,
    [0.00, 0.28, 0.34],
    [1.0, 1.0, 0]
  );
  const desktopText0X = useTransform(
    smoothProgress,
    [0.00, 0.10, 0.20, 0.30],
    ["-40px", "-40px", "0px", "0px"]
  );
  const desktopText0Opacity = useTransform(
    smoothProgress,
    [0.00, 0.10, 0.20, 0.28, 0.34],
    [0, 0, 1.0, 1.0, 0]
  );

  // Chapter 1: Enters Full-Screen & Centered -> Shifts Left & Contracts -> Text Reveals on Right
  const desktopVideo1Opacity = useTransform(
    smoothProgress,
    [0.28, 0.34, 0.60, 0.66],
    [0, 1.0, 1.0, 0]
  );
  const desktopVideo1Scale = useTransform(
    smoothProgress,
    [0.28, 0.34, 0.42, 0.52],
    [1.0, 1.0, 1.0, 0.60]
  );
  const desktopVideo1X = useTransform(
    smoothProgress,
    [0.28, 0.34, 0.42, 0.52],
    ["0%", "0%", "0%", "-22%"]
  );
  const desktopVideo1Radius = useTransform(
    smoothProgress,
    [0.28, 0.34, 0.42, 0.52],
    ["0px", "0px", "0px", "28px"]
  );
  const desktopText1X = useTransform(
    smoothProgress,
    [0.40, 0.52],
    ["40px", "0px"]
  );
  const desktopText1Opacity = useTransform(
    smoothProgress,
    [0.40, 0.50, 0.60, 0.66],
    [0, 1.0, 1.0, 0]
  );

  // Chapter 2: Enters Full-Screen & Centered -> Shifts Right & Contracts -> Text Reveals on Left
  const desktopVideo2Opacity = useTransform(
    smoothProgress,
    [0.62, 0.68],
    [0, 1.0]
  );
  const desktopVideo2Scale = useTransform(
    smoothProgress,
    [0.62, 0.72, 0.82],
    [1.0, 1.0, 0.60]
  );
  const desktopVideo2X = useTransform(
    smoothProgress,
    [0.62, 0.72, 0.82],
    ["0%", "0%", "22%"]
  );
  const desktopVideo2Radius = useTransform(
    smoothProgress,
    [0.62, 0.72, 0.82],
    ["0px", "0px", "28px"]
  );
  const desktopText2X = useTransform(
    smoothProgress,
    [0.72, 0.82],
    ["-40px", "0px"]
  );
  const desktopText2Opacity = useTransform(
    smoothProgress,
    [0.72, 0.82],
    [0, 1.0]
  );

  // ============================================================
  // MOBILE VERTICAL CASCADE TRANSFORMS (< 768px)
  // 100% Preserved Handheld Portrait Stack
  // ============================================================
  const mobileVideo0Y = useTransform(smoothProgress, [0.24, 0.34], ["0%", "-6%"]);
  const mobileVideo0Scale = useTransform(smoothProgress, [0.24, 0.34], [1.0, 0.94]);
  const mobileVideo0Opacity = useTransform(smoothProgress, [0.24, 0.34], [1.0, 0.25]);
  const mobileText0Y = useTransform(smoothProgress, [0.20, 0.32], ["0px", "-70px"]);
  const mobileText0Opacity = useTransform(smoothProgress, [0.20, 0.32], [1.0, 0]);

  const mobileVideo1Y = useTransform(
    smoothProgress,
    [0.26, 0.38, 0.60, 0.70],
    ["100%", "0%", "0%", "-6%"]
  );
  const mobileVideo1Scale = useTransform(
    smoothProgress,
    [0.26, 0.38, 0.60, 0.70],
    [0.94, 1.0, 1.0, 0.94]
  );
  const mobileVideo1Opacity = useTransform(
    smoothProgress,
    [0.26, 0.34, 0.60, 0.70],
    [0, 1.0, 1.0, 0.25]
  );
  const mobileText1Y = useTransform(
    smoothProgress,
    [0.36, 0.44, 0.58, 0.68],
    ["50px", "0px", "0px", "-70px"]
  );
  const mobileText1Opacity = useTransform(
    smoothProgress,
    [0.36, 0.44, 0.58, 0.68],
    [0, 1.0, 1.0, 0]
  );

  const mobileVideo2Y = useTransform(smoothProgress, [0.64, 0.76], ["100%", "0%"]);
  const mobileVideo2Scale = useTransform(smoothProgress, [0.64, 0.76], [0.94, 1.0]);
  const mobileVideo2Opacity = useTransform(smoothProgress, [0.64, 0.72], [0, 1.0]);
  const mobileText2Y = useTransform(smoothProgress, [0.74, 0.84], ["50px", "0px"]);
  const mobileText2Opacity = useTransform(smoothProgress, [0.74, 0.84], [0, 1.0]);

  return (
    <section
      ref={containerRef}
      id="capabilities"
      className="relative h-[450vh] w-full bg-[#050A1A]"
    >
      {/* Pinned Viewport Stage */}
      <div className="sticky top-0 h-[100dvh] w-screen max-w-full overflow-hidden bg-[#050A1A] flex items-center justify-center select-none">
        {/* Ambient Radial Vignette */}
        <div className="absolute inset-0 pointer-events-none z-0 bg-radial from-transparent via-[#050A1A]/30 to-[#050A1A]/85" />


        {/* ============================================================ */}
        {/* SLIDE 0: Synthetic Humans                                   */}
        {/* ============================================================ */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
          {isDesktop ? (
            <DesktopShowcaseSlide
              item={SHOWCASE_ITEMS[0]}
              index={0}
              total={3}
              videoX={desktopVideo0X}
              videoScale={desktopVideo0Scale}
              videoOpacity={desktopVideo0Opacity}
              videoRadius={desktopVideo0Radius}
              textX={desktopText0X}
              textOpacity={desktopText0Opacity}
              reverse={false}
            />
          ) : (
            <MobileShowcaseSlide
              item={SHOWCASE_ITEMS[0]}
              index={0}
              total={3}
              videoY={mobileVideo0Y}
              videoScale={mobileVideo0Scale}
              videoOpacity={mobileVideo0Opacity}
              textY={mobileText0Y}
              textOpacity={mobileText0Opacity}
            />
          )}
        </div>

        {/* ============================================================ */}
        {/* SLIDE 1: Neural Environments                                */}
        {/* ============================================================ */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
          {isDesktop ? (
            <DesktopShowcaseSlide
              item={SHOWCASE_ITEMS[1]}
              index={1}
              total={3}
              videoX={desktopVideo1X}
              videoScale={desktopVideo1Scale}
              videoOpacity={desktopVideo1Opacity}
              videoRadius={desktopVideo1Radius}
              textX={desktopText1X}
              textOpacity={desktopText1Opacity}
              reverse={true}
            />
          ) : (
            <MobileShowcaseSlide
              item={SHOWCASE_ITEMS[1]}
              index={1}
              total={3}
              videoY={mobileVideo1Y}
              videoScale={mobileVideo1Scale}
              videoOpacity={mobileVideo1Opacity}
              textY={mobileText1Y}
              textOpacity={mobileText1Opacity}
            />
          )}
        </div>

        {/* ============================================================ */}
        {/* SLIDE 2: Dynamic Physics                                    */}
        {/* ============================================================ */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
          {isDesktop ? (
            <DesktopShowcaseSlide
              item={SHOWCASE_ITEMS[2]}
              index={2}
              total={3}
              videoX={desktopVideo2X}
              videoScale={desktopVideo2Scale}
              videoOpacity={desktopVideo2Opacity}
              videoRadius={desktopVideo2Radius}
              textX={desktopText2X}
              textOpacity={desktopText2Opacity}
              reverse={false}
            />
          ) : (
            <MobileShowcaseSlide
              item={SHOWCASE_ITEMS[2]}
              index={2}
              total={3}
              videoY={mobileVideo2Y}
              videoScale={mobileVideo2Scale}
              videoOpacity={mobileVideo2Opacity}
              textY={mobileText2Y}
              textOpacity={mobileText2Opacity}
            />
          )}
        </div>
      </div>
    </section>
  );
}
