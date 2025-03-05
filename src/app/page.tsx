import { Navbar } from "../components/Navbar";
import Hero from "../components/Hero";
import Projects from "@/components/Projects";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <StarsBackground />
        <ShootingStars />
      </div>

      <Navbar />

      <div className="relative z-10 space-y-32 pb-32">
        <Hero />
        <Projects />
      </div>

      <Footer />
    </main>
  );
}
