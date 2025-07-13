# portfolio
this will showcase my portfolio and skills

# Project Structure
/src
  /app
    /projects           → Project showcase pages
    /blog               → MDX-based blog section (optional)
    /contact            → Contact form
    /api                → (optional) API routes like `/api/contact`
    layout.tsx          → Global layout (nav, footer)
    page.tsx            → Home/landing page
  /components
    Navbar.tsx
    Footer.tsx
    ProjectCard.tsx
    HeroSection.tsx
    ContactForm.tsx
  /lib
    content.ts          → (optional) Your projects and metadata
    utils.ts
  /styles
    globals.css
  /types
    index.ts            → Type definitions for project data, etc.