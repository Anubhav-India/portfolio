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
      radius: isTouchDevice ? 0 : 200,
      isActive: false,
    };

    // Color definitions based on active theme
    const getThemeColors = () => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        return {
          spotlightCore: "rgba(246, 183, 122, 0.25)",
          spotlightMid: "rgba(200, 232, 208, 0.14)",
          spotlightOuter: "rgba(248, 231, 161, 0.06)",
          particleColors: ["#F6B77A", "#C8E8D0", "#F8E7A1", "#FFD6BF", "#A9C7A5"],
          lineColor: "rgba(169, 199, 165,",
          gridColor: "rgba(200, 232, 208, 0.08)",
        };
      }
      return {
        spotlightCore: "rgba(255, 214, 191, 0.32)",
        spotlightMid: "rgba(248, 231, 161, 0.20)",
        spotlightOuter: "rgba(200, 232, 208, 0.08)",
        particleColors: ["#A9C7A5", "#F6B77A", "#F28B82", "#C8E8D0", "#F8E7A1", "#FFD6BF"],
        lineColor: "rgba(169, 199, 165,",
        gridColor: "rgba(169, 199, 165, 0.12)",
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
    const particleCount = isTouchDevice ? 36 : prefersReducedMotion ? 25 : 85;
    const connectionMaxDist = 130;

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
          radius: Math.random() * 1.8 + 1.2,
          baseAlpha: Math.random() * 0.45 + 0.35,
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
            const lineAlpha = (1 - dist / connectionMaxDist) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${themeColors.lineColor} ${lineAlpha})`;
            ctx.lineWidth = 1.0;
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
      <div className="absolute inset-0 bg-[#FFFDF5] transition-colors duration-500" />

      {/* Subtle Engineering Grid in Warm Sage */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 dark:opacity-30" />

      {/* Ambient Radial Gradient 1: Top-Left Mint & Pale Lime */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full animate-float-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(200, 232, 208, 0.4) 0%, rgba(227, 240, 168, 0.22) 45%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Ambient Radial Gradient 2: Right Hero / Warm Peach & Butter Yellow */}
      <div
        className="absolute top-[10%] -right-[15%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full animate-float-reverse"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 214, 191, 0.4) 0%, rgba(248, 231, 161, 0.25) 45%, transparent 70%)",
          filter: "blur(85px)",
        }}
      />

      {/* Ambient Radial Gradient 3: Center Mid-Page Soft Cream Wash */}
      <div
        className="absolute top-[45%] left-[15%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full animate-float-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 244, 223, 0.5) 0%, rgba(246, 183, 122, 0.2) 50%, transparent 70%)",
          filter: "blur(90px)",
          animationDelay: "-6s",
        }}
      />

      {/* Ambient Radial Gradient 4: Bottom Contact / Peach & Coral Wash */}
      <div
        className="absolute bottom-[-10%] right-[10%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full animate-float-reverse"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 214, 191, 0.42) 0%, rgba(242, 139, 130, 0.22) 50%, transparent 75%)",
          filter: "blur(95px)",
          animationDelay: "-10s",
        }}
      />

      {/* High-Performance Canvas Layer for Interactive Particles & Dynamic Spotlight */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
};
