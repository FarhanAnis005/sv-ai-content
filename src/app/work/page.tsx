import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ALL_PROJECTS } from "@/data/projects";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DirectCommsWidget } from "@/components/DirectCommsWidget";
import { TerminalBadge } from "@/components/TerminalBadge";
import { SeamlessEdgeVideo } from "@/components/SeamlessEdgeVideo";

export const metadata: Metadata = {
  title: "Selected Work — Storyvord Production Archive",
  description:
    "Explore case studies and technical pipeline breakdowns of Storyvord AI productions across digital humans, environments, and dynamic VFX.",
};

export default function WorkArchivePage() {
  return (
    <main className="relative w-full min-h-screen bg-canvas-base text-type-primary flex flex-col">
      {/* Universal Navigation */}
      <Header />

      {/* Archive Header */}
      <section className="pt-36 sm:pt-44 pb-16 px-6 sm:px-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-5 max-w-3xl">
          <div className="w-max">
            <TerminalBadge variant="accent">
              Portfolio & Case Studies
            </TerminalBadge>
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-type-primary tracking-tight">
            Selected Productions
          </h1>
          <p className="text-type-secondary text-base sm:text-xl font-sans leading-relaxed">
            Explore deep-dive technical breakdowns of how our creative directors and
            AI engineers build photorealistic digital humans, unconstrained 3D
            worlds, and complex dynamic VFX.
          </p>
        </div>
      </section>

      {/* Project Showcase Grid */}
      <section className="px-6 sm:px-10 max-w-7xl mx-auto w-full pb-32">
        <div className="flex flex-col gap-20 sm:gap-28">
          {ALL_PROJECTS.map((project, index) => (
            <div
              key={project.slug}
              className="p-6 sm:p-10 rounded-3xl bg-canvas-surface/60 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col lg:flex-row gap-8 lg:gap-14 items-center group shadow-xl"
            >
              {/* Media Preview (Left) */}
              <div className="w-full lg:w-3/5 rounded-2xl overflow-hidden border border-white/10 bg-canvas-base relative">
                <Link href={`/work/${project.slug}`} className="block relative">
                  <SeamlessEdgeVideo
                    poster={project.poster}
                    srcDesktop={project.videoSrc}
                    aspectRatio="aspect-[16/9]"
                    alt={project.headline}
                  />
                  {/* Subtle Play Overlay */}
                  <div className="absolute inset-0 bg-canvas-base/20 hover:bg-transparent transition-colors flex items-center justify-center pointer-events-none">
                    <span className="px-4 py-2 rounded-full bg-canvas-surface/90 border border-white/20 text-xs font-semibold text-white tracking-wide shadow-lg group-hover:scale-105 transition-transform">
                      View Deep-Dive ↗
                    </span>
                  </div>
                </Link>
              </div>

              {/* Text Information (Right) */}
              <div className="w-full lg:w-2/5 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider">
                    {`0${index + 1}`} — {project.title}
                  </span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-type-primary tracking-tight leading-snug">
                  <Link
                    href={`/work/${project.slug}`}
                    className="hover:text-brand-accent transition-colors"
                  >
                    {project.headline}
                  </Link>
                </h2>

                <p className="text-type-secondary text-sm sm:text-base leading-relaxed font-sans">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.techTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 bg-canvas-base/60 text-type-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA Link */}
                <div className="pt-3">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:underline group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Full Case Study & Pipeline Breakdown</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Universal Footer & Intake */}
      <Footer />

      {/* Direct Comms Concierge Widget */}
      <DirectCommsWidget />
    </main>
  );
}
