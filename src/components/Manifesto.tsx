"use client";

import React from "react";
import { ScrubbedTextHighlight } from "./ScrubbedTextHighlight";
import { TerminalBadge } from "./TerminalBadge";

export function Manifesto() {
  const manifestoText =
    "We do not prompt. We direct the machine. Pure visual execution with zero physical overhead.";

  // Words receiving surgical emerald (#00E575) accent highlights:
  // "direct the machine." and "Pure visual execution"
  const accentIndices = [5, 6, 7, 8, 9, 10];

  return (
    <section
      id="manifesto"
      className="relative w-full bg-canvas-base py-24 sm:py-36 md:py-44 px-6 sm:px-10 border-b border-white/[0.06]"
    >
      {/* Subtle Structural Accent Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent" />

      <div className="max-w-4xl mx-auto flex flex-col gap-12 sm:gap-16">
        {/* Section Tag */}
        <div className="flex items-center gap-3">
          <TerminalBadge variant="accent">
            Our Philosophy
          </TerminalBadge>
        </div>

        {/* Scrubbed Interactive Manifesto Text */}
        <div className="relative">
          <ScrubbedTextHighlight
            text={manifestoText}
            accentIndices={accentIndices}
            className="text-type-secondary font-display font-medium text-2xl sm:text-3xl md:text-4xl leading-relaxed tracking-tight"
          />
        </div>

        {/* Studio Capability Highlights: 3 Elegant Studio Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-8 border-t border-white/[0.08]">
          <div className="flex flex-col gap-1.5 p-5 rounded-2xl bg-canvas-surface/60 border border-white/[0.06] hover:border-white/15 transition-colors">
            <span className="text-[11px] font-mono font-semibold text-brand-accent uppercase tracking-wider">
              Speed
            </span>
            <span className="text-sm font-semibold text-type-primary tracking-normal">
              48-Hour First Cut
            </span>
            <span className="text-xs text-type-secondary leading-relaxed">
              Immediate director iterations.
            </span>
          </div>

          <div className="flex flex-col gap-1.5 p-5 rounded-2xl bg-canvas-surface/60 border border-white/[0.06] hover:border-white/15 transition-colors">
            <span className="text-[11px] font-mono font-semibold text-brand-cyan uppercase tracking-wider">
              Pipeline
            </span>
            <span className="text-sm font-semibold text-type-primary tracking-normal">
              Neural + VFX Compositing
            </span>
            <span className="text-xs text-type-secondary leading-relaxed">
              Seamless photoreal fidelity.
            </span>
          </div>

          <div className="flex flex-col gap-1.5 p-5 rounded-2xl bg-canvas-surface/60 border border-white/[0.06] hover:border-white/15 transition-colors">
            <span className="text-[11px] font-mono font-semibold text-brand-blue uppercase tracking-wider">
              Master
            </span>
            <span className="text-sm font-semibold text-type-primary tracking-normal">
              8K DCI Cinema Delivery
            </span>
            <span className="text-xs text-type-secondary leading-relaxed">
              Calibrated for IMAX and broadcast.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
