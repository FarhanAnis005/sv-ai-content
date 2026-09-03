"use client";

import React, { useState, useEffect } from "react";
import { TerminalBadge } from "./TerminalBadge";

const SCOPE_OPTIONS = [
  "Full Commercial Campaign",
  "Synthetic Talent & Avatars",
  "VFX & 3D Simulation",
  "Concept & Prototyping",
];

const TIMELINE_OPTIONS = [
  "Under 10 Days (Sprint)",
  "2 to 4 Weeks (Standard)",
  "Ongoing Agency Retainer",
];

export function Footer() {
  const [selectedScopes, setSelectedScopes] = useState<string[]>([
    "Full Commercial Campaign",
  ]);
  const [selectedTimeline, setSelectedTimeline] = useState<string>(
    "2 to 4 Weeks (Standard)"
  );
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Live Time Synchronization
  const [times, setTimes] = useState({
    lon: "16:24 GMT",
    sfo: "08:24 PST",
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();

      const lonTime = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/London",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now);

      const sfoTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Los_Angeles",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now);

      setTimes({
        lon: `${lonTime} GMT`,
        sfo: `${sfoTime} PST`,
      });
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleScope = (scope: string) => {
    if (selectedScopes.includes(scope)) {
      if (selectedScopes.length > 1) {
        setSelectedScopes(selectedScopes.filter((s) => s !== scope));
      }
    } else {
      setSelectedScopes([...selectedScopes, scope]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubmitted(true);
  };

  return (
    <footer
      id="terminal"
      className="relative w-full bg-canvas-base pt-24 pb-12 border-t border-white/[0.08]"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-12 max-w-3xl">
          <div className="w-max">
            <TerminalBadge variant="accent">
              Start a Project
            </TerminalBadge>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-type-primary tracking-tight">
            Let’s bring your next campaign to life.
          </h2>

          <p className="text-type-secondary text-base sm:text-lg font-sans leading-relaxed">
            Select your project parameters. Our creative directors will review your
            requirements and respond within 12 hours with feasibility and scoping.
          </p>
        </div>

        {/* The Project Intake Card */}
        <div className="rounded-3xl border border-white/10 bg-canvas-surface/80 backdrop-blur-2xl p-7 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          {isSubmitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
              <div className="w-14 h-14 rounded-full border border-brand-accent/40 bg-brand-accent/15 flex items-center justify-center text-brand-accent text-xl">
                ✓
              </div>
              <h3 className="font-display text-2xl font-bold text-type-primary tracking-tight">
                Inquiry Received
              </h3>
              <p className="font-sans text-type-secondary text-base max-w-md leading-relaxed">
                Thank you. We have logged your project brief for{" "}
                <span className="text-brand-accent font-medium">{email}</span>. Our
                executive production team will reach out within 12 hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
                className="mt-4 min-h-[44px] px-6 py-2 border border-white/15 rounded-full text-xs font-medium text-type-secondary hover:text-white transition-colors"
              >
                Send Another Brief
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-9">
              {/* Step 1: Scope */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold text-type-primary tracking-wide uppercase">
                  1. Select Scope (Multi-select)
                </span>

                <div className="flex flex-wrap gap-2.5">
                  {SCOPE_OPTIONS.map((scope) => {
                    const isSelected = selectedScopes.includes(scope);
                    return (
                      <button
                        type="button"
                        key={scope}
                        onClick={() => toggleScope(scope)}
                        className={`min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-center select-none ${
                          isSelected
                            ? "border border-brand-accent bg-brand-accent/15 text-brand-accent shadow-[0_0_15px_rgba(0,229,117,0.25)]"
                            : "border border-white/10 bg-canvas-base/50 text-type-secondary hover:border-white/20 hover:text-type-primary"
                        }`}
                      >
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mr-2" />
                        )}
                        {scope}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Target Timeline */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold text-type-primary tracking-wide uppercase">
                  2. Target Turnaround
                </span>

                <div className="flex flex-wrap gap-2.5">
                  {TIMELINE_OPTIONS.map((timeline) => {
                    const isSelected = selectedTimeline === timeline;
                    return (
                      <button
                        type="button"
                        key={timeline}
                        onClick={() => setSelectedTimeline(timeline)}
                        className={`min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-center select-none ${
                          isSelected
                            ? "border border-brand-cyan bg-brand-cyan/15 text-brand-cyan shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                            : "border border-white/10 bg-canvas-base/50 text-type-secondary hover:border-white/20 hover:text-type-primary"
                        }`}
                      >
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan mr-2" />
                        )}
                        {timeline}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input Interface */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-5 pt-3">
                <div className="flex-1 relative">
                  <label
                    htmlFor="email-input"
                    className="block text-xs font-medium text-type-secondary mb-2"
                  >
                    Your Work Email
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="name@agency.com"
                    className="w-full min-h-[48px] bg-transparent border-0 border-b border-white/15 px-0 py-3 text-type-primary placeholder:text-type-secondary/40 font-sans text-base focus:outline-none focus:ring-0 transition-all duration-300"
                  />
                  {/* Glowing Animated Bottom Border */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-accent transition-all duration-300 ${
                      isFocused
                        ? "opacity-100 shadow-[0_0_12px_#00E575]"
                        : "opacity-0"
                    }`}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="min-h-[48px] px-8 py-3 rounded-full border border-brand-accent bg-brand-accent text-canvas-base font-sans text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,229,117,0.6)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer select-none"
                >
                  <span>Send Project Brief →</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Sub-Footer Bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.07] flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs text-type-secondary">
          {/* Left: Copyright */}
          <div>© 2026 Storyvord Inc. All rights reserved.</div>

          {/* Center: Live Time Synchronization */}
          <div className="text-center">
            Studio Clocks:{" "}
            <span className="text-type-primary font-medium">London {times.lon}</span>{" "}
            <span className="text-white/20 mx-1.5">•</span>{" "}
            <span className="text-type-primary font-medium">San Francisco {times.sfo}</span>
          </div>

          {/* Right: Status */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-type-primary/80">
              Accepting creative commissions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
