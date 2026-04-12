export type Project = {
  title: string;
  slug: string;
  tagline: string;
  tags: string[];
  year: number;
  coverImage: string;
  description: string;
  liveUrl?: string;
  repoUrl: string;
  featured?: boolean;
  status: "live" | "wip" | "archived";
};

export const projects: Project[] = [
  {
    title: "AI-Powered Personal Finance Manager",
    slug: "ai-finance-manager",
    tagline: "Smart budgeting with AI insights",
    tags: ["Next.js", "Node.js", "PostgreSQL", "TensorFlow", "AI"],
    year: 2024,
    coverImage: "/placeholder-project-1.jpg",
    description: "An application for analyzing personal spending habits and providing budget recommendations using AI. Features include automated categorization, spending pattern analysis, and personalized financial advice based on historical data.",
    repoUrl: "https://github.com/myusufbudiawan/ai-finance-manager",
    featured: true,
    status: "live",
  },
  {
    title: "Blockchain-Based Secure Document Vault",
    slug: "blockchain-document-vault",
    tagline: "Decentralized document verification",
    tags: ["Node.js", "Ethereum", "MongoDB", "Blockchain", "Web3"],
    year: 2023,
    coverImage: "/placeholder-project-2.jpg",
    description: "A document storage platform utilizing blockchain for verification and security. Documents are hashed and stored on-chain for immutable proof of existence, with encrypted off-chain storage for the actual content.",
    repoUrl: "https://github.com/myusufbudiawan/blockchain-vault",
    featured: false,
    status: "archived",
  },
];
