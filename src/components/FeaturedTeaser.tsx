import { projects } from "@/lib/projects";
import Link from "next/link";

export default function FeaturedTeaser() {
  const featuredProject = projects.find((p) => p.featured);

  if (!featuredProject) return null;

  return (
    <section className="py-12 border-t border-border">
      <h2 className="text-sm font-semibold mb-6 text-muted-foreground uppercase tracking-wider">
        Featured Project
      </h2>
      <Link
        href={`/work/${featuredProject.slug}`}
        className="group block"
      >
        <div className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
          <div
            className="aspect-video flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(100, 116, 139, 0.15) 0%, rgba(100, 116, 139, 0.05) 100%)'
            }}
          >
            <h3 className="text-4xl font-bold text-slate-600 dark:text-slate-400 text-center px-4 line-clamp-2">
              {featuredProject.title}
            </h3>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                {featuredProject.status}
              </span>
              <span className="text-xs text-muted-foreground">{featuredProject.year}</span>
            </div>
            <p className="text-muted-foreground mb-4">{featuredProject.tagline}</p>
            <span className="text-sm text-slate-600 dark:text-slate-400 inline-flex items-center gap-1">
              View project →
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
