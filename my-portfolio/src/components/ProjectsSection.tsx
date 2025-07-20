'use client';

import { motion } from "framer-motion";
import { projects } from "@/lib/projects"

export default function ProjectsSection() {
    return (
        <motion.section id="projects" className="py-6"
            initial = {{ opacity: 0, y: 10 }}
            whileInView = {{ opacity: 1, y: 0 }}
            transition = {{ duration: 0.5 }}>
            <h2 className="text-2xl font-semibold text-left mb-4">Projects</h2>
            <div className="grid gap-6 ms:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {
                    projects.map((project) => (
                        <div key={project.title} className="border border-gray-300 bg-gray-50 rounded-lg p-4 hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold">{project.title}</h3>
                            <p className="mt-2">{project.description}</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                    <span key={tech} className="text-xs bg-gray-500 text-gray-100 px-2 py-1 rounded">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-3 inline-block text-indigo-400 hover:underline"
                                    >
                                        View project
                                </a>
                            )}
                        </div>
                    ))}
            </div>
        </motion.section>
    );
}