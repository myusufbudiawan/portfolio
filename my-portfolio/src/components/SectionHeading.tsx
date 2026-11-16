import Link from "next/link";

export default function SectionHeading({
  label,
  title,
  description,
  action,
}: {
  label: string;
  title: string;
  description?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="t-label text-ink-3">{label}</p>
        <h2 className="t-3xl mt-3">{title}</h2>
        {description && (
          <p className="t-base measure mt-3 text-ink-2">{description}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="t-sm group inline-flex shrink-0 items-center gap-1.5 text-ink-2 transition-colors duration-200 hover:text-ink"
        >
          {action.label}
          <span
            aria-hidden="true"
            className="transition-transform duration-[220ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      )}
    </div>
  );
}
