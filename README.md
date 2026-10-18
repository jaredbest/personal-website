<div align="center">
  <img alt="Logo" src="https://raw.githubusercontent.com/jaredbest/personal-website/main/images/logo.png" width="100" />
</div>
<h1 align="center">
  jaredbest.com
</h1>
<p align="center">
  The source of <a href="https://www.jaredbest.com/" target="_blank">www.jaredbest.com</a>, built with <a href="https://react.dev/" target="_blank">React</a> and hosted on <a href="https://www.netlify.com/" target="_blank">Netlify</a>.
</p>
<p align="center">
  <a href="https://app.netlify.com/">
    <img src="https://api.netlify.com/api/v1/badges/d441277c-1795-40d4-93d6-ae8f0f8be657/deploy-status" alt="Netlify Status" />
  </a>
</p>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/screenshot-night.png" />
  <img alt="The home page of jaredbest.com" src="images/screenshot-day.png" />
</picture>

## 🛰️ About

A personal site that looks and works like an operator console:
- A status bar with clocks, a nav rail with number-key shortcuts and day/night display modes.
- English and German, switched with the flags in the top bar.
- Resume, projects, blog and an Impressum.

No trackers, no cookies, no third-party requests.

## 🧰 Tech stack

| Area | Tools |
|---|---|
| App | React 19, TypeScript, React Router |
| Build | Vite |
| Styling | CSS Modules and design tokens, self-hosted Inter and JetBrains Mono fonts |
| Content | Markdown posts rendered with markdown-to-jsx, Lucide icons |
| Unit tests | Vitest and Testing Library |
| Browser tests | Playwright and axe, in Chromium and WebKit on phone and desktop sizes |
| Code checks | ESLint with typescript-eslint and the React Hooks rules |
| CI | GitHub Actions runs every check on each pull request |
| Updates | Dependabot opens weekly pull requests for npm packages and GitHub Actions |
| Hosting | Netlify |

## 🚀 Quick start

You need Node.js 22 or newer.

```sh
npm install
npm run dev
```

Open http://localhost:5173.

In VS Code you can also run the **dev** and **build** tasks from *Terminal → Run Task*.

## 🧭 Project layout

```
src/
  App.tsx, routes.tsx, nav.ts   app shell, pages and the nav order
  components/                   console frame, panels, switches, charts and card previews
  pages/                        one file per page
  data/                         CV, skills, projects and post list
  content/posts/                blog posts (name.md and name.de.md) and their chart data
  lib/                          small helpers: dates, motion, map and chart maths
  i18n/                         language switch and interface wording
  styles/                       design tokens and global styles
  test/                         Vitest tests
e2e/                            Playwright browser tests
scripts/                        data builders (see below)
public/images/                  photos and project images
```

## ✏️ Editing content

| To change | Edit |
|---|---|
| Name, bio, links, languages | `src/data/profile.ts` |
| Jobs | `src/data/experience.ts` |
| Schools | `src/data/education.ts` |
| Skills | `src/data/skills.ts` |
| Certifications, publications | `src/data/credentials.ts` |
| Projects | `src/data/projects.ts` |
| Blog posts | `src/data/posts.ts` and `src/content/posts/` |
| Buttons, labels, headings | `src/i18n/ui.ts` |

Every text has an English (`en`) and a German (`de`) version. Update both.

Writing rules live in `.claude/skills/site-writing/SKILL.md`.

## 🗺️ Rebuilding the Ticonderoga map

The "Mapping Ticonderoga" post replays your OpenStreetMap edits. After more mapping, rebuild its data:

```sh
python3 scripts/ticonderoga_edits.py
```

It needs only Python 3.10+. Downloads are cached in `.cache/osm`, so later runs fetch only new changesets.

## 🧪 Checks

```sh
npm run typecheck   # TypeScript
npm run lint        # ESLint
npm test            # Vitest tests
npm run build       # production build in dist/
npm run test:e2e    # browser tests against the build (run build first)
npm run preview     # serve the build locally
```

The first time, install the test browsers with `npx playwright install chromium webkit`.

GitHub Actions runs all of these except `preview` on every pull request.

## 🌍 Deploy

Netlify builds every push to `main`. The settings live in `netlify.toml`:
- Build command: `npm run build`
- Publish folder: `dist`
- All paths go to `index.html`, so links like `/resume` work on refresh.
- Security headers, including a Content-Security-Policy that only allows files from this site.
- Built files in `/assets/` are cached for a year, since their names change with every build.

The Content-Security-Policy allows the one inline script in `index.html` by its hash. If you change that script, update the hash in `netlify.toml`. `npm test` fails until you do and shows the new hash.

On the 1st and 15th of each month, a GitHub Action checks the HTTPS certificate and fails if it has less than 20 days left. GitHub emails you when it fails. Then check HTTPS under *Domain management* in Netlify.

## ⚖️ Legal

The Impressum and privacy notice are in `src/pages/Legal.tsx`. Keep them up to date if your address changes or if the site starts loading anything from another service.
