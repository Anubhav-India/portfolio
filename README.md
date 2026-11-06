# Liquid Glass — Personal Portfolio Website

A futuristic, exceptionally polished personal portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Spatial Liquid Glassmorphism**.

Designed to communicate engineering depth, hardware/embedded systems capabilities, software development mastery, and research rigor to recruiters, engineering teams, and academic collaborators.

---

## 🌟 Key Features & Design Highlights

- **Visual Architecture**: Apple-inspired luminous light aesthetic combined with Linear's precision, Framer's fluid motion, and multi-layered Liquid Glassmorphism.
- **Three-Tier Glass System**:
  - **Level 1 (Subtle Glass)**: For pills, badges, and minor navigation items.
  - **Level 2 (Premium Glass)**: For project cards, editorial panels, and timeline entries.
  - **Level 3 (Liquid Glass)**: For hero showcases and featured systems with interactive specular reflections and hover lighting.
- **Dual Theme Support**: Default **Luminous Light Glassmorphism** (`#F8FAFD` base with electric blue `#4776E6`, soft cyan `#55C8D9`, and violet `#9075E8`) with seamless toggle to **Midnight Glassmorphism** (`#0B0F19`).
- **Command Palette (`Ctrl / Cmd + K`)**: Rapid keyboard-driven navigation across all sections, copy email, toggle theme, and open resume.
- **3D Interactive Hero Visual**: Gyroscopic-style tilt with real-time simulated telemetry waveforms, hardware signal indicators, and spatial floating badges.
- **Centralized Content Configuration**: All personal information, skills, projects, and contact data are controlled from a single strongly-typed file (`src/data/portfolio.ts`).
- **Zero Fabricated Claims**: No fake percentages (like 95% progress bars) or invented numbers. Gracefully adapts to hide empty sections or display clean neutral indicators.
- **Deep-Dive Project Modals**: Multi-tab system architecture, hardware schematics & microcontroller notes, problem/solution breakdown, and challenges overcome.
- **Celebratory Contact Form**: Interactive form with real-time validation, copy-to-clipboard email pill, and celebratory confetti with pre-filled `mailto:` client integration.
- **Accessibility & SEO**: Semantic HTML5 hierarchy, keyboard navigability (Escape to close modals), `prefers-reduced-motion` compliance, auto-generated `robots.txt` and `sitemap.xml`.

---

## 📁 Project Folder Structure

```
portfolio/
├── public/
│   ├── resume/
│   │   └── resume.pdf          # Place your actual resume PDF here
│   ├── images/                 # Profile images and headshots
│   ├── projects/               # Project screenshots and diagrams
│   ├── certificates/           # Certificates and verification documents
│   └── logos/                  # Institution & company logos
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with SEO and OpenGraph metadata
│   │   ├── page.tsx            # Single-page master composition
│   │   ├── globals.css         # Glassmorphism tokens, gradients, and animations
│   │   ├── robots.ts           # Dynamic SEO robots configuration
│   │   └── sitemap.ts          # Dynamic sitemap generation
│   ├── components/
│   │   ├── navigation/
│   │   │   ├── Navbar.tsx      # Floating glass capsule with scroll spy
│   │   │   └── CommandMenu.tsx # Cmd+K keyboard palette
│   │   ├── hero/
│   │   │   ├── HeroSection.tsx # Two-column hero with availability pill
│   │   │   └── HeroGlassVisual.tsx # 3D liquid glass telemetry visual
│   │   ├── about/
│   │   │   └── AboutSection.tsx # Editorial bio and focus areas
│   │   ├── skills/
│   │   │   └── SkillsSection.tsx # Categorized skills with real-time search
│   │   ├── projects/
│   │   │   ├── ProjectsSection.tsx # Featured showcase and category filter
│   │   │   └── ProjectModal.tsx    # Multi-tab deep-dive modal
│   │   ├── education/
│   │   │   └── EducationSection.tsx # Vertical academic timeline
│   │   ├── experience/
│   │   │   └── ExperienceSection.tsx # Work experience & internship timeline
│   │   ├── research/
│   │   │   └── ResearchSection.tsx # Research domains and publications
│   │   ├── leadership/
│   │   │   └── LeadershipSection.tsx # Societies, clubs, and mentorship
│   │   ├── achievements/
│   │   │   └── AchievementsSection.tsx # Hackathons and certifications
│   │   ├── contact/
│   │   │   └── ContactSection.tsx # Form, copy email, confetti trigger
│   │   ├── footer/
│   │   │   └── Footer.tsx      # Minimalist glass footer with auto-year
│   │   └── ui/
│   │       ├── GlassCard.tsx   # Reusable glass container with spotlight
│   │       ├── GlassButton.tsx # Tactile primary, secondary, and ghost buttons
│   │       ├── BrandIcons.tsx  # Optimized vector icons (GitHub, LinkedIn, etc.)
│   │       ├── ThemeToggle.tsx # Light/Dark switcher
│   │       ├── ScrollProgress.tsx # Top reading progress indicator
│   │       ├── BackToTop.tsx   # Floating scroll-to-top button
│   │       └── AnimatedBackground.tsx # Ambient luminous drifting orbs
│   ├── data/
│   │   └── portfolio.ts        # ⭐ ALL EDITABLE CONTENT LIVES HERE
│   ├── hooks/
│   │   ├── useScrollSpy.ts     # Active section tracking
│   │   └── useReducedMotion.ts # Reduced-motion accessibility
│   ├── lib/
│   │   └── utils.ts            # Class merging utility
│   └── types/
│       └── portfolio.ts        # TypeScript definitions
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started Locally

### 1. Set Active Workspace
Point your editor to the project directory:
```bash
cd "C:\Users\ANUBHAV\.gemini\antigravity\scratch\portfolio"
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view your live portfolio.

### 3. Verify Production Build
```bash
npm run build
```

---

## ✏️ How to Customize Your Information

### 1. Updating Personal Information & Links
Open `src/data/portfolio.ts` in your code editor.
You can update:
- `personal.name`
- `personal.headline`
- `personal.introduction`
- `personal.aboutBio`
- `personal.email` & `personal.location`
- `social.linkedin` & `social.github`

### 2. Replacing the Resume PDF
- Replace `public/resume/resume.pdf` with your actual resume file.
- If you change the filename, update `personal.resumeUrl` in `src/data/portfolio.ts`.

### 3. Adding Your Profile Photo
- Place your photo inside `public/images/` (e.g. `public/images/profile.jpg`).
- In `src/data/portfolio.ts`, set:
  ```ts
  profileImage: "/images/profile.jpg",
  ```
- If left empty (`""`), the hero section automatically renders the abstract 3D engineering telemetry core.

### 4. Adding or Modifying Projects
In `src/data/portfolio.ts`, find the `projects` array. Each project supports:
- `title`, `category`, `shortDescription`, `techStack`
- `featured: true` (places it in the large showcase card)
- `problemStatement`, `solution`, `technicalArchitecture`
- `hardwareDetails` (microcontroller, sensors, working principle)
- `softwareDetails` (architecture, API, database, deployment)
- `challenges`, `resultsAndLearnings`, `githubUrl`, `liveDemoUrl`

### 5. Hiding Any Section
If you don't have experience or achievements yet, simply set the array to empty (`[]`):
```ts
experience: [],
achievements: [],
```
The website will automatically hide that section gracefully.

---

## 🌐 Deployment Instructions

### Deploy to Vercel (Recommended)
1. Push your repository to GitHub.
2. Visit [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset will auto-detect **Next.js**.
5. Click **"Deploy"**. Your portfolio will be live in under 60 seconds with SSL and global CDN caching.

---

## 🛡️ License
Private and personal portfolio website. All rights reserved.
