---
name: site-writing
description: Writing and code style for jaredbest.com. Use when adding or editing any site copy (CV, projects, blog posts, UI labels), German translations, code comments, or the README.
---

# Writing style for jaredbest.com

## Voice
- Plain English. Short sentences. Say the thing, then stop.
- Facts only. Every claim must come from Jared's CV or something he said. Never invent experience, numbers or titles.
- Keep numbers exact ("50+ DRT products", "500+ pages"). Do not round up.

## Cockpit look, plain words
- The interface looks like a cockpit or operator console. The **words** stay ordinary.
- Use: Home, About, Resume, Skills, Experience, Education, Projects, Blog, Email.
- Avoid military or sci-fi jargon: no "callsign", "mission log", "briefing", "subsystem", "master caution", "systems nominal".

## Two languages
- Every piece of text exists in English (`en`) and German (`de`). Add both in the same change.
- German uses the formal "Sie".
- UI strings live in `src/i18n/ui.ts`. Content lives in `src/data/*.ts`. Blog posts have `name.md` and `name.de.md`.
- Product names, company names and certifications stay untranslated.

## Skills
- No percentages or self-ratings. Group skills by area.
- Mark what Jared most wants to work on with `focus: true` (keep it to about six).
- Mark beginner-level skills with `basic: true`.

## UX rules for new UI
- Hit targets at least 44×44px. Visible focus. Works with keyboard only.
- Colour means one thing: green = active or OK, amber = needs attention. Always pair colour with text or an icon.
- Motion only after a user action (click, scroll, hover). Nothing loops forever; card previews play once (under five seconds). Respect `prefers-reduced-motion`.
- No third-party requests (fonts, embeds, analytics). Update the privacy text on `/legal` if that ever changes.

## Code
- One plain-English comment at the top of each file saying what it is for.
- Inside a file, comment only what is not obvious. No commented-out code.
- Match the surrounding code: small components, CSS Modules, design tokens from `src/styles/tokens.css`.

## README
- Every major heading starts with an emoji.
- Short, plain instructions. Commands in code blocks.
