export interface ProjectPipelineStep {
  step: string;
  title: string;
  description: string;
}

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface ProjectData {
  slug: string;
  title: string;
  sector: string;
  headline: string;
  tagline: string;
  description: string;
  poster: string;
  videoSrc: string;
  clientType: string;
  turnaround: string;
  masterResolution: string;
  techTags: string[];
  challenge: string;
  solution: string;
  pipeline: ProjectPipelineStep[];
  specs: ProjectSpec[];
  impactStats: { metric: string; label: string }[];
  prevSlug: string;
  nextSlug: string;
}

export const PROJECTS: Record<string, ProjectData> = {
  "synthetic-humans": {
    slug: "synthetic-humans",
    title: "Synthetic Humans & Performance",
    sector: "Sector 01 — Digital Talent & Likeness",
    headline: "Digital Actors. Limitless Expression.",
    tagline: "Bespoke digital talent and likeness replication for global brand campaigns.",
    description:
      "Real-time emotion mapping, flawless lip synchronization across 32 languages, and consistent character continuity across episodic and commercial formats.",
    poster: "/assets/unit01-poster.jpg",
    videoSrc: "/videos/unit01-synthetic.mp4",
    clientType: "Global Luxury Brand Campaign",
    turnaround: "48-Hour Initial Cut",
    masterResolution: "8K DCI Cinema Master",
    techTags: ["Custom LoRA", "4K Facial Detail", "32+ Languages", "NeRF Head Mesh"],
    challenge:
      "Traditional global campaigns require flying high-profile talent to multiple continents, renegotiating usage rights per territory, and spending weeks in ADR recording studios for manual dubbing and re-shoots.",
    solution:
      "Storyvord trained bespoke neural LoRA checkpoints on photographic likeness scans, enabling real-time emotion mapping and zero-artifact lip synchronization across 32 languages from a single performance master.",
    pipeline: [
      {
        step: "01",
        title: "Photometric Likeness & LoRA Ingestion",
        description:
          "Multi-angle 8K reference capture processed into a proprietary model checkpoint, preserving micro skin pores, iris refractions, and muscle topology.",
      },
      {
        step: "02",
        title: "4K Facial Restoration & Neural Blendshapes",
        description:
          "Subsurface scattering algorithms ensure genuine organic skin warmth under varying studio lighting conditions without uncanny valley artifacts.",
      },
      {
        step: "03",
        title: "Multi-Lingual Phoneme Synchronization",
        description:
          "Neural audio-to-viseme alignment maps actor speech seamlessly across 32 distinct international dialects with natural cadence and mouth dynamics.",
      },
    ],
    specs: [
      { label: "Core Model Pipeline", value: "Custom LoRA Checkpoint + NeRF Facial Rig" },
      { label: "Delivery Resolution", value: "8K DCI (8192 × 4320) & 9:16 Vertical" },
      { label: "Turnaround Velocity", value: "48 Hours from script to initial cut" },
      { label: "Language Coverage", value: "32 Languages with real-time lip sync" },
      { label: "Audio Calibration", value: "Dolby Atmos 7.1.4 stems" },
    ],
    impactStats: [
      { metric: "88%", label: "Budget Reallocated to Creative Execution" },
      { metric: "32", label: "Global Dialects Synchronized" },
      { metric: "48h", label: "Initial Director Cut Latency" },
    ],
    prevSlug: "dynamic-physics",
    nextSlug: "neural-environments",
  },

  "neural-environments": {
    slug: "neural-environments",
    title: "Digital Worlds & Environments",
    sector: "Sector 02 — Neural World Building",
    headline: "Locations Unbound by Geography.",
    tagline: "Photorealistic terrains, ancient architecture, and outer-world environments.",
    description:
      "Photorealistic terrains, ancient historical architecture, and hazardous outer-world environments generated without travel budgets, location fees, or carbon footprint.",
    poster: "/assets/unit02-poster.jpg",
    videoSrc: "/videos/unit02-environments.mp4",
    clientType: "Commercial & Feature Film Production",
    turnaround: "72-Hour Full Environment Delivery",
    masterResolution: "8K IMAX & DCI Cinema Master",
    techTags: ["Gaussian Splatting", "Neural Depth Passes", "Atmospheric Sim", "Unreal Engine 5"],
    challenge:
      "Filming in remote glacial crevasses or constructing futuristic sci-fi cityscapes incurs exorbitant travel budgets, volatile weather delays, and hazardous logistical overhead for crews.",
    solution:
      "Using 3D Gaussian Splatting and neural depth synthesis, Storyvord generates infinite, photorealistic environments with dynamic atmospheric mist and unconstrained 360-degree camera movement.",
    pipeline: [
      {
        step: "01",
        title: "Photogrammetry & Gaussian Splat Ingestion",
        description:
          "Architectural point-clouds and satellite terrain topologies synthesized into dense Gaussian radiance fields.",
      },
      {
        step: "02",
        title: "Volumetric Atmosphere & Dynamic Weather",
        description:
          "Simulated blizzard mists, god-rays, and volumetric lighting baked dynamically into camera depth passes.",
      },
      {
        step: "03",
        title: "Unreal Engine 5 Real-Time Virtual Cinematography",
        description:
          "Director-controlled virtual cameras perform sweeping drone descents and macro architectural fly-throughs without rigging restrictions.",
      },
    ],
    specs: [
      { label: "Core Model Pipeline", value: "3D Gaussian Splatting + UE5 + Nuke" },
      { label: "Delivery Resolution", value: "8K IMAX (1.43:1 & 1.90:1) & 16:9" },
      { label: "Camera Freedom", value: "360° Unconstrained 6-DoF Drone Flight" },
      { label: "Carbon Footprint", value: "0 kg Production Transit Emissions" },
      { label: "Lighting Simulation", value: "Physically-Based Volumetric Raytracing" },
    ],
    impactStats: [
      { metric: "100%", label: "Elimination of Location Travel Costs" },
      { metric: "0 kg", label: "Production Carbon Footprint" },
      { metric: "8K", label: "Native IMAX Deliverable Quality" },
    ],
    prevSlug: "synthetic-humans",
    nextSlug: "dynamic-physics",
  },

  "dynamic-physics": {
    slug: "dynamic-physics",
    title: "Dynamic Physics & Simulation",
    sector: "Sector 03 — Simulated Phenomena & VFX",
    headline: "Cinematic Chaos on Demand.",
    tagline: "High-impact vehicle crashes, liquid simulations, and architectural destruction.",
    description:
      "High-impact vehicle crashes, liquid simulations, and architectural destruction rendered at a fraction of traditional physical rig costs without safety hazards or reshoot penalties.",
    poster: "/assets/unit03-poster.jpg",
    videoSrc: "/videos/unit03-physics.mp4",
    clientType: "Automotive Commercial & High-End VFX",
    turnaround: "48-Hour Complex Simulation Cut",
    masterResolution: "8K Phantom Slow-Motion (1000 FPS)",
    techTags: ["Volumetric AI", "Fluid Dynamics", "Rigid Body Solvers", "Unreal Engine 5"],
    challenge:
      "Physical vehicle collisions and pyrotechnic destruction sequences pose severe safety hazards, destroy costly practical vehicle chassis, and permit only a single take without expensive resets.",
    solution:
      "We combine volumetric neural simulation with fluid and rigid-body dynamics, enabling slow-motion micro-frame control where glass prisms and metallic sparks deform with true physical realism.",
    pipeline: [
      {
        step: "01",
        title: "Rigid-Body & Fluid Pre-Visualization",
        description:
          "Structural stress tensors and fluid particle grids simulated to calibrate collision inertia and fluid splatter trajectories.",
      },
      {
        step: "02",
        title: "Neural Optical Refraction & Glass Dispersion",
        description:
          "Prismatic glass shards shatter with ray-traced chromatic aberration and dynamic rim lighting calibrated for studio aesthetics.",
      },
      {
        step: "03",
        title: "Phantom Slow-Motion Frame Interpolation",
        description:
          "Neural motion vectors interpolate destruction sequences up to 1,000 frames per second for ultra-slow-motion cinema masters.",
      },
    ],
    specs: [
      { label: "Core Model Pipeline", value: "Volumetric AI + Houdini + Octane Neural Comp" },
      { label: "Frame Rate", value: "Up to 1,000 FPS virtual Phantom high-speed" },
      { label: "Turnaround Velocity", value: "48 Hours from briefing to 8K composite" },
      { label: "Destruction Physics", value: "Stress-tensor tempered glass and liquid metal" },
      { label: "Cost Advantage", value: "92% savings compared to physical test rigs" },
    ],
    impactStats: [
      { metric: "92%", label: "Cost Savings vs Physical Crash Rigs" },
      { metric: "1000", label: "Virtual Frames Per Second" },
      { metric: "0", label: "Safety Risk or Equipment Scrap Loss" },
    ],
    prevSlug: "neural-environments",
    nextSlug: "synthetic-humans",
  },
};

export const ALL_PROJECTS = Object.values(PROJECTS);
