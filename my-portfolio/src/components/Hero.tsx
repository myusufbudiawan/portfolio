import Link from "next/link";
import Glass from "./Glass";
import SpecularCard from "./SpecularCard";
import { profile, specSheet } from "@/lib/profile";

/**
 * The hero is one focal point: a statement, a promise, two doors out. The glass
 * spec sheet on the right is the page's signature surface — a real material
 * with a pointer-tracked specular, holding facts rather than decoration.
 */
export default function Hero() {
  return (
    <section className="shell pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="rise lg:col-span-7">
          <p className="chip">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            {profile.availability}
          </p>

          <h1 className="t-display mt-6">{profile.headline}</h1>

          <p className="t-lg measure mt-6 text-ink-2">{profile.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/work" className="btn btn-primary">
              See selected work
            </Link>
            <a href={`mailto:${profile.email}`} className="btn btn-glass">
              Email me
            </a>
          </div>
        </div>

        <div className="rise rise-2 lg:col-span-5 lg:pt-2">
          <Glass
            as="aside"
            className="glass-lift specular overflow-hidden"
            aria-label="At a glance"
          >
            <SpecularCard className="relative z-10">
              <dl className="hairline-list relative z-10">
                {specSheet.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[5.5rem_1fr] gap-4 px-5 py-[0.9375rem] md:px-6"
                  >
                    <dt className="t-label pt-[3px] text-ink-3">{row.label}</dt>
                    <dd className="t-sm text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </SpecularCard>
          </Glass>

          <p className="t-xs mt-3 px-1 text-ink-3">
            Résumé v2-3, updated April 2026.{" "}
            <a
              href={`mailto:${profile.email}?subject=Résumé request`}
              className="text-ink-2 underline decoration-[var(--line-strong)] decoration-1 underline-offset-2 transition-colors duration-200 hover:text-ink"
            >
              Ask for the PDF
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
