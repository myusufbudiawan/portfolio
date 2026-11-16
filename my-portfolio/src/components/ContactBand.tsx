import Glass from "./Glass";
import { profile } from "@/lib/profile";

export default function ContactBand() {
  return (
    <Glass
      as="section"
      className="specular overflow-hidden p-7 md:p-12"
      aria-labelledby="contact"
    >
      <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="t-label text-ink-3">Contact</p>
          <h2 id="contact" className="t-3xl mt-3 max-w-[22ch]">
            Hiring for a backend or full-stack role?
          </h2>
          <p className="t-base measure mt-3.5 text-ink-2">
            I answer email directly, with no form and no recruiter funnel. Tell me what
            the team is building and I will tell you whether I have done
            something close to it.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          <a href={`mailto:${profile.email}`} className="btn btn-primary">
            Email me
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-glass"
          >
            LinkedIn
            <span aria-hidden="true" className="text-ink-3">
              ↗
            </span>
          </a>
        </div>
      </div>
    </Glass>
  );
}
