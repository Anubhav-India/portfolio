import React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { EducationSection } from "@/components/education/EducationSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { ResearchSection } from "@/components/research/ResearchSection";
import { LeadershipSection } from "@/components/leadership/LeadershipSection";
import { AchievementsSection } from "@/components/achievements/AchievementsSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";
import { InteractiveBackground } from "@/components/ui/InteractiveBackground";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col selection:bg-[var(--accent-primary)]/20 selection:text-[var(--accent-primary)]">
      {/* Desktop Custom Circular Cursor with Magnetic Lerp */}
      <CustomCursor />

      {/* Reactive Particle Constellation & Cursor Spotlight Background */}
      <InteractiveBackground />

      {/* Top Reading Progress Bar */}
      <ScrollProgress />

      {/* Floating Glass Navigation */}
      <Navbar />

      {/* Main Sections Hierarchy */}
      <div className="flex-1 flex flex-col">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ExperienceSection />
        <ResearchSection />
        <LeadershipSection />
        <AchievementsSection />
        <ContactSection />
      </div>

      {/* Minimalist Glass Footer */}
      <Footer />

      {/* Floating Back to Top Button */}
      <BackToTop />
    </main>
  );
}
