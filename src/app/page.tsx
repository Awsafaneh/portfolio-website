"use client";
import { Navbar } from "../components/Navbar";
import Hero from "../components/Hero";
import Projects from "@/components/Projects";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { Footer } from "@/components/Footer";
import Resume from "@/components/Resume";
import SnakeGame from "@/components/SnakeGame";
import { useState, useEffect } from "react";

export default function Home() {
  const [showSnake, setShowSnake] = useState(false);

  useEffect(() => {
    const konami = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konami[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konami.length) {
          setShowSnake(true);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
      {showSnake && <SnakeGame onClose={() => setShowSnake(false)} />}
    </main>
  );
}
