# Portfolio

Personal site for **Muhammad Yusuf Budiawan** — Software Engineer 2 at Dell Technologies,
Kuala Lumpur. Backend and full-stack: REST APIs, marketplace orchestration platforms on
Kubernetes, and the LLM tooling that configures them.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion.

## Run it

```bash
npm install
npm run dev            # http://localhost:3000

npm run build          # server build
npm start              # serve it

npm run build:pages    # static export to out/ (what GitHub Pages deploys)
```

`build:pages` is the only build that differs: it sets `output: "export"`, marks images
unoptimised (static hosting has no image service) and turns on `trailingSlash` so Pages can
serve `work/slug/` from `work/slug/index.html`. It reads `PAGES_BASE_PATH` and
`NEXT_PUBLIC_SITE_URL` from the environment — see Deploy.

## Pages

| Route | What it is |
|---|---|
| `/` | Portrait + spec panel, three featured projects, experience, toolbox, contact |
| `/work` | All seven repositories; the lead card shows a blurred, non-interactive preview |
| `/work/[slug]` | Case study. Deployed projects lead with the running app in a live window |
| `/about` | Portrait, bio, education, full experience |
| `/add-project` | Dev helper that drafts a `projects.ts` entry. `noindex`, not in nav |

`/work/[slug]` is fully static (`generateStaticParams`), including the pages that embed a
live app — the iframe is mounted by the browser, not by the server.

## Structure

```
src/
├── app/
│   ├── layout.tsx          # shell: aurora canvas, nav, footer, skip link, metadata, theme script
│   ├── globals.css         # design tokens, the glass material, live-window chrome, portrait frame
│   ├── page.tsx            # home
│   ├── work/               # index + [slug] case studies
│   ├── about/  add-project/  not-found.tsx
│   ├── sitemap.ts  robots.ts
│   ├── opengraph-image.tsx  twitter-image.tsx   # generated at build, no binary
│   └── fonts/inter-latin-var.woff2              # self-hosted fallback face
├── components/
│   ├── Glass.tsx           # the material primitive
│   ├── SpecularCard.tsx    # pointer-tracked specular (writes --mx/--my, no re-render)
│   ├── LiveWindow.tsx      # sandboxed iframe of a deployed app, deferred until near viewport
│   ├── Portrait.tsx        # fixed frame, photo or designed placeholder
│   ├── ThemeToggle.tsx     # light / dark / system popover
│   ├── Nav.tsx             # floating capsule, shared-layout active pill
│   ├── Hero.tsx  ProjectCard.tsx  ExperienceList.tsx  SkillsPanel.tsx
│   └── SectionHeading.tsx  ContactBand.tsx  Footer.tsx  AddProjectForm.tsx
└── lib/
    ├── profile.ts          # résumé as data — the single source of truth
    ├── projects.ts         # real repositories only
    ├── theme.ts            # theme store + the pre-paint script
    └── og.tsx              # shared social-card renderer
```

## Design

Apple's Liquid Glass, ported to CSS: a translucent body (`backdrop-filter` blur +
saturation), a refracting rim (a masked `backdrop-filter` ring, so the edge actually
re-filters the backdrop), and an optional specular that tracks the pointer.

Three rules the code enforces:

- **System type first.** SF Pro on macOS, Segoe UI on Windows, a self-hosted Inter
  latin variable subset only on Linux/Android. No third-party font request, and a
  Google Fonts outage cannot break the build.
- **No stock imagery.** Project covers are the repository's real top-level layout in mono
  over a low-chroma tint, because none of the repos contain screenshots. The only
  photograph on the site is the owner's own portrait, once supplied.
- **Real states, not defaults.** Every empty, loading and missing state is designed: the
  portrait placeholder, the live-window loading bar, the 404.

Each material degrades independently: `prefers-reduced-transparency` turns glass into
a solid surface and drops the aurora, `prefers-contrast: more` adds a 1.5px ink border,
`prefers-reduced-motion` removes movement and keeps opacity.

## Live app embeds

A project with a `demoUrl` gets two things: a blurred, non-interactive preview as its card
cover, and an interactive window on its case study page — glass chrome, real address bar,
reload and open-in-new-tab.

- The iframe mounts only within 400px of the viewport, so a below-the-fold embed costs
  nothing until it is reached.
- It is sandboxed **without** `allow-top-navigation`, so the embedded app can never move
  this site out from under the reader.
- On touch devices one tap hands control over (`pointer: coarse`, not `hover: none`), since
  an interactive iframe otherwise swallows page scroll.
- The window's geometry is applied inline, so a stale or partial stylesheet cannot collapse
  it into an unstyled stack.
- Note: an embedded app follows the **OS** colour scheme. `color-scheme` on an iframe does
  not propagate `prefers-color-scheme` into the child, so a forced theme will not reach it.

To enable one, add to the project in `src/lib/projects.ts`:

```ts
demoUrl: "https://example.vercel.app",
demoLabel: "example.vercel.app",
demoKind: "phone",   // "phone" for mobile apps exported to web, otherwise "window"
```

## Theme

Light / dark / system, from the control at the top right (inside the nav capsule on
phones). "System" removes `data-theme` so the OS decides; an explicit choice sets it and
persists in `localStorage`, applied by an inline script in `<head>` before first paint so
there is no flash of the wrong palette. `color-scheme` follows the choice, so scrollbars
and form controls change too.

## Adding your portrait

The portrait slot is built and empty. The frame is fixed (16:10 on the home panel, 4:5 on
About), so nothing reflows when the photo lands — CLS stays at 0.

1. Save the photo as `public/portrait.jpg`. Portrait crop, face in the upper third, at least
   1200px on the long edge.
2. In `src/lib/profile.ts`, change `portrait: null` to `portrait: "/portrait.jpg"`.
3. Adjust `focus` on the two call sites if the crop clips your head; it is an
   `object-position` value, default `"50% 20%"`.

Until then the slot renders a labelled placeholder (monogram plus a dashed hairline), not a
broken image and not a stock face. `next/image` handles sizing and format from the `sizes`
props already in place; both slots load with `priority` because they sit above the fold.

## Adding a project

Open `/add-project`, fill the form, copy the generated entry, and paste it as the first
element of `projects` in `src/lib/projects.ts`. The `plate` field is the repository's
top-level paths — that is what the card displays, so there is no image to supply. The form
does not cover `demoUrl` / `demoLabel` / `demoKind`; add those by hand (see Live app embeds).

## Verified

Production build (`next build` + `next start`), Chromium via Playwright, measured on the
build at `cb6ec00`:

| | Home | Case study |
|---|---|---|
| LCP, desktop | 240 ms | 220 ms |
| LCP, throttled mobile (1.5 Mbps / 150 ms RTT, 4× CPU) | 848 ms | 640 ms |
| CLS | 0 | 0 |
| Own transfer | 233 kB | 229 kB |
| Requests | 18 | 16 |

Also: **0 axe-core violations** (WCAG 2.0/2.1 A+AA, light and dark, 1440×900 and 390×844),
static audit **0 FAIL / 0 WARN** across 10 pages, no console errors, no horizontal overflow
from 320 to 1600 px, clean tab order with a visible focus ring on every stop.

Case-study numbers exclude the embedded app's own resources, which are third-party and only
loaded when that window comes into view.

## Deploy

GitHub Pages, via `.github/workflows/nextjs.yml`. On every push to `main` (or a manual
run) it installs, exports, and publishes `my-portfolio/out`.

One-time setup: **Settings → Pages → Source: GitHub Actions.** Nothing else — the
workflow's `actions/configure-pages` step supplies the base path, so a project site gets
`/portfolio` and a user site or custom domain gets an empty prefix without touching code.

The site is served from `https://myusufbudiawan.github.io/portfolio/`. If that moves:

1. Set `NEXT_PUBLIC_SITE_URL` in the workflow (it feeds canonical URLs, Open Graph, the
   sitemap and robots — all from `src/lib/site.ts`, one source of truth).
2. For a custom domain, add it in Settings → Pages; `configure-pages` then reports an empty
   base path and asset URLs follow automatically.

Two details the workflow handles that a naive export gets wrong:

- `robots.txt`, `sitemap.xml` and the social images are route handlers, which an export
  cannot render at request time. They carry `export const dynamic = "force-static"`.
- Next writes the generated social cards as extension-less files, which Pages serves as
  `application/octet-stream`. `scripts/fix-pages-assets.mjs` renames them to `.png` and
  rewrites the references in the emitted HTML.
