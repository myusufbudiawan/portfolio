/**
 * Real projects only.
 *
 * Every entry maps to a repository that exists at github.com/myusufbudiawan,
 * or to the Preemie Tracker described in the resume (private repository — no
 * link). Copy is limited to what the repository contents actually show:
 * language, module layout, and stated purpose. `plate` is that layout, used as
 * the card's cover — the structure is the visual.
 */

export type Project = {
  slug: string;
  title: string;
  year: number;
  kicker: string;
  summary: string;
  description: string;
  highlights: string[];
  stack: string[];
  plate: string[];
  repoUrl?: string;
  status: "Shipped" | "In progress" | "Archived";
  featured?: boolean;
  /** Hue for the card tint. Low chroma on purpose, applied in globals.css. */
  hue: number;
};

export const projects: Project[] = [
  {
    slug: "preemie-tracker",
    title: "Preemie Tracker",
    year: 2026,
    kicker: "Personal product",
    summary:
      "Offline-first care and pumping schedule tracking for a premature baby, synced between two phones.",
    description:
      "A two-person app built around one constraint: the record has to keep working in a NICU with bad signal. Every write lands in a local store first and reconciles to Supabase when a connection is available, so both caregivers see the same schedule without either of them waiting on a round trip. Built end to end with Claude Code, from schema to the Expo screens.",
    highlights: [
      "Offline-first local persistence with realtime sync across two devices",
      "Care log and pumping schedule modelled around one baby and two caregivers",
      "Built end to end, from schema to sync layer to Expo UI, with Claude Code",
      "Private repository, so there is no public link to show",
    ],
    stack: ["React Native", "Expo", "TypeScript", "Supabase", "Claude Code"],
    plate: [
      "local store first",
      "sync → Supabase",
      "realtime channel",
      "Expo screens",
    ],
    status: "In progress",
    featured: true,
    hue: 52,
  },
  {
    slug: "mycovid",
    title: "MyCovid",
    year: 2021,
    kicker: "Final-year project",
    summary:
      "A health-tracking Android client with its own Spring backend and a separate client SDK.",
    description:
      "The final-year project for my degree, shipped as three repositories: the Android application, a Spring Boot backend, and a client SDK that wraps the API for the app. The application layer is a Gradle Android module with its own screenshot set, and the whole system is documented in a written project report.",
    highlights: [
      "Android client, Spring Boot backend and a wrapper SDK as separate repositories",
      "REST API consumed through a first-party SDK rather than calls scattered across screens",
      "Documented in a full final-year project report",
    ],
    stack: ["Java", "Android", "Spring Boot", "Gradle"],
    plate: [
      "app/ (Android)",
      "mycovid-backend/",
      "mycovid-backend-sdk/",
      "FYP2 Report.pdf",
    ],
    repoUrl: "https://github.com/myusufbudiawan/MyCovid",
    status: "Archived",
    featured: true,
    hue: 202,
  },
  {
    slug: "shopping-microservice",
    title: "Shopping Microservice",
    year: 2024,
    kicker: "Service architecture",
    summary:
      "Five Maven modules: an API gateway, Eureka discovery, and independent cart, order and product services.",
    description:
      "A working split of a shopping backend into independently deployable Spring Boot services, fronted by a Spring Cloud Gateway and registered through Eureka so no module hard-codes another's address. Cart, order and product each own their domain and their own build.",
    highlights: [
      "Spring Cloud Gateway in front of three domain services",
      "Eureka server for discovery, so services resolve each other by name",
      "One Maven module per service, with independent builds and deploys",
    ],
    stack: ["Java", "Spring Boot", "Spring Cloud Gateway", "Eureka", "Maven"],
    plate: [
      "api_gateway/",
      "eureka-server/",
      "cart-service/",
      "order_service/",
      "product-service/",
    ],
    repoUrl:
      "https://github.com/myusufbudiawan/Shopping-Microservice-with-Java",
    status: "Archived",
    featured: true,
    hue: 148,
  },
  {
    slug: "appointment-scheduling",
    title: "Appointment Scheduling",
    year: 2022,
    kicker: "Coursework",
    summary:
      "ASP.NET Core MVC appointment system with EF Core migrations and a server-rendered admin surface.",
    description:
      "A conventional MVC application: controllers, Razor views, and an Entity Framework Core model layer with checked-in migrations for the schema history. The kind of CRUD shape you have to build once, properly, before you can see where a real system starts to bend.",
    highlights: [
      "Controllers, Razor views and models organised by concern",
      "EF Core migrations committed alongside the code",
      "Client-side libraries managed through libman rather than a bundler",
    ],
    stack: ["C#", "ASP.NET Core MVC", "Entity Framework Core", "Razor"],
    plate: ["Controllers/", "Models/", "Views/", "Migrations/"],
    repoUrl: "https://github.com/myusufbudiawan/AppointmentScheduling",
    status: "Archived",
    hue: 250,
  },
  {
    slug: "dall-e-mini",
    title: "DALL·E Mini",
    year: 2022,
    kicker: "Experiment",
    summary:
      "A deliberately small Python experiment: one entry script driving a thin image-generation client.",
    description:
      "Two files, one idea: how little code does a text-to-image workflow actually need? `main.py` is the entry point and `dalle.py` holds the client. Kept short on purpose, as a way to read the API surface instead of hiding it behind a framework.",
    highlights: [
      "Entry script and client kept separate, with no framework in between",
      "Written to read the underlying API rather than wrap it",
    ],
    stack: ["Python"],
    plate: ["main.py", "dalle.py"],
    repoUrl: "https://github.com/myusufbudiawan/DALL-E-Mini",
    status: "Archived",
    hue: 30,
  },
  {
    slug: "photo-gallery",
    title: "Photo Gallery",
    year: 2020,
    kicker: "Coursework",
    summary:
      "Cross-platform mobile gallery built with Ionic and Angular, packaged for native with Capacitor.",
    description:
      "A web codebase shipped as a mobile app: Angular for the application, Ionic for the components and platform conventions, Capacitor for the native container. Includes an e2e suite and the Karma unit-test setup that ships with the starter.",
    highlights: [
      "One Angular codebase targeting web and native through Capacitor",
      "E2E and unit-test scaffolding wired in from the start",
    ],
    stack: ["TypeScript", "Angular", "Ionic", "Capacitor"],
    plate: ["src/", "e2e/", "ionic.config.json", "capacitor.config.json"],
    repoUrl: "https://github.com/myusufbudiawan/photoGallery",
    status: "Archived",
    hue: 195,
  },
  {
    slug: "yupotify",
    title: "Yupotify",
    year: 2020,
    kicker: "Coursework",
    summary:
      "An iOS music player in Swift, with unit and UI test targets from the Xcode project.",
    description:
      "A native iOS player built as an Xcode project with both a unit-test and a UI-test target. The earliest thing here, and the reason I still reach for a test target before a feature list.",
    highlights: [
      "Swift, native Xcode project",
      "Unit and UI test targets kept alongside the app",
    ],
    stack: ["Swift", "Xcode", "iOS"],
    plate: [
      "Yupotify/",
      "YupotifyTests/",
      "YupotifyUITests/",
      "Yupotify.xcodeproj",
    ],
    repoUrl: "https://github.com/myusufbudiawan/Yupotify",
    status: "Archived",
    hue: 240,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNeighbours(slug: string): {
  previous?: Project;
  next?: Project;
} {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return {};
  return {
    previous: index > 0 ? projects[index - 1] : undefined,
    next: index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}
