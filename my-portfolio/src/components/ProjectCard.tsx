import Link from "next/link";
import SpecularCard from "./SpecularCard";
import type { Project } from "@/lib/projects";

/**
 * A project card. The cover is the repository's own module layout set in mono
 * over a low-chroma tint: there are no screenshots to fake and no stock imagery
 * to borrow, so the structure becomes the visual. The lead card lays out
 * horizontally so the plate has room instead of trailing off into empty space.
 *
 * `level` keeps heading order valid per page: h3 under a section on the home
 * page, h2 on the work index where the grid is the content.
 */
export default function ProjectCard({
  project,
  size = "md",
  level = 3,
}: {
  project: Project;
  size?: "md" | "lg";
  level?: 2 | 3;
}) {
  const wide = size === "lg";
  const Heading = level === 2 ? "h2" : "h3";
  const titleClass = wide ? "t-2xl" : "t-xl";

  return (
    <SpecularCard
      as="article"
      className={`glass glass-lift group relative flex h-full flex-col overflow-hidden ${
        wide ? "md:flex-row" : ""
      }`}
    >
      <div
        className={`project-plate relative flex flex-col overflow-hidden px-5 pb-5 pt-4 ${
          wide ? "md:w-[40%] md:shrink-0 md:justify-between md:pb-6" : ""
        }`}
        style={
          { "--tint": `oklch(0.72 0.09 ${project.hue})` } as React.CSSProperties
        }
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="t-label text-ink-3">Repository</span>
            <span className="t-label tnum text-ink-3">{project.year}</span>
          </div>

          <ul className="mt-3 space-y-[0.15rem] font-mono text-[0.75rem] leading-[1.6] text-ink-2">
            {project.plate.map((line) => (
              <li key={line} className="truncate">
                <span aria-hidden="true" className="mr-2 text-ink-3/60">
                  └
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>

        {wide && (
          <div className="mt-6 hidden md:block">
            <p className="t-label mb-2.5 text-ink-3">Stack</p>
            <ul className="space-y-[0.15rem] font-mono text-[0.75rem] leading-[1.6] text-ink-3">
              {project.stack.map((item) => (
                <li key={item} className="truncate">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div
        className={`relative z-10 flex flex-1 flex-col p-5 md:p-6 ${
          wide ? "md:justify-center md:p-8" : ""
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip chip-solid">{project.kicker}</span>
          <span className="chip">{project.status}</span>
        </div>

        <Heading className={`${titleClass} mt-3.5`}>
          <Link
            href={`/work/${project.slug}`}
            className="transition-colors duration-200 after:absolute after:inset-0 after:z-20 after:content-['']"
          >
            {project.title}
          </Link>
        </Heading>

        <p className="t-sm mt-2.5 max-w-[52ch] text-ink-2">{project.summary}</p>

        <p
          className={`t-sm flex items-center gap-1.5 text-ink-2 transition-colors duration-200 group-hover:text-ink ${
            wide ? "mt-6" : "mt-auto pt-5"
          }`}
        >
          Read the case study
          <span
            aria-hidden="true"
            className="transition-transform duration-[220ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5"
          >
            →
          </span>
        </p>
      </div>
    </SpecularCard>
  );
}
