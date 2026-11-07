"use client";

import React, { useState, useMemo } from "react";
import { portfolioData } from "@/data/portfolio";
import { ProjectItem, ProjectCategory } from "@/types/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { GithubIcon } from "@/components/ui/BrandIcons";
import {
  FolderGit2,
  ExternalLink,
  Sparkles,
  Layers,
  ArrowRight,
  Maximize2,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES: ProjectCategory[] = [
  "All",
  "Embedded Systems",
  "Software",
  "Electronics",
  "AI/ML",
];

const CARD_THEMES = [
  {
    bg: "bg-[#FFF5EE]",
    border: "border-[#FFD6BF]",
    badgeBg: "bg-[#FFD6BF]/50",
    badgeText: "text-[#343A32]",
    tagBg: "bg-[#FFFDF5]",
    glow: "rgba(255, 214, 191, 0.4)",
  }, // Peach
  {
    bg: "bg-[#F2FAF4]",
    border: "border-[#C8E8D0]",
    badgeBg: "bg-[#C8E8D0]/50",
    badgeText: "text-[#343A32]",
    tagBg: "bg-[#FFFDF5]",
    glow: "rgba(200, 232, 208, 0.4)",
  }, // Mint
  {
    bg: "bg-[#FEFCEE]",
    border: "border-[#F8E7A1]",
    badgeBg: "bg-[#F8E7A1]/50",
    badgeText: "text-[#343A32]",
    tagBg: "bg-[#FFFDF5]",
    glow: "rgba(248, 231, 161, 0.4)",
  }, // Butter Yellow
  {
    bg: "bg-[#F4F8F3]",
    border: "border-[#A9C7A5]",
    badgeBg: "bg-[#A9C7A5]/50",
    badgeText: "text-[#343A32]",
    tagBg: "bg-[#FFFDF5]",
    glow: "rgba(169, 199, 165, 0.4)",
  }, // Soft Sage
  {
    bg: "bg-[#FDF4F4]",
    border: "border-[#F3C1C1]",
    badgeBg: "bg-[#F3C1C1]/50",
    badgeText: "text-[#343A32]",
    tagBg: "bg-[#FFFDF5]",
    glow: "rgba(243, 193, 193, 0.4)",
  }, // Soft Rose
];

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return portfolioData.projects;
    return portfolioData.projects.filter(
      (p) => p.category === activeCategory
    );
  }, [activeCategory]);

  const featuredProject = useMemo(() => {
    return filteredProjects.find((p) => p.featured) || filteredProjects[0];
  }, [filteredProjects]);

  const supportingProjects = useMemo(() => {
    if (!featuredProject) return filteredProjects;
    return filteredProjects.filter((p) => p.id !== featuredProject.id);
  }, [filteredProjects, featuredProject]);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#FFFDF5]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-subtle text-xs font-mono font-medium text-[#F28B82]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PORTFOLIO SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-dark)] tracking-tight">
              Featured <span className="gradient-text">Engineering Projects</span>
            </h2>
            <p className="text-base text-[var(--text-secondary)] max-w-xl">
              Real-world systems, embedded firmware, signal processors, and high-performance applications designed with precision.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap",
                  activeCategory === cat
                    ? "bg-[#343A32] text-[#FFFDF5] shadow-sm font-semibold border border-[#343A32]"
                    : "bg-[#FFFDF5] text-[var(--text-secondary)] hover:text-[var(--text-dark)] border border-[#FFD6BF]/40"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Project Showcase Card (Level 3 Liquid Glass) */}
        {featuredProject && (
          <GlassCard
            variant="liquid"
            glowColor="rgba(246, 183, 122, 0.25)"
            className="p-8 sm:p-10 lg:p-12 relative overflow-hidden group bg-gradient-to-br from-[#FFFDF5] via-[#FFF9F3] to-[#FFF4DF] border border-[#FFD6BF]/80 shadow-md"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#F28B82]/15 text-[#F28B82] border border-[#F28B82]/30">
                    {featuredProject.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#F8E7A1]/50 text-[#343A32] border border-[#F8E7A1] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#F6B77A]" />
                    <span>Featured Showcase</span>
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-dark)] tracking-tight">
                  {featuredProject.title}
                </h3>

                <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                  {featuredProject.shortDescription}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {featuredProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#FFFDF5] text-[var(--text-dark)] border border-[#FFD6BF]/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <GlassButton
                    variant="primary"
                    size="md"
                    onClick={() => setSelectedProject(featuredProject)}
                  >
                    <Maximize2 className="w-4 h-4 mr-1.5" />
                    View Deep-Dive Architecture
                  </GlassButton>

                  {featuredProject.githubUrl && (
                    <GlassButton
                      variant="secondary"
                      size="md"
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GithubIcon className="w-4 h-4 mr-1.5" />
                      GitHub Repo
                    </GlassButton>
                  )}

                  {featuredProject.liveDemoUrl && (
                    <GlassButton
                      variant="ghost"
                      size="md"
                      href={featuredProject.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-1.5" />
                      Live Demo
                    </GlassButton>
                  )}
                </div>
              </div>

              {/* Right Column: Architectural Visual Highlight */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="w-full bg-[#FFFDF5]/90 p-6 rounded-3xl border border-[#FFD6BF]/60 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] border-b border-[#FFD6BF]/30 pb-2">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#F6B77A]" />
                      <span>SYSTEM PROFILE</span>
                    </span>
                    <span className="text-[#A9C7A5] font-semibold">OPTIMIZED</span>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs">
                      <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Core Problem</div>
                      <div className="text-xs text-[var(--text-dark)] mt-0.5 font-medium">
                        {featuredProject.problemStatement || "High-frequency telemetry & edge filtering"}
                      </div>
                    </div>

                    <div className="text-xs">
                      <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Latency Target</div>
                      <div className="text-xs font-mono text-[#A9C7A5] font-bold mt-0.5">
                        &lt; 15ms Real-Time Deterministic Response
                      </div>
                    </div>

                    <div className="text-xs">
                      <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Verification</div>
                      <div className="text-xs text-[var(--text-secondary)] mt-0.5">
                        Hardware-in-the-loop & simulated EMI noise tolerance
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedProject(featuredProject)}
                    className="w-full py-2.5 rounded-xl bg-[#F6B77A]/20 text-[#343A32] hover:bg-[#F6B77A]/30 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Inspect Schematics & Logs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Supporting Projects Grid with Alternating Warm Pastel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportingProjects.map((project, idx) => {
            const theme = CARD_THEMES[idx % CARD_THEMES.length];
            return (
              <GlassCard
                key={project.id}
                variant="card"
                glowColor={theme.glow}
                data-cursor="VIEW"
                className={cn(
                  "p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1.5 group cursor-pointer border transition-all duration-300 shadow-sm",
                  theme.bg,
                  theme.border
                )}
                onClick={() => setSelectedProject(project)}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium",
                        theme.badgeBg,
                        theme.badgeText
                      )}
                    >
                      {project.category}
                    </span>
                    <div className="flex items-center gap-1 text-[var(--text-muted)] group-hover:text-[#F28B82] transition-colors">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-[var(--text-dark)] group-hover:text-[#F28B82] transition-colors">
                    {project.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/5 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className={cn(
                          "px-2 py-0.5 rounded-md text-[10px] font-mono text-[var(--text-dark)] border border-black/5",
                          theme.tagBg
                        )}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-md text-[10px] font-mono text-[var(--text-muted)] border border-black/5",
                          theme.tagBg
                        )}
                      >
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#F28B82] font-semibold pt-1">
                    <span>Explore Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-16 text-center text-sm text-[var(--text-muted)]">
            No projects found in this category.
          </div>
        )}
      </div>

      {/* Deep-Dive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
