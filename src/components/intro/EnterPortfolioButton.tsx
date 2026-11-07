"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

interface EnterPortfolioButtonProps {
  onEnter: () => void;
  isExiting: boolean;
}

export const EnterPortfolioButton: React.FC<EnterPortfolioButtonProps> = ({
  onEnter,
  isExiting,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const fullName = portfolioData.personal.name || "Anubhav Anand";

  // Desktop magnetic attraction physics
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.35;
    const deltaY = (e.clientY - centerY) * 0.35;
    setMagneticPos({ x: deltaX, y: deltaY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMagneticPos({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={{
        opacity: isExiting ? 0 : 1,
        y: isExiting ? -30 : 0,
        scale: isExiting ? 1.05 : 1,
      }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-30 flex flex-col items-center justify-center text-center space-y-6 max-w-xl mx-auto px-6 select-none"
    >
      {/* Identity Tag */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFDF5] border border-[#FFD6BF] text-xs font-mono font-medium text-[#77776D] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#F28B82]" />
          <span>PORTFOLIO ENTRYWAY</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#343A32]">
          {fullName}
        </h1>

        <p className="text-base sm:text-lg font-medium text-[#77776D] italic">
          &ldquo;Engineering ideas into reality.&rdquo;
        </p>
      </div>

      {/* Prominent Magnetic Interactive Button */}
      <div className="pt-2">
        <motion.button
          ref={buttonRef}
          onClick={onEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          data-cursor="ENTER"
          animate={{ x: magneticPos.x, y: magneticPos.y }}
          transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="group relative inline-flex items-center gap-3.5 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-[#F6B77A] via-[#F28B82] to-[#E27D60] text-white font-bold text-base sm:text-lg shadow-[0_10px_35px_rgba(242,139,130,0.45)] hover:shadow-[0_14px_45px_rgba(246,183,122,0.6)] cursor-pointer transition-shadow border-2 border-white/60 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F28B82]/50 active:translate-y-0.5"
          aria-label="Enter portfolio website"
        >
          {/* Subtle Ambient Shimmer */}
          <span className="relative z-10 tracking-wide font-extrabold">
            ENTER PORTFOLIO
          </span>

          <motion.span
            className="relative z-10 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/25 text-white"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.span>
        </motion.button>
      </div>

      {/* Reassuring Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-xs sm:text-sm text-[#77776D] font-mono tracking-wide"
      >
        Explore my work, experiments &amp; journey.
      </motion.p>
    </motion.div>
  );
};
