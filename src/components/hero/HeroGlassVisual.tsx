"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Cpu, Activity, Zap, Layers, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export const HeroGlassVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Subtle tilt max +-8 degrees
    setRotate({
      x: -(y / rect.height) * 12,
      y: (x / rect.width) * 12,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const hasCustomImage = Boolean(portfolioData.personal.profileImage);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-lg aspect-square flex items-center justify-center select-none perspective-1000"
      style={{ perspective: "1000px" }}
    >
      {/* Background Soft Glow */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#4776E6]/25 via-[#55C8D9]/20 to-[#9075E8]/20 blur-3xl -z-10 animate-pulse-glow" />

      {/* Outer Orbital Ring */}
      <div className="absolute inset-0 rounded-full border border-dashed border-[#4776E6]/20 animate-spin" style={{ animationDuration: "50s" }} />
      <div className="absolute inset-8 rounded-full border border-dotted border-[#9075E8]/20 animate-spin" style={{ animationDuration: "35s", animationDirection: "reverse" }} />

      {/* Main Interactive 3D Liquid Glass Card */}
      <div
        className="relative w-[85%] h-[85%] rounded-[2.5rem] liquid-glass p-6 sm:p-8 flex flex-col justify-between transition-transform duration-200 ease-out shadow-2xl"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Specular Light Refraction Gradient Corner */}
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-gradient-to-br from-white/40 via-[#55C8D9]/25 to-transparent blur-2xl pointer-events-none" />

        {/* Top Header of the Visual Card */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-ping" />
            <span className="text-xs font-mono font-medium tracking-wider text-[var(--text-secondary)]">
              SYSTEM ONLINE
            </span>
          </div>
          <div className="px-3 py-1 rounded-full glass-subtle text-[11px] font-mono text-[#4776E6] flex items-center gap-1.5 font-medium">
            <Cpu className="w-3.5 h-3.5 text-[#4776E6]" />
            <span>CORE ARCH</span>
          </div>
        </div>

        {/* Central Visual: Profile Photo OR Abstract Engineering Core */}
        <div className="relative my-auto flex flex-col items-center justify-center z-10 py-4">
          {hasCustomImage && portfolioData.personal.profileImage ? (
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden glass-card p-2 shadow-xl">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src={portfolioData.personal.profileImage}
                  alt={portfolioData.personal.name || "Profile"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 150px, 200px"
                  priority
                />
              </div>
            </div>
          ) : (
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
              {/* Abstract Glass Geometric Core */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#4776E6]/15 via-white/50 to-[#9075E8]/20 backdrop-blur-xl border border-white/80 dark:border-white/20 shadow-inner flex items-center justify-center">
                {/* Circuit Nodes & Waveform Animation */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-[#4776E6]/30 animate-ping" style={{ animationDuration: "3s" }} />
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#4776E6] to-[#9075E8] flex items-center justify-center text-white shadow-lg shadow-[#4776E6]/30">
                    <Activity className="w-8 h-8 animate-pulse text-white" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Real-Time Signal Waveform Graphic */}
          <div className="w-full mt-4 px-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] mb-1.5">
              <span>TELEMETRY STREAM</span>
              <span className="text-emerald-500">1000 Hz / SYNCHRONIZED</span>
            </div>
            <div className="h-8 w-full flex items-center gap-1">
              {[40, 65, 30, 85, 95, 45, 60, 20, 75, 90, 50, 70, 35, 80, 60, 90, 45, 75, 30].map(
                (height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-full bg-gradient-to-t from-[#4776E6] to-[#55C8D9] transition-all duration-500 opacity-75"
                    style={{
                      height: `${height}%`,
                      animation: `pulseGlow 2s ease-in-out infinite`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                )
              )}
            </div>
          </div>
        </div>

        {/* Card Footer Telemetry Indicators */}
        <div className="grid grid-cols-2 gap-2 z-10 pt-2 border-t border-black/5 dark:border-white/10">
          <div className="glass-subtle px-3 py-2 rounded-xl">
            <div className="text-[10px] text-[var(--text-muted)] uppercase font-mono">Precision</div>
            <div className="text-xs font-semibold text-[var(--text-dark)] flex items-center gap-1 mt-0.5">
              <Zap className="w-3 h-3 text-amber-500" />
              <span>Low-Latency</span>
            </div>
          </div>
          <div className="glass-subtle px-3 py-2 rounded-xl">
            <div className="text-[10px] text-[var(--text-muted)] uppercase font-mono">Architecture</div>
            <div className="text-xs font-semibold text-[var(--text-dark)] flex items-center gap-1 mt-0.5">
              <Layers className="w-3 h-3 text-[#4776E6]" />
              <span>Full-Stack</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Spatial Badge 1: Top-Right */}
      <div
        className="absolute -top-3 -right-2 sm:-right-4 px-4 py-2 rounded-2xl glass-card text-xs font-medium text-[var(--text-dark)] flex items-center gap-2 shadow-lg animate-float-slow"
        style={{ zIndex: 20 }}
      >
        <Sparkles className="w-4 h-4 text-[#9075E8]" />
        <span>Spatial UI & Systems</span>
      </div>

      {/* Floating Spatial Badge 2: Bottom-Left */}
      <div
        className="absolute -bottom-2 -left-2 sm:-left-4 px-4 py-2 rounded-2xl glass-card text-xs font-medium text-[var(--text-dark)] flex items-center gap-2 shadow-lg animate-float-reverse"
        style={{ zIndex: 20 }}
      >
        <div className="w-2 h-2 rounded-full bg-cyan-400" />
        <span>Hardware & Software</span>
      </div>
    </div>
  );
};
