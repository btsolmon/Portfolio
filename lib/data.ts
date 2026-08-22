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
    "I'm a junior software engineer from Ulaanbaatar. I loved computers as a kid, studied law at RUDN University in Moscow after graduating from the Mongolian-Russian Joint School No. 3 (Орос 3), and I'm now training as a software engineer at Pinecone Academy, graduating in October 2026.",
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
    liveUrl: "https://splendid-cassata-e84690.netlify.app/",
  },
  {
    title: "Apple Web",
    slug: "apple-web",
    year: 2026,
    techStack: ["HTML", "CSS"],
    thumbnail: "/projects/apple-web.png",
    liveUrl: "https://startling-buttercream-da4ad3.netlify.app/",
  },
  {
    title: "DOM",
    slug: "dom",
    year: 2025,
    techStack: ["HTML", "CSS", "JavaScript"],
    thumbnail: "/projects/dom.png",
    liveUrl: "https://illustrious-mermaid-11901d.netlify.app/",
  },
  {
    title: "To Do App",
    slug: "to-do-app",
    year: 2025,
    techStack: ["Javascript", "Next.js", "Node.js", "React", "Tailwind CSS"],
    thumbnail: "/projects/to-do-app.png",
    liveUrl: "https://todoapptsolmon.netlify.app/",
  },
  {
    title: "Multi Step Form",
    slug: "multi-step-form",
    year: 2025,
    techStack: ["Javascript", "Next.js", "Node.js", "React", "Tailwind CSS"],
    thumbnail: "/projects/multi-step-form.png",
    liveUrl: "https://multistepform-tsolmon.netlify.app/",
  },
  {
    title: "Movie Web App",
    slug: "movie-web-app",
    year: 2025,
    techStack: ["Javascript", "Next.js", "Node.js", "React", "Tailwind CSS", "TypeScript", "Eslint"],
    thumbnail: "/projects/movie-web-app.png",
    liveUrl: "https://movie-web-app-tsolmon.netlify.app/",
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
    title: "Software Engineering Student",
    company: "Pinecone Academy",
    duration: "Jan 2026 – Oct 2026",
  },
];
