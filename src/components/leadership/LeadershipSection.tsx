"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Users,
  Calendar,
  Award,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export const LeadershipSection: React.FC = () => {
  const { leadership } = portfolioData;

  if (!leadership || leadership.length === 0) return null;

  return (
    <section id="leadership" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#FFFDF5]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-subtle text-xs font-mono font-medium text-[#F28B82]">
            <Users className="w-3.5 h-3.5" />
            <span>COMMUNITY & MENTORSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-dark)] tracking-tight">
            Leadership & <span className="gradient-text">Responsibilities</span>
          </h2>
          <p className="text-base text-[var(--text-secondary)] max-w-xl">
            Mentoring junior engineers, spearheading technical symposiums, and fostering an active culture of engineering innovation.
          </p>
        </div>

        {/* Leadership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leadership.map((item) => (
            <GlassCard
              key={item.id}
              variant="card"
              glowColor="rgba(246, 183, 122, 0.2)"
              className="p-6 sm:p-8 space-y-5 hover:-translate-y-1 transition-transform bg-[#FFFDF5]/90 border border-[#FFD6BF]/60 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[var(--text-dark)]">
                    {item.position}
                  </h3>
                  <div className="text-sm font-semibold text-[#F28B82]">
                    {item.organization}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-[#F6B77A]" />
                  <span>{item.duration}</span>
                </div>
              </div>

              {/* Responsibilities */}
              {item.responsibilities && item.responsibilities.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                    Contributions & Organizational Impact
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                    {item.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#A9C7A5] shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Achievements */}
              {item.achievements && item.achievements.length > 0 && (
                <div className="pt-3 border-t border-[#FFD6BF]/30 space-y-1.5">
                  {item.achievements.map((ach, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs font-semibold text-[#343A32] bg-[#F8E7A1]/40 border border-[#F8E7A1] p-2 rounded-xl"
                    >
                      <Award className="w-4 h-4 shrink-0 text-[#F6B77A]" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
