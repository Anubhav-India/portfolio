"use client";

import React from "react";

export const AnimatedBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10"
      aria-hidden="true"
    >
      {/* Base Tinted Ambient Gradient Background */}
      <div className="absolute inset-0 bg-[#FFFDF5] transition-colors duration-500" />

      {/* Subtle Engineering Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Ambient Radial Gradient 1: Top-Left Mint Green */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] max-w-[900px] max-h-[900px] rounded-full animate-float-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(200, 232, 208, 0.35) 0%, rgba(227, 240, 168, 0.15) 45%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Ambient Radial Gradient 2: Right Hero Peach */}
      <div
        className="absolute top-[10%] -right-[15%] w-[60vw] h-[60vw] max-w-[850px] max-h-[850px] rounded-full animate-float-reverse"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 214, 191, 0.3) 0%, rgba(255, 244, 223, 0.5) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Ambient Radial Gradient 3: Center Butter Yellow */}
      <div
        className="absolute top-[45%] left-[20%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full animate-float-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(248, 231, 161, 0.25) 0%, rgba(255, 253, 245, 0.5) 50%, transparent 70%)",
          filter: "blur(90px)",
          animationDelay: "-7s",
        }}
      />

      {/* Ambient Radial Gradient 4: Bottom Soft Orange */}
      <div
        className="absolute bottom-[-10%] right-[10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full animate-float-reverse"
        style={{
          background:
            "radial-gradient(circle, rgba(246, 183, 122, 0.25) 0%, rgba(242, 139, 130, 0.15) 50%, transparent 75%)",
          filter: "blur(75px)",
          animationDelay: "-12s",
        }}
      />

      {/* Subtle Noise / Grain Overlay for Organic Texture */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
