"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

interface IntroTypographyProps {
  phase: "scene1" | "scene2" | "scene3" | "scene4" | "exit";
}

const KINETIC_WORDS = [
  { word: "ENGINEERING.", accent: "#F28B82" },
  { word: "TECHNOLOGY.", accent: "#F6B77A" },
  { word: "CREATIVITY.", accent: "#A9C7A5" },
  { word: "INNOVATION.", accent: "#6B9A64" },
];

export const IntroTypography: React.FC<IntroTypographyProps> = ({ phase }) => {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const fullName = portfolioData.personal.name || "Anubhav Anand";

  // Derive initials (e.g. "Anubhav Anand" -> "AA")
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "AA";

  // Step through kinetic words during Scene 2 (4.0s: 1.0s per word)
  useEffect(() => {
    if (phase !== "scene2") return;
    setActiveWordIndex(0);
    const interval = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % KINETIC_WORDS.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-5xl px-6 text-center select-none">
      {/* =========================================================================
          SCENE 1: THE OPENING (0 – 3.0s)
          - Center expanding circle & ripple
          - Initials reveal
          - Name reveal
          ========================================================================= */}
      <AnimatePresence>
        {phase === "scene1" && (
          <motion.div
            key="scene1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.94, y: -24 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center space-y-5"
          >
            {/* Center Circular Emblem with Ripple */}
            <div className="relative flex items-center justify-center">
              {/* Expanding Ripple Ring */}
              <motion.div
                initial={{ scale: 0.35, opacity: 0.8 }}
                animate={{ scale: 2.4, opacity: 0 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                className="absolute w-20 h-20 rounded-full border border-[#F28B82]/50"
              />

              {/* Pulsing Core Circle */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#F6B77A] via-[#F28B82] to-[#FFD6BF] flex items-center justify-center text-white font-mono font-extrabold text-xl sm:text-2xl shadow-lg shadow-[#F28B82]/25"
              >
                <span>{initials}</span>
              </motion.div>
            </div>

            {/* Name Reveal with Editorial Typography */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#343A32]"
              >
                {fullName}
              </motion.h1>
            </div>

            {/* Subtitle tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFDF5] border border-[#FFD6BF] text-[11px] font-mono tracking-widest uppercase text-[#77776D] shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#A9C7A5] animate-ping" />
              <span>DIGITAL ARCHITECTURE</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          SCENE 2: IDENTITY REVEAL (3.0 – 7.0s)
          - Oversized kinetic editorial typography (1.0s per word)
          - Staggered horizontal clipping masks
          - ENGINEERING / TECHNOLOGY / CREATIVITY / INNOVATION
          ========================================================================= */}
      <AnimatePresence mode="wait">
        {phase === "scene2" && (
          <motion.div
            key={`word-${activeWordIndex}`}
            initial={{ opacity: 0, y: 45, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 1.04 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center overflow-hidden py-4"
          >
            <div className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#77776D] mb-3">
              DISCIPLINE &bull; 0{activeWordIndex + 1}
            </div>

            <h2
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none"
              style={{
                color: "#343A32",
                textShadow: "0 4px 24px rgba(246, 183, 122, 0.25)",
              }}
            >
              <span className="relative inline-block">
                {KINETIC_WORDS[activeWordIndex].word}
                {/* Horizontal Accent Line Sweep */}
                <motion.span
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 -bottom-2 h-1.5 sm:h-2 rounded-full"
                  style={{ backgroundColor: KINETIC_WORDS[activeWordIndex].accent }}
                />
              </span>
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          SCENE 3: ABSTRACT MOTION (7.0 – 10.0s)
          - Central kinetic synthesis of hardware & software
          - Concentric geometric ring motions & engineering precision
          ========================================================================= */}
      <AnimatePresence>
        {phase === "scene3" && (
          <motion.div
            key="scene3-centerpiece"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center space-y-4 max-w-lg mx-auto"
          >
            {/* Geometric Concentric Core */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-[#F28B82]/60"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-[#A9C7A5]/70"
              />
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F8E7A1] via-[#F6B77A] to-[#F28B82] flex items-center justify-center shadow-md shadow-[#F28B82]/20">
                <span className="w-3 h-3 rounded-full bg-white animate-pulse" />
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="inline-block px-3 py-1 rounded-full bg-white/80 border border-[#FFD6BF] text-[11px] font-mono tracking-widest uppercase text-[#77776D] backdrop-blur-xs">
                SYSTEM ARCHITECTURE
              </span>
              <p className="text-xl sm:text-2xl font-bold tracking-tight text-[#343A32]">
                Hardware Precision &times; Modern Software
              </p>
              <p className="text-xs sm:text-sm font-mono text-[#77776D]">
                Connecting physical instrumentation to intuitive digital interfaces
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
