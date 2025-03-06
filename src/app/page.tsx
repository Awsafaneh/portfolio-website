import { Navbar } from "../components/Navbar";
import Hero from "../components/Hero";
import Projects from "@/components/Projects";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { Footer } from "@/components/Footer";
import Resume from "@/components/Resume";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <StarsBackground />
        <ShootingStars />
      </div>

      <Navbar />

      <div className="container mx-auto space-y-20 md:space-y-24">
        <Hero />
        <Resume />
        <Projects />
      </div>

      <Footer />
    </main>
  );
}
