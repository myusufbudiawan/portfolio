import HeroSection from "@/components/HeroSection";
import FeaturedTeaser from "@/components/FeaturedTeaser";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="font-sans max-w-4xl mx-auto p-4">
      <Header />
      <HeroSection />
      <FeaturedTeaser />
    </main>
  );
}