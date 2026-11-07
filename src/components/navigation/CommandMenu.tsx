"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Search, FolderGit2, User, GraduationCap, Briefcase, Sparkles, Mail, FileText, SunMoon, Copy, Check, X } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({
  isOpen,
  onClose,
  onToggleTheme,
}) => {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const navigateTo = useCallback((hash: string) => {
    onClose();
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [onClose]);

  const copyEmail = useCallback(() => {
    if (portfolioData.personal.email) {
      navigator.clipboard.writeText(portfolioData.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  const openResume = useCallback(() => {
    onClose();
    if (portfolioData.personal.resumeUrl) {
      window.open(portfolioData.personal.resumeUrl, "_blank");
    }
  }, [onClose]);

  const items = [
    {
      id: "projects",
      name: "Featured Projects",
      category: "Navigation",
      icon: FolderGit2,
      action: () => navigateTo("projects"),
    },
    {
      id: "about",
      name: "About Me & Philosophy",
      category: "Navigation",
      icon: User,
      action: () => navigateTo("about"),
    },
    {
      id: "skills",
      name: "Technical Skills",
      category: "Navigation",
      icon: Sparkles,
      action: () => navigateTo("skills"),
    },
    {
      id: "education",
      name: "Education & Academics",
      category: "Navigation",
      icon: GraduationCap,
      action: () => navigateTo("education"),
    },
    {
      id: "experience",
      name: "Experience & Internships",
      category: "Navigation",
      icon: Briefcase,
      action: () => navigateTo("experience"),
    },
    {
      id: "contact",
      name: "Get in Touch",
      category: "Navigation",
      icon: Mail,
      action: () => navigateTo("contact"),
    },
    {
      id: "resume",
      name: "Open Resume PDF",
      category: "Action",
      icon: FileText,
      action: openResume,
    },
    {
      id: "copy-email",
      name: copied ? "Email Copied to Clipboard!" : "Copy Email Address",
      category: "Action",
      icon: copied ? Check : Copy,
      action: copyEmail,
    },
    {
      id: "theme",
      name: "Toggle Light / Dark Theme",
      category: "Action",
      icon: SunMoon,
      action: () => {
        onToggleTheme();
        onClose();
      },
    },
  ];

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:pt-28"
      role="dialog"
      aria-modal="true"
      aria-label="Command Menu"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Dialog Body */}
      <div className="relative w-full max-w-lg bg-[#FFFDF5] rounded-2xl overflow-hidden shadow-2xl border border-[#FFD6BF] animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#FFD6BF]/40 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Type a command or search sections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-[var(--text-dark)] placeholder:text-[var(--text-muted)] text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
            aria-label="Close command menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-[var(--text-muted)]">
              No matching commands found.
            </div>
          ) : (
            filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm text-[var(--text-dark)] hover:bg-[#FFF4DF] hover:text-[#F28B82] transition-colors duration-150 group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-[#FFF4DF] text-[#343A32] group-hover:text-[#F28B82]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-[10px] tracking-wider uppercase text-[var(--text-muted)] font-mono">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2.5 bg-[#FFF4DF]/50 border-t border-[#FFD6BF]/40 flex items-center justify-between text-[11px] text-[var(--text-muted)]">
          <span>Use keyboard navigation</span>
          <div className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-[#FFFDF5] border border-[#FFD6BF] font-mono text-[10px] text-[#343A32]">
              ESC
            </kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
