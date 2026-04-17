import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Link from "next/link";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="font-sans max-w-4xl mx-auto p-4">
      <Header />
      <article className="py-12">
        <Link
          href="/work"
          className="inline-block text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          ← Back to Work
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
              {project.status}
            </span>
            <span className="text-sm text-muted-foreground">{project.year}</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
          <p className="text-xl text-muted-foreground">{project.tagline}</p>
        </div>

        <div
          className="aspect-video rounded-lg mb-8 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(100, 116, 139, 0.15) 0%, rgba(100, 116, 139, 0.05) 100%)'
          }}
        >
          <h2 className="text-5xl font-bold text-slate-600 dark:text-slate-400 text-center px-4">
            {project.title}
          </h2>
        </div>

        <div className="prose max-w-none mb-8">
          <p className="text-lg leading-relaxed">{project.description}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
            Technologies
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm border border-border rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-foreground text-background rounded-md hover:bg-accent hover:text-background transition-colors"
          >
            View Repository
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-border rounded-md hover:bg-secondary transition-colors"
            >
              Live Demo
            </a>
          )}
        </div>
      </article>
    </main>
  );
}
