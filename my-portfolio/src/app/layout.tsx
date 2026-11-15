import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { profile } from "@/lib/profile";

/**
 * System faces win on macOS (SF Pro) and Windows (Segoe UI); Inter is only the
 * fallback for Linux and Android. Self-hosted from a single latin variable
 * file rather than next/font/google: no third-party request at runtime, and a
 * Google outage cannot break the build.
 */
const inter = localFont({
  src: "./fonts/inter-latin-var.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "400 600",
  fallback: ["system-ui", "sans-serif"],
});

const siteUrl = "https://myusufbudiawan.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} · ${profile.discipline} engineer`,
    template: `%s · ${profile.name}`,
  },
  description:
    "Software Engineer 2 at Dell Technologies, Kuala Lumpur. REST APIs, marketplace orchestration platforms on Kubernetes, and the LLM tooling that configures them.",
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: profile.name,
    title: `${profile.name} · ${profile.discipline} engineer`,
    description:
      "REST APIs, marketplace orchestration platforms on Kubernetes, and the LLM tooling that configures them.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} · ${profile.discipline} engineer`,
    description:
      "REST APIs, marketplace orchestration platforms on Kubernetes, and the LLM tooling that configures them.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f9" },
    { media: "(prefers-color-scheme: dark)", color: "#15171c" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <div className="aurora" aria-hidden="true">
          <span className="aurora-3" />
        </div>
        <div className="grain" aria-hidden="true" />

        <a href="#main" className="skip btn btn-primary">
          Skip to content
        </a>

        <Nav />

        <main id="main" className="relative">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
