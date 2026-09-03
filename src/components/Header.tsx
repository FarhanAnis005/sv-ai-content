"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  onInitiateClick?: () => void;
}

export function Header({ onInitiateClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInitiate = () => {
    if (onInitiateClick && isHome) {
      onInitiateClick();
    } else {
      scrollToSection("terminal");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 md:top-5 md:max-w-7xl md:mx-auto md:px-6">
      <div
        className={`flex items-center justify-between px-5 sm:px-8 py-3.5 transition-all duration-300 ${
          scrolled
            ? "bg-canvas-surface/90 backdrop-blur-2xl border-b md:border border-white/10 md:rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
            : "bg-canvas-base/60 md:bg-canvas-surface/40 backdrop-blur-xl border-b md:border border-white/[0.08] md:rounded-full"
        }`}
      >
        {/* Left: Brand + Status */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 group min-h-[44px]"
            aria-label="Storyvord Home"
          >
            <span className="font-display font-bold tracking-tight text-xl text-type-primary flex items-center">
              Storyvord
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-accent ml-1.5 shadow-[0_0_8px_#00E575]" />
            </span>
          </Link>

          {/* Clean Editorial Status Badge */}
          <div className="hidden sm:inline-flex items-center gap-2 border border-white/10 bg-canvas-surface/80 px-3 py-1 rounded-full text-xs font-medium text-type-secondary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            <span className="text-type-primary/80">Available for Q3/Q4 commissions</span>
          </div>
        </div>

        {/* Center: Multi-page Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-8"
        >
          <Link
            href="/work"
            className={`min-h-[44px] flex items-center font-sans text-sm font-medium transition-colors cursor-pointer group relative ${
              pathname?.startsWith("/work")
                ? "text-brand-accent"
                : "text-type-secondary hover:text-type-primary"
            }`}
          >
            <span>Work</span>
            <span
              className={`absolute bottom-2 left-0 right-0 h-[1.5px] bg-brand-accent transition-transform origin-left duration-200 ${
                pathname?.startsWith("/work") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </Link>

          {[
            { label: "Capabilities", id: "capabilities" },
            { label: "Philosophy", id: "manifesto" },
            { label: "Impact", id: "metrics" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.id)}
              className="min-h-[44px] flex items-center font-sans text-sm font-medium text-type-secondary hover:text-type-primary transition-colors cursor-pointer group relative"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-2 left-0 right-0 h-[1.5px] bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
            </button>
          ))}
        </nav>

        {/* Right: Luxury CTA & Mobile Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleInitiate}
            className="min-h-[44px] px-6 py-2.5 rounded-full bg-type-primary text-canvas-base font-sans text-xs sm:text-sm font-semibold tracking-normal transition-all duration-300 hover:bg-brand-accent hover:shadow-[0_0_25px_rgba(0,229,117,0.5)] active:scale-95 flex items-center justify-center cursor-pointer select-none"
          >
            Start a Project
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-type-secondary hover:text-type-primary p-2 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-5 rounded-2xl bg-canvas-surface/95 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col gap-3">
          <div className="flex items-center gap-2 pb-3 border-b border-white/[0.08] text-xs text-type-secondary">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            <span>Currently booking creative production commissions</span>
          </div>

          <Link
            href="/work"
            onClick={() => setMobileMenuOpen(false)}
            className="min-h-[44px] flex items-center font-sans text-sm font-medium text-type-primary hover:text-brand-accent transition-colors text-left w-full border-b border-white/[0.04]"
          >
            All Work & Case Studies
          </Link>

          {[
            { label: "Studio Capabilities", id: "capabilities" },
            { label: "Our Philosophy", id: "manifesto" },
            { label: "Performance & Impact", id: "metrics" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.id)}
              className="min-h-[44px] flex items-center font-sans text-sm font-medium text-type-primary hover:text-brand-accent transition-colors text-left w-full border-b border-white/[0.04]"
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={handleInitiate}
            className="mt-2 min-h-[44px] w-full rounded-full bg-brand-accent text-canvas-base font-semibold text-sm py-2.5 flex items-center justify-center shadow-lg"
          >
            Start a Project
          </button>
        </div>
      )}
    </header>
  );
}
