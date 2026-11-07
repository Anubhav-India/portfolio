"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Microscope,
  Cpu,
  Activity,
  Sparkles,
  FileText,
  ExternalLink,
  BookOpen,
} from "lucide-react";

export const ResearchSection: React.FC = () => {
  const { research } = portfolioData;

  if (!research || research.length === 0) return null;

  return (
    <section id="research" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#FFFDF5]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-subtle text-xs font-mono font-medium text-[#F28B82]">
            <Microscope className="w-3.5 h-3.5" />
            <span>EXPLORATION & INQUIRY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-dark)] tracking-tight">
            Research & <span className="gradient-text">Technical Interests</span>
          </h2>
          <p className="text-base text-[var(--text-secondary)] max-w-xl">
            Theoretical and empirical investigations into multi-rate sensor fusion, embedded edge autonomy, and modern human-machine interfaces.
          </p>
        </div>

        {/* Research Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {research.map((item) => (
            <GlassCard
              key={item.id}
              variant="card"
              glowColor="rgba(242, 139, 130, 0.2)"
              className="p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1.5 transition-transform group bg-[#FFFDF5]/90 border border-[#FFD6BF]/60 shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-[#F28B82]/15 text-[#F28B82] group-hover:bg-[#F28B82] group-hover:text-[#FFFDF5] transition-colors duration-300">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--text-muted)]">
                    DOMAIN INQUIRY
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[var(--text-dark)] group-hover:text-[#F28B82] transition-colors">
                  {item.domain}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>

                {/* Technical Concepts */}
                <div className="space-y-2 pt-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                    Core Technical Concepts
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.technicalConcepts.map((concept, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#FFFDF5] text-[var(--text-dark)] border border-[#FFD6BF]/40"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Associated Publications / Projects */}
              <div className="mt-6 pt-4 border-t border-[#FFD6BF]/30 space-y-3">
                {item.publications && item.publications.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#F28B82] font-semibold">
                      <BookOpen className="w-3 h-3" />
                      <span>Publications & Working Papers</span>
                    </div>
                    {item.publications.map((pub, idx) => (
                      <div
                        key={idx}
                        className="bg-[#FFF4DF]/50 p-2.5 rounded-xl text-xs space-y-1 border border-[#FFD6BF]/30"
                      >
                        <div className="font-medium text-[var(--text-dark)] leading-snug">
                          {pub.title}
                        </div>
                        <div className="text-[10px] text-[var(--text-muted)] font-mono flex items-center justify-between">
                          <span>{pub.venue || "Peer Review"}</span>
                          {pub.year && <span>{pub.year}</span>}
                        </div>
                        {pub.link && (
                          <a
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-[#F28B82] hover:underline pt-0.5"
                          >
                            <span>Read Paper</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {item.associatedProjects && item.associatedProjects.length > 0 && (
                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <span>Applied in:</span>
                    <span className="font-medium text-[var(--text-dark)] truncate max-w-[180px]">
                      {item.associatedProjects.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
