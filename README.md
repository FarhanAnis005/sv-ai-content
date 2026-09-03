# ai-content

> **Storyvord — AI Creative Production Studio**  
> Cinema-grade generative workflows replacing physical production bottlenecks for visionary global brands.

---

## Overview

This repository contains the flagship frontend architecture for **Storyvord**, an elite AI-powered creative production studio. The site features an architectural, fluid, high-contrast dark aesthetic (`#050A1A`), multi-page project breakdowns, zero-border video playback, and an interactive client intake and booking concierge.

## Key Features

* **Multi-Page Architecture (Next.js App Router)**:
  * `/` — Studio flagship homepage (Hero, Philosophy, Capabilities, Impact, Project Intake).
  * `/work` — Complete production archive and selected case studies.
  * `/work/[slug]` — Dedicated deep-dive case studies for each production:
    * `/work/synthetic-humans` (Digital Actors & Performance Capture)
    * `/work/neural-environments` (Neural World Building & Environments)
    * `/work/dynamic-physics` (Dynamic Phenomena & Simulation VFX)
* **Zero-Border Video Engine**: Edge-to-edge video presentation touching the physical device bezel on mobile (`width: 100vw`, `left: 0`, `padding: 0`). Audio-track omission bypasses mobile battery-saver throttles.
* **Inertia-Based Virtual Scroll (Lenis)**: Smooth virtual scrolling with long cubic-bezier deceleration curves.
* **Kinetic Typography & Scrubbed Highlights**: Scroll-progress-linked text highlighting using Framer Motion.
* **Interactive Concierge & Direct Comms Widget**: Persistent floating dock allowing prospective clients to schedule 15-minute director briefing calls (Google Meet / Zoom) or dispatch encrypted messages.
* **Client Intake Terminal**: Interactive parameter selectors, bottom-hairline email input with `#00E575` glow, and synchronized live studio clocks (London GMT / San Francisco PST).

## Tech Stack

* **Framework**: Next.js 16 (App Router, Turbopack)
* **Language**: TypeScript
* **Styling**: Tailwind CSS, PostCSS, Vanilla CSS tokens
* **Typography**: Plus Jakarta Sans, Inter, JetBrains Mono
* **Motion & Animation**: Framer Motion, Lenis Smooth Scroll
* **Icons & UI**: Lucide React

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

© 2026 Storyvord Inc. All rights reserved.
