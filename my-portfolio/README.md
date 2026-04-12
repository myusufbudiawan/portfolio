# Portfolio

A minimalist, multi-page portfolio built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pages

- `/` - Home page with intro and featured project teaser
- `/work` - Filterable project grid showcasing all projects
- `/work/[slug]` - Individual project detail pages
- `/about` - Bio, skills, and contact information
- `/add-project` - Form to generate project code for adding new projects

## Adding New Projects

There are two ways to add new projects to your portfolio:

### Method 1: Using the Add Project Form (Recommended)

1. Navigate to `/add-project` in your browser
2. Fill in the project details:
   - GitHub Repository URL (required)
   - Project Title (required)
   - Tagline (required)
   - Tags (comma-separated, required)
   - Year (required)
   - Cover Image Path (required - see below)
   - Description (required)
   - Live URL (optional)
   - Status (live/wip/archived)
   - Featured checkbox
3. Click "Copy Code to Clipboard"
4. Open `src/lib/projects.ts` and paste the code into the `projects` array
5. Save the file

### Method 2: Manual Editing

1. Open `src/lib/projects.ts`
2. Add a new object to the `projects` array with the following structure:

```typescript
{
  title: "Your Project Title",
  slug: "your-project-slug",
  tagline: "A short, catchy description",
  tags: ["React", "TypeScript", "Node.js"],
  year: 2024,
  coverImage: "/your-project-image.jpg",
  description: "Detailed description of your project...",
  liveUrl: "https://your-project.com", // optional
  repoUrl: "https://github.com/username/repo",
  featured: true, // optional
  status: "live", // "live" | "wip" | "archived"
}
```

### Adding Project Images

1. Place your project cover images in the `public/` folder
2. Reference them in the `coverImage` field with a leading slash (e.g., `/my-project.jpg`)
3. Recommended image size: 1200x630 (16:9 aspect ratio)

## Project Structure

```
my-portfolio/
├── src/
│   ├── app/
│   │   ├── about/          # About page
│   │   ├── add-project/    # Project addition form
│   │   ├── work/           # Work page and project details
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   ├── Header.tsx      # Navigation header
│   │   ├── HeroSection.tsx # Home page intro
│   │   ├── FeaturedTeaser.tsx # Featured project on home
│   │   └── AddProjectForm.tsx # Project addition form
│   └── lib/
│       └── projects.ts     # Project data (single source of truth)
├── public/                 # Static assets (images, etc.)
└── package.json
```

## Design Principles

- **Minimalist**: Generous whitespace, clean type hierarchy
- **Monochrome base**: Slate blue accent (#64748b) for subtle contrast
- **Dark mode**: Automatic system preference detection
- **Subtle animations**: CSS transitions only, no flashy effects
- **Mobile-first**: Fully responsive design

## Tech Stack

- Next.js 15.3.4 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Geist Font (Sans & Mono)
- Lucide React (icons)

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
