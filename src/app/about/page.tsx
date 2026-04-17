import Header from "@/components/Header";

export default function AboutPage() {
  return (
    <main className="font-sans max-w-4xl mx-auto p-4">
      <Header />
      <section className="py-12">
        <h1 className="text-3xl font-bold mb-8">About</h1>
        
        <div className="prose max-w-none mb-12">
          <p className="text-lg leading-relaxed">
            I am a Software Engineer with experience in managing middleware application and development of DotNet API for Dell Technologies.
          </p>
          <p className="text-lg leading-relaxed">
            I build clean, efficient solutions with a focus on user experience and maintainable code. Currently exploring modern web technologies and best practices.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
            Skills
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <h3 className="font-medium mb-2">Languages</h3>
              <p className="text-muted-foreground text-sm">TypeScript, JavaScript, C#, Python</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Frameworks</h3>
              <p className="text-muted-foreground text-sm">Next.js, React, .NET, Node.js</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Databases</h3>
              <p className="text-muted-foreground text-sm">PostgreSQL, MongoDB, SQL Server</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Tools</h3>
              <p className="text-muted-foreground text-sm">Git, Docker, AWS, Azure</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-12">
          <h2 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
            Get in Touch
          </h2>
          <p className="mb-6 text-muted-foreground">
            Feel free to reach out for collaborations or just a friendly hello.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:myusufbudiawan@gmail.com"
              className="inline-flex items-center px-4 py-2 bg-foreground text-background rounded-md hover:bg-accent hover:text-background transition-colors"
            >
              Email
            </a>
            <a
              href="https://github.com/myusufbudiawan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-border rounded-md hover:bg-secondary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://my.linkedin.com/in/yusuf-budiawan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-border rounded-md hover:bg-secondary transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
