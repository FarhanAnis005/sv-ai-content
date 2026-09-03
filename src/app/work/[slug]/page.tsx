import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { PROJECTS, ALL_PROJECTS } from "@/data/projects";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DirectCommsWidget } from "@/components/DirectCommsWidget";
import { TerminalBadge } from "@/components/TerminalBadge";
import { SeamlessEdgeVideo } from "@/components/SeamlessEdgeVideo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS[slug];
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Storyvord Case Study`,
    description: project.description,
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS[slug];

  if (!project) {
    notFound();
  }

  const prevProject = PROJECTS[project.prevSlug];
  const nextProject = PROJECTS[project.nextSlug];

  return (
    <main className="relative w-full min-h-screen bg-canvas-base text-type-primary flex flex-col">
      {/* Universal Navigation */}
      <Header />

      {/* Hero Case Study Header */}
      <section className="pt-32 sm:pt-40 pb-12 sm:pb-16 px-6 sm:px-10 max-w-7xl mx-auto w-full">
        {/* Back Link Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-medium text-type-secondary hover:text-brand-accent transition-colors py-2"
          >
            <span>←</span>
            <span>Back to All Work</span>
          </Link>
        </div>

        <div className="flex flex-col gap-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <TerminalBadge variant="accent">
              {project.sector}
            </TerminalBadge>
            <span className="text-xs text-type-secondary">
              {project.turnaround}
            </span>
            <span className="text-white/20">•</span>
            <span className="text-xs text-type-secondary">
              {project.masterResolution}
            </span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-type-primary tracking-tight leading-[1.05]">
            {project.headline}
          </h1>

          <p className="text-type-secondary text-lg sm:text-xl font-sans leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.techTags.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full border border-white/10 bg-canvas-surface/70 text-type-secondary text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Full-Bleed Cinema Player Section */}
      <section className="w-full relative px-0 md:px-10 max-w-7xl mx-auto mb-20">
        <div className="relative w-full rounded-none md:rounded-3xl overflow-hidden border-y md:border border-white/10 shadow-2xl bg-canvas-surface">
          <SeamlessEdgeVideo
            poster={project.poster}
            srcDesktop={project.videoSrc}
            aspectRatio="aspect-[16/9]"
            alt={project.headline}
            overlayGradient={false}
          />
        </div>
      </section>

      {/* Impact Numbers Grid */}
      <section className="px-6 sm:px-10 max-w-7xl mx-auto w-full mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 bg-canvas-surface/40 rounded-2xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-white/10">
          {project.impactStats.map((stat) => (
            <div key={stat.label} className="p-8 flex flex-col gap-2">
              <span className="font-display font-bold text-4xl sm:text-5xl text-brand-accent">
                {stat.metric}
              </span>
              <span className="text-sm text-type-secondary leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Challenge vs Solution Narrative */}
      <section className="px-6 sm:px-10 max-w-7xl mx-auto w-full mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Challenge */}
          <div className="p-8 sm:p-10 rounded-3xl bg-canvas-surface/50 border border-white/10 flex flex-col gap-4">
            <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
              The Production Challenge
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-type-primary">
              Physical Bottlenecks & Logistics
            </h3>
            <p className="text-type-secondary text-base leading-relaxed font-sans">
              {project.challenge}
            </p>
          </div>

          {/* Solution */}
          <div className="p-8 sm:p-10 rounded-3xl bg-canvas-surface/80 border border-brand-accent/30 shadow-[0_10px_35px_rgba(0,229,117,0.08)] flex flex-col gap-4">
            <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider">
              The Neural Solution
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-type-primary">
              Generative Directorship
            </h3>
            <p className="text-type-secondary text-base leading-relaxed font-sans">
              {project.solution}
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Neural Pipeline */}
      <section className="px-6 sm:px-10 max-w-7xl mx-auto w-full mb-28">
        <div className="mb-12">
          <TerminalBadge variant="accent">
            Behind the Scenes
          </TerminalBadge>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-type-primary mt-3">
            The Neural Pipeline Architecture
          </h2>
          <p className="text-type-secondary text-base mt-2 max-w-2xl">
            A look under the hood at how our creative directors and AI engineers
            bridged generative models with cinema-grade finishing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {project.pipeline.map((p) => (
            <div
              key={p.step}
              className="p-8 rounded-2xl bg-canvas-surface/60 border border-white/10 flex flex-col gap-4 hover:border-white/20 transition-colors"
            >
              <span className="font-display font-bold text-3xl text-brand-accent/80">
                {p.step}
              </span>
              <h3 className="font-display font-bold text-lg text-type-primary">
                {p.title}
              </h3>
              <p className="text-type-secondary text-sm leading-relaxed font-sans">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Spec Sheet */}
      <section className="px-6 sm:px-10 max-w-7xl mx-auto w-full mb-28">
        <div className="rounded-3xl border border-white/10 bg-canvas-surface/60 p-8 sm:p-12 overflow-hidden">
          <h3 className="font-display font-bold text-2xl text-type-primary mb-6">
            Production Specification Matrix
          </h3>
          <div className="divide-y divide-white/10">
            {project.specs.map((spec) => (
              <div
                key={spec.label}
                className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4"
              >
                <span className="text-sm font-medium text-type-secondary">
                  {spec.label}
                </span>
                <span className="text-sm font-semibold text-type-primary sm:text-right">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project-to-Project Pagination */}
      <section className="px-6 sm:px-10 max-w-7xl mx-auto w-full mb-24 border-t border-white/10 pt-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {prevProject && (
            <Link
              href={`/work/${prevProject.slug}`}
              className="flex flex-col items-start gap-1 p-4 rounded-xl hover:bg-canvas-surface/60 transition-colors group w-full sm:w-auto"
            >
              <span className="text-xs text-type-secondary group-hover:text-brand-accent transition-colors">
                ← Previous Production
              </span>
              <span className="font-display font-semibold text-lg text-type-primary">
                {prevProject.title}
              </span>
            </Link>
          )}

          <Link
            href="/work"
            className="text-xs font-medium text-type-secondary hover:text-white px-4 py-2 border border-white/10 rounded-full"
          >
            All Work Archive
          </Link>

          {nextProject && (
            <Link
              href={`/work/${nextProject.slug}`}
              className="flex flex-col sm:items-end gap-1 p-4 rounded-xl hover:bg-canvas-surface/60 transition-colors group w-full sm:w-auto text-left sm:text-right"
            >
              <span className="text-xs text-type-secondary group-hover:text-brand-accent transition-colors">
                Next Production →
              </span>
              <span className="font-display font-semibold text-lg text-type-primary">
                {nextProject.title}
              </span>
            </Link>
          )}
        </div>
      </section>

      {/* Universal Footer & Intake */}
      <Footer />

      {/* Direct Comms Concierge Widget */}
      <DirectCommsWidget />
    </main>
  );
}
