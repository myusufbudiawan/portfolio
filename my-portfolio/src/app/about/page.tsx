import type { Metadata } from "next";
import ExperienceList, { ExperiencePanel } from "@/components/ExperienceList";
import { EducationPanel } from "@/components/SkillsPanel";
import ContactBand from "@/components/ContactBand";
import Portrait from "@/components/Portrait";
import { profile } from "@/lib/profile";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software Engineer 2 at Dell Technologies. From middleware SRE to .NET platform development: API design, marketplace integrations, and local-LLM tooling.",
  alternates: { canonical: "/about" },
};

const paragraphs = [
  "I started at Dell Technologies as an undergraduate intern, automating the email-based data collection a factory floor was doing by hand and putting the result on a Grafana and Power BI dashboard. I came back after graduating as a middleware SRE, keeping IBM MQ, Kafka, Axway SecureTransport and OpenText BizManager alive through production incidents, and writing the Python and PowerShell that removed the manual steps around them.",
  "In October 2024 I moved onto the platform itself: REST APIs and OAuth-secured routes for a .NET 8 marketplace orchestration platform running on an on-premise Kubernetes cluster, then retailer onboarding for NewEgg, eBay, Best Buy and Plugg.To: configurable workflow engines, data mapping, and the internal configuration UI the operations teams actually use.",
  "The work I keep gravitating toward is making a system legible. The most recent example is a natural-language-to-configuration assistant on a company-hosted local model: it turns a plain-language request into a retailer workflow config, and explains an existing config back to someone who has never opened one. That is the same instinct as the SRE postmortems, pointed at a different audience.",
];

export default function AboutPage() {
  return (
    <>
      <section className="shell pt-32 pb-10 md:pt-40">
        <p className="t-label rise text-ink-3">About</p>
        <h1 className="t-display rise rise-1 mt-4 max-w-[16ch]">
          Who I am, in the order it happened.
        </h1>
      </section>

      <section className="shell pb-14 md:pb-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          {/* Photo first on phones, right-hand column from md up. */}
          <div className="min-w-0 md:order-2 md:col-span-5">
            <div className="rise rise-1">
              <Portrait
                aspect="4 / 5"
                priority
                sizes="(min-width: 768px) 40vw, 100vw"
                print
                className="max-w-md"
                focus="50% 22%"
              />
            </div>
          </div>

          <div className="min-w-0 md:order-1 md:col-span-7">
            <div className="space-y-5">
              {paragraphs.map((text, index) => (
                <p
                  key={index}
                  className={
                    index === 0
                      ? "t-lg text-ink"
                      : "t-base measure text-ink-2"
                  }
                >
                  {text}
                </p>
              ))}
            </div>

            <div className="rule my-8" />

            <p className="t-base measure text-ink-2">
              I am based in {profile.location} and currently pursuing
              development-focused roles. The part of the work I want more of is
              designing the API and the data model, rather than only operating
              them.
            </p>

            <div className="mt-8">
              <EducationPanel />
            </div>
          </div>
        </div>
      </section>

      <section className="shell pb-14 md:pb-20">
        <h2 className="t-label mb-6 text-ink-3">Experience</h2>
        <ExperiencePanel title="Dell Technologies · Cyberjaya">
          <ExperienceList />
        </ExperiencePanel>
      </section>

      <div className="shell pb-4">
        <ContactBand />
      </div>
    </>
  );
}
