"use client";

import React, { useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { GlassButton } from "@/components/ui/GlassButton";
import { HeroGlassVisual } from "@/components/hero/HeroGlassVisual";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Mail, MapPin, Sparkles, ArrowRight } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { personal, social } = portfolioData;
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    // Subtle parallax shift max +-8px
    setParallax({ x: x * 8, y: y * 8 });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

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
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Headline, Bio, CTAs, Social */}
        <div
          className="lg:col-span-7 flex flex-col items-start text-left z-10 space-y-6 transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${parallax.x * 0.5}px, ${parallax.y * 0.5}px, 0)`,
          }}
        >
          {/* Availability Pill in Soft Sage & Mint Green */}
          <div
            data-cursor="STATUS"
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#C8E8D0]/50 border border-[#A9C7A5]/50 text-xs font-semibold text-[#343A32] shadow-sm cursor-default"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A9C7A5] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#6B9A64]" />
            </span>
            <span>{personal.availabilityText}</span>
          </div>

          {/* Main Headline & Identity */}
          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] font-bold text-[#77776D] block">
              Hello, I&apos;m
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#343A32] leading-[1.08]">
              <span className="gradient-text">
                {personal.name && personal.name !== "[YOUR FULL NAME]"
                  ? personal.name
                  : "Anubhav Anand"}
              </span>
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-[#77776D] tracking-tight pt-1">
              {personal.headline}
            </p>
          </div>

          {/* Supporting Editorial Description */}
          <p className="text-base sm:text-lg text-[#77776D] max-w-xl leading-relaxed">
            {personal.introduction}
          </p>

          {/* Location Badge */}
          {personal.location && (
            <div
              data-cursor="LOCATION"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF4DF] border border-[#F6B77A]/40 text-xs font-mono font-semibold text-[#343A32] shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5 text-[#F28B82]" />
              <span>{personal.location}</span>
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <div data-cursor="EXPLORE">
              <GlassButton
                variant="primary"
                size="lg"
                onClick={scrollToProjects}
                icon="arrow"
              >
                Explore My Work
              </GlassButton>
            </div>

            {personal.resumeUrl && (
              <div data-cursor="RESUME">
                <GlassButton
                  variant="secondary"
                  size="lg"
                  href={personal.resumeUrl}
                  target="_blank"
                  icon="download"
                >
                  Download Resume
                </GlassButton>
              </div>
            )}

            <div data-cursor="CONNECT">
              <GlassButton
                variant="ghost"
                size="lg"
                onClick={scrollToContact}
                className="text-xs sm:text-sm"
              >
                Let&apos;s Connect
              </GlassButton>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5 pt-4">
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="LINKEDIN"
                className="p-2.5 rounded-full bg-[#FFFDF5] border border-[#A9C7A5]/40 text-[#343A32] hover:text-[#F28B82] hover:border-[#F28B82] hover:scale-110 active:scale-95 transition-all duration-200 shadow-sm"
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
                data-cursor="GITHUB"
                className="p-2.5 rounded-full bg-[#FFFDF5] border border-[#A9C7A5]/40 text-[#343A32] hover:text-[#F28B82] hover:border-[#F28B82] hover:scale-110 active:scale-95 transition-all duration-200 shadow-sm"
                aria-label="GitHub profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                data-cursor="EMAIL"
                className="p-2.5 rounded-full bg-[#FFFDF5] border border-[#A9C7A5]/40 text-[#343A32] hover:text-[#F28B82] hover:border-[#F28B82] hover:scale-110 active:scale-95 transition-all duration-200 shadow-sm"
                aria-label="Send direct email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
            <div className="h-4 w-px bg-[#A9C7A5]/30 mx-1" />
            <span className="text-xs text-[#77776D] font-mono font-medium">
              SCROLL TO EXPLORE
            </span>
          </div>
        </div>

        {/* Right Column: 3D-Inspired Liquid Glass Visual Composition */}
        <div
          className="lg:col-span-5 flex items-center justify-center lg:justify-end z-10 transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${-parallax.x * 0.4}px, ${-parallax.y * 0.4}px, 0)`,
          }}
          data-cursor="SYSTEM"
        >
          <HeroGlassVisual />
        </div>
      </div>
    </section>
  );
};
