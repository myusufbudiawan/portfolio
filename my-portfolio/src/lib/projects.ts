export type Project = {
  title: string;
  description: string;
  techStack: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    title: "AI-Powered Personal Finance Manager",
    description: "An application for analyzing personal spending habits and providing budget recommendations using AI.",
    techStack: ["Next.js", "Node.js", "PostgreSQL", "TensorFlow"],
    link: "#",
  },
  {
    title: "Blockchain-Based Secure Document Vault",
    description: "A document storage platform utilizing blockchain for verification and security.",
    techStack: ["Node.js", "Ethereum", "MongoDB"],
    link: "#",
  },
];
