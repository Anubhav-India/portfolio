"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AbstractShapes } from "./AbstractShapes";
import { IntroTypography } from "./IntroTypography";
import { EnterPortfolioButton } from "./EnterPortfolioButton";

type IntroPhase = "scene1" | "scene2" | "scene3" | "scene4" | "exit";

export const CinematicIntro: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [phase, setPhase] = useState<IntroPhase>("scene1");
  const [isExiting, setIsExiting] = useState(false);

  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  // Exit & Transition to Homepage
  const triggerExit = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    setPhase("exit");
    clearAllTimers();

    // Mark session as seen
    try {
      sessionStorage.setItem("portfolio_intro_seen", "true");
    } catch {
      // Fallback if sessionStorage is disabled or blocked
    }

    // Unlock body scroll
    document.body.style.overflow = "";

    // Complete exit and unmount intro overlay after transition animation
    setTimeout(() => {
      setShowIntro(false);
    }, 950);
  }, [isExiting, clearAllTimers]);

  useEffect(() => {
    setMounted(true);

    // Verify session storage
    let hasSeen = false;
    try {
      hasSeen = sessionStorage.getItem("portfolio_intro_seen") === "true";
    } catch {
      hasSeen = false;
    }

    if (hasSeen) {
      setShowIntro(false);
      return;
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setShowIntro(true);
    document.body.style.overflow = "hidden";

    if (prefersReducedMotion) {
      // Skip directly to interactive entry screen for reduced-motion accessibility
      setPhase("scene4");
      const autoTimer = setTimeout(() => {
        triggerExit();
      }, 5000);
      timersRef.current.push(autoTimer);
      return;
    }

    // Storyboard Timeline:
    // Scene 1: 0s – 1.0s (Opening circle, initials, name)
    // Scene 2: 1.0s – 2.5s (Identity Reveal kinetic typography)
    // Scene 3: 2.5s – 3.8s (Abstract motion shapes composition)
    // Scene 4: 3.8s – 5.8s (Interactive Entry Screen with ENTER PORTFOLIO)
    // Auto-transition after 5.8s if no user action
    const t1 = setTimeout(() => setPhase("scene2"), 1050);
    const t2 = setTimeout(() => setPhase("scene3"), 2500);
    const t3 = setTimeout(() => setPhase("scene4"), 3800);
    const t4 = setTimeout(() => triggerExit(), 5900);

    timersRef.current.push(t1, t2, t3, t4);

    return () => {
      clearAllTimers();
      document.body.style.overflow = "";
    };
  }, [triggerExit, clearAllTimers]);

  // Keyboard shortcut listener: ESC skips intro
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showIntro) {
        triggerExit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showIntro, triggerExit]);

  // Prevent SSR hydration mismatch
  if (!mounted || !showIntro) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-intro-overlay"
        initial={{ opacity: 1 }}
        animate={{
          opacity: isExiting ? 0 : 1,
          clipPath: isExiting
            ? [
                "circle(100% at 50% 50%)",
                "circle(30% at 50% 50%)",
                "circle(0% at 50% 50%)",
              ]
            : "circle(150% at 50% 50%)",
        }}
        transition={{
          duration: isExiting ? 0.95 : 0.3,
          ease: [0.16, 1, 0.3, 1],
          times: isExiting ? [0, 0.35, 1] : undefined,
        }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F6F3E9] overflow-hidden select-none"
        style={{ width: "100vw", height: "100vh" }}
      >
        {/* Subtle Ambient Grain & Engineering Grid Texture */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        {/* Abstract Fluid Morphing Shapes (Scene 3 & 4 Background) */}
        <AbstractShapes phase={phase} />

        {/* Skip Intro Control (Top Right) */}
        <motion.button
          onClick={triggerExit}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isExiting ? 0 : 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="fixed top-6 right-6 sm:top-8 sm:right-8 z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 hover:bg-white text-[#77776D] hover:text-[#343A32] text-xs font-mono tracking-widest uppercase transition-all duration-200 shadow-xs cursor-pointer border border-[#FFD6BF]/40 backdrop-blur-md"
          aria-label="Skip introductory animation"
        >
          <span>SKIP INTRO</span>
          <kbd className="hidden sm:inline px-1 py-0.5 rounded bg-black/5 text-[10px]">
            ESC
          </kbd>
        </motion.button>

        {/* Central Animated Content Area */}
        <div className="relative z-20 w-full h-full flex items-center justify-center">
          {/* Scenes 1, 2, and 3: Typography Storyboard */}
          {(phase === "scene1" || phase === "scene2" || phase === "scene3") && (
            <IntroTypography phase={phase} />
          )}

          {/* Scene 4: Interactive Entry Screen */}
          {phase === "scene4" && (
            <EnterPortfolioButton onEnter={triggerExit} isExiting={isExiting} />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
