# Portfolio

Personal site for **Muhammad Yusuf Budiawan** — Software Engineer 2 at Dell Technologies,
Kuala Lumpur. Backend and full-stack: REST APIs, marketplace orchestration platforms on
Kubernetes, and the LLM tooling that configures them.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Pages

| Route | What it is |
|---|---|
| `/` | Hero, three featured projects, experience, toolbox, contact |
| `/work` | All seven repositories |
| `/work/[slug]` | Case study per project (`generateStaticParams`, fully static) |
| `/about` | Bio, education, full experience |
| `/add-project` | Dev helper that drafts a `projects.ts` entry. `noindex`, not in nav |

## Structure

```
src/
├── app/
│   ├── layout.tsx          # shell: aurora canvas, nav, footer, skip link, metadata
│   ├── globals.css         # design tokens + the glass material
│   ├── page.tsx            # home
│   ├── work/               # index + [slug] case studies
│   ├── about/  add-project/  not-found.tsx
│   ├── sitemap.ts  robots.ts
│   ├── opengraph-image.tsx  twitter-image.tsx   # generated at build, no binary
│   └── fonts/inter-latin-var.woff2              # self-hosted fallback face
├── components/
│   ├── Glass.tsx           # the material primitive
│   ├── SpecularCard.tsx    # pointer-tracked specular (writes --mx/--my, no re-render)
│   ├── Nav.tsx             # floating capsule, shared-layout active pill
│   ├── Hero.tsx  ProjectCard.tsx  ExperienceList.tsx  SkillsPanel.tsx
│   └── SectionHeading.tsx  ContactBand.tsx  Footer.tsx  AddProjectForm.tsx
└── lib/
    ├── profile.ts          # résumé as data — the single source of truth
    ├── projects.ts         # real repositories only
    └── og.tsx              # shared social-card renderer
```

## Design

Apple's Liquid Glass, ported to CSS: a translucent body (`backdrop-filter` blur +
saturation), a refracting rim (a masked `backdrop-filter` ring, so the edge actually
re-filters the backdrop), and an optional specular that tracks the pointer.

Two rules the code enforces:

- **System type first.** SF Pro on macOS, Segoe UI on Windows, a self-hosted Inter
  latin variable subset only on Linux/Android. No third-party font request, and a
  Google Fonts outage cannot break the build.
- **No cover images.** The repositories contain no screenshots, so a project card
  shows the repo's real top-level layout in mono over a low-chroma tint. Nothing on
  this site is a stock photo or an invented metric.

Each material degrades independently: `prefers-reduced-transparency` turns glass into
a solid surface and drops the aurora, `prefers-contrast: more` adds a 1.5px ink border,
`prefers-reduced-motion` removes movement and keeps opacity.

Theme is light / dark / system, chosen from the control at the top right (inside the nav
capsule on phones). "System" removes `data-theme` so the OS decides; an explicit choice
sets it and persists in `localStorage`, applied by an inline script in `<head>` before first
paint so there is no flash of the wrong palette.

## Adding a project

Open `/add-project`, fill the form, copy the generated entry, and paste it as the first
element of `projects` in `src/lib/projects.ts`. The `plate` field is the repository's
top-level paths — that is what the card displays, so there is no image to supply.

## Verified

Production build, Chromium: **0 axe-core violations** (WCAG 2.0/2.1 A+AA, light and dark,
1440×900 and 390×844), **CLS 0**, **LCP 848 ms** on a throttled mobile connection
(1.5 Mbps / 150 ms RTT, 4× CPU), 209 kB total transfer, no console errors, clean tab order
with a visible focus ring on every stop.

## Deploy

Vercel, zero config. Set the canonical domain in `src/app/layout.tsx` and
`src/app/sitemap.ts` (`siteUrl` / `base`) once it is not `myusufbudiawan.vercel.app`.
