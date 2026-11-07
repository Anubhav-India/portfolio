"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Mail, ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { personal, social } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#FFD6BF]/40 mt-12 bg-[#FFFDF5]/70 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        {/* Brand & Identity */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#F6B77A] to-[#F28B82] flex items-center justify-center text-[#343A32] text-[10px] font-bold shadow-sm">
              {personal.name && personal.name !== "[YOUR FULL NAME]"
                ? personal.name.slice(0, 1).toUpperCase()
                : "P"}
            </div>
            <span className="font-bold text-sm tracking-tight text-[var(--text-dark)]">
              {personal.name && personal.name !== "[YOUR FULL NAME]"
                ? personal.name
                : "Portfolio"}
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] max-w-sm">
            {personal.headline || "Engineering systems, modern web architectures, and embedded solutions."}
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[var(--text-secondary)]">
          <a href="#about" className="hover:text-[#F28B82] transition-colors">About</a>
          <a href="#skills" className="hover:text-[#F28B82] transition-colors">Skills</a>
          <a href="#projects" className="hover:text-[#F28B82] transition-colors">Projects</a>
          <a href="#education" className="hover:text-[#F28B82] transition-colors">Education</a>
          <a href="#experience" className="hover:text-[#F28B82] transition-colors">Experience</a>
          <a href="#contact" className="hover:text-[#F28B82] transition-colors">Contact</a>
        </div>

        {/* Social Icons & Back to top */}
        <div className="flex items-center gap-3">
          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full glass-subtle text-[var(--text-secondary)] hover:text-[#F28B82] hover:scale-110 transition-all"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {social.github && (
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full glass-subtle text-[var(--text-secondary)] hover:text-[#F28B82] hover:scale-110 transition-all"
              aria-label="GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {personal.email && (
            <a
              href={`mailto:${personal.email}`}
              className="p-2 rounded-full glass-subtle text-[var(--text-secondary)] hover:text-[#F28B82] hover:scale-110 transition-all"
              aria-label="Email"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full glass-card text-[var(--text-secondary)] hover:text-[#F28B82] hover:scale-110 transition-all cursor-pointer"
            aria-label="Scroll back to top"
            title="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[var(--text-muted)] font-mono gap-2">
        <div>
          © {currentYear}{" "}
          {personal.name && personal.name !== "[YOUR FULL NAME]"
            ? personal.name
            : "Portfolio"}
          . All rights reserved.
        </div>
        <div>
          Crafted with Next.js, TypeScript &amp; Liquid Glass Architecture.
        </div>
      </div>
    </footer>
  );
};
