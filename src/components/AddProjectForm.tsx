"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";

export default function AddProjectForm() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    tagline: "",
    tags: "",
    year: new Date().getFullYear(),
    coverImage: "",
    description: "",
    liveUrl: "",
    repoUrl: "",
    featured: false,
    status: "wip" as "live" | "wip" | "archived",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    // Auto-generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const previewProject: Project = {
    title: formData.title || "Project Title",
    slug: formData.slug || "project-slug",
    tagline: formData.tagline || "Project tagline goes here",
    tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
    year: formData.year,
    coverImage: formData.coverImage || "/placeholder.jpg",
    description: formData.description || "Project description will appear here.",
    liveUrl: formData.liveUrl || undefined,
    repoUrl: formData.repoUrl || "https://github.com/username/repo",
    featured: formData.featured,
    status: formData.status,
  };

  const generateCode = () => {
    const code = `  {
    title: "${formData.title}",
    slug: "${formData.slug}",
    tagline: "${formData.tagline}",
    tags: [${formData.tags.split(",").map((t) => `"${t.trim()}"`).join(", ")}],
    year: ${formData.year},
    coverImage: "${formData.coverImage}",
    description: "${formData.description}",
    ${formData.liveUrl ? `liveUrl: "${formData.liveUrl}",` : ""}
    repoUrl: "${formData.repoUrl}",
    ${formData.featured ? "featured: true," : ""}
    status: "${formData.status}",
  },`;
    return code;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCode());
    alert("Code copied to clipboard! Paste it into src/lib/projects.ts");
  };

  return (
    <div className="max-w-6xl mx-auto p-4 grid gap-8 lg:grid-cols-2">
      <div>
        <h1 className="text-3xl font-bold mb-2">Add New Project</h1>
        <p className="text-muted-foreground mb-8">
          Fill in the details below to generate project code for your portfolio.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">GitHub Repository URL *</label>
            <input
              type="url"
              name="repoUrl"
              value={formData.repoUrl}
              onChange={handleChange}
              placeholder="https://github.com/username/repo"
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Project Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="My Awesome Project"
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Slug (auto-generated)</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="my-awesome-project"
              className="w-full px-3 py-2 border border-border rounded-md bg-muted-foreground/20"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tagline *</label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              placeholder="A short, catchy description"
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma-separated) *</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="React, TypeScript, Node.js"
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Year *</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cover Image Path *</label>
            <input
              type="text"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="/project-image.jpg"
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Place image in public/ folder and reference it here
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your project in detail..."
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Live URL (optional)</label>
            <input
              type="url"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              placeholder="https://myproject.com"
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              required
            >
              <option value="live">Live</option>
              <option value="wip">Work in Progress</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              id="featured"
              className="w-4 h-4"
            />
            <label htmlFor="featured" className="text-sm font-medium">
              Featured project
            </label>
          </div>

          <button
            type="button"
            onClick={copyToClipboard}
            className="w-full px-4 py-2 bg-foreground text-background rounded-md hover:bg-accent hover:text-background transition-colors"
          >
            Copy Code to Clipboard
          </button>
        </form>
      </div>

      <div className="lg:sticky lg:top-24 h-fit">
        <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
        <div className="border border-border rounded-lg overflow-hidden">
          <div
            className="aspect-video flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(100, 116, 139, 0.15) 0%, rgba(100, 116, 139, 0.05) 100%)'
            }}
          >
            <h3 className="text-3xl font-bold text-slate-600 dark:text-slate-400 text-center px-4 line-clamp-2">
              {previewProject.title}
            </h3>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                {previewProject.status}
              </span>
              <span className="text-xs text-muted-foreground">{previewProject.year}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{previewProject.tagline}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {previewProject.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {previewProject.description}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">
            Generated Code
          </h3>
          <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
            <code>{generateCode()}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
