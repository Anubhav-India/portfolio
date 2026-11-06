"use client";

import React from "react";

export const AnimatedBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10"
      aria-hidden="true"
    >
      {/* Base Tinted Ambient Gradient Background */}
      <div className="absolute inset-0 bg-[#F8FAFD] dark:bg-[#0B0F19] transition-colors duration-500" />

      {/* Subtle Engineering Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 dark:opacity-30" />

      {/* Ambient Radial Gradient 1: Top-Left Pale Blue / Electric Blue */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] max-w-[900px] max-h-[900px] rounded-full animate-float-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(71, 118, 230, 0.12) 0%, rgba(85, 200, 217, 0.06) 45%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Ambient Radial Gradient 2: Right Hero / Lavender / Violet */}
      <div
        className="absolute top-[10%] -right-[15%] w-[60vw] h-[60vw] max-w-[850px] max-h-[850px] rounded-full animate-float-reverse"
        style={{
          background:
            "radial-gradient(circle, rgba(144, 117, 232, 0.11) 0%, rgba(240, 236, 255, 0.25) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Ambient Radial Gradient 3: Center Mid-Page Ice Cyan */}
      <div
        className="absolute top-[45%] left-[20%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full animate-float-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(85, 200, 217, 0.08) 0%, rgba(231, 240, 255, 0.3) 50%, transparent 70%)",
          filter: "blur(90px)",
          animationDelay: "-7s",
        }}
      />

      {/* Ambient Radial Gradient 4: Bottom Contact Glow */}
      <div
        className="absolute bottom-[-10%] right-[10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full animate-float-reverse"
        style={{
          background:
            "radial-gradient(circle, rgba(71, 118, 230, 0.09) 0%, rgba(144, 117, 232, 0.08) 50%, transparent 75%)",
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
