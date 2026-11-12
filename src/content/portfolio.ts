/**
 * All portfolio content lives here so it can be edited in one place.
 * Only real information from Rashi's resume and uploads — do not invent details.
 */
import portrait from "@/assets/rashi-portrait.webp.asset.json";
import resume from "@/assets/Rashi_Kolpyakwar_Resume.pdf.asset.json";
import bolDashboard from "@/assets/bolbuddy-dashboard.webp.asset.json";
import bolLogin from "@/assets/bolbuddy-login.webp.asset.json";
import bolActivities from "@/assets/bolbuddy-activities.webp.asset.json";
import bolProgress from "@/assets/bolbuddy-progress.webp.asset.json";
import flipShot from "@/assets/flip-the-coin.webp.asset.json";
import calcDesktop from "@/assets/calculator-desktop.webp.asset.json";
import calcMobile from "@/assets/calculator-mobile.webp.asset.json";

export const profile = {
  firstName: "Rashi",
  lastName: "Kolpyakwar",
  fullName: "Rashi Kolpyakwar",
  tagline: "Beyond the Code.",
  role: "Computer Science & Engineering Student",
  aspiration: "Aspiring Full-Stack Developer",
  college: "Shri Sant Gajanan Maharaj College of Engineering",
  collegeShort: "SSGMCE, Shegaon",
  year: "Second year",
  location: "Sindewahi, Chandrapur",
  intro:
    "I'm a second-year Computer Science student who enjoys turning ideas into simple, useful web experiences — learning by building, one project at a time.",
  portrait: portrait.url,
  resumeUrl: resume.url,
  resumeFileName: "Rashi_Kolpyakwar_Resume.pdf",
};

export const contact = {
  email: "kolpyakwarrashi@gmail.com",
  github: "https://github.com/kolpyakwarrashi-lab",
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;

export const education = [
  {
    period: "Present · 2nd year",
    title: "B.E. — Computer Science & Engineering",
    place: "Shri Sant Gajanan Maharaj College of Engineering, Shegaon",
    highlight: "SGPA 9.18",
    note: "2nd semester",
    current: true,
  },
  {
    period: "2024 – 25",
    title: "Higher Secondary Certificate (HSC)",
    place: "Sarvodaya Junior College, Sindewahi",
    highlight: "84%",
    note: "Class XII",
  },
  {
    period: "2022 – 23",
    title: "Secondary School Certificate (SSC)",
    place: "Kalpataru Vidyamandir, Sindewahi",
    highlight: "91.2%",
    note: "Class X",
  },
];

/** level: 3 = hands-on in projects, 2 = learning, 1 = exploring next */
export type SkillLevel = 1 | 2 | 3;
export const skillLevelLabel: Record<SkillLevel, string> = {
  3: "Hands-on",
  2: "Learning",
  1: "Up next",
};

export const skillGroups: {
  title: string;
  icon: "code" | "layout" | "wrench" | "palette" | "sprout" | "users";
  blurb: string;
  skills: { name: string; level: SkillLevel }[];
}[] = [
  {
    title: "Programming Languages",
    icon: "code",
    blurb: "Foundations I'm strengthening every semester.",
    skills: [
      { name: "C", level: 3 },
      { name: "JavaScript", level: 2 },
    ],
  },
  {
    title: "Frontend Development",
    icon: "layout",
    blurb: "Used across every project I've shipped so far.",
    skills: [
      { name: "HTML", level: 3 },
      { name: "CSS", level: 3 },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: "wrench",
    blurb: "My everyday workflow.",
    skills: [
      { name: "VS Code", level: 3 },
      { name: "GitHub", level: 3 },
    ],
  },
  {
    title: "Design & Creativity",
    icon: "palette",
    blurb: "Where visuals meet ideas.",
    skills: [{ name: "Canva", level: 3 }],
  },
  {
    title: "Currently Learning",
    icon: "sprout",
    blurb: "The next chapter I'm actively working towards.",
    skills: [
      { name: "React", level: 1 },
      { name: "Backend development", level: 1 },
      { name: "Deployment", level: 1 },
    ],
  },
  {
    title: "Soft Skills",
    icon: "users",
    blurb: "How I work with people.",
    skills: [
      { name: "Teamwork", level: 3 },
      { name: "Time management", level: 3 },
      { name: "Willingness to learn", level: 3 },
    ],
  },
];

export type Shot = { src: string; alt: string; ratio: "wide" | "tall" };

export type Project = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  status: "Live" | "In development";
  problem: string;
  solution: string;
  contribution: string;
  stack: string[];
  features: string[];
  live?: string;
  github?: string;
  shots: Shot[];
};

export const projects: Project[] = [
  {
    slug: "bolbuddy",
    index: "01",
    title: "BolBuddy",
    subtitle: "Your AI Partner for Better English",
    status: "In development",
    problem:
      "Many students think in Hindi or Marathi and find it hard to practise speaking English with confidence.",
    solution:
      "An AI speaking companion for Classes 2nd to 8th that accepts Hindi/Marathi input and responds in English through interactive, voice-based activities.",
    contribution:
      "Currently developing the app, working on its interactive voice-based conversation features.",
    stack: ["Android", "AI", "Speech Recognition", "Text-to-Speech"],
    features: [
      "Speak with BolBuddy — voice-first conversation practice",
      "Play & Learn — 3 mini-games incl. Word Match and sentence puzzles",
      "Practice Scenarios — 10 real-life roleplay situations",
      "Story Builder, Memory Boost, Quick Speak & Picture to Speak",
      "Word of the Day, daily streaks and learning-progress tracking",
    ],
    shots: [
      { src: bolDashboard.url, alt: "BolBuddy 2.0 home dashboard with welcome card and Talk with Me button", ratio: "wide" },
      { src: bolActivities.url, alt: "BolBuddy activity grid: Speak, Games, Scenarios, Story Builder, Memory Boost, Quick Speak", ratio: "wide" },
      { src: bolProgress.url, alt: "BolBuddy learning progress panel with points, activities and accuracy", ratio: "wide" },
      { src: bolLogin.url, alt: "BolBuddy 2.0 explorer login screen with Hindi & Marathi support badge", ratio: "tall" },
    ],
  },
  {
    slug: "flip-the-coin",
    index: "02",
    title: "Flip the Coin",
    subtitle: "A tiny game of chance, built from scratch",
    status: "Live",
    problem: "Need a quick, fair way to make a heads-or-tails decision on any device.",
    solution:
      "A single-screen web app: press the button and the coin spins, plays a sound and lands on a random result.",
    contribution: "Personal project, published on my GitHub Pages.",
    stack: ["HTML", "CSS", "JavaScript"],
    features: [
      "One-click coin flip with a 3D spin animation",
      "Coin-flip sound effect",
      "Heads / Tails result shown on screen",
    ],
    live: "https://kolpyakwarrashi-lab.github.io/Project-flip-the-coin/",
    github: "https://github.com/kolpyakwarrashi-lab/Project-flip-the-coin",
    shots: [{ src: flipShot.url, alt: "Flip the Coin app with a gold coin and Flip Coin button", ratio: "wide" }],
  },
  {
    slug: "calculator",
    index: "03",
    title: "Calculator",
    subtitle: "Everyday maths, clean and simple",
    status: "Live",
    problem: "A basic calculator is one of the best ways to practise UI layout and JavaScript logic together.",
    solution:
      "A compact, button-driven calculator with a display, clear and backspace controls and the four core operations.",
    contribution: "Personal project, published on my GitHub Pages.",
    stack: ["HTML", "CSS", "JavaScript"],
    features: [
      "Addition, subtraction, multiplication and division",
      "Clear (C) and backspace (⌫) controls",
      "Decimal input and = to evaluate",
    ],
    live: "https://kolpyakwarrashi-lab.github.io/Calculator1/",
    github: "https://github.com/kolpyakwarrashi-lab/Calculator1",
    shots: [
      { src: calcDesktop.url, alt: "Calculator web app on a purple gradient background", ratio: "wide" },
      { src: calcMobile.url, alt: "Calculator app on a phone screen", ratio: "tall" },
    ],
  },
];

export const moreProjects = [
  {
    title: "Student Management System",
    stack: ["HTML", "CSS", "JavaScript", "LocalStorage", "Chart.js"],
    description:
      "A web-based system for managing students, classes, attendance and notices — with attendance management, student search, reports and a dashboard.",
  },
  {
    title: "Camera Selling Website",
    stack: ["HTML", "CSS"],
    description: "A camera-selling website with structured product sections and a user-friendly interface.",
  },
];

export const achievements = [
  { title: "Technical Advisor", org: "ISTE Committee", detail: "Selected" },
  { title: "\n", org: "\n", detail: "" },
  { title: "\n", org: "\n", detail: "" },
  { title: "\n", org: "\n", detail: "" },
  { title: "\n", org: "\n", detail: "" },
  { title: "Navonmesh 2026 — Project Expo", org: "Navonmesh", detail: "Participated" },
];

/**
 * Certificate images. Add entries here (as .asset.json pointers) when certificate
 * images are uploaded — the gallery appears automatically once this has items.
 */
export const certificates: { src: string; title: string }[] = [];
