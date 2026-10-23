export const profile = {
  name: "Maverick Smith",
  role: "Software Engineer",
  email: "persianhelium@gmail.com",
  location: "Linz, Austria",
  github: "https://github.com/us-crypto",
  githubUser: "us-crypto",
  githubProfile: "https://github.com/us-crypto",
  x: "https://x.com/mave_smith_rick",
  whatsapp: "https://wa.me/436801417634",
  resume: "/resume.pdf",
  avatar: "/media/avatar.png",
  openToWork: true,
};

export const about = [
  "Software engineer based in Linz, Austria, from Iran. I build reliable software from the interface to the database — PHP, Java, and JavaScript/TypeScript, MySQL for data, Angular for interfaces — and I lead as a certified Scrum Master.",
  "A one-person studio. I design and build the apps myself, from the first sketch to the version a stranger can open. Fluent in Persian, German, and English.",
];

export const experience = [
  {
    role: "Software Engineer",
    company: "Independent — Maverick Smith",
    href: "https://github.com/us-crypto/maverick-smith",
    period: "2026–Present",
    bullets: [
      "One-person studio. Design and build apps from the first sketch to a version a stranger can open.",
      "Shipped Saffron, a Persian-first recipe wizard with a public Android preview and no account.",
      "Building Persepolis, offline board and card games over Bluetooth or a local hotspot, and Delbar, a dating app for Persian singles.",
      "Built the Dr. Naseri dental clinic booking site: online appointments, WhatsApp and email notifications, Persian, English, and Turkmen.",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "WIFI Linz",
    href: "https://www.wifi-ooe.at/",
    period: "Application developer training",
    bullets: [
      "Full-stack training across PHP, Java, JavaScript, and MySQL.",
      "Built a Java pet-management system with a database persistence layer as coursework.",
    ],
  },
];

export const projects = [
  {
    name: "Saffron",
    description:
      "A Persian-first recipe wizard. Set the servings, budget, mood, diet, and the kitchen you actually have, and it suggests a dish you can cook. No account. An Android build is public. The first version was called Sofreh.",
    image: "/media/project-saffron.png",
    status: "Live" as const,
    category: "Android app",
    date: "2026-10-23",
    technologies: ["Android", "JavaScript"],
    website: "https://us-crypto.github.io/saffron-updates/privacy.html",
    github: "https://github.com/us-crypto/saffron-updates",
  },
  {
    name: "Dr. Naseri Dental Clinic",
    description:
      "A booking site for a dental clinic. Online appointment scheduling, WhatsApp and email notifications, and support for Persian, English, and Turkmen.",
    image: "/media/project-naseri.png",
    status: "Live" as const,
    category: "Client",
    date: "2026-08-15",
    technologies: ["TypeScript", "Web"],
    website: "https://us-crypto.github.io/drNaseri/",
    github: "https://github.com/us-crypto/drNaseri",
  },
  {
    name: "Persepolis",
    description:
      "Offline board and card games for the road: backgammon, pasur, chess, and Uno. Two phones can play over Bluetooth or a local hotspot. No account.",
    image: "/media/project-persepolis.png",
    status: "Building" as const,
    category: "Mobile",
    date: "2026-09-29",
    technologies: ["Dart", "Flutter", "Bluetooth"],
    github: "https://github.com/us-crypto/roadtrip-offline-games",
  },
  {
    name: "Delbar",
    description: "A dating app for Persian singles. In private development and not open for download yet.",
    image: "/media/project-delbar.png",
    status: "Building" as const,
    category: "Mobile",
    date: "2026-08-16",
    technologies: ["Dart", "Flutter"],
    github: "https://github.com/us-crypto/Delbar",
  },
];

export const education = [
  {
    school: "WIFI Linz",
    period: "Full-stack development",
    detail: "Application developer training. PHP, Java, JavaScript, and MySQL, including a Java pet-management system with database persistence.",
  },
  {
    school: "Scrum Master",
    period: "Certified",
    detail: "Certified Scrum Master. Planning sprints and keeping delivery aligned with quality.",
  },
];

export const skills = [
  "PHP",
  "Java",
  "JavaScript",
  "TypeScript",
  "Angular",
  "React",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "MySQL",
  "Dart",
  "Flutter",
  "Scrum",
];

export const post = {
  slug: "wild-ideas-finished-properly",
  title: "Wild ideas, finished properly",
  subtitle: "A note from the studio",
  excerpt: "A one-person studio. I design and build the apps myself, from the first sketch to the version a stranger can open.",
  dateLabel: "Oct 23, 2026",
  dateFull: "October 23, 2026",
  minutes: 2,
  cover: "/media/blog-cover.png",
  author: "Maverick Smith",
  paragraphs: [
    "A one-person studio. I design and build the apps myself, from the first sketch to the version a stranger can open. What is public is linked. What is still on the bench is named, and not dressed up as a launch.",
    "Saffron is a Persian-first recipe wizard. You set the servings, budget, mood, diet, and the kitchen you actually have, and it suggests a dish you can cook. No account. An Android build is public. The first version was called Sofreh.",
    "Persepolis is offline board and card games for the road: backgammon, pasur, chess, and Uno. Two phones can play over Bluetooth or a local hotspot. Delbar, a dating app for Persian singles, is still in private development.",
    "I'm a software engineer in Linz, Austria, from Iran. I build with PHP, Java, and JavaScript/TypeScript, keep data in MySQL, and build interfaces in Angular. I'm a certified Scrum Master. I work in Persian, German, and English, and I'm open to freelance, contract, or full-time.",
  ],
};

export const spotifyPlaylist = "6412LjpZTQDIa0lC4g5Ujy";

export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "github", label: "GitHub" },
  { id: "blog", label: "Blog" },
] as const;
