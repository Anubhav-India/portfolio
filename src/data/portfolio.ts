import { PortfolioData } from "@/types/portfolio";

/**
 * =========================================================================
 * CENTRAL PORTFOLIO CONFIGURATION
 * =========================================================================
 * All personal information, projects, skills, education, experience,
 * research, leadership, and contact data are configured in this file.
 *
 * INSTRUCTIONS FOR UPDATING:
 * 1. Fill in your details below. Replace any placeholder (e.g. "[YOUR FULL NAME]")
 *    with your actual information.
 * 2. To hide an optional field or section, simply leave the string empty ("")
 *    or the array empty ([]). The website automatically adapts and hides
 *    empty sections gracefully.
 * 3. Place your resume PDF in the `public/resume/` folder (e.g., `public/resume/resume.pdf`).
 * 4. Place your images in `public/images/` or `public/projects/`.
 * =========================================================================
 */

export const portfolioData: PortfolioData = {
  metadata: {
    siteTitle: "[YOUR FULL NAME] | [YOUR PROFESSIONAL HEADLINE]",
    siteDescription:
      "Personal engineering and software development portfolio of [YOUR FULL NAME]. Showcasing technical projects, research interests, systems engineering, and academic achievements.",
    keywords: [
      "Software Engineer",
      "Embedded Systems",
      "Electronics",
      "Next.js",
      "TypeScript",
      "Engineering Portfolio",
    ],
    author: "[YOUR FULL NAME]",
    siteUrl: "https://yourportfolio.domain",
  },

  personal: {
    name: "Anubhav Anand",
    headline: "Electronics and Instrumentation Engineering Student", // e.g. "Software & Systems Engineer | Instrumentation Specialist"
    introduction:
      "Engineering robust digital systems, intuitive user interfaces, and embedded solutions with technical precision and design elegance.",
    aboutBio: [
      "I am a passionate engineer and developer dedicated to building impactful digital solutions at the intersection of high-performance software, intuitive design systems, and embedded hardware architectures.",
      "My academic and engineering journey is driven by a deep curiosity for how complex systems operate under the hood—from low-level microcontrollers and sensor signal processing to scalable modern web applications.",
      "I value engineering rigor, clean code craftsmanship, and modern spatial interface design. When solving technical problems, I focus on reliability, maintainability, and user-centric clarity.",
    ],
    location: "Bhagalpur, Bihar", // e.g. "Bengaluru, India" or "San Francisco, CA"
    email: "anubhav_ug_24@ei.nits.ac.in", // e.g. "your.email@example.com"
    phone: "+91-8825155788", // optional
    profileImage: "/images/profile image.png", // optional path e.g. "/images/profile.jpg". If left empty, an elegant interactive 3D abstract visual is shown
    resumeUrl: "/resume/Anubhav_Anand_Mathworks.pdf", // Path to your resume PDF inside the public/ folder
    availabilityStatus: "available", // "available" | "busy" | "open_to_collaborations"
    availabilityText: "Available for internships & engineering roles",
    areasOfInterest: [
      "Full-Stack Web Engineering",
      "Embedded Systems & IoT",
      "Control & Instrumentation",
      "Signal Processing",
      "AI/ML Systems",
    ],
    workingPhilosophy:
      "Crafting elegant systems that balance technical precision, functional reliability, and aesthetic refinement.",
    futureAspirations:
      "Contributing to cutting-edge research and mission-critical engineering systems that solve real-world problems.",
  },

  social: {
    linkedin: "https://linkedin.com/in/anubhav-anand-a1b2c3",
    github: "https://github.com/Anubhav-India",
    email: "mailto:anubhav_ug_24@ei.nits.ac.in",
    website: "", // optional
    twitter: "", // optional
    leetcode: "", // optional
    googleScholar: "", // optional
  },

  education: [
    {
      id: "edu-1",
      institution: "National Institute of Technology Silchar",
      degree: "B.Tech", // e.g. "Bachelor of Technology (B.Tech)"
      branch: "Electronics & Instrumentation Engineering", // e.g. "Electronics & Instrumentation Engineering" or "Computer Science"
      startYear: "2024",
      endYear: "2028",
      currentStatus: "Currently Pursuing(Pre-final year)",
      cgpa: "8.91/10", // e.g. "8.9 / 10.0" (leave empty "" to hide)
      location: "Assam",
      coursework: [
        "Data Structures & Algorithms",
        "Microprocessors & Microcontrollers",
        "Signals & Systems",
        "Control Systems Engineering",
        "Analog & Digital Electronics",
        "Database Management Systems",
        "Object Oriented Programming",
      ],
      academicAchievements: [
        "Recipient of Merit Scholarship for Academic Excellence",
        "Ranked among top percentile in departmental academic standing",
      ],
    },
  ],

  skills: {
    programming: [
      { name: "C", category: "programming", level: "Advanced" },
      { name: "C++", category: "programming", level: "Advanced" },
      { name: "Python", category: "programming", level: "Intermediate" },
      { name: "TypeScript", category: "programming", level: "Advanced" },
      { name: "JavaScript", category: "programming", level: "Advanced" },
      { name: "SQL", category: "programming", level: "Working knowledge" },
    ],
    software: [
      { name: "React / Next.js", category: "software", level: "Advanced" },
      { name: "Node.js", category: "software", level: "Intermediate" },
      { name: "Tailwind CSS", category: "software", level: "Advanced" },
      { name: "REST APIs", category: "software", level: "Advanced" },
      { name: "FastAPI", category: "software", level: "Working knowledge" },
      { name: "Git & GitHub", category: "software", level: "Advanced" },
    ],
    electronics: [
      { name: "Microcontrollers (ESP32, STM32, Arduino)", category: "electronics", level: "Advanced" },
      { name: "Analog & Digital Electronics", category: "electronics", level: "Intermediate" },
      { name: "Sensors & Transducers", category: "electronics", level: "Advanced" },
      { name: "Signal Conditioning & ADC", category: "electronics", level: "Intermediate" },
      { name: "Communication Protocols (I2C, SPI, UART, CAN)", category: "electronics", level: "Advanced" },
      { name: "PCB Design Basics", category: "electronics", level: "Working knowledge" },
    ],
    engineeringTools: [
      { name: "MATLAB", category: "engineeringTools", level: "Advanced" },
      { name: "Simulink", category: "engineeringTools", level: "Intermediate" },
      { name: "LabVIEW", category: "engineeringTools", level: "Working knowledge" },
      { name: "Proteus / Multisim", category: "engineeringTools", level: "Intermediate" },
      { name: "Arduino IDE", category: "engineeringTools", level: "Advanced" },
      { name: "Linux / Bash", category: "engineeringTools", level: "Working knowledge" },
    ],
    other: [
      { name: "Embedded Systems Architecture", category: "other", level: "Advanced" },
      { name: "Data Acquisition (DAQ)", category: "other", level: "Intermediate" },
      { name: "Machine Learning Foundations", category: "other", level: "Familiar" },
      { name: "System Optimization", category: "other", level: "Intermediate" },
    ],
  },

  projects: [
    {
      id: "project-1",
      title: "[FEATURED PROJECT: IOT SENSOR & TELEMETRY SYSTEM]",
      category: "Embedded Systems",
      featured: true,
      shortDescription:
        "An intelligent edge telemetry and monitoring platform with multi-sensor acquisition, real-time wireless telemetry, and a sleek glassmorphic dashboard.",
      longDescription:
        "Designed and implemented a modular data acquisition unit capable of logging environmental and kinematic metrics in real time. Features low-latency wireless transmission via MQTT and an edge filtering pipeline running on an ESP32 microcontroller with a Next.js live telemetry interface.",
      problemStatement:
        "Industrial sensor networks often suffer from high cabling overhead, non-standard communication protocols, and cumbersome data visualization interfaces that slow down real-time diagnostics.",
      solution:
        "Built a compact wireless telemetry module that interfaces with analog and digital sensor suites, samples at up to 1 kHz, applies digital Kalman filtering on the edge, and streams telemetry via secure websockets to a cloud analytics dashboard.",
      technicalArchitecture:
        "Multi-layer architecture: Sensor Layer (I2C/SPI transducers) -> Edge Layer (ESP32 FreeRTOS tasks for sampling, filtering, and packetization) -> Transport Layer (MQTT/WebSockets over TLS) -> Dashboard Layer (Next.js, Tailwind, Canvas rendering).",
      techStack: [
        "C++",
        "ESP32",
        "FreeRTOS",
        "MQTT",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
      ],
      keyFeatures: [
        "Sub-15ms end-to-end data transmission latency",
        "Digital Kalman filtering for noise rejection on analog transducer inputs",
        "Local SD-card failover logging in case of wireless link drops",
        "Translucent real-time charting dashboard with threshold alerts",
      ],
      challenges: [
        "Minimizing ADC non-linearity on the ESP32 via lookup table calibration",
        "Optimizing task scheduling under FreeRTOS to eliminate sampling jitter",
      ],
      resultsAndLearnings: [
        "Achieved 99.8% packet delivery rate under simulated industrial EMI noise",
        "Deepened mastery of real-time operating systems and multi-threaded embedded firmware",
      ],
      githubUrl: "https://github.com/[YOUR-GITHUB-USERNAME]/[PROJECT-REPO]",
      liveDemoUrl: "https://[YOUR-PROJECT-DEMO].vercel.app",
      image: "", // Path to screenshot, e.g. "/projects/project-1.jpg"
      hardwareDetails: {
        microcontroller: "ESP32 dual-core 240MHz (FreeRTOS)",
        sensors: ["BME280 (Temp/Pressure/Humidity)", "MPU6050 (6-DoF IMU)", "ADS1115 (16-bit ADC)"],
        components: ["ESP32-WROOM-32D", "Buck Regulator 3.3V", "MicroSD SPI module"],
        workingPrinciple:
          "Analog signals are oversampled and filtered through a digital running average before being pushed to an RTOS message queue for telemetry packet formation.",
      },
      softwareDetails: {
        systemArchitecture: "Microcontroller edge firmware -> MQTT broker -> Next.js client with React hooks",
        apiStructure: "WebSockets & REST API for configuration endpoints",
        database: "InfluxDB / TimescaleDB for time-series metrics",
        deployment: "Dockerized broker + Vercel frontend",
      },
    },
    {
      id: "project-2",
      title: "[DIGITAL TWIN & CONTROL SIMULATION]",
      category: "Electronics",
      featured: true,
      shortDescription:
        "High-fidelity mathematical model and closed-loop control system simulation designed in MATLAB & Simulink.",
      longDescription:
        "Engineered a full dynamic state-space model for an inverted pendulum on a cart / self-balancing system. Designed PID and LQR state-feedback controllers with full pole-placement analysis, disturbance rejection simulations, and hardware-in-the-loop (HIL) validation.",
      problemStatement:
        "Physical balance systems are inherently non-linear and unstable, requiring rigorous dynamic modeling and low-phase-delay feedback controllers.",
      solution:
        "Derived the Lagrange equations of motion, linearized around the unstable equilibrium point, and synthesized an optimal Linear Quadratic Regulator (LQR) with state estimation.",
      technicalArchitecture:
        "Lagrangian mechanics -> State-Space formulation -> Simulink simulation model -> Sensor noise injection -> LQR gain optimization -> Hardware validation.",
      techStack: [
        "MATLAB",
        "Simulink",
        "Control Systems Toolbox",
        "C++",
        "State-Space Modeling",
      ],
      keyFeatures: [
        "Interactive parameter adjustment for system mass, inertia, and damping",
        "Frequency response (Bode, Nyquist) and root locus stability analysis",
        "Step response settling time < 1.2s with zero steady-state error under pulse disturbance",
      ],
      challenges: [
        "Compensating for actuator saturation and motor deadband non-linearities",
        "Tuning Q and R weight matrices in LQR for fast settling without excessive control effort",
      ],
      resultsAndLearnings: [
        "Verified robust stability across +-20% parametric variations in system mass",
        "Strengthened mathematical foundations in modern multivariable control theory",
      ],
      githubUrl: "https://github.com/[YOUR-GITHUB-USERNAME]/[PROJECT-REPO]",
      liveDemoUrl: "",
      image: "",
      hardwareDetails: {
        microcontroller: "STM32F401 / Arduino Due",
        sensors: ["Rotary Optical Encoder", "IMU (Accelerometer + Gyroscope)"],
        workingPrinciple:
          "Dual feedback loop: inner loop controls motor current while outer loop stabilizes angular tilt and cart position.",
      },
    },
    {
      id: "project-3",
      title: "[FULL-STACK HIGH-PERFORMANCE WEB APPLICATION]",
      category: "Software",
      featured: false,
      shortDescription:
        "Modern cloud-native developer tool with real-time collaboration, optimistic updates, and fluid spatial micro-interactions.",
      longDescription:
        "A full-stack production-grade application featuring server-side rendering, type-safe API routing, relational data persistence, and an Apple/Linear inspired glassmorphic user interface.",
      techStack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "PostgreSQL",
        "Prisma",
      ],
      keyFeatures: [
        "Optimistic UI updates with instant feedback and rollbacks on failure",
        "Keyboard-driven command palette (Cmd+K) for accessibility",
        "Sub-100ms API response times utilizing edge caching",
      ],
      githubUrl: "https://github.com/[YOUR-GITHUB-USERNAME]/[PROJECT-REPO]",
      liveDemoUrl: "https://[YOUR-PROJECT-DEMO].vercel.app",
    },
    {
      id: "project-4",
      title: "[EMBEDDED SIGNAL PROCESSING & FFT ANALYZER]",
      category: "Embedded Systems",
      featured: false,
      shortDescription:
        "Firmware implementation of real-time 1024-point Fast Fourier Transform (FFT) on ARM Cortex-M architecture.",
      longDescription:
        "Developed an embedded spectral analyzer that samples acoustic and vibration transducer inputs via DMA, computes frequency magnitude spectra using CMSIS-DSP, and renders output to an SPI TFT display.",
      techStack: [
        "C",
        "ARM Cortex-M4",
        "CMSIS-DSP",
        "STM32CubeIDE",
        "SPI Display",
      ],
      keyFeatures: [
        "Direct Memory Access (DMA) circular buffer for zero CPU overhead sampling",
        "Windowing functions (Hanning, Blackman) to suppress spectral leakage",
        "Real-time peak frequency tracking with +-2 Hz accuracy",
      ],
      githubUrl: "https://github.com/[YOUR-GITHUB-USERNAME]/[PROJECT-REPO]",
      liveDemoUrl: "",
    },
    {
      id: "project-5",
      title: "[INTELLIGENT COMPUTER VISION DEFECT DETECTOR]",
      category: "AI/ML",
      featured: false,
      shortDescription:
        "Lightweight convolutional neural network pipeline for real-time surface defect segmentation and classification.",
      longDescription:
        "Engineered an automated optical inspection pipeline trained on industrial defect datasets. Optimized with TensorRT/ONNX runtime to achieve 60+ FPS on edge computing hardware.",
      techStack: [
        "Python",
        "PyTorch",
        "OpenCV",
        "ONNX Runtime",
        "FastAPI",
      ],
      keyFeatures: [
        "Transfer learning on MobileNetV3 backbone for low computational footprint",
        "Edge-compatible inference pipeline consuming < 8W power",
        "Automated bounding box annotation and defect severity rating",
      ],
      githubUrl: "https://github.com/[YOUR-GITHUB-USERNAME]/[PROJECT-REPO]",
      liveDemoUrl: "",
    },
  ],

  experience: [
    {
      id: "exp-1",
      organization: "[COMPANY / ORGANIZATION NAME]",
      position: "[YOUR ROLE / INTERNSHIP TITLE]", // e.g. "Software Engineering Intern" or "Research Intern"
      department: "[DEPARTMENT / LAB]", // e.g. "Embedded Systems Lab"
      location: "[LOCATION]", // e.g. "Bengaluru, India"
      startDate: "May 2025",
      endDate: "July 2025",
      current: false,
      description:
        "Contributed to engineering core modules, performing hardware-software integration, and streamlining system validation pipelines.",
      responsibilities: [
        "Designed and implemented firmware routines for multi-channel sensor data acquisition with SPI bus communication.",
        "Collaborated with cross-functional team members to debug timing constraints and reduce serial latency by 28%.",
        "Authored comprehensive technical documentation, unit test suites, and hardware interfacing schematics.",
      ],
      skillsDeveloped: [
        "Embedded C/C++",
        "Oscilloscope & Logic Analyzer Debugging",
        "Firmware Architecture",
        "Technical Communication",
      ],
      achievements: [
        "Successfully delivered functional prototype two weeks ahead of schedule.",
      ],
      link: "https://iocl.com", // optional: e.g. "https://www.company.com/projects/project-name"
    },
  ],

  research: [
    {
      id: "res-1",
      domain: "Control Systems & Sensor Interfacing",
      description:
        "Investigating adaptive filtering techniques for multi-rate sensor fusion in high-noise industrial instrumentation environments.",
      technicalConcepts: [
        "Extended Kalman Filtering (EKF)",
        "Sensor Drift Compensation",
        "State Estimation",
        "Analog-to-Digital Precision",
      ],
      associatedProjects: ["IoT Sensor & Telemetry System", "Digital Twin & Control Simulation"],
      publications: [
        {
          title: "Comparative Study of Edge Filtering Algorithms on Low-Power ARM Architectures",
          venue: "[Conference / Workshop Name - In Preparation]",
          year: "2026",
          link: "",
        },
      ],
    },
    {
      id: "res-2",
      domain: "Embedded Edge Computing & IoT Telemetry",
      description:
        "Exploring ultra-low-power sleep strategies, asynchronous interrupt routing, and deterministic wireless telemetry protocols.",
      technicalConcepts: [
        "FreeRTOS Task Optimization",
        "MQTT-SN & CoAP Protocols",
        "Power Profiling",
        "Fault-Tolerant Firmware",
      ],
      associatedProjects: ["IoT Sensor & Telemetry System"],
    },
    {
      id: "res-3",
      domain: "Modern Human-Computer Interaction & Spatial Design",
      description:
        "Analyzing how glassmorphic spatial depth, cognitive load reduction, and micro-interactions enhance telemetry comprehension.",
      technicalConcepts: [
        "Design Systems Architecture",
        "Web Accessibility (WCAG AAA)",
        "GPU Shaders & CSS Compositing",
        "Information Density Tuning",
      ],
      associatedProjects: ["Full-Stack High-Performance Web Application"],
    },
  ],

  leadership: [
    {
      id: "lead-1",
      organization: "[STUDENT SOCIETY / TECHNICAL CLUB NAME]", // e.g. "IEEE Student Branch" or "Robotics Club"
      position: "[YOUR LEADERSHIP POSITION]", // e.g. "Technical Lead" or "Vice Chairperson"
      duration: "2024 - Present",
      responsibilities: [
        "Directed technical workshops on embedded systems, microcontroller programming, and web development for 150+ students.",
        "Mentored junior engineering students in circuit debugging, PCB fabrication, and version control best practices.",
        "Organized inter-college technical symposiums and competitive hackathons with 300+ participants.",
      ],
      achievements: [
        "Awarded 'Best Student Chapter Lead' for exemplary organizational impact.",
      ],
    },
  ],

  achievements: [
    {
      id: "ach-1",
      title: "[ACHIEVEMENT / HACKATHON TITLE]", // e.g. "First Prize - National Embedded Systems Hackathon"
      issuer: "[ISSUING ORGANIZATION / UNIVERSITY]",
      date: "2025",
      category: "Hackathon",
      description:
        "Developed a working autonomous IoT health-monitoring prototype within 36 hours, securing first place among 45 national teams.",
      verificationLink: "",
    },
    {
      id: "ach-2",
      title: "[CERTIFICATION TITLE]", // e.g. "Certified Embedded Systems Professional"
      issuer: "[ISSUER / PLATFORM]",
      date: "2024",
      category: "Certification",
      description:
        "Completed comprehensive specialization in ARM Cortex-M firmware programming, RTOS fundamentals, and peripheral interfacing.",
      verificationLink: "",
    },
  ],

  contact: {
    headline: "Have an opportunity or an interesting project?",
    description:
      "Whether you are looking to hire for internships or full-time roles, collaborate on an engineering venture, or discuss technical research, my inbox is always open.",
    email: "aanubhav753@gmail.com",
    phone: "+91-8825155788",
    location: "Bhagalpur",
    formEnabled: true,
    calendlyUrl: "", // optional: e.g. "https://calendly.com/your-username"
    responseTurnaroundTime: "Within 24 to 48 hours",
  },
};
