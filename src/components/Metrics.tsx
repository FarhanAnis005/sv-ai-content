"use client";

import React, { useState } from "react";
import { TerminalBadge } from "./TerminalBadge";

interface MetricItem {
  value: string;
  label: string;
  detail: string;
}

const METRICS: MetricItem[] = [
  {
    value: "88%",
    label: "Cost Reduction",
    detail: "Measured against traditional physical set and travel budgets",
  },
  {
    value: "10x",
    label: "Faster Delivery",
    detail: "From script approval to high-fidelity commercial master delivery",
  },
  {
    value: "0 kg",
    label: "Carbon Footprint",
    detail: "Eliminating diesel generators, flights, and set construction",
  },
  {
    value: "8K DCI",
    label: "Master Quality",
    detail: "Pristine deliverables for IMAX, broadcast, and vertical social",
  },
];

const CLIENT_PRESS_NAMES = [
  "Warner Bros. Discovery",
  "BBC Archive",
  "Universal Media",
  "TechCrunch",
  "Variety",
  "Wired",
  "Warner Bros. Discovery",
  "BBC Archive",
  "Universal Media",
  "TechCrunch",
  "Variety",
  "Wired",
];

export function Metrics() {
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);

  return (
    <section
      id="metrics"
      className="relative w-full bg-canvas-base py-24 sm:py-36 border-b border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16 max-w-2xl">
          <div className="w-max">
            <TerminalBadge variant="accent">
              Proven Impact
            </TerminalBadge>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-type-primary tracking-tight">
            Setting a new standard for creative production.
          </h2>
          <p className="text-type-secondary text-base leading-relaxed">
            By eliminating physical logistical overhead, we redirect your budget
            directly into visual fidelity and narrative impact.
          </p>
        </div>

        {/* Elegant Metric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/10 bg-canvas-surface/30 rounded-2xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-white/10 shadow-xl">
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className="p-8 sm:p-10 flex flex-col justify-between gap-6 hover:bg-canvas-active/40 transition-colors duration-300 group"
            >
              <div>
                <div className="font-display font-bold text-5xl sm:text-6xl text-type-primary tracking-tight group-hover:text-brand-accent transition-colors duration-300">
                  {metric.value}
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-type-primary mb-2">
                  {metric.label}
                </h3>
                <p className="text-sm text-type-secondary leading-relaxed font-sans">
                  {metric.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Client Marquee Strip */}
      <div className="mt-24 pt-10 border-t border-white/[0.07] relative w-full overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-6 text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-type-secondary">
            Trusted by forward-thinking brands and media innovators
          </span>
        </div>

        {/* Soft Edge Vignettes */}
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-48 z-10 pointer-events-none bg-gradient-to-r from-canvas-base to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-48 z-10 pointer-events-none bg-gradient-to-l from-canvas-base to-transparent" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] py-4">
          {[...CLIENT_PRESS_NAMES, ...CLIENT_PRESS_NAMES].map((name, i) => {
            const isHovered = hoveredClient === `${name}-${i}`;
            return (
              <div
                key={`${name}-${i}`}
                onMouseEnter={() => setHoveredClient(`${name}-${i}`)}
                onMouseLeave={() => setHoveredClient(null)}
                className="flex items-center mx-6 sm:mx-10 cursor-pointer min-h-[44px] group"
              >
                <span
                  className={`font-sans text-sm sm:text-base font-medium transition-all duration-300 flex items-center gap-2.5 ${
                    isHovered
                      ? "text-white opacity-100 font-semibold drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                      : "text-type-secondary/60 group-hover:text-white group-hover:opacity-100"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full bg-brand-accent transition-all duration-300 ${
                      isHovered
                        ? "opacity-100 scale-125 shadow-[0_0_10px_#00E575]"
                        : "opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100"
                    }`}
                  />
                  {name}
                </span>
                <span className="text-white/20 ml-6 sm:ml-10 text-xs">•</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
