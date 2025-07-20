import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <main className = "min-h-screen flex flex-col items-center justify-center px-4">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />

    </main>
  )
}