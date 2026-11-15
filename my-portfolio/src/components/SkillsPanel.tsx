import Glass from "./Glass";
import { skillGroups, languages, education } from "@/lib/profile";

const cellBorders = [
  "border-b border-[var(--line)] md:border-r",
  "border-b border-[var(--line)]",
  "border-b border-[var(--line)] md:border-b-0 md:border-r",
  "",
];

export default function SkillsPanel() {
  return (
    <Glass as="section" aria-labelledby="toolbox" className="overflow-hidden">
      <div className="border-b border-[var(--line)] px-6 py-5 md:px-8">
        <h2 id="toolbox" className="t-label text-ink-3">
          Toolbox
        </h2>
      </div>
      <div className="grid md:grid-cols-2">
        {skillGroups.map((group, index) => (
          <div
            key={group.label}
            className={`p-6 md:p-8 ${cellBorders[index] ?? ""}`}
          >
            <h3 className="t-sm font-medium">{group.label}</h3>
            <ul className="mt-3.5 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-[var(--radius-xs)] bg-canvas-deep px-2.5 py-1 text-[0.8125rem] text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Glass>
  );
}

export function EducationPanel() {
  return (
    <Glass as="section" className="p-6 md:p-8">
      <h2 className="t-label text-ink-3">Education</h2>
      <p className="t-lg mt-4">{education.degree}</p>
      <p className="t-sm mt-1.5 text-ink-2">
        {education.school} · <span className="tnum">CGPA {education.cgpa}</span>{" "}
        · <span className="tnum">{education.period}</span>
      </p>
      <p className="t-sm mt-4 text-ink-2">{education.note}</p>

      <div className="rule my-6" />

      <h2 className="t-label text-ink-3">Languages</h2>
      <p className="t-sm mt-3 text-ink-2">{languages.join(" · ")}</p>
    </Glass>
  );
}
