import React from "react";

interface StudioBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "pulse";
  className?: string;
}

export function TerminalBadge({
  children,
  variant = "default",
  className = "",
}: StudioBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 border px-3.5 py-1 rounded-full text-xs font-sans font-medium tracking-wide select-none transition-colors duration-200 ${
        variant === "accent"
          ? "border-brand-accent/40 bg-brand-accent/10 text-brand-accent shadow-[0_0_15px_rgba(0,229,117,0.15)]"
          : variant === "pulse"
          ? "border-white/10 bg-canvas-surface/80 backdrop-blur-md text-type-primary"
          : "border-white/10 bg-canvas-surface/70 backdrop-blur-md text-type-secondary"
      } ${className}`}
    >
      {variant === "pulse" && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
        </span>
      )}
      {children}
    </span>
  );
}
