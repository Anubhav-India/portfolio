"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { CommandMenu } from "@/components/navigation/CommandMenu";
import { GlassButton } from "@/components/ui/GlassButton";
import { Menu, X, Command } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "#hero", id: "hero" },
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Education", href: "#education", id: "education" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Research", href: "#research", id: "research" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  const sectionIds = NAV_ITEMS.map((item) => item.id);
  const activeSection = useScrollSpy(sectionIds, 150);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandMenuOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleToggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("portfolio-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("portfolio-theme", "dark");
    }
  };

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 flex items-center justify-center transition-all duration-300 px-4",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <nav
          className={cn(
            "glass-navbar rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-6 max-w-6xl w-full transition-all duration-300",
            scrolled ? "shadow-md" : ""
          )}
          aria-label="Main Navigation"
        >
          {/* Logo / Brand */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#hero");
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gradient-to-tr from-[#F6B77A] via-[#F28B82] to-[#A9C7A5] flex items-center justify-center text-[#343A32] font-bold text-xs shadow-[0_2px_10px_rgba(242,139,130,0.3)] transition-transform duration-300 group-hover:scale-110">
              {portfolioData.personal.profileImage ? (
                <Image
                  src={portfolioData.personal.profileImage}
                  alt={portfolioData.personal.name || "Profile"}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              ) : portfolioData.personal.name && portfolioData.personal.name !== "[YOUR FULL NAME]" ? (
                portfolioData.personal.name.slice(0, 1).toUpperCase()
              ) : (
                "P"
              )}
            </div>
            <span className="font-semibold text-sm tracking-tight hidden sm:inline text-[var(--text-dark)] group-hover:text-[#F28B82] transition-colors">
              {portfolioData.personal.name && portfolioData.personal.name !== "[YOUR FULL NAME]"
                ? portfolioData.personal.name
                : "Portfolio"}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  data-cursor={item.label.toUpperCase()}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.href);
                  }}
                  className={cn(
                    "relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer select-none",
                    isActive
                      ? "text-[var(--accent-primary)] font-semibold"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-dark)] hover:bg-black/5 dark:hover:bg-white/5"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute inset-x-2 -bottom-1 h-0.5 bg-gradient-to-r from-[var(--gradient-text-start)] to-[var(--gradient-text-mid)] rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Action Tools: Command Palette + Theme + Resume */}
          <div className="flex items-center gap-2">
            {/* Quick Command Palette Button */}
            <button
              onClick={() => setCommandMenuOpen(true)}
              data-cursor="SEARCH"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-subtle text-[11px] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors cursor-pointer"
              aria-label="Open command search"
              title="Quick Search (Ctrl/Cmd + K)"
            >
              <Command className="w-3 h-3 text-[var(--accent-primary)]" />
              <span className="font-mono text-[10px]">K</span>
            </button>

            {/* Light / Dark Mode Toggle */}
            <div data-cursor="THEME">
              <ThemeToggle />
            </div>

            {/* Resume Button */}
            {portfolioData.personal.resumeUrl && (
              <GlassButton
                variant="primary"
                size="sm"
                href={portfolioData.personal.resumeUrl}
                target="_blank"
                icon="download"
                className="hidden md:inline-flex"
              >
                Resume
              </GlassButton>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full glass-subtle text-[var(--text-dark)] hover:text-[#F28B82] transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden flex flex-col justify-start pt-24 px-6 pb-8 bg-[var(--bg-main)]/95 backdrop-blur-2xl animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col gap-2 max-w-md mx-auto w-full">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.href);
                  }}
                  className={cn(
                    "px-4 py-3 rounded-2xl text-base font-medium transition-colors flex items-center justify-between",
                    isActive
                      ? "glass-card text-[#F28B82] font-semibold"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-dark)] hover:bg-black/5 dark:hover:bg-white/5"
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && <div className="w-2 h-2 rounded-full bg-[#F28B82]" />}
                </a>
              );
            })}

            <div className="pt-4 border-t border-black/5 dark:border-white/10 flex flex-col gap-3">
              {portfolioData.personal.resumeUrl && (
                <GlassButton
                  variant="primary"
                  size="md"
                  href={portfolioData.personal.resumeUrl}
                  target="_blank"
                  icon="download"
                  className="w-full justify-center"
                >
                  Download Resume PDF
                </GlassButton>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCommandMenuOpen(true);
                }}
                className="w-full py-2.5 px-4 rounded-full glass-subtle text-sm text-[var(--text-secondary)] flex items-center justify-center gap-2"
              >
                <Command className="w-4 h-4 text-[#F28B82]" />
                <span>Command Menu (Ctrl+K)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Command Menu Dialog */}
      <CommandMenu
        isOpen={commandMenuOpen}
        onClose={() => setCommandMenuOpen(false)}
        onToggleTheme={handleToggleTheme}
      />
    </>
  );
};
