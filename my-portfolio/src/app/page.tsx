import Link from "next/link";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import ExperienceList, { ExperiencePanel } from "@/components/ExperienceList";
import SkillsPanel from "@/components/SkillsPanel";
import ContactBand from "@/components/ContactBand";
import Glass from "@/components/Glass";
import { featuredProjects, projects } from "@/lib/projects";

export default function Home() {
  const [lead, second, third] = featuredProjects;

  return (
    <>
      <Hero />

      <section id="work" className="shell pb-16 md:pb-24">
        <SectionHeading
          label="Selected work"
          title="Three things worth looking at"
          description="One personal product in progress, one final-year system built across three repositories, and one service split. Everything else is in the archive."
          action={{ href: "/work", label: `All ${projects.length} projects` }}
        />

        <div className="grid gap-5 md:grid-cols-12">
          {lead && (
            <div className="min-w-0 md:col-span-12 lg:col-span-7">
              <ProjectCard project={lead} size="lg" />
            </div>
          )}
          {second && (
            <div className="min-w-0 md:col-span-6 lg:col-span-5">
              <ProjectCard project={second} />
            </div>
          )}
          {third && (
            <div className="min-w-0 md:col-span-6 lg:col-span-5">
              <ProjectCard project={third} />
            </div>
          )}

          <div className="min-w-0 md:col-span-12 lg:col-span-7">
            <Glass
              as="section"
              className="flex h-full flex-col justify-between p-6 md:p-8"
            >
              <div>
                <p className="t-label text-ink-3">Archive</p>
                <p className="t-2xl mt-3 max-w-[26ch]">
                  Coursework and experiments, kept honest about their age.
                </p>
              </div>
              <p className="t-sm mt-6 max-w-[46ch] text-ink-2">
                {projects.length - 3} more repositories: an ASP.NET MVC system,
                a two-file Python sketch, an Ionic gallery, and the Swift music
                player that started it.
              </p>
              <Link
                href="/work"
                className="t-sm mt-6 inline-flex items-center gap-1.5 self-start text-ink-2 transition-colors duration-200 hover:text-ink"
              >
                Browse everything
                <span aria-hidden="true">→</span>
              </Link>
            </Glass>
          </div>
        </div>
      </section>

      <section id="experience" className="shell pb-16 md:pb-24">
        <SectionHeading
          label="Experience"
          title="Middleware reliability, then platform development"
          description="Three roles at Dell Technologies since 2022, from keeping message queues alive to shipping the APIs and configuration tooling that sit on top of them."
          action={{ href: "/about", label: "More about me" }}
        />
        <ExperiencePanel title="Dell Technologies · Cyberjaya">
          <ExperienceList />
        </ExperiencePanel>
      </section>

      <section className="shell pb-16 md:pb-24">
        <SectionHeading
          label="Capabilities"
          title="What I work with"
          description="Taken from the roles above, not a wish list. Anything I have not shipped with is not on here."
        />
        <SkillsPanel />
      </section>

      <div className="shell pb-4">
        <ContactBand />
      </div>
    </>
  );
}
