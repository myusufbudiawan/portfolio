import Link from "next/link";
import { profile } from "@/lib/profile";

const elsewhere = [
  { label: "GitHub", href: profile.github, external: true },
  { label: "LinkedIn", href: profile.linkedin, external: true },
  { label: "Email", href: `mailto:${profile.email}`, external: false },
];

export default function Footer() {
  return (
    <footer className="shell mt-24 pb-10 md:mt-32">
      <div className="rule mb-8" />
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="t-sm font-medium">{profile.name}</p>
          <p className="t-xs mt-1.5 text-ink-3">
            {profile.role} · {profile.employer} · {profile.location}
          </p>
        </div>

        <nav aria-label="Elsewhere">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {elsewhere.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="t-sm text-ink-2 transition-colors duration-200 hover:text-ink"
                >
                  {item.label}
                  {item.external && (
                    <span aria-hidden="true" className="ml-1 text-ink-3">
                      ↗
                    </span>
                  )}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/work"
                className="t-sm text-ink-2 transition-colors duration-200 hover:text-ink"
              >
                Work
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <p className="t-xs mt-10 text-ink-3">
        Built with Next.js and Tailwind. Type set in your system face; the glass
        is CSS, the colour is an OKLCH gradient, and there are no images.
      </p>
    </footer>
  );
}
