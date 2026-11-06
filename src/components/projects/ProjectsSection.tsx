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
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-subtle text-xs font-mono font-medium text-[#4776E6]">
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
                    ? "glass-card text-[#4776E6] shadow-sm border-[#4776E6]/40 font-semibold"
                    : "glass-subtle text-[var(--text-secondary)] hover:text-[var(--text-dark)]"
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
            className="p-8 sm:p-10 lg:p-12 relative overflow-hidden group border-white/90 dark:border-white/20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#4776E6]/10 text-[#4776E6] border border-[#4776E6]/20">
                    {featuredProject.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
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
                      className="px-3 py-1 rounded-full text-xs font-mono font-medium glass-subtle text-[var(--text-dark)]"
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
                <div className="w-full glass-subtle p-6 rounded-3xl border border-white/70 dark:border-white/10 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] border-b border-black/5 dark:border-white/5 pb-2">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#4776E6]" />
                      <span>SYSTEM PROFILE</span>
                    </span>
                    <span className="text-emerald-500">OPTIMIZED</span>
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
                      <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
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
                    className="w-full py-2.5 rounded-xl bg-[#4776E6]/10 text-[#4776E6] hover:bg-[#4776E6]/20 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Inspect Schematics & Logs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Supporting Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportingProjects.map((project) => (
            <GlassCard
              key={project.id}
              variant="card"
              className="p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1.5 group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-[#4776E6]/10 text-[#4776E6]">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1 text-[var(--text-muted)] group-hover:text-[#4776E6] transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <h4 className="text-lg font-bold text-[var(--text-dark)] group-hover:text-[#4776E6] transition-colors">
                  {project.title}
                </h4>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/10 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono glass-subtle text-[var(--text-muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono glass-subtle text-[var(--text-muted)]">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-[#4776E6] font-medium pt-1">
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </GlassCard>
          ))}
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
