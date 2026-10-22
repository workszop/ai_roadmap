# AI roadmap for a small business / Mapa AI dla małej firmy

Interactive, bilingual (Polish / English) roadmap for introducing one practical AI routine in a small business, in the original edulab design system.

Live: https://workszop.github.io/ai_roadmap/

## What it covers

- **Four practical stages** – Wybór zadania, Test w praktyce, Wprowadzenie do pracy, Utrzymanie i rozwój. Each has five tickable actions, a plain checklist and a continue / retest / stop hint rather than a mandatory scale programme.
- **One-task scope** – one repeatable task, one person doing it and one person deciding; the same person may fill both roles. The plan includes a success threshold, total test time including review, a small budget and tool limit, a manual fallback, and a review rhythm.
- **Safety by context** – basics for every task, extra questions when applicable, and specialist consultation when the impact or legal scope is unclear. Agents and integrations are optional; a simpler fixed-step flow is preferred.
- **AI Act timeline** – a qualified visual summary of the official EU milestones, with the current day marker and a primary European Commission source. It is a screening aid, not legal advice or an automatic classification.
- **Small-business examples, measures and pitfalls** – customer replies, offers, product descriptions, administration and other repeatable work; time, rework, quality and cost are measured without marketing ROI promises.

Educational material, not legal advice. Check the linked primary source and the concrete scope of the task before making a decision.

## Use

Open `/home/andrzey/git-claude/ai_roadmap/index.html` – a single self-contained file, no build step (fonts and Lucide icons load from CDNs). Language stays under `aiRoadmap.lang`; new SME progress uses the namespaced `aiRoadmap.sme.done.v1` key.

If `aiRoadmap.done` from the previous roadmap is present, it is never used for the new actions. A bilingual notice appears with a download of the original raw value, while the old key remains untouched.

Shortcuts: `L` language · `E` expand / collapse all · `1`–`4` jump to a stage.

## Verification

`window.ROADMAP_CHECK()` in the browser console validates the data and DOM contract: four phases with exactly 20 stable `sme.*` action ids (five per phase), bilingual strings, no em-dashes, narrow primary sources, valid tones and icons, one "today" marker, the legacy notice when needed, and `data-*` counters in sync with state. `body[data-done]`, `body[data-total]`, `section.phase[data-done]` / `[data-tone]` and `li[data-status]` expose state for automated checks.

Focused deterministic checks:

```bash
node --test /home/andrzey/git-claude/ai_roadmap/tests/core.test.mjs
```
