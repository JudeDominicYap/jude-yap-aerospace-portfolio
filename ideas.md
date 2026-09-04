# Design Directions

## Approach 1 — Midnight Flight Deck
**Very Brief Intro:** A restrained aerospace-engineering atlas: deep charcoal, blueprint blue, warm instrument white, and precise technical markings. It balances aircraft systems language with a student portfolio tone so the work feels prepared, curious, and believable.

**Probability:** 0.07

## Approach 2 — Hangar Notebook
**Very Brief Intro:** A lighter, paper-and-metal study journal with off-white surfaces, graphite type, cobalt annotations, and photographed/diagrammatic artifacts. It emphasizes the human process of learning and documenting experiments.

**Probability:** 0.04

## Approach 3 — Orbital Signal
**Very Brief Intro:** A dark observatory interface with midnight blue panels, orbit lines, amber status notes, and sparse telemetry details. More atmospheric and cinematic, but still grounded in academic exploration rather than spectacle.

**Probability:** 0.02

# Chosen Direction — Midnight Flight Deck

## Design Movement
Contemporary neo-industrial editorial design, translated through aerospace blueprints, flight instrumentation, and the visual rhythm of an engineering field notebook.

## Core Principles
1. **Evidence over hype:** language and hierarchy should make the student’s current learning visible without implying professional engineering experience.
2. **Precision with warmth:** technical rules, measurement marks, and structured spacing are softened by warm whites, thoughtful copy, and small human details.
3. **Asymmetric cockpit composition:** layouts should feel like a readable instrument panel, using an offset rail, data markers, and open negative space instead of a generic centered SaaS grid.
4. **Motion as signal:** animations are short, subtle, and purposeful—flight paths, hover readouts, and scroll reveals should clarify rather than distract.

## Color Philosophy
The canvas is near-black charcoal (#080b10) to suggest a calm pre-flight environment rather than a neon game UI. Electric blue (#4f8dff) is reserved for guidance, focus, and active system states. Frosted steel (#dbe5f2) and soft white (#f7f9fc) keep reading comfortable. A small signal amber (#e5b66c) marks status or time—not decoration—so the palette feels instrument-led and ownable.

## Layout Paradigm
A vertical section rail and asymmetric two-column compositions create an editorial instrument-panel rhythm. Hero content sits left while the interactive aircraft readout anchors right; below, sections alternate dense modules with generous breathing room. Cards are grouped like system modules, not identical marketing tiles.

## Signature Elements
- A persistent coordinate/section index language: `01 / ABOUT`, `02 / INTERESTS`, and small technical labels.
- Blueprint-blue rules, measurement ticks, and a moving plotted flight path that connects the journey and future goal.
- An interactive aircraft silhouette with selectable hotspots for wing, fuselage, tail, and engine.

## Interaction Philosophy
Every interaction should teach, reveal, or orient. Hover and focus states expose a label or short explanation; clicking opens a richer detail layer. No decorative carousels or hidden dead ends. Keyboard focus mirrors hover, and reduced-motion users receive the same information without movement.

## Animation
Use 180–280ms transitions with a strong ease-out. Reveal section blocks with a small vertical rise and opacity change; stagger grouped items by 40–60ms. Let the aircraft grid drift almost imperceptibly, the plotted path draw only on first view, and modals enter from 0.96 scale rather than 0. Keep all nonessential movement inside `prefers-reduced-motion: no-preference`.

## Typography System
Use **Space Grotesk** for headings and labels: geometric, technical, and slightly distinctive. Use **DM Sans** for body copy: calm and highly readable at application-portfolio lengths. H1 is large and compact with a tight line-height; section headings use a strong weight with a blue eyebrow; labels are uppercase, tracked, and small. Avoid all-caps for paragraph copy.

## Brand Essence
A Grade 12 STEM student building a credible foundation for aeronautical engineering through research, programming, AI, and technical curiosity. Personality: **observant, methodical, forward-looking**.

## Brand Voice
Headlines are direct and quietly ambitious. CTAs invite exploration rather than promising outcomes. Microcopy uses clear, honest qualifiers such as “currently developing,” “student research,” and “future goal.”

Example lines:
- “I’m learning how systems move, respond, and hold together.”
- “Trace the work behind the direction.”

## Wordmark & Logo
A compact “JY / flight vector” mark: two offset cobalt strokes form a forward-leaning J and a wing-like Y, enclosed by a partial coordinate ring. The mark should work without the name, remain legible at favicon size, and feel more like a personal aircraft notation than a corporate logo.

## Signature Brand Color
**Flightline Blue — #4F8DFF.** A crisp, slightly cool blue that reads as navigation guidance against charcoal, distinct from generic royal blue and restrained enough for an academic portfolio.
