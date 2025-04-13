"use client";
import React from "react";
import { StarsBackground } from "@/components/ui/stars-background";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-950 z-50 overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0">
        <StarsBackground />
      </div>

      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Spinner */}
      <motion.div
        className="w-16 h-16 rounded-full relative z-20"
        style={{
          background: "conic-gradient(from 0deg, #a855f7, #3b82f6, #ec4899, #a855f7)",
          maskImage: "radial-gradient(farthest-side, transparent 95%, black 87%)",
          WebkitMaskImage: "radial-gradient(farthest-side, transparent 95%, black 87%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
      />
    </div>
  );
}
