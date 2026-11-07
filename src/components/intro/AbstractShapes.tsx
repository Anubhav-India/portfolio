"use client";

import React from "react";
import { motion } from "framer-motion";

interface AbstractShapesProps {
  phase: "scene1" | "scene2" | "scene3" | "scene4" | "exit";
}

export const AbstractShapes: React.FC<AbstractShapesProps> = ({ phase }) => {
  const isScene3 = phase === "scene3";
  const isScene4 = phase === "scene4";
  const isExit = phase === "exit";

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-10"
      aria-hidden="true"
    >
      {/* Organic Fluid Blob 1 - Top Left Soft Sage & Mint */}
      <motion.div
        initial={{ scale: 0, opacity: 0, x: -100, y: -100 }}
        animate={{
          scale: isExit ? 4 : isScene3 ? 1.25 : isScene4 ? 1.05 : 0.6,
          opacity: isExit ? 0 : isScene3 ? 0.75 : isScene4 ? 0.45 : 0.25,
          x: isScene3 ? [0, 40, -20, 0] : 0,
          y: isScene3 ? [0, -30, 20, 0] : 0,
          rotate: isScene3 ? [0, 90, 180, 270, 360] : 0,
        }}
        transition={{
          scale: { duration: isExit ? 0.8 : 1.6, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: isExit ? 0.6 : 1.2 },
          rotate: { duration: 18, repeat: Infinity, ease: "linear" },
          x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 9, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-[45%_55%_65%_35%/50%_45%_55%_50%] bg-gradient-to-br from-[#C8E8D0] via-[#A9C7A5]/70 to-[#E3F0A8]/60 blur-2xl"
      />

      {/* Organic Fluid Blob 2 - Bottom Right Peach & Coral */}
      <motion.div
        initial={{ scale: 0, opacity: 0, x: 100, y: 100 }}
        animate={{
          scale: isExit ? 4.5 : isScene3 ? 1.3 : isScene4 ? 1.1 : 0.5,
          opacity: isExit ? 0 : isScene3 ? 0.7 : isScene4 ? 0.45 : 0.2,
          x: isScene3 ? [0, -40, 20, 0] : 0,
          y: isScene3 ? [0, 30, -20, 0] : 0,
          rotate: isScene3 ? [0, -90, -180, -270, -360] : 0,
        }}
        transition={{
          scale: { duration: isExit ? 0.8 : 1.6, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: isExit ? 0.6 : 1.2 },
          rotate: { duration: 22, repeat: Infinity, ease: "linear" },
          x: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -bottom-[12%] -right-[12%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-[55%_45%_40%_60%/45%_55%_50%_50%] bg-gradient-to-tl from-[#FFD6BF] via-[#F6B77A]/65 to-[#F28B82]/50 blur-2xl"
      />

      {/* Organic Fluid Blob 3 - Center Radiant Butter Yellow */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isExit ? 5 : isScene3 ? 1.4 : isScene4 ? 0.95 : 0.4,
          opacity: isExit ? 0 : isScene3 ? 0.6 : isScene4 ? 0.35 : 0.15,
          rotate: isScene3 ? [0, 180, 360] : 0,
        }}
        transition={{
          scale: { duration: isExit ? 0.85 : 1.8, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: isExit ? 0.6 : 1.2 },
          rotate: { duration: 24, repeat: Infinity, ease: "linear" },
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-[60%_40%_50%_50%/40%_60%_50%_50%] bg-gradient-to-tr from-[#F8E7A1] via-[#FFF4DF] to-[#FFD6BF]/50 blur-3xl"
      />

      {/* Layered Floating SVG Shapes (Active in Scene 3 & 4) */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExit ? 0 : isScene3 ? 0.85 : isScene4 ? 0.45 : 0.15 }}
        transition={{ duration: 1 }}
      >
        <defs>
          <linearGradient id="introGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F6B77A" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#F28B82" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="introGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A9C7A5" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#C8E8D0" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Orbit Ring 1 */}
        <motion.circle
          cx="50%"
          cy="50%"
          r="180"
          fill="none"
          stroke="url(#introGrad1)"
          strokeWidth="1.5"
          strokeDasharray="6 12"
          animate={{
            rotate: isScene3 ? [0, 360] : 0,
            scale: isExit ? 3.5 : isScene3 ? [1, 1.08, 1] : 1,
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ transformOrigin: "center" }}
        />

        {/* Orbit Ring 2 */}
        <motion.circle
          cx="50%"
          cy="50%"
          r="280"
          fill="none"
          stroke="url(#introGrad2)"
          strokeWidth="1"
          strokeDasharray="4 8"
          animate={{
            rotate: isScene3 ? [0, -360] : 0,
            scale: isExit ? 4 : isScene3 ? [1, 0.94, 1] : 1,
          }}
          transition={{
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ transformOrigin: "center" }}
        />
      </motion.svg>
    </div>
  );
};
