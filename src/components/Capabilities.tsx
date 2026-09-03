"use client";

import React from "react";
import Link from "next/link";
import { TerminalBadge } from "./TerminalBadge";
import { SeamlessEdgeVideo } from "./SeamlessEdgeVideo";

interface CapabilityUnit {
  id: string;
  slug: string;
  badge: string;
  headline: string;
  description: string;
  techBadges: string[];
  poster: string;
  videoSrc?: string;
  reverseDesktop?: boolean;
}

const CAPABILITY_UNITS: CapabilityUnit[] = [
  {
    id: "unit-01",
    slug: "synthetic-humans",
    badge: "01 — Synthetic Humans & Performance",
    headline: "Digital Actors. Limitless Expression.",
    description:
      "Bespoke digital talent and likeness replication for global brand campaigns. Real-time emotion mapping, flawless lip synchronization across 32 languages, and consistent character continuity across episodic formats.",
    techBadges: [
      "Custom Likeness",
      "4K Facial Detail",
      "32+ Languages",
    ],
    poster: "/assets/unit01-poster.jpg",
    videoSrc: "/videos/unit01-synthetic.mp4",
    reverseDesktop: false,
  },
  {
    id: "unit-02",
    slug: "neural-environments",
    badge: "02 — Digital Worlds & Environments",
    headline: "Locations Unbound by Geography.",
    description:
      "Photorealistic terrains, ancient historical architecture, and hazardous outer-world environments generated without travel budgets, location fees, or carbon footprint.",
    techBadges: [
      "Gaussian Splatting",
      "Neural Depth",
      "Atmospheric Sim",
    ],
    poster: "/assets/unit02-poster.jpg",
    videoSrc: "/videos/unit02-environments.mp4",
    reverseDesktop: true,
  },
  {
    id: "unit-03",
    slug: "dynamic-physics",
    badge: "03 — Dynamic Physics & Simulation",
    headline: "Cinematic Chaos on Demand.",
    description:
      "High-impact vehicle crashes, liquid simulations, and architectural destruction rendered at a fraction of traditional physical rig costs without safety hazards or reshoot penalties.",
    techBadges: [
      "Volumetric AI",
      "Fluid Dynamics",
      "Unreal Engine 5",
    ],
    poster: "/assets/unit03-poster.jpg",
    videoSrc: "/videos/unit03-physics.mp4",
    reverseDesktop: false,
  },
];

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative w-full bg-canvas-base py-24 sm:py-36 border-b border-white/[0.06]"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-16 sm:mb-24">
        <div className="flex flex-col gap-4 max-w-3xl">
          <div className="w-max">
            <TerminalBadge variant="accent">
              What We Do
            </TerminalBadge>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-type-primary tracking-tight">
            Cinematic craft meets generative intelligence.
          </h2>
          <p className="text-type-secondary text-base sm:text-lg leading-relaxed">
            From photorealistic digital humans to expansive world-scale environments,
            we engineer visuals that captivate audiences and elevate modern brands.
          </p>
        </div>
      </div>

      {/* Alternating Stack of Full-Width Showcase Units */}
      <div className="flex flex-col gap-24 sm:gap-36">
        {CAPABILITY_UNITS.map((unit) => (
          <div
            key={unit.id}
            className="w-full relative group border-t border-b md:border-t-0 md:border-b-0 border-white/[0.05] py-6 md:py-0"
          >
            <div className="max-w-7xl mx-auto px-0 md:px-10">
              <div
                className={`flex flex-col ${
                  unit.reverseDesktop ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-8 lg:gap-16`}
              >
                {/* 
                  Video Showcase:
                  Clickable link to full case study
                */}
                <div className="w-full lg:w-3/5 relative">
                  <Link
                    href={`/work/${unit.slug}`}
                    className="block relative rounded-none md:rounded-2xl overflow-hidden border-y md:border border-white/10 group-hover:border-brand-accent/50 transition-colors duration-500 shadow-2xl bg-canvas-surface"
                  >
                    <SeamlessEdgeVideo
                      poster={unit.poster}
                      srcDesktop={unit.videoSrc}
                      aspectRatio="aspect-[16/9]"
                      alt={unit.headline}
                      overlayGradient={false}
                    />
                    {/* Hover Pill Indicator */}
                    <div className="absolute inset-0 bg-canvas-base/10 group-hover:bg-transparent transition-colors flex items-end justify-end p-5 pointer-events-none">
                      <span className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-canvas-surface/90 border border-white/20 text-xs font-semibold text-white tracking-wide shadow-lg group-hover:bg-brand-accent group-hover:text-canvas-base group-hover:border-transparent transition-all duration-300">
                        <span>Learn More</span>
                        <span>↗</span>
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Text Content Block */}
                <div className="w-full lg:w-2/5 px-6 sm:px-10 lg:px-0 flex flex-col gap-6">
                  <div>
                    <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider block mb-3">
                      {unit.badge}
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-type-primary tracking-tight leading-tight">
                      <Link
                        href={`/work/${unit.slug}`}
                        className="hover:text-brand-accent transition-colors"
                      >
                        {unit.headline}
                      </Link>
                    </h3>
                  </div>

                  <p className="text-type-secondary text-[15px] sm:text-[16px] leading-relaxed font-sans">
                    {unit.description}
                  </p>

                  {/* Clean, Polished Pill Badges */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {unit.techBadges.map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-white/10 bg-canvas-surface/70 text-type-secondary hover:text-type-primary hover:border-brand-accent/40 text-xs font-medium transition-colors select-none"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Direct Deep-Dive Link */}
                  <div className="pt-2">
                    <Link
                      href={`/work/${unit.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:underline group-hover:translate-x-1 transition-transform"
                    >
                      <span>Explore Case Study & Pipeline Breakdown</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
