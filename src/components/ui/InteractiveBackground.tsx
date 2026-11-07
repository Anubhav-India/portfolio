"use client";

import React, { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  color: string;
}

export const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Check touch/mobile device
    const isTouchDevice = !window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    // Mouse state for spring interpolation
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: isTouchDevice ? 0 : 160,
      isActive: false,
    };

    // Color definitions based on active theme
    const getThemeColors = () => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        return {
          spotlightCore: "rgba(87, 151, 255, 0.14)",
          spotlightMid: "rgba(83, 214, 232, 0.08)",
          spotlightOuter: "rgba(155, 117, 239, 0.03)",
          particleColors: ["#5797FF", "#53D6E8", "#9B75EF", "#A5B1C5"],
          lineColor: "rgba(87, 151, 255,",
          gridColor: "rgba(255, 255, 255, 0.035)",
        };
      }
      return {
        spotlightCore: "rgba(49, 95, 234, 0.07)",
        spotlightMid: "rgba(8, 127, 156, 0.04)",
        spotlightOuter: "rgba(134, 97, 217, 0.015)",
        particleColors: ["#315FEA", "#087F9C", "#8661D9", "#526078"],
        lineColor: "rgba(49, 95, 234,",
        gridColor: "rgba(24, 38, 65, 0.05)",
      };
    };

    let themeColors = getThemeColors();

    // Listen for theme toggle changes
    const observer = new MutationObserver(() => {
      themeColors = getThemeColors();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Particle array
    let particles: Particle[] = [];
    const particleCount = isTouchDevice ? 28 : prefersReducedMotion ? 20 : 64;
    const connectionMaxDist = 110;

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const color =
          themeColors.particleColors[
            Math.floor(Math.random() * themeColors.particleColors.length)
          ];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.6 + 1.0,
          baseAlpha: Math.random() * 0.45 + 0.25,
          color,
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initParticles();
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // Track mouse coordinates
    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isActive = true;
    };

    const onMouseLeave = () => {
      mouse.isActive = false;
    };

    if (!isTouchDevice) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      document.addEventListener("mouseleave", onMouseLeave);
    }

    // Main 60 FPS Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse spotlight lerp
      if (!prefersReducedMotion && mouse.isActive) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      }

      // 1. Draw Cursor Spotlight Glow
      if (mouse.isActive && mouse.x > 0 && mouse.y > 0) {
        const spotRadius = 420;
        const spotlight = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          spotRadius
        );
        spotlight.addColorStop(0, themeColors.spotlightCore);
        spotlight.addColorStop(0.35, themeColors.spotlightMid);
        spotlight.addColorStop(0.7, themeColors.spotlightOuter);
        spotlight.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = spotlight;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Update and Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges
          if (p.x < 0) p.x = width;
          else if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          else if (p.y > height) p.y = 0;

          // Mouse proximity reaction: gentle repulsion/attraction
          if (mouse.isActive && mouse.x > 0) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius && dist > 0) {
              const force = (1 - dist / mouse.radius) * 1.2;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;
            }
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseAlpha;
        ctx.fill();

        // 3. Draw Constellation Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionMaxDist) {
            const lineAlpha = (1 - dist / connectionMaxDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${themeColors.lineColor} ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      if (!isTouchDevice) {
        window.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none"
      aria-hidden="true"
    >
      {/* Base Tinted Ambient Background */}
      <div className="absolute inset-0 bg-[#F5F7FC] dark:bg-[#080B14] transition-colors duration-500" />

      {/* Subtle Engineering Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-70 dark:opacity-40" />

      {/* Ambient Radial Gradient 1: Top-Left Pale Accent Glow */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full animate-float-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(49, 95, 234, 0.08) 0%, rgba(8, 127, 156, 0.04) 45%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Ambient Radial Gradient 2: Right Hero / Lavender Glow */}
      <div
        className="absolute top-[12%] -right-[15%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full animate-float-reverse"
        style={{
          background:
            "radial-gradient(circle, rgba(134, 97, 217, 0.08) 0%, rgba(49, 95, 234, 0.05) 45%, transparent 70%)",
          filter: "blur(85px)",
        }}
      />

      {/* High-Performance Canvas Layer for Interactive Particles & Dynamic Spotlight */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
};
