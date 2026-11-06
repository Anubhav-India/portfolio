"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Sparkles, Activity, Compass } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

interface Ray {
  baseAngle: number;
  currentAngle: number;
  targetAngle: number;
  length: number;
  baseLength: number;
  speed: number;
  nodes: { pos: number; size: number; alpha: number; pulseSpeed: number }[];
  color: string;
  width: number;
}

export const StripeBeamCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5, isHovered: false });
  const [clickWave, setClickWave] = useState<{ x: number; y: number; radius: number; alpha: number } | null>(null);

  // Animation state refs for 60fps loop without React re-renders
  const animStateRef = useRef({
    rays: [] as Ray[],
    mouseX: 0.5,
    mouseY: 0.3,
    targetMouseX: 0.5,
    targetMouseY: 0.3,
    isHovered: false,
    time: 0,
    shockwaveRadius: -1,
    shockwaveAlpha: 0,
    width: 0,
    height: 0,
  });

  // Initialize rays
  const initRays = useCallback((width: number, height: number) => {
    const rayCount = 130;
    const rays: Ray[] = [];
    const maxLen = Math.min(width, height) * 1.05;

    for (let i = 0; i < rayCount; i++) {
      // Fan out in an arc from ~18deg to ~162deg (emanating upward)
      const fraction = i / (rayCount - 1);
      // Math.PI to 0 corresponds to top half
      // Spread from 0.12 * PI to 0.88 * PI
      const baseAngle = Math.PI * (0.1 + fraction * 0.8);
      const lengthVariation = 0.55 + Math.random() * 0.45;
      const baseLength = maxLen * lengthVariation;

      // 2 to 4 glowing nodes along each ray
      const nodeCount = 2 + Math.floor(Math.random() * 3);
      const nodes = [];
      for (let n = 0; n < nodeCount; n++) {
        nodes.push({
          pos: 0.3 + (n / nodeCount) * 0.65 + (Math.random() * 0.1 - 0.05),
          size: 1.2 + Math.random() * 2.2,
          alpha: 0.4 + Math.random() * 0.6,
          pulseSpeed: 1 + Math.random() * 2,
        });
      }

      // Tip node
      nodes.push({
        pos: 1.0,
        size: 2.0 + Math.random() * 2.5,
        alpha: 0.85 + Math.random() * 0.15,
        pulseSpeed: 1.5 + Math.random() * 1.5,
      });

      rays.push({
        baseAngle,
        currentAngle: baseAngle,
        targetAngle: baseAngle,
        length: baseLength,
        baseLength,
        speed: 0.03 + Math.random() * 0.04,
        nodes,
        color:
          fraction < 0.35
            ? "#648FEA"
            : fraction < 0.7
            ? "#FFFFFF"
            : "#9075E8",
        width: 0.8 + Math.random() * 0.8,
      });
    }

    animStateRef.current.rays = rays;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);

      if (w === 0 || h === 0) return;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.scale(dpr, dpr);
      animStateRef.current.width = w;
      animStateRef.current.height = h;

      initRays(w, h);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }

    // Render loop
    const render = () => {
      const state = animStateRef.current;
      const { width: w, height: h, rays } = state;

      if (w > 0 && h > 0) {
        state.time += 0.018;

        // Smoothly interpolate mouse position (spring lerp)
        state.mouseX += (state.targetMouseX - state.mouseX) * 0.07;
        state.mouseY += (state.targetMouseY - state.mouseY) * 0.07;

        ctx.clearRect(0, 0, w, h);

        // Origin at bottom-center with subtle mouse parallax
        const originX = w * 0.5 + (state.mouseX - 0.5) * 28;
        const originY = h * 1.02 + (state.mouseY - 0.5) * 12;

        // Draw radiant ambient background glow behind origin
        const bgGlow = ctx.createRadialGradient(
          originX,
          originY,
          10,
          originX,
          originY - h * 0.35,
          w * 0.75
        );
        bgGlow.addColorStop(0, "rgba(255, 255, 255, 0.45)");
        bgGlow.addColorStop(0.15, "rgba(85, 200, 217, 0.35)");
        bgGlow.addColorStop(0.45, "rgba(71, 118, 230, 0.22)");
        bgGlow.addColorStop(0.8, "rgba(144, 117, 232, 0.08)");
        bgGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = bgGlow;
        ctx.fillRect(0, 0, w, h);

        // Update shockwave pulse if active
        if (state.shockwaveRadius >= 0) {
          state.shockwaveRadius += 7;
          state.shockwaveAlpha *= 0.95;

          ctx.beginPath();
          ctx.arc(originX, originY, state.shockwaveRadius, Math.PI, 0);
          ctx.strokeStyle = `rgba(85, 200, 217, ${state.shockwaveAlpha * 0.6})`;
          ctx.lineWidth = 3;
          ctx.stroke();

          if (state.shockwaveAlpha < 0.02) {
            state.shockwaveRadius = -1;
          }
        }

        // Draw and update each fiber optic ray
        for (let i = 0; i < rays.length; i++) {
          const ray = rays[i];

          // Target angle influence based on cursor position
          // Mouse angle from origin
          const mouseAngle = Math.atan2(originY - state.mouseY * h, state.mouseX * w - originX);
          const angleDiff = mouseAngle - ray.baseAngle;

          // Subtle organic breathing oscillation
          const idleWave = Math.sin(state.time * 1.5 + i * 0.12) * 0.035;

          // Cursor attraction strength (closer cursor has stronger magnetic bend)
          const mouseDistX = (state.mouseX * w - originX) / w;
          const mouseDistY = (state.mouseY * h - originY) / h;
          const distToMouse = Math.sqrt(mouseDistX * mouseDistX + mouseDistY * mouseDistY);
          const influence = state.isHovered
            ? Math.max(0, 1 - distToMouse * 1.4) * 0.2
            : 0;

          ray.targetAngle = ray.baseAngle + idleWave + angleDiff * influence;
          ray.currentAngle += (ray.targetAngle - ray.currentAngle) * ray.speed;

          // Shockwave ripple elongation
          let lengthMult = 1.0;
          if (state.shockwaveRadius > 0) {
            const rayProg = state.shockwaveRadius / ray.baseLength;
            if (Math.abs(rayProg - 0.7) < 0.3) {
              lengthMult += state.shockwaveAlpha * 0.25;
            }
          }

          const currentLen = ray.baseLength * lengthMult;
          const endX = originX + Math.cos(ray.currentAngle) * currentLen;
          const endY = originY - Math.sin(ray.currentAngle) * currentLen;

          // Quadratic control point for elegant curved fiber bending
          const midT = 0.55;
          const ctrlX = originX + Math.cos(ray.baseAngle + (ray.currentAngle - ray.baseAngle) * 0.6) * (currentLen * midT);
          const ctrlY = originY - Math.sin(ray.baseAngle + (ray.currentAngle - ray.baseAngle) * 0.6) * (currentLen * midT);

          // Ray gradient: bright white/cyan at base -> ray color at tip
          const rayGrad = ctx.createLinearGradient(originX, originY, endX, endY);
          rayGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
          rayGrad.addColorStop(0.25, "rgba(200, 240, 255, 0.75)");
          rayGrad.addColorStop(0.65, ray.color);
          rayGrad.addColorStop(1, "rgba(255, 255, 255, 0.9)");

          ctx.beginPath();
          ctx.moveTo(originX, originY);
          ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
          ctx.strokeStyle = rayGrad;
          ctx.lineWidth = ray.width;
          ctx.stroke();

          // Render glowing nodes/particles along the fiber line
          for (let n = 0; n < ray.nodes.length; n++) {
            const node = ray.nodes[n];
            const t = node.pos;

            // Quadratic bezier interpolation for node position
            const invT = 1 - t;
            const nx = invT * invT * originX + 2 * invT * t * ctrlX + t * t * endX;
            const ny = invT * invT * originY + 2 * invT * t * ctrlY + t * t * endY;

            // Node pulsing glow
            const pulse = Math.sin(state.time * node.pulseSpeed + i * 0.3) * 0.25 + 0.75;
            const alpha = node.alpha * pulse;

            ctx.beginPath();
            ctx.arc(nx, ny, node.size * (t === 1.0 ? 1.15 : 0.9), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fill();

            // Outer soft glow on tip nodes
            if (t === 1.0) {
              ctx.beginPath();
              ctx.arc(nx, ny, node.size * 2.4, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(85, 200, 217, ${alpha * 0.35})`;
              ctx.fill();
            }
          }
        }

        // Central radiant flare at base emitter
        const coreGrad = ctx.createRadialGradient(originX, originY, 0, originX, originY, 45);
        coreGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
        coreGrad.addColorStop(0.3, "rgba(85, 200, 217, 0.85)");
        coreGrad.addColorStop(0.7, "rgba(71, 118, 230, 0.4)");
        coreGrad.addColorStop(1, "rgba(71, 118, 230, 0)");

        ctx.beginPath();
        ctx.arc(originX, originY, 45, Math.PI, 0);
        ctx.fillStyle = coreGrad;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      ro.disconnect();
    };
  }, [initRays]);

  // Pointer interaction handlers
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    animStateRef.current.targetMouseX = Math.max(0, Math.min(1, x));
    animStateRef.current.targetMouseY = Math.max(0, Math.min(1, y));
    animStateRef.current.isHovered = true;

    setMousePos({ x: Math.round(x * 100), y: Math.round(y * 100), isHovered: true });
  };

  const handlePointerLeave = () => {
    animStateRef.current.targetMouseX = 0.5;
    animStateRef.current.targetMouseY = 0.3;
    animStateRef.current.isHovered = false;
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  };

  const handleClick = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    animStateRef.current.shockwaveRadius = 10;
    animStateRef.current.shockwaveAlpha = 1.0;
  };

  return (
    <GlassCard
      variant="liquid"
      className="p-5 sm:p-7 relative overflow-hidden group border-white/90 dark:border-white/20 select-none shadow-xl"
    >
      {/* Header bar of the widget */}
      <div className="flex items-center justify-between mb-3 z-20 relative">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#4776E6]/10 text-[#4776E6] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider font-bold text-[var(--text-dark)] flex items-center gap-1.5">
              <span>Interactive Beam Dynamics</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <div className="text-[10px] text-[var(--text-muted)] font-mono">
              Cursor-Reactive Optical Synthesis
            </div>
          </div>
        </div>

        {/* Live Tracking Telemetry Pill */}
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-full glass-subtle text-[10px] font-mono text-[var(--text-secondary)] flex items-center gap-1.5">
            <Compass className="w-3 h-3 text-[#55C8D9] animate-spin" style={{ animationDuration: "12s" }} />
            <span>
              {mousePos.isHovered ? `X:${mousePos.x}% Y:${mousePos.y}%` : "TRACKING IDLE"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Radiant Canvas Container */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden cursor-crosshair bg-gradient-to-b from-[#2B3A8C] via-[#3B4CA8] to-[#1C2356] border border-white/30 dark:border-white/10 shadow-inner group"
      >
        {/* HTML5 Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

        {/* Floating Hint Overlay */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/35 backdrop-blur-md text-[10px] font-mono text-white/90 flex items-center gap-1.5 pointer-events-none transition-opacity duration-300">
          <Activity className="w-3 h-3 text-[#55C8D9]" />
          <span>Move cursor to deflect • Click for pulse</span>
        </div>

        {/* Bottom subtle gradient badge */}
        <div className="absolute bottom-2 right-3 text-[9px] font-mono tracking-widest text-white/50 uppercase pointer-events-none">
          130 Optical Beams • 60 FPS
        </div>
      </div>

      {/* Footer Info Strip */}
      <div className="mt-3 pt-2.5 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
        <span>STRIPE SESSIONS DYNAMICS ENGINE</span>
        <span className="text-[#4776E6] font-semibold">HARMONIC SPRING DAMPING</span>
      </div>
    </GlassCard>
  );
};
