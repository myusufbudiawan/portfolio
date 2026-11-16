import Link from "next/link";
import Glass from "@/components/Glass";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] items-center pt-32">
      <Glass className="w-full p-8 md:p-12">
        <p className="t-label text-ink-3">Error 404</p>
        <h1 className="t-3xl mt-4 max-w-[24ch]">
          That page is not here. The work is.
        </h1>
        <p className="t-base measure mt-4 text-ink-2">
          The link may be out of date. Every project lives under{" "}
          <code className="font-mono text-ink">/work</code>.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/work" className="btn btn-primary">
            See the work
          </Link>
          <Link href="/" className="btn btn-glass">
            Back home
          </Link>
        </div>
      </Glass>
    </section>
  );
}
