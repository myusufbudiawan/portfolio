import Glass from "./Glass";
import { experience } from "@/lib/profile";

/**
 * Experience as stacked glass plates rather than a card grid: the rail on the
 * left carries the chronology, the plate carries the substance.
 */
export default function ExperienceList({ limit }: { limit?: number }) {
  const rows = limit ? experience.slice(0, limit) : experience;

  return (
    <ol className="hairline-list space-y-0">
      {rows.map((job) => (
        <li key={`${job.role}-${job.period}`} className="py-6 first:pt-0">
          <div className="grid gap-5 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <p className="t-sm tnum text-ink-2">{job.period}</p>
              <p className="t-xs mt-1 text-ink-3">
                {job.company} · {job.location}
              </p>
            </div>

            <div className="md:col-span-8">
              <h3 className="t-xl">{job.role}</h3>
              <p className="t-sm mt-2 text-ink-2">{job.summary}</p>

              <ul className="mt-4 space-y-2.5">
                {job.points.map((point) => (
                  <li key={point} className="t-sm flex gap-2.5 text-ink-2">
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-line-strong"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {job.stack.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ExperiencePanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Glass as="section" className="p-6 md:p-9">
      <p className="t-label mb-7 text-ink-3">{title}</p>
      {children}
    </Glass>
  );
}
