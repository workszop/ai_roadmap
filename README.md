# AI Implementation Roadmap 2026 / Mapa wdrożenia AI 2026

Interactive, bilingual (Polish / English) roadmap for rolling out AI in an organisation, in the edulab design system.

Live: https://workszop.github.io/ai_roadmap/

## What it covers

- **What changed since 2025** – adoption and ROI data (McKinsey State of AI 2026, Gartner, MIT NANDA).
- **Regulatory clock** – EU AI Act dates as amended by the Digital Omnibus (Regulation (EU) 2026/1744) and Poland's act on AI systems (KRiBSI). Status chips are computed against today's date.
- **Five phases with decision gates** – Foundations, Use cases and data, Pilot with evals, Production and scale, Operate and govern. 65 tickable actions, each with sources.
- **Agents** – autonomy levels, the Rule of Two, MCP / tool and identity rules.
- **Measuring success, industry notes, failure modes, sources.**

Content is current as of 13 October 2026. Educational material, not legal advice.

## Use

Open `index.html` – a single self-contained file, no build step. Progress and language are stored in `localStorage`.

Shortcuts: `L` language · `E` expand / collapse all · `1`–`5` jump to a phase.

## Verification

`window.ROADMAP_CHECK()` in the browser console validates the data and DOM contract: every string present in both languages, no em-dashes, unique action ids, every cited source exists and is used, and `data-*` counters in sync with state. `body[data-done]`, `body[data-total]`, `section.phase[data-done]` and `tr[data-status]` expose state for automated checks.
