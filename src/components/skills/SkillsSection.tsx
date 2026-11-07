"use client";

import React, { useState, useMemo } from "react";
import { portfolioData } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Code2,
  Terminal,
  Cpu,
  Wrench,
  Layers,
  Sparkles,
  Search,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SkillItem } from "@/types/portfolio";

const CATEGORY_TABS = [
  { id: "all", label: "All Skills", icon: Layers },
  { id: "programming", label: "Languages", icon: Terminal },
  { id: "software", label: "Software & Web", icon: Code2 },
  { id: "electronics", label: "Electronics & Embedded", icon: Cpu },
  { id: "engineeringTools", label: "Tools & Simulation", icon: Wrench },
  { id: "other", label: "Systems & ML", icon: Sparkles },
];

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const allSkills = useMemo(() => {
    const list: SkillItem[] = [];
    Object.values(portfolioData.skills).forEach((categorySkills) => {
      list.push(...categorySkills);
    });
    return list;
  }, []);

  const filteredSkills = useMemo(() => {
    return allSkills.filter((skill) => {
      const matchesCategory =
        activeTab === "all" || skill.category === activeTab;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (skill.level && skill.level.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [allSkills, activeTab, searchQuery]);

  const getLevelBadgeClass = (level?: string) => {
    switch (level) {
      case "Advanced":
        return "bg-[#C8E8D0]/70 text-[#343A32] border-[#A9C7A5]";
      case "Intermediate":
        return "bg-[#F6B77A]/30 text-[#343A32] border-[#F6B77A]/60";
      case "Working knowledge":
        return "bg-[#F8E7A1]/60 text-[#343A32] border-[#F8E7A1]";
      case "Familiar":
        return "bg-[#F3C1C1]/60 text-[#343A32] border-[#F3C1C1]";
      default:
        return "bg-[#FFFDF5] text-[#343A32] border-[#FFD6BF]";
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-transparent">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-subtle text-xs font-mono font-medium text-[#F28B82]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TECHNICAL CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-dark)] tracking-tight">
              Skills & <span className="gradient-text">Engineering Depth</span>
            </h2>
            <p className="text-base text-[var(--text-secondary)] max-w-xl">
              From bare-metal firmware and circuit design to modern full-stack web applications and simulation modeling.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-full bg-[#FFFDF5] border border-[#FFD6BF] text-[var(--text-dark)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#F28B82]"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-xs transition-all duration-200 cursor-pointer select-none",
                  isActive
                    ? "bg-gradient-to-r from-[#F6B77A] to-[#F28B82] text-white shadow-md font-bold border border-transparent"
                    : "bg-[#FFFDF5]/90 text-[#343A32] hover:bg-[#FFF4DF] hover:border-[#F6B77A] border border-[#FFD6BF] shadow-xs font-medium"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill, index) => (
            <GlassCard
              key={`${skill.name}-${index}`}
              variant="card"
              glowColor="rgba(246, 183, 122, 0.2)"
              className="p-5 flex flex-col justify-between hover:-translate-y-1 group bg-[#FFFDF5]/90 border border-[#FFD6BF]/50 hover:border-[#F6B77A] shadow-xs"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-semibold text-sm text-[var(--text-dark)] group-hover:text-[#F28B82] transition-colors">
                  {skill.name}
                </span>
                {skill.level && (
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[10px] font-mono border font-medium uppercase tracking-wider shrink-0",
                      getLevelBadgeClass(skill.level)
                    )}
                  >
                    {skill.level}
                  </span>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-[#FFD6BF]/30 flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono capitalize">
                <span>{skill.category}</span>
                <span className="opacity-0 group-hover:opacity-100 text-[#A9C7A5] font-semibold transition-opacity duration-200">
                  Verified
                </span>
              </div>
            </GlassCard>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="py-16 text-center text-sm text-[var(--text-muted)]">
            No matching technical skills found for &ldquo;{searchQuery}&rdquo;.
          </div>
        )}
      </div>
    </section>
  );
};
