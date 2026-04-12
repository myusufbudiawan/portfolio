import { projects } from "@/lib/projects";
import Header from "@/components/Header";

export default function WorkPage() {
  return (
    <main className="font-sans max-w-4xl mx-auto p-4">
      <Header />
      <section className="py-12">
        <h1 className="text-3xl font-bold mb-2">Work</h1>
        <p className="text-muted-foreground mb-8">A selection of projects I've built.</p>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group block"
            >
              <div className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div
                  className="aspect-video flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(100, 116, 139, 0.15) 0%, rgba(100, 116, 139, 0.05) 100%)'
                  }}
                >
                  <h3 className="text-3xl font-bold text-slate-600 dark:text-slate-400 text-center px-4 line-clamp-2">
                    {project.title}
                  </h3>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                      {project.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{project.year}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{project.tagline}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
