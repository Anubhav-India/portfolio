export type SkillLevel = "Familiar" | "Working knowledge" | "Intermediate" | "Advanced";

export interface SkillItem {
  name: string;
  category: "programming" | "software" | "electronics" | "engineeringTools" | "other";
  level?: SkillLevel;
  icon?: string;
  description?: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  branch: string;
  startYear: string;
  endYear: string;
  currentStatus?: string; // e.g. "Currently Pursuing (Final Year)"
  cgpa?: string; // e.g. "8.8 / 10.0" (only shown if provided)
  location?: string;
  coursework?: string[];
  academicAchievements?: string[];
  logo?: string;
}

export type ProjectCategory =
  | "All"
  | "Software"
  | "Electronics"
  | "Embedded Systems"
  | "AI/ML"
  | "Research"
  | "Personal";

export interface ProjectItem {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, "All">;
  featured?: boolean;
  shortDescription: string;
  longDescription?: string;
  problemStatement?: string;
  solution?: string;
  technicalArchitecture?: string;
  techStack: string[];
  keyFeatures?: string[];
  challenges?: string[];
  resultsAndLearnings?: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  image?: string;
  // Specific domains
  hardwareDetails?: {
    microcontroller?: string;
    sensors?: string[];
    components?: string[];
    workingPrinciple?: string;
    circuitNotes?: string;
  };
  softwareDetails?: {
    systemArchitecture?: string;
    apiStructure?: string;
    database?: string;
    deployment?: string;
  };
  researchDetails?: {
    researchQuestion?: string;
    methodology?: string;
    publications?: string;
  };
}

export interface ExperienceEntry {
  id: string;
  organization: string;
  position: string;
  department?: string;
  location?: string;
  startDate: string;
  endDate: string; // or "Present"
  current?: boolean;
  description: string;
  responsibilities: string[];
  skillsDeveloped?: string[];
  achievements?: string[];
  organizationLogo?: string;
  link?: string;
}

export interface ResearchInterest {
  id: string;
  domain: string;
  description: string;
  technicalConcepts: string[];
  associatedProjects?: string[];
  publications?: {
    title: string;
    venue?: string;
    year?: string;
    link?: string;
  }[];
}

export interface LeadershipEntry {
  id: string;
  organization: string;
  position: string;
  duration: string;
  responsibilities: string[];
  contributions?: string[];
  achievements?: string[];
}

export interface AchievementEntry {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: "Academic" | "Hackathon" | "Competition" | "Certification" | "Honor";
  description: string;
  certificateUrl?: string;
  verificationLink?: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  email?: string;
  website?: string;
  twitter?: string;
  googleScholar?: string;
  leetcode?: string;
}

export interface PersonalInfo {
  name: string;
  headline: string;
  introduction: string;
  aboutBio: string[];
  location: string;
  email: string;
  phone?: string;
  profileImage?: string;
  resumeUrl?: string;
  availabilityStatus: "available" | "busy" | "open_to_collaborations";
  availabilityText: string;
  areasOfInterest: string[];
  workingPhilosophy: string;
  futureAspirations: string;
}

export interface ContactConfig {
  headline: string;
  description: string;
  email: string;
  phone?: string;
  location: string;
  formEnabled: boolean;
  calendlyUrl?: string;
  responseTurnaroundTime?: string;
}

export interface PortfolioData {
  metadata: {
    siteTitle: string;
    siteDescription: string;
    keywords: string[];
    author: string;
    siteUrl: string;
    ogImage?: string;
  };
  personal: PersonalInfo;
  social: SocialLinks;
  education: EducationEntry[];
  skills: {
    programming: SkillItem[];
    software: SkillItem[];
    electronics: SkillItem[];
    engineeringTools: SkillItem[];
    other: SkillItem[];
  };
  projects: ProjectItem[];
  experience: ExperienceEntry[];
  research: ResearchInterest[];
  leadership: LeadershipEntry[];
  achievements: AchievementEntry[];
  contact: ContactConfig;
}
