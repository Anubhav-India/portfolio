"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Trophy,
  Award,
  Calendar,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export const AchievementsSection: React.FC = () => {
  const { achievements } = portfolioData;

  if (!achievements || achievements.length === 0) return null;

  return (
    <section id="achievements" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-subtle text-xs font-mono font-medium text-[#4776E6]">
            <Trophy className="w-3.5 h-3.5" />
            <span>HONORS & VALIDATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-dark)] tracking-tight">
            Achievements & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-base text-[var(--text-secondary)] max-w-xl">
            Verified technical awards, hackathon recognitions, and professional credentials.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((item) => (
            <GlassCard
              key={item.id}
              variant="card"
              className="p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1 transition-transform group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#4776E6]" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[var(--text-dark)] group-hover:text-[#4776E6] transition-colors">
                  {item.title}
                </h3>

                <div className="text-xs font-mono font-semibold text-[#4776E6]">
                  {item.issuer}
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Verification Link */}
              {item.verificationLink && (
                <div className="pt-4 mt-4 border-t border-black/5 dark:border-white/5">
                  <a
                    href={item.verificationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4776E6] hover:underline"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
