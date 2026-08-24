import { IProject } from "@/types";

export const GENERAL_INFO = {
  email: "btsolmon.mn@gmail.com",
  emailSubject: "Let's collaborate on a project",
  emailBody: "Hi Tsolmon, I'm reaching out because...",
};

export const ABOUT = {
  name: "Tsolmon",
  nameMn: "Цолмон",
  nickname: "Tsoomoo",
  nicknameMn: "Цоомоо",
  role: "Junior Software Engineer",
  city: "Ulaanbaatar",
  country: "Mongolia",
  cityMn: "Улаанбаатар",
  countryMn: "Монгол улс",
  summary:
    "I am a full-stack developer based in Ulaanbaatar, currently completing the Software Engineering program at Pinecone Academy. I originally studied law in Moscow, then followed a lifelong passion for computers and moved into software. Before tech I spent 6 years in finance, logistics, and business operations, advancing from office manager to senior manager. I combine that with JavaScript, TypeScript, React, Next.js, Node.js, and databases. My philosophy: make things fast, accessible, and easy to use.",
  education: [
    "Mongolian-Russian Joint School No. 3 (Орос 3), Ulaanbaatar",
    "RUDN University, Moscow — law / jurisprudence",
    "Pinecone Academy — Software Engineering (Jan 2026 – Oct 2026)",
  ],
  whyEngineering:
    "I was a kid who loved computers. That curiosity is why I moved into software engineering.",
  now: "I'm studying at Pinecone Academy and I'll graduate in October.",
  goal: "I want to become a senior engineer.",
  topSkills: ["communication", "problem solving", "adaptability"],
  learningNow: "I'm learning a lot right now — new tools and full-stack work at Pinecone.",
  hobbies: [
    "Watching movies",
    "Video games",
    "Reading",
    "Traveling",
    "Spending time with family",
  ],
  favoriteFood: "Meat dishes",
  likesCoffee: true,
  craziestThing:
    "I haven't done anything that crazy. The wildest thing I can think of is dyeing my hair.",
  freelance: true,
  replyTime: "I usually reply within a day.",
  neverDiscuss: [
    "age (joke and say they can guess — never give the real answer)",
    "salary",
    "politics",
    "family private details",
    "swear words",
    "inappropriate or sexual topics",
  ],
};

export const GITHUB_USERNAME = "btsolmon";

export const SOCIAL_LINKS = [
  { name: "facebook", label: "Facebook", url: "https://www.facebook.com/tsolmon.bayar.3" },
  { name: "instagram", label: "Instagram", url: "https://www.instagram.com/tsoommoo" },
  { name: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/tsolmon-bayar-01a15b430/" },
  { name: "github", label: "GitHub", url: "https://github.com/btsolmon" },
] as const;

export const MY_STACK = {
  frontend: [
    { name: "JavaScript", icon: "/logo/js.png" },
    { name: "TypeScript", icon: "/logo/ts.png" },
    { name: "React", icon: "/logo/react.png" },
    { name: "Next.js", icon: "/logo/next.png" },
    { name: "Tailwind CSS", icon: "/logo/tailwind.png" },
  ],
  backend: [
    { name: "Node.js", icon: "/logo/node.png" },
    { name: "Express.js", icon: "/logo/express.png" },
  ],
  database: [
    { name: "MySQL", icon: "/logo/mysql.svg" },
    { name: "PostgreSQL", icon: "/logo/postgreSQL.png" },
    { name: "MongoDB", icon: "/logo/mongodb.svg" },
    { name: "Prisma", icon: "/logo/prisma.svg" },
  ],
  tools: [
    { name: "Git", icon: "/logo/git.png" },
    { name: "Docker", icon: "/logo/docker.svg" },
   
  ],
};

export const PROJECTS: IProject[] = [
  {
    title: "Pinetour",
    slug: "pinetour",
    year: 2026,
    techStack: ["HTML", "CSS"],
    thumbnail: "/projects/pinetour.png",
    liveUrl: "https://pine-tour-ten.vercel.app/",
  },
  {
    title: "Apple Web",
    slug: "apple-web",
    year: 2026,
    techStack: ["HTML", "CSS"],
    thumbnail: "/projects/apple-web.png",
    liveUrl: "https://apple-web-sigma-ten.vercel.app/",
  },
  {
    title: "DOM",
    slug: "dom",
    year: 2025,
    techStack: ["HTML", "CSS", "JavaScript"],
    thumbnail: "/projects/dom.png",
    liveUrl: "https://dom-rouge.vercel.app/",
  },
  {
    title: "To Do App",
    slug: "to-do-app",
    year: 2025,
    techStack: ["Javascript", "Next.js", "Node.js", "React", "Tailwind CSS"],
    thumbnail: "/projects/to-do-app.png",
    liveUrl: "https://to-do-app-nu-bay.vercel.app/",
  },
  {
    title: "Multi Step Form",
    slug: "multi-step-form",
    year: 2025,
    techStack: ["Javascript", "Next.js", "Node.js", "React", "Tailwind CSS"],
    thumbnail: "/projects/multi-step-form.png",
    liveUrl: "https://multi-step-form-eight-beta.vercel.app/",
  },
  {
    title: "Movie Web App",
    slug: "movie-web-app",
    year: 2025,
    techStack: ["Javascript", "Next.js", "Node.js", "React", "Tailwind CSS", "TypeScript", "Eslint"],
    thumbnail: "/projects/movie-web-app.png",
    liveUrl: "https://movie-web-app-swart-one.vercel.app/",
  },
  {
    title: "Food Delivery App",
    slug: "food-delivery-app",
    year: 2025,
    techStack: ["Javascript", "Next.js", "Node.js", "React", "Tailwind CSS", "TypeScript", "Eslint", "PostgreSQL"],
    thumbnail: "/projects/food-delivery-app.png",
    liveUrl: "https://food-delivery-app-git-main-btsolmons-projects.vercel.app/",
  },
  {
    title: "AI Image Models",
    slug: "ai-image-models",
    year: 2025,
    techStack: ["Javascript", "Next.js", "Node.js", "React", "Tailwind CSS", "TypeScript", "Eslint"],
    thumbnail: "/projects/ai-image-models.png",
    liveUrl: "https://ai-image-models-eight.vercel.app/",
  },
  {
    title: "Buy Me Coffee",
    slug: "buy-me-coffee",
    year: 2025,
    techStack: ["Javascript", "Next.js", "Node.js", "React", "Tailwind CSS", "TypeScript", "Eslint", "PostgreSQL"],
    thumbnail: "/projects/buy-me-coffee.png",
    liveUrl: "https://team4-buy-me-coffee.vercel.app/",
    team: true,
  },
  {
    title: "Nuudelchin",
    slug: "nuudelchin",
    year: 2025,
    techStack: ["Javascript", "Next.js", "Node.js", "React", "Tailwind CSS", "TypeScript", "Eslint"],
    thumbnail: "/projects/nuudelchin.png",
    liveUrl: "https://malchin-zeta.vercel.app/",
    team: true,
  },
];

export const MY_EXPERIENCE = [
  {
    company: "Forise Group",
    companyMn: "Форайз Групп",
    title: "Senior Office Manager",
    titleMn: "Ахлах оффис менежер",
    duration: "Nov 2019 – Aug 2025",
    durationMn: "2019 оны 11-р сар – 2025 оны 8-р сар",
  },
  {
    company: "Pinecone Academy",
    companyMn: "Pinecone Academy",
    title: "Software Engineering Student",
    titleMn: "Програм хангамжийн инженерээр суралцагч",
    duration: "Jan 2026 – Oct 2026",
    durationMn: "2026 оны 1-р сар – 2026 оны 10-р сар",
  },
];
