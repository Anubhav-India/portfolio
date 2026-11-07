"use client";

import React, { useEffect, useState } from "react";

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(currentProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page reading progress"
    >
      <div
        className="h-full bg-gradient-to-r from-[#F6B77A] via-[#F28B82] to-[#A9C7A5] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(242,139,130,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
