"use client";

import { useEffect, useRef } from "react";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  containerClassName = "",
  className = "",
  size = "80vw",
}: {
  gradientBackgroundStart?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  containerClassName?: string;
  className?: string;
  size?: string;
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = interactiveRef.current;
    if (!container) return;

    // Fixed starting positions
    let x = 50;
    let y = 50;
    let dx = 1;
    let dy = 1;

    const animate = () => {
      // Bounce effect
      if (x >= 100 || x <= 0) dx *= -1;
      if (y >= 100 || y <= 0) dy *= -1;

      x += dx * 0.2;
      y += dy * 0.2;

      container.style.setProperty("--x", `${x}%`);
      container.style.setProperty("--y", `${y}%`);

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div
      className={`h-full w-full relative overflow-hidden ${containerClassName}`}
      style={{ height: size, width: size }}
    >
      <div
        ref={interactiveRef}
        className={`relative h-full w-full ${className}`}
        style={{
          background: gradientBackgroundStart,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                circle at var(--x, 50%) var(--y, 50%),
                rgba(${firstColor}, 0.5) 0%,
                rgba(${secondColor}, 0.3) 20%,
                rgba(${thirdColor}, 0.1) 40%,
                transparent 60%
              )
            `,
            transition: "all 0.15s ease",
          }}
        />
      </div>
    </div>
  );
};
