/**
 * Single source of truth for who this site is about.
 * Every string here is traceable to the canonical resume (v2-3, captured
 * 2026-04-28). Nothing invented: no metrics, no employers, no awards.
 */

export const profile = {
  name: "Muhammad Yusuf Budiawan",
  shortName: "Yusuf Budiawan",
  initials: "YB",
  role: "Software Engineer",
  discipline: "Backend & full-stack",
  location: "Kuala Lumpur, Malaysia",
  employer: "Dell Technologies",
  email: "myusufbudiawan@gmail.com",
  github: "https://github.com/myusufbudiawan",
  linkedin: "https://www.linkedin.com/in/yusuf-budiawan",
  headline:
    "Marketplace platforms, APIs, and the LLM tooling that configures them.",
  intro:
    "Software Engineer 2 at Dell Technologies in Cyberjaya. I build REST APIs and configuration tooling for a marketplace orchestration platform that runs eight-plus retailer integrations on an on-premise Kubernetes cluster, and I use LLMs to make that configuration work legible to people who never touch the config.",
  availability: "Open to backend and full-stack roles",
} as const;

export const specSheet: { label: string; value: string }[] = [
  { label: "Currently", value: "Software Engineer 2, Dell Technologies" },
  { label: "Focus", value: ".NET APIs, workflow config, local LLMs" },
  { label: "Core stack", value: ".NET 8, Python, TypeScript, Kubernetes" },
  { label: "Based in", value: "Kuala Lumpur, Malaysia" },
];

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  summary: string;
  points: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    role: "Software Engineer 2 (.NET Developer)",
    company: "Dell Technologies",
    location: "Cyberjaya",
    period: "Since Oct 2024",
    current: true,
    summary:
      "Marketplace orchestration platform: APIs, retailer onboarding, and a natural-language configuration assistant.",
    points: [
      "Built CRUD REST endpoints and OAuth-secured routes for a .NET 8 marketplace orchestration platform on an on-premise Kubernetes cluster, supporting workflow and job management across 8+ marketplace integrations.",
      "Led onboarding of retailer integrations (NewEgg, eBay, Best Buy and Plugg.To) by building configurable workflow engines and data-mapping logic, plus the internal retailer configuration UI used by TPX operations teams.",
      "Designed a natural-language-to-config assistant on a company-hosted local LLM, translating plain-language requests into generated retailer workflow configurations and explaining existing configs to non-technical stakeholders.",
      "Applied the Specification design pattern for flexible, extensible PATCH operations on quoted baskets; hardened authentication by removing an insecure fallback and adding OAuth to dashboard APIs.",
      "Drove end-to-end test automation with AutoGenius across 10+ release cycles, and used Devin for feature enablement, bug fixes, unit-test authoring and prototyping.",
    ],
    stack: [".NET 8", "REST", "OAuth", "Kubernetes", "Local LLM", "AutoGenius"],
  },
  {
    role: "Software Engineer 1 (Middleware SRE)",
    company: "Dell Technologies",
    location: "Cyberjaya",
    period: "Feb 2023 to Oct 2024",
    summary:
      "Reliability for the message and file-transfer layer: monitoring, incident response, and the automation that removed the manual steps.",
    points: [
      "Kept middleware products reliable under production load (IBM MQ, Kafka, Axway SecureTransport, OpenText BizManager) through monitoring, incident response and automation tooling in Python, PowerShell and GitLab CI.",
      "Led incident response and postmortem analysis, establishing a continuous-improvement loop across cross-functional teams.",
    ],
    stack: ["IBM MQ", "Kafka", "Python", "PowerShell", "GitLab CI"],
  },
  {
    role: "Undergraduate Intern",
    company: "Dell Technologies",
    location: "Cyberjaya",
    period: "Feb 2022 to Jul 2022",
    summary:
      "Automated the manual data collection a factory floor was doing by email, then gave it a dashboard.",
    points: [
      "Automated email-based data collection with Python and built a Grafana / Power BI dashboard joining multiple data sources for real-time visibility into Dell factory operations.",
    ],
    stack: ["Python", "Grafana", "Power BI"],
  },
];

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages & frameworks",
    items: [".NET", "C#", "Python", "TypeScript", "React Native (Expo)"],
  },
  {
    label: "AI-assisted development",
    items: ["Devin", "Claude Code", "Prompt engineering", "Local LLM integration"],
  },
  {
    label: "Infrastructure",
    items: ["Kubernetes", "Linux", "GitLab CI/CD", "REST APIs", "Supabase"],
  },
  {
    label: "Practice",
    items: [
      "API design",
      "Automation",
      "Design patterns",
      "Unit testing",
    ],
  },
];

export const education = {
  degree: "Bachelor of Software Engineering (Hons.)",
  school: "UNIMY, Petaling Jaya",
  period: "2019 to 2022",
  cgpa: "3.84",
  note: "Student Representative, working with Jabatan Kebajikan Sepang on mental-health awareness initiatives.",
};

export const languages = ["Malay (Native)", "English (Fluent)"];
