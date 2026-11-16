"use client";

import { useMemo, useState } from "react";
import Glass from "./Glass";

const statuses = ["Shipped", "In progress", "Archived"] as const;

type Status = (typeof statuses)[number];

const initial = {
  title: "",
  slug: "",
  year: new Date().getFullYear(),
  kicker: "",
  summary: "",
  description: "",
  highlights: "",
  stack: "",
  plate: "",
  repoUrl: "",
  status: "Archived" as Status,
  featured: false,
  hue: 52,
};

const fields =
  "w-full rounded-[var(--radius-sm)] border border-[var(--line)] bg-canvas-deep px-3 py-2.5 text-[0.9375rem] text-ink transition-colors duration-200 placeholder:text-ink-3 hover:border-[var(--line-strong)] focus:border-accent";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Dev helper: fills in a `projects.ts` entry in the shape the site now expects,
 * so adding a project does not mean re-reading the type definition.
 * Noindexed and kept out of the nav — it is a tool, not a page.
 */
export default function AddProjectForm() {
  const [form, setForm] = useState(initial);
  const [copied, setCopied] = useState(false);

  const update = <K extends keyof typeof initial>(
    key: K,
    value: (typeof initial)[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setCopied(false);
  };

  const listOf = (value: string) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const snippet = useMemo(() => {
    const highlights = form.highlights
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    return `  {
    slug: "${form.slug}",
    title: "${form.title}",
    year: ${form.year},
    kicker: "${form.kicker}",
    summary:
      "${form.summary}",
    description:
      "${form.description}",
    highlights: [
${highlights.map((line) => `      "${line}",`).join("\n")}
    ],
    stack: [${listOf(form.stack).map((item) => `"${item}"`).join(", ")}],
    plate: [${listOf(form.plate).map((item) => `"${item}"`).join(", ")}],
    ${form.repoUrl ? `repoUrl: "${form.repoUrl}",\n    ` : ""}status: "${form.status}",
    ${form.featured ? "featured: true,\n    " : ""}hue: ${form.hue},
  },`;
  }, [form]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="shell grid gap-8 pb-16 pt-32 md:pt-40 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <p className="t-label text-ink-3">Tool</p>
        <h1 className="t-3xl mt-3">New project entry</h1>
        <p className="t-sm measure mt-3 text-ink-2">
          Fill this in, copy the result, and paste it into the{" "}
          <code className="font-mono text-ink">projects</code> array in{" "}
          <code className="font-mono text-ink">src/lib/projects.ts</code>. The
          plate lines are the repository&rsquo;s own top-level folders. That is
          what the card shows, so there is no cover image to supply.
        </p>

        <form
          className="mt-8 space-y-5"
          onSubmit={(event) => event.preventDefault()}
        >
          <Field label="Title" htmlFor="title">
            <input
              id="title"
              className={fields}
              value={form.title}
              placeholder="Preemie Tracker"
              onChange={(event) => {
                update("title", event.target.value);
                update("slug", slugify(event.target.value));
              }}
              required
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Slug" htmlFor="slug">
              <input
                id="slug"
                className={`${fields} text-ink-2`}
                value={form.slug}
                readOnly
              />
            </Field>
            <Field label="Year" htmlFor="year">
              <input
                id="year"
                type="number"
                className={fields}
                value={form.year}
                onChange={(event) => update("year", Number(event.target.value))}
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Kicker" htmlFor="kicker">
              <input
                id="kicker"
                className={fields}
                value={form.kicker}
                placeholder="Personal product"
                onChange={(event) => update("kicker", event.target.value)}
              />
            </Field>
            <Field label="Tint hue (0 to 360)" htmlFor="hue">
              <input
                id="hue"
                type="number"
                min={0}
                max={360}
                className={fields}
                value={form.hue}
                onChange={(event) => update("hue", Number(event.target.value))}
              />
            </Field>
          </div>

          <Field label="Summary (one sentence for the card)" htmlFor="summary">
            <input
              id="summary"
              className={fields}
              value={form.summary}
              placeholder="Offline-first care tracking for a premature baby."
              onChange={(event) => update("summary", event.target.value)}
            />
          </Field>

          <Field label="Description (the case-study paragraph)" htmlFor="description">
            <textarea
              id="description"
              rows={4}
              className={fields}
              value={form.description}
              onChange={(event) => update("description", event.target.value)}
            />
          </Field>

          <Field
            label="Highlights (one per line)"
            htmlFor="highlights"
            hint="Facts only. If it cannot be checked, it does not belong here."
          >
            <textarea
              id="highlights"
              rows={4}
              className={fields}
              value={form.highlights}
              onChange={(event) => update("highlights", event.target.value)}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Stack (comma separated)" htmlFor="stack">
              <input
                id="stack"
                className={fields}
                value={form.stack}
                placeholder="React Native, Supabase"
                onChange={(event) => update("stack", event.target.value)}
              />
            </Field>
            <Field label="Plate (top-level paths)" htmlFor="plate">
              <input
                id="plate"
                className={fields}
                value={form.plate}
                placeholder="src/, app/"
                onChange={(event) => update("plate", event.target.value)}
              />
            </Field>
          </div>

          <Field label="Repository URL (optional)" htmlFor="repoUrl">
            <input
              id="repoUrl"
              type="url"
              className={fields}
              value={form.repoUrl}
              placeholder="https://github.com/myusufbudiawan/…"
              onChange={(event) => update("repoUrl", event.target.value)}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Status" htmlFor="status">
              <select
                id="status"
                className={fields}
                value={form.status}
                onChange={(event) => update("status", event.target.value as Status)}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </Field>

            <div className="flex items-end pb-2">
              <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-[0.9375rem]">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-[var(--accent)]"
                  checked={form.featured}
                  onChange={(event) => update("featured", event.target.checked)}
                />
                Featured on the home page
              </label>
            </div>
          </div>
        </form>
      </div>

      <div className="lg:col-span-6">
        <div className="lg:sticky lg:top-28">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="t-label text-ink-3">Generated entry</h2>
            <button type="button" onClick={copy} className="btn btn-primary h-9 min-h-9 px-4 text-xs">
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <Glass className="overflow-hidden">
            <pre className="max-h-[70vh] overflow-auto p-5 font-mono text-[0.75rem] leading-[1.7] text-ink-2">
              <code>{snippet}</code>
            </pre>
          </Glass>

          <p aria-live="polite" className="t-xs mt-3 text-ink-3">
            {copied
              ? "Copied. Paste it as the first element of the projects array."
              : "Copy is offline-safe. It writes to the clipboard only."}
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="t-sm mb-1.5 block font-medium">
        {label}
      </label>
      {children}
      {hint && <p className="t-xs mt-1.5 text-ink-3">{hint}</p>}
    </div>
  );
}
