import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import ContactBand from "@/components/ContactBand";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Repositories by Muhammad Yusuf Budiawan: an offline-first React Native product, a three-repository final-year system, and Spring Boot microservices.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="shell pt-32 pb-10 md:pt-40">
        <p className="t-label rise text-ink-3">Work</p>
        <h1 className="t-display rise rise-1 mt-4 max-w-[20ch]">
          Everything, including the old stuff.
        </h1>
        <p className="t-lg measure rise rise-2 mt-6 text-ink-2">
          Seven repositories, ordered newest first. The corporate work at Dell
          is not here, because that code belongs to the employer, but the shape of it
          is in the experience section on the home page.
        </p>
      </section>

      <section className="shell pb-16 md:pb-24">
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className={`min-w-0 ${index === 0 ? "md:col-span-2" : ""}`}
            >
              <ProjectCard
                project={project}
                size={index === 0 ? "lg" : "md"}
                level={2}
              />
            </div>
          ))}
        </div>
      </section>

      <div className="shell pb-4">
        <ContactBand />
      </div>
    </>
  );
}
