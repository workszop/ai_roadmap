# AI Implementation Roadmap 2026 / Mapa wdrożenia AI 2026

Interactive, bilingual (Polish / English) roadmap for rolling out AI in an organisation, in the edulab design system.

Live: https://workszop.github.io/ai_roadmap/

## What it covers

- **Five phases with decision gates** – a phase timeline, then Foundations, Use cases and data, Pilot with evals, Production and scale, Operate and govern. Each phase has its own colour; 65 tickable actions with sources; gate cards with scale / fix / stop outcomes.
- **Regulatory clock** – vertical timeline of EU AI Act dates as amended by the Digital Omnibus (Regulation (EU) 2026/1744) and Poland's act on AI systems (KRiBSI), with a "today" marker. Status is computed against today's date.
- **Agents** – a four-step autonomy ladder, the Rule of Two, MCP / tool and identity rules.
- **Measuring success, industry notes, failure modes, sources.**

Content is current as of 13 October 2026. Educational material, not legal advice.

## Use

Open `index.html` – a single self-contained file, no build step (fonts and Lucide icons load from CDNs). Progress and language are stored in `localStorage`.

Shortcuts: `L` language · `E` expand / collapse all · `1`–`5` jump to a phase.

## Verification

`window.ROADMAP_CHECK()` in the browser console validates the data and DOM contract: every string present in both languages, no em-dashes, unique action ids, every cited source exists and is used, every phase, workstream and tile has a valid tone and icon, one "today" marker, icons drawn, and `data-*` counters in sync with state. `body[data-done]`, `body[data-total]`, `section.phase[data-done]` / `[data-tone]` and `li[data-status]` expose state for automated checks.
