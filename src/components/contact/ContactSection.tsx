"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import confetti from "canvas-confetti";
import {
  Mail,
  Copy,
  Check,
  Send,
  MapPin,
  Clock,
  Sparkles,
  AlertCircle,
} from "lucide-react";

export const ContactSection: React.FC = () => {
  const { contact, social, personal } = portfolioData;

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const copyEmail = () => {
    if (contact.email) {
      navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Please enter your name.";
    if (!formData.email.trim()) {
      errs.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim()) errs.subject = "Please enter a subject.";
    if (!formData.message.trim()) errs.message = "Please write a brief message.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Provide immediate interactive fallback: build mailto link and trigger confetti
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#F28B82", "#F6B77A", "#A9C7A5", "#F8E7A1", "#C8E8D0"],
        });
      } catch (err) {
        // Safe fallback if confetti canvas fails
      }

      // Open mail client with pre-filled message
      const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent(
        `[Portfolio] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Hi, my name is ${formData.name} (${formData.email}).\n\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
    }, 800);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-transparent">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-subtle text-xs font-mono font-medium text-[#F28B82]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LET&apos;S COLLABORATE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-dark)] tracking-tight">
            {contact.headline}
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl">
            {contact.description}
          </p>
        </div>

        {/* 2-Column Grid: Contact Information & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Methods & Social Cards */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard variant="card" className="p-8 space-y-6 bg-[#FFFDF5]/90 border border-[#FFD6BF]/60">
              <h3 className="text-xl font-bold text-[var(--text-dark)]">
                Direct Contact
              </h3>

              {/* Email Address with Copy Button */}
              <div className="glass-subtle p-4 rounded-2xl flex items-center justify-between gap-3 border border-[#FFD6BF]/40">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-xl bg-[#F28B82]/15 text-[#F28B82] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                      Email Address
                    </div>
                    <div className="text-sm font-semibold text-[var(--text-dark)] truncate">
                      {contact.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  data-cursor="COPY"
                  className="p-2 rounded-xl bg-[#FFFDF5] border border-[#FFD6BF] text-[var(--text-secondary)] hover:text-[#F28B82] hover:border-[#F28B82] transition-colors cursor-pointer shrink-0 shadow-xs"
                  aria-label="Copy email address"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location & Turnaround */}
              <div className="space-y-3 pt-2">
                {contact.location && (
                  <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                    <MapPin className="w-4 h-4 text-[#F28B82] shrink-0" />
                    <span>Based in {contact.location}</span>
                  </div>
                )}
                {contact.responseTurnaroundTime && (
                  <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                    <Clock className="w-4 h-4 text-[#A9C7A5] shrink-0" />
                    <span>Typical response: {contact.responseTurnaroundTime}</span>
                  </div>
                )}
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-black/5 dark:border-white/10 space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                  Professional Profiles
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {social.linkedin && (
                    <GlassButton
                      variant="secondary"
                      size="sm"
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5 mr-1.5 text-[#0077B5]" />
                      LinkedIn
                    </GlassButton>
                  )}
                  {social.github && (
                    <GlassButton
                      variant="secondary"
                      size="sm"
                      href={social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GithubIcon className="w-3.5 h-3.5 mr-1.5" />
                      GitHub
                    </GlassButton>
                  )}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <GlassCard variant="liquid" className="p-8 sm:p-10 bg-[#FFFDF5]/95 border border-[#FFD6BF]/60">
              <h3 className="text-xl font-bold text-[var(--text-dark)] mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6">
                Fill out the form below to initiate correspondence.
              </p>

              {isSent ? (
                <div className="p-6 rounded-2xl glass-subtle border border-[#A9C7A5]/50 bg-[#C8E8D0]/20 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#A9C7A5]/20 text-[#343A32] mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6 text-[#A9C7A5]" />
                  </div>
                  <h4 className="text-base font-bold text-[var(--text-dark)]">
                    Message Prepared!
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-sm mx-auto">
                    Your email client will open with the pre-filled message. If it didn&apos;t open automatically, you can send an email directly to{" "}
                    <span className="font-semibold text-[#F28B82]">{contact.email}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="text-xs text-[#F28B82] hover:underline pt-2 font-medium cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-medium text-[var(--text-secondary)]">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FFFDF5] border border-[#FFD6BF] text-sm text-[var(--text-dark)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#F28B82]"
                      />
                      {errors.name && (
                        <p className="text-[11px] text-[#F28B82] flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-medium text-[var(--text-secondary)]">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="alex@organization.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FFFDF5] border border-[#FFD6BF] text-sm text-[var(--text-dark)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#F28B82]"
                      />
                      {errors.email && (
                        <p className="text-[11px] text-[#F28B82] flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-[var(--text-secondary)]">
                      Subject *
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="e.g. Internship Opportunity / Technical Collaboration"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FFFDF5] border border-[#FFD6BF] text-sm text-[var(--text-dark)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#F28B82]"
                    />
                    {errors.subject && (
                      <p className="text-[11px] text-[#F28B82] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-[var(--text-secondary)]">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Share your thoughts, project scope, or opportunity details..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FFFDF5] border border-[#FFD6BF] text-sm text-[var(--text-dark)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#F28B82] resize-none"
                    />
                    {errors.message && (
                      <p className="text-[11px] text-[#F28B82] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <GlassButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full justify-center"
                    icon="send"
                  >
                    {isSubmitting ? "Dispatching..." : "Send Message"}
                  </GlassButton>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};
