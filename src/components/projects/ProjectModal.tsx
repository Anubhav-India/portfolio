"use client";

import React, { useEffect, useState } from "react";
import { ProjectItem } from "@/types/portfolio";
import { GlassButton } from "@/components/ui/GlassButton";
import { GithubIcon } from "@/components/ui/BrandIcons";
import {
  X,
  ExternalLink,
  Cpu,
  Layers,
  Code2,
  CheckCircle,
  AlertCircle,
  FileText,
  Workflow,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "hardware" | "outcomes">("overview");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const hasHardware = Boolean(project.hardwareDetails);
  const hasArchitecture = Boolean(
    project.technicalArchitecture || project.softwareDetails
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Window */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FFFDF5] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#FFD6BF] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-[#FFD6BF]/40 flex items-start justify-between gap-4 bg-[#FFF4DF]/50">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#F28B82]/15 text-[#F28B82] border border-[#F28B82]/30">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#F8E7A1]/50 text-[#343A32] border border-[#F8E7A1] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#F6B77A]" />
                  <span>Featured Project</span>
                </span>
              )}
            </div>
            <h2
              id="project-modal-title"
              className="text-2xl sm:text-3xl font-extrabold text-[var(--text-dark)]"
            >
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full glass-subtle text-[var(--text-secondary)] hover:text-[#343A32] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 sm:px-8 py-3 border-b border-[#FFD6BF]/40 overflow-x-auto bg-[#FFFDF5]">
          <button
            onClick={() => setActiveTab("overview")}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer font-medium",
              activeTab === "overview"
                ? "bg-gradient-to-r from-[#F6B77A] to-[#F28B82] text-white shadow-sm font-bold"
                : "bg-[#FFFDF5] text-[#77776D] hover:text-[#343A32] hover:bg-[#FFF4DF] border border-[#FFD6BF]/40"
            )}
          >
            Overview & Problem
          </button>

          {hasArchitecture && (
            <button
              onClick={() => setActiveTab("architecture")}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer font-medium",
                activeTab === "architecture"
                  ? "bg-gradient-to-r from-[#F6B77A] to-[#F28B82] text-white shadow-sm font-bold"
                  : "bg-[#FFFDF5] text-[#77776D] hover:text-[#343A32] hover:bg-[#FFF4DF] border border-[#FFD6BF]/40"
              )}
            >
              System Architecture
            </button>
          )}

          {hasHardware && (
            <button
              onClick={() => setActiveTab("hardware")}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer font-medium",
                activeTab === "hardware"
                  ? "bg-gradient-to-r from-[#F6B77A] to-[#F28B82] text-white shadow-sm font-bold"
                  : "bg-[#FFFDF5] text-[#77776D] hover:text-[#343A32] hover:bg-[#FFF4DF] border border-[#FFD6BF]/40"
              )}
            >
              Hardware & Circuit
            </button>
          )}

          <button
            onClick={() => setActiveTab("outcomes")}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer font-medium",
              activeTab === "outcomes"
                ? "bg-gradient-to-r from-[#F6B77A] to-[#F28B82] text-white shadow-sm font-bold"
                : "bg-[#FFFDF5] text-[#77776D] hover:text-[#343A32] hover:bg-[#FFF4DF] border border-[#FFD6BF]/40"
            )}
          >
            Challenges & Results
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-[var(--text-muted)] mb-2">
                  Project Description
                </h3>
                <p className="text-base text-[var(--text-dark)] leading-relaxed">
                  {project.longDescription || project.shortDescription}
                </p>
              </div>

              {project.problemStatement && (
                <div className="glass-subtle p-5 rounded-2xl border-l-4 border-l-amber-500 space-y-1">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>The Problem Statement</span>
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {project.problemStatement}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="glass-subtle p-5 rounded-2xl border-l-4 border-l-emerald-500 space-y-1">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    <span>The Engineered Solution</span>
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}

              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-[var(--text-muted)] mb-3">
                    Key Features & Technical Capabilities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.keyFeatures.map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-xs text-[var(--text-dark)] glass-subtle p-3 rounded-xl"
                      >
                        <CheckCircle className="w-4 h-4 text-[#A9C7A5] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "architecture" && (
            <div className="space-y-6">
              {project.technicalArchitecture && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-[var(--text-muted)] mb-2 flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-[#F28B82]" />
                    <span>Technical Architecture</span>
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed glass-subtle p-4 rounded-2xl font-mono">
                    {project.technicalArchitecture}
                  </p>
                </div>
              )}

              {project.softwareDetails && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.softwareDetails.systemArchitecture && (
                    <div className="glass-subtle p-4 rounded-2xl space-y-1">
                      <div className="text-xs font-mono text-[var(--text-muted)] uppercase">Architecture Pattern</div>
                      <div className="text-sm font-medium text-[var(--text-dark)]">{project.softwareDetails.systemArchitecture}</div>
                    </div>
                  )}
                  {project.softwareDetails.apiStructure && (
                    <div className="glass-subtle p-4 rounded-2xl space-y-1">
                      <div className="text-xs font-mono text-[var(--text-muted)] uppercase">API Protocols</div>
                      <div className="text-sm font-medium text-[var(--text-dark)]">{project.softwareDetails.apiStructure}</div>
                    </div>
                  )}
                  {project.softwareDetails.database && (
                    <div className="glass-subtle p-4 rounded-2xl space-y-1">
                      <div className="text-xs font-mono text-[var(--text-muted)] uppercase">Database & Storage</div>
                      <div className="text-sm font-medium text-[var(--text-dark)]">{project.softwareDetails.database}</div>
                    </div>
                  )}
                  {project.softwareDetails.deployment && (
                    <div className="glass-subtle p-4 rounded-2xl space-y-1">
                      <div className="text-xs font-mono text-[var(--text-muted)] uppercase">Deployment Pipeline</div>
                      <div className="text-sm font-medium text-[var(--text-dark)]">{project.softwareDetails.deployment}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "hardware" && project.hardwareDetails && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.hardwareDetails.microcontroller && (
                  <div className="glass-subtle p-4 rounded-2xl space-y-1">
                    <div className="text-xs font-mono text-[var(--text-muted)] uppercase flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#F6B77A]" />
                      <span>Microcontroller / Processor</span>
                    </div>
                    <div className="text-sm font-medium text-[var(--text-dark)]">
                      {project.hardwareDetails.microcontroller}
                    </div>
                  </div>
                )}

                {project.hardwareDetails.workingPrinciple && (
                  <div className="glass-subtle p-4 rounded-2xl space-y-1 sm:col-span-2">
                    <div className="text-xs font-mono text-[var(--text-muted)] uppercase">
                      Working Principle & Signal Flow
                    </div>
                    <div className="text-sm text-[var(--text-secondary)]">
                      {project.hardwareDetails.workingPrinciple}
                    </div>
                  </div>
                )}

                {project.hardwareDetails.sensors && (
                  <div className="glass-subtle p-4 rounded-2xl space-y-2">
                    <div className="text-xs font-mono text-[var(--text-muted)] uppercase">
                      Sensors & Transducers
                    </div>
                    <ul className="text-xs text-[var(--text-dark)] space-y-1 list-disc list-inside">
                      {project.hardwareDetails.sensors.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.hardwareDetails.components && (
                  <div className="glass-subtle p-4 rounded-2xl space-y-2">
                    <div className="text-xs font-mono text-[var(--text-muted)] uppercase">
                      Integrated Modules & Components
                    </div>
                    <ul className="text-xs text-[var(--text-dark)] space-y-1 list-disc list-inside">
                      {project.hardwareDetails.components.map((c, idx) => (
                        <li key={idx}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "outcomes" && (
            <div className="space-y-6">
              {project.challenges && project.challenges.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-[var(--text-muted)] mb-3">
                    Technical Challenges Overcome
                  </h3>
                  <div className="space-y-2">
                    {project.challenges.map((chal, i) => (
                      <div
                        key={i}
                        className="text-xs text-[var(--text-secondary)] glass-subtle p-3 rounded-xl flex items-start gap-2"
                      >
                        <span className="font-mono text-[#F28B82] font-bold">0{i + 1}.</span>
                        <span>{chal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.resultsAndLearnings && project.resultsAndLearnings.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-[var(--text-muted)] mb-3">
                    Key Results & Engineering Learnings
                  </h3>
                  <div className="space-y-2">
                    {project.resultsAndLearnings.map((res, i) => (
                      <div
                        key={i}
                        className="text-xs text-[var(--text-dark)] glass-subtle p-3 rounded-xl flex items-start gap-2"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Technology Stack Tags */}
          <div className="pt-4 border-t border-black/5 dark:border-white/10">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
              Technologies & Frameworks
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-full text-xs font-mono font-medium glass-subtle text-[var(--text-dark)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer with External Links */}
        <div className="p-6 border-t border-[#FFD6BF]/40 bg-[#FFF4DF]/50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <GlassButton
                variant="secondary"
                size="sm"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="w-4 h-4 mr-1.5" />
                Repository
              </GlassButton>
            )}
            {project.liveDemoUrl && (
              <GlassButton
                variant="primary"
                size="sm"
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-1.5" />
                Live Demo
              </GlassButton>
            )}
          </div>

          <GlassButton variant="ghost" size="sm" onClick={onClose}>
            Close Window
          </GlassButton>
        </div>
      </div>
    </div>
  );
};
