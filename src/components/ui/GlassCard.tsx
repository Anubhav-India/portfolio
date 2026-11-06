"use client";

import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "subtle" | "card" | "liquid";
  glowColor?: string;
  enableSpotlight?: boolean;
  className?: string;
  children: React.ReactNode;
  as?: "div" | "article" | "section";
}

export const GlassCard: React.FC<GlassCardProps> = ({
  variant = "card",
  glowColor = "rgba(71, 118, 230, 0.12)",
  enableSpotlight = true,
  className,
  children,
  as = "div",
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !enableSpotlight) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  }, [enableSpotlight]);

  const handleMouseLeave = useCallback(() => {
    if (!enableSpotlight) return;
    setMousePos((prev) => ({ ...prev, opacity: 0 }));
  }, [enableSpotlight]);

  const variantClass = {
    subtle: "glass-subtle rounded-2xl",
    card: "glass-card rounded-3xl",
    liquid: "liquid-glass rounded-3xl",
  }[variant];

  const Component = as as any;

  return (
    <Component
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative transition-all duration-300",
        variantClass,
        className
      )}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      {enableSpotlight && (
        <div
          className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 z-0"
          style={{
            opacity: mousePos.opacity,
            background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 75%)`,
          }}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 w-full h-full">{children}</div>
    </Component>
  );
};
