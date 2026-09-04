"use client";

import React from "react";
import { ShowcaseItem } from "./ShowcaseItem";

const SHOWCASE_ITEMS = [
  {
    slug: "synthetic-humans",
    category: "[ 01 // SYNTHETIC HUMANS ]",
    title: "Digital Actors. Limitless Expression.",
    description:
      "Bespoke digital talent and likeness replication for global brand campaigns. Real-time emotion mapping, flawless lip synchronization across 32 languages, and consistent character continuity across episodic formats.",
    specs: ["Custom LoRA", "4K Facial Mesh", "32+ Languages", "Zero Uncanny"],
    videoSrc: "/videos/unit01-synthetic.mp4",
    posterSrc: "/assets/unit01-poster.jpg",
    reverse: false,
  },
  {
    slug: "neural-environments",
    category: "[ 02 // NEURAL ENVIRONMENTS ]",
    title: "Locations Unbound by Physical Law.",
    description:
      "Photorealistic terrains, ancient historical architecture, and hazardous outer-world environments generated without travel budgets, location fees, or weather delays. High-fidelity volumetric depth.",
    specs: ["Gaussian Splatting", "Volumetric NeRF", "Dynamic Lighting", "Zero Travel"],
    videoSrc: "/videos/unit02-environments.mp4",
    posterSrc: "/assets/unit02-poster.jpg",
    reverse: true,
  },
  {
    slug: "dynamic-physics",
    category: "[ 03 // DYNAMIC PHYSICS ]",
    title: "Cinematic Chaos on Demand.",
    description:
      "High-impact vehicle crashes, liquid simulations, and architectural destruction rendered at a fraction of traditional physical rig costs without safety hazards or reshoot penalties.",
    specs: ["Fluid Dynamics", "Unreal Engine 5", "8K DCI Master", "ACES Color"],
    videoSrc: "/videos/unit03-physics.mp4",
    posterSrc: "/assets/unit03-poster.jpg",
    reverse: false,
  },
];

export function ShowcaseSection() {
  return (
    <section id="capabilities" className="relative w-full bg-[#050A1A]">
      {SHOWCASE_ITEMS.map((item, index) => (
        <ShowcaseItem
          key={item.slug}
          index={index}
          total={SHOWCASE_ITEMS.length}
          slug={item.slug}
          category={item.category}
          title={item.title}
          description={item.description}
          specs={item.specs}
          videoSrc={item.videoSrc}
          posterSrc={item.posterSrc}
          reverse={item.reverse}
        />
      ))}
    </section>
  );
}
