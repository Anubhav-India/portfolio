"use client";

import React from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";
import { StripeBeamCanvas } from "@/components/ui/StripeBeamCanvas";
import { Compass, Lightbulb, Target, Sparkles, CheckCircle2, MapPin } from "lucide-react";

export const AboutSection: React.FC = () => {
  const { personal } = portfolioData;

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-subtle text-xs font-mono font-medium text-[#4776E6]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BACKGROUND & VISION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-dark)] tracking-tight">
            Engineering with <span className="gradient-text">Precision & Purpose</span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl">
            A closer look at my engineering philosophy, technical curiosity, and problem-solving methodology.
          </p>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Narrative Bio */}
          <div className="lg:col-span-7 space-y-6">
            <GlassCard variant="card" className="p-8 sm:p-10 space-y-6">
              <h3 className="text-xl font-bold text-[var(--text-dark)]">
                About Me
              </h3>
              <div className="space-y-4 text-base leading-relaxed text-[var(--text-secondary)]">
                {personal.aboutBio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Working Philosophy */}
              {personal.workingPhilosophy && (
                <div className="pt-6 border-t border-black/5 dark:border-white/10">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-[#4776E6]/10 text-[#4776E6] shrink-0 mt-0.5">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--text-dark)] uppercase tracking-wider font-mono">
                        Working Philosophy
                      </h4>
                      <p className="text-sm text-[var(--text-secondary)] mt-1 italic">
                        &ldquo;{personal.workingPhilosophy}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </GlassCard>

            {/* Cursor-Sensitive Optical Beam Dynamics (Stripe-inspired) */}
            <StripeBeamCanvas />
          </div>

          {/* Right Column: Focus Areas & Aspirations */}
          <div className="lg:col-span-5 space-y-6">
            {/* Optional Profile Portrait Card */}
            {personal.profileImage && (
              <GlassCard variant="liquid" className="p-3.5 sm:p-4 rounded-3xl overflow-hidden group">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={personal.profileImage}
                    alt={personal.name || "Profile"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 450px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  {personal.location && (
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full glass-subtle text-xs text-white flex items-center gap-1.5 font-medium shadow-sm">
                      <MapPin className="w-3.5 h-3.5 text-[#55C8D9]" />
                      <span>{personal.location}</span>
                    </div>
                  )}
                </div>
              </GlassCard>
            )}

            {/* Core Focus Areas */}
            <GlassCard variant="liquid" className="p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#55C8D9]/15 text-[#55C8D9]">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-dark)]">
                  Primary Areas of Interest
                </h3>
              </div>
              <ul className="space-y-3">
                {personal.areasOfInterest.map((area, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-[var(--text-dark)] glass-subtle px-3.5 py-2.5 rounded-xl"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#4776E6] shrink-0" />
                    <span className="font-medium">{area}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>

            {/* Future Aspirations Card */}
            {personal.futureAspirations && (
              <GlassCard variant="subtle" className="p-6 sm:p-7 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#9075E8]">
                  <Lightbulb className="w-4 h-4" />
                  <span>FORWARD OUTLOOK</span>
                </div>
                <h4 className="text-base font-bold text-[var(--text-dark)]">
                  Continuous Evolution
                </h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {personal.futureAspirations}
                </p>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
