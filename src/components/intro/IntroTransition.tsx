"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroTransitionProps {
  isExiting: boolean;
  onAnimationComplete: () => void;
  children: React.ReactNode;
}

export const IntroTransition: React.FC<IntroTransitionProps> = ({
  isExiting,
  onAnimationComplete,
  children,
}) => {
  return (
    <AnimatePresence onExitComplete={onAnimationComplete}>
      {!isExiting ? (
        <motion.div
          key="intro-container"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: [
              "circle(100% at 50% 50%)",
              "circle(20% at 50% 50%)",
              "circle(0% at 50% 50%)",
            ],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 0.95,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.4, 1],
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#F6F3E9] overflow-hidden"
          style={{ width: "100vw", height: "100vh" }}
        >
          {children}
        </motion.div>
      ) : (
        /* Expanding Organic Reveal Mask that wipes smoothly to reveal Homepage */
        <motion.div
          key="intro-wipe"
          initial={{ clipPath: "circle(100% at 50% 50%)", opacity: 1 }}
          animate={{
            clipPath: "circle(0% at 50% 50%)",
            opacity: 0,
          }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          onAnimationComplete={onAnimationComplete}
          className="fixed inset-0 z-50 pointer-events-none bg-[#F6F3E9]"
          style={{ width: "100vw", height: "100vh" }}
        />
      )}
    </AnimatePresence>
  );
};
