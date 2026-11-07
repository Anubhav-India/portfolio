"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("portfolio-theme");
    if (storedTheme === "sunset") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
      localStorage.setItem("portfolio-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("portfolio-theme", "sunset");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("portfolio-theme", "light");
    }
  };

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-9 h-9 rounded-full glass-subtle flex items-center justify-center opacity-70",
          className
        )}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "relative p-2 rounded-full bg-[#FFFDF5] text-[#343A32] border border-[#FFD6BF] hover:border-[#F28B82] hover:bg-[#FFF4DF] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28B82]",
        className
      )}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#F8E7A1] transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-[#343A32] transition-transform duration-300 -rotate-12 hover:rotate-0" />
      )}
    </button>
  );
};
