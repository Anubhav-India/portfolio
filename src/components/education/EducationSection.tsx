"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  Sparkles,
} from "lucide-react";

export const EducationSection: React.FC = () => {
  const { education } = portfolioData;

  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto space-y-14">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-subtle text-xs font-mono font-medium text-[#4776E6]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-dark)] tracking-tight">
            Education & <span className="gradient-text">Academic Journey</span>
          </h2>
          <p className="text-base text-[var(--text-secondary)] max-w-xl">
            Formal training in core engineering, electronics, computer science fundamentals, and mathematical systems.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#4776E6]/25 dark:border-[#4776E6]/40 space-y-12">
          {education.map((item) => (
            <div key={item.id} className="relative group">
              {/* Glowing Timeline Marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-5 h-5 rounded-full bg-white dark:bg-[#0B0F19] border-4 border-[#4776E6] shadow-[0_0_12px_rgba(71,118,230,0.6)] transition-transform duration-300 group-hover:scale-125" />

              {/* Education Glass Card */}
              <GlassCard
                variant="card"
                className="p-6 sm:p-8 space-y-5 hover:-translate-y-1 transition-transform"
              >
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg sm:text-xl font-bold text-[var(--text-dark)]">
                        {item.institution}
                      </span>
                      {item.currentStatus && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {item.currentStatus}
                        </span>
                      )}
                    </div>

                    <div className="text-sm sm:text-base font-semibold text-[#4776E6]">
                      {item.degree} • <span className="text-[var(--text-secondary)]">{item.branch}</span>
                    </div>
                  </div>

                  {/* Dates & Location */}
                  <div className="flex sm:flex-col items-start sm:items-end gap-2 text-xs text-[var(--text-muted)] font-mono shrink-0">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#4776E6]" />
                      <span>{item.startYear} — {item.endYear}</span>
                    </div>
                    {item.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* CGPA Badge (only if provided) */}
                {item.cgpa && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#4776E6]/10 text-xs font-mono font-semibold text-[#4776E6]">
                    <span>Cumulative Grade Point (CGPA):</span>
                    <span className="text-sm font-bold text-[var(--text-dark)]">{item.cgpa}</span>
                  </div>
                )}

                {/* Coursework Tags */}
                {item.coursework && item.coursework.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                      <BookOpen className="w-3.5 h-3.5 text-[#4776E6]" />
                      <span>Key Academic Coursework</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.coursework.map((course, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium glass-subtle text-[var(--text-secondary)]"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Academic Achievements */}
                {item.academicAchievements && item.academicAchievements.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      <span>Honors & Recognitions</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                      {item.academicAchievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#4776E6] mt-0.5">•</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
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
