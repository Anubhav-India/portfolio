"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Briefcase,
  Calendar,
  MapPin,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Wrench,
} from "lucide-react";

export const ExperienceSection: React.FC = () => {
  const { experience } = portfolioData;

  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-transparent">
      <div className="max-w-5xl mx-auto space-y-14">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-subtle text-xs font-mono font-medium text-[#F28B82]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INDUSTRY & INTERNSHIPS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-dark)] tracking-tight">
            Work Experience & <span className="gradient-text">Internships</span>
          </h2>
          <p className="text-base text-[var(--text-secondary)] max-w-xl">
            Practical contributions, engineering deployments, and collaborative technical achievements.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#F6B77A]/40 space-y-12">
          {experience.map((item) => (
            <div key={item.id} className="relative group">
              {/* Glowing Timeline Marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-5 h-5 rounded-full bg-[#FFFDF5] border-4 border-[#F6B77A] shadow-[0_0_12px_rgba(246,183,122,0.6)] transition-transform duration-300 group-hover:scale-125" />

              {/* Experience Glass Card */}
              <GlassCard
                variant="card"
                glowColor="rgba(246, 183, 122, 0.25)"
                className="p-6 sm:p-8 space-y-5 hover:-translate-y-1 transition-transform bg-[#FFFDF5]/90 border border-[#FFD6BF]/60 shadow-sm"
              >
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg sm:text-xl font-bold text-[var(--text-dark)]">
                        {item.position}
                      </span>
                      {item.current && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#C8E8D0]/60 text-[#343A32] border border-[#A9C7A5]">
                          Active Role
                        </span>
                      )}
                    </div>

                    <div className="text-sm sm:text-base font-semibold text-[#F28B82] flex items-center gap-2">
                      <span>{item.organization}</span>
                      {item.department && (
                        <span className="text-xs text-[var(--text-muted)] font-normal">
                          • {item.department}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Dates & Location */}
                  <div className="flex sm:flex-col items-start sm:items-end gap-2 text-xs text-[var(--text-muted)] font-mono shrink-0">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#F6B77A]" />
                      <span>{item.startDate} — {item.endDate}</span>
                    </div>
                    {item.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Narrative Summary */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>

                {/* Key Responsibilities */}
                {item.responsibilities && item.responsibilities.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                      Key Responsibilities & Deliverables
                    </div>
                    <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                      {item.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#A9C7A5] shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills Developed */}
                {item.skillsDeveloped && item.skillsDeveloped.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-[#FFD6BF]/30">
                    <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                      <Wrench className="w-3.5 h-3.5 text-[#F6B77A]" />
                      <span>Competencies Applied</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.skillsDeveloped.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FFFDF5] text-[var(--text-secondary)] border border-[#FFD6BF]/40"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* External Link */}
                {item.link && (
                  <div className="pt-2">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F28B82] hover:underline"
                    >
                      <span>Organization Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
