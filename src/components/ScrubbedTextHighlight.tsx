"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface ScrubbedTextHighlightProps {
  text: string;
  accentIndices?: number[];
  className?: string;
}

interface WordProps {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isAccent: boolean;
}

function Word({ word, index, total, progress, isAccent }: WordProps) {
  // Compute progress interval for this word
  const start = index / total;
  const end = Math.min(1, start + 1.5 / total);

  // Smooth ease-out scrub from #7A849F (opacity 0.25) to #EDEDED or #00E575 (opacity 1.0)
  const opacity = useTransform(progress, [start, end], [0.22, 1]);
  const color = useTransform(
    progress,
    [start, end],
    ["#7A849F", isAccent ? "#00E575" : "#EDEDED"]
  );

  return (
    <motion.span
      style={{ opacity, color }}
      className={`inline-block mr-[0.28em] mb-[0.1em] transition-colors duration-150 ${
        isAccent ? "font-semibold drop-shadow-[0_0_12px_rgba(0,229,117,0.3)]" : ""
      }`}
    >
      {word}
    </motion.span>
  );
}

export function ScrubbedTextHighlight({
  text,
  accentIndices = [],
  className = "",
}: ScrubbedTextHighlightProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const words = text.split(/\s+/).filter(Boolean);

  return (
    <p
      ref={containerRef}
      className={`text-[22px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-sans font-normal leading-[1.35] tracking-[-0.02em] select-none ${className}`}
    >
      {words.map((word, i) => {
        const isAccent = accentIndices.includes(i);
        return (
          <Word
            key={`${word}-${i}`}
            word={word}
            index={i}
            total={words.length}
            progress={scrollYProgress}
            isAccent={isAccent}
          />
        );
      })}
    </p>
  );
}
