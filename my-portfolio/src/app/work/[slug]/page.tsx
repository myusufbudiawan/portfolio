import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Glass from "@/components/Glass";
import SpecularCard from "@/components/SpecularCard";
import { getNeighbours, getProject, projects } from "@/lib/projects";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  const description = project.summary;
  return {
    title: project.title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title}, ${project.year}`,
      description,
      type: "article",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${project.title}, ${project.year}`,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const { previous, next } = getNeighbours(slug);

  return (
    <article className="shell pt-32 pb-16 md:pt-40 md:pb-24">
      <Link
        href="/work"
        className="t-sm group inline-flex items-center gap-1.5 text-ink-2 transition-colors duration-200 hover:text-ink"
      >
        <span
          aria-hidden="true"
          className="transition-transform duration-[220ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-x-0.5"
        >
          ←
        </span>
        All work
      </Link>

      <header className="mt-8 grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip chip-solid">{project.kicker}</span>
            <span className="chip">{project.status}</span>
            <span className="chip tnum">{project.year}</span>
          </div>
          <h1 className="t-display mt-5">{project.title}</h1>
          <p className="t-lg measure mt-5 text-ink-2">{project.summary}</p>
        </div>

        <div className="md:col-span-5">
          <SpecularCard className="glass glass-lift overflow-hidden">
            <div className="border-b border-[var(--line)] px-5 py-4">
              <p className="t-label text-ink-3">Top level</p>
            </div>
            <ul className="hairline-list">
              {project.plate.map((line) => (
                <li
                  key={line}
                  className="px-5 py-2.5 font-mono text-[0.8125rem] text-ink-2"
                >
                  <span aria-hidden="true" className="mr-2 text-ink-3/60">
                    └
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </SpecularCard>
        </div>
      </header>

      <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <h2 className="t-label text-ink-3">What it is</h2>
          <p className="t-lg mt-4 text-ink-2">{project.description}</p>

          <h2 className="t-label mt-12 text-ink-3">What is in it</h2>
          <ul className="mt-4 space-y-3">
            {project.highlights.map((item) => (
              <li key={item} className="t-base flex gap-3 text-ink-2">
                <span
                  aria-hidden="true"
                  className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-accent"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="md:col-span-5">
          <Glass className="p-6">
            <p className="t-label text-ink-3">Stack</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>

            <div className="rule my-6" />

            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full"
              >
                View repository
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <div>
                <p className="t-sm text-ink-2">
                  This one is a private repository, so there is nothing to link
                  to. Happy to walk through it in a call.
                </p>
                <a
                  href="mailto:myusufbudiawan@gmail.com?subject=Preemie%20Tracker"
                  className="btn btn-glass mt-4 w-full"
                >
                  Ask about it
                </a>
              </div>
            )}
          </Glass>
        </aside>
      </div>

      <div className="rule mt-16" />

      <nav
        aria-label="Project navigation"
        className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between"
      >
        {previous ? (
          <Link
            href={`/work/${previous.slug}`}
            className="t-sm group text-ink-2 transition-colors duration-200 hover:text-ink"
          >
            <span className="t-label block text-ink-3">Previous</span>
            <span className="mt-1.5 inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="transition-transform duration-[220ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-x-0.5"
              >
                ←
              </span>
              {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}

        {next && (
          <Link
            href={`/work/${next.slug}`}
            className="t-sm group text-ink-2 transition-colors duration-200 hover:text-ink sm:text-right"
          >
            <span className="t-label block text-ink-3">Next</span>
            <span className="mt-1.5 inline-flex items-center gap-1.5">
              {next.title}
              <span
                aria-hidden="true"
                className="transition-transform duration-[220ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5"
              >
                →
              </span>
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
