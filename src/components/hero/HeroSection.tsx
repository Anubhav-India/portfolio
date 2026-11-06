"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { GlassButton } from "@/components/ui/GlassButton";
import { HeroGlassVisual } from "@/components/hero/HeroGlassVisual";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Mail, MapPin, Sparkles, ArrowRight } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { personal, social } = portfolioData;

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Headline, Bio, CTAs, Social */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10 space-y-6">
          {/* Availability Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-subtle text-xs font-medium text-[var(--text-dark)] shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span>{personal.availabilityText}</span>
          </div>

          {/* Main Headline & Identity */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-dark)] leading-[1.12]">
              Hello, I&apos;m{" "}
              <span className="gradient-text">
                {personal.name && personal.name !== "[YOUR FULL NAME]"
                  ? personal.name
                  : "an Engineer"}
              </span>
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-[var(--text-secondary)] tracking-tight">
              {personal.headline}
            </p>
          </div>

          {/* Supporting Editorial Description */}
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed">
            {personal.introduction}
          </p>

          {/* Location Badge if provided */}
          {personal.location && (
            <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-muted)]">
              <MapPin className="w-3.5 h-3.5 text-[#4776E6]" />
              <span>{personal.location}</span>
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <GlassButton
              variant="primary"
              size="lg"
              onClick={scrollToProjects}
              icon="arrow"
            >
              Explore My Work
            </GlassButton>

            {personal.resumeUrl && (
              <GlassButton
                variant="secondary"
                size="lg"
                href={personal.resumeUrl}
                target="_blank"
                icon="download"
              >
                Download Resume
              </GlassButton>
            )}

            <GlassButton
              variant="ghost"
              size="lg"
              onClick={scrollToContact}
              className="text-xs sm:text-sm"
            >
              Let&apos;s Connect
            </GlassButton>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5 pt-4">
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full glass-subtle text-[var(--text-secondary)] hover:text-[#4776E6] hover:scale-110 active:scale-95 transition-all duration-200"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full glass-subtle text-[var(--text-secondary)] hover:text-[#4776E6] hover:scale-110 active:scale-95 transition-all duration-200"
                aria-label="GitHub profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="p-2.5 rounded-full glass-subtle text-[var(--text-secondary)] hover:text-[#4776E6] hover:scale-110 active:scale-95 transition-all duration-200"
                aria-label="Send direct email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
            <div className="h-4 w-px bg-black/10 dark:bg-white/10 mx-1" />
            <span className="text-xs text-[var(--text-muted)] font-mono">
              SCROLL TO EXPLORE
            </span>
          </div>
        </div>

        {/* Right Column: 3D-Inspired Liquid Glass Visual Composition */}
        <div className="lg:col-span-5 flex items-center justify-center lg:justify-end z-10">
          <HeroGlassVisual />
        </div>
      </div>
    </section>
  );
};
