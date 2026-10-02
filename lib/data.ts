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
    "I am a full-stack developer based in Ulaanbaatar with 1 year of hands-on experience in Next.js, TypeScript, and SQL, currently finishing the Software Engineering program at Pinecone Academy. I originally studied law in Moscow, then followed a lifelong passion for computers and moved into software. Before tech I spent 6 years running finance and import logistics — about 10M MNT in daily sales and 70+ product lines — advancing from office manager to senior manager. I combine that business background with software engineering to turn real business requirements into technical solutions. My philosophy: make things fast, accessible, and easy to use.",
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

export const CV_URL = "/CV_Bayar_Tsolmon_2026.pdf";

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
    { name: "HTML5", icon: "/logo/html5.svg" },
    { name: "CSS3", icon: "/logo/css3.svg" },
    { name: "Responsive UI" },
  ],
  backend: [
    { name: "Node.js", icon: "/logo/node.png" },
    { name: "Express.js", icon: "/logo/express.png" },
    { name: "REST API" },
    { name: "GraphQL", icon: "/logo/graphql.svg" },
    { name: "Authentication" },
  ],
  database: [
    { name: "PostgreSQL", icon: "/logo/postgreSQL.png" },
    { name: "MySQL", icon: "/logo/mysql.svg" },
    { name: "MongoDB", icon: "/logo/mongodb.svg" },
    { name: "Prisma", icon: "/logo/prisma.svg" },
    { name: "SQL" },
  ],
  tools: [
    { name: "Git & GitHub", icon: "/logo/git.png" },
    { name: "Docker", icon: "/logo/docker.svg" },
    { name: "Vercel", icon: "/logo/vercel.svg" },
    { name: "Postman", icon: "/logo/postman.svg" },
    { name: "Jest", icon: "/logo/jest.svg" },
    { name: "Nx Monorepo", icon: "/logo/nx.svg" },
  ],
  cloud: [
    { name: "Cloudflare Workers", icon: "/logo/cloudflare.svg" },
    { name: "Cloudflare Pages", icon: "/logo/cloudflare.svg" },
    { name: "D1", icon: "/logo/cloudflare.svg" },
    { name: "R2", icon: "/logo/cloudflare.svg" },
  ],
  languages: [
    { name: "English — IELTS 7.5" },
    { name: "Russian — Advanced" },
    { name: "Japanese — Beginner" },
  ],
};

export const PROJECTS: IProject[] = [
  {
    title: "Malchin",
    slug: "nuudelchin",
    year: 2026,
    techStack: ["Javascript", "Next.js", "Node.js", "React", "Tailwind CSS", "TypeScript", "Eslint"],
    thumbnail: "/projects/nuudelchin.png",
    liveUrl: "https://malchin-zeta.vercel.app/",
    sourceCode: "https://github.com/btsolmon/Malchin",
    team: true,
    description:
      "Web game about the life of a Mongolian herder, playable in the browser and on mobile. Started on my own initiative and led the team. I focused on the controls, inventory, and shop systems.",
    descriptionMn:
      "Монгол малчны амьдралыг сэдэвлэсэн, гар утаснаас ч тоглох боломжтой браузер тоглоом. Өөрийн санаачилгаар эхлүүлж, багийг удирдан хөгжүүлсэн. Controls, inventory, shop системүүд дээр голчлон ажилласан.",
  },
  {
    title: "Food Delivery App",
    slug: "food-delivery-app",
    year: 2026,
    techStack: ["Javascript", "Next.js", "Node.js", "React", "Tailwind CSS", "TypeScript", "Eslint", "PostgreSQL"],
    thumbnail: "/projects/food-delivery-app.png",
    liveUrl: "https://food-delivery-app-git-main-btsolmons-projects.vercel.app/",
    sourceCode: "https://github.com/btsolmon/Food-Delivery-App",
    description:
      "Food delivery platform with a categorized menu, cart, delivery address, authentication, and the full order flow. I made sure users never get stuck between picking a dish and paying, focusing on the data model and UX.",
    descriptionMn:
      "Ангилалтай цэс, сагс, хүргэлтийн хаяг, нэвтрэлт болон захиалгын бүрэн урсгалыг хэрэгжүүлсэн. Хэрэглэгч цэс сонгохоос төлбөр хийж дуустал урсгал хаана ч зогсохгүй байхад анхаарч, өгөгдлийн бүтэц болон UX дээр голчлон ажилласан.",
  },
  {
    title: "MovieZ",
    slug: "movie-web-app",
    year: 2026,
    techStack: ["Javascript", "Next.js", "Node.js", "React", "Tailwind CSS", "TypeScript", "Eslint"],
    thumbnail: "/projects/movie-web-app.png",
    liveUrl: "https://movie-web-app-swart-one.vercel.app/",
    sourceCode: "https://github.com/btsolmon/Movie-Web-App",
    description:
      "Movie discovery platform connected to an external movie API, with Upcoming, Popular, and Top Rated categories and full-length playback. I focused on dynamic data loading, the video player, and a responsive interface.",
    descriptionMn:
      "Кино мэдээллийн гадаад API-тай холбогдож, Upcoming, Popular, Top Rated ангилалаар кино харуулж, бүрэн хэмжээний киног шууд үзэх боломжтой платформ. Динамик өгөгдөл ачаалалт, кино тоглуулагч, responsive интерфейс дээр голчлон ажилласан.",
  },
];

export const MY_EXPERIENCE = [
  {
    company: "Pinecone Academy",
    companyMn: "Pinecone Academy",
    title: "Intern Developer",
    titleMn: "Дадлагажигч хөгжүүлэгч",
    duration: "Aug 2026 – Oct 2026",
    durationMn: "2026 оны 8-р сар – 2026 оны 10-р сар",
    projects: [
      {
        name: "StudyJam — Education 2.0",
        stack: "Next.js, PostgreSQL, Drizzle ORM, Socket.io, Gemini",
        description:
          "Collaborative study platform that generates quizzes from notes with AI and shares them within a class. Built a real-time Kahoot-style quiz game with Socket.io, gamification (points, streaks, levels, in-app shop), JWT authentication, and a profile/avatar customizer. In a survey of two 12th-grade groups, the class that used StudyJam before exams scored about 20% higher on average.",
        descriptionMn:
          "Тэмдэглэлээс quiz-ийг AI-аар автоматаар үүсгэж, ангиараа хамтран суралцдаг платформ. Socket.io-р бодит цагийн Kahoot маягийн тоглоом, gamification (оноо, streak, level, in-app shop), JWT нэвтрэлт, профайл/аватар customizer хийсэн. 12-р ангийн хоёр бүлэгт хийсэн судалгаагаар шалгалтын өмнө StudyJam ашигласан ангийн дундаж дүн 20 хувиар өндөр гарсан.",
      },
      {
        name: "RFP Engine — AI Productivity",
        stack: "Cloudflare Workers, D1, Vectorize, Workers AI, Gemini, Next.js, GraphQL",
        description:
          "RAG system that drafts sourced proposal answers for tenders. Built the full RAG pipeline (chunk → embedding → Vectorize search) on Cloudflare Workers AI, grounding prompts that prevent hallucination, requirement-to-evidence matching, and most of the backend. Cut proposal drafting from 2–10 days to moments.",
        descriptionMn:
          "Тендерийн саналын ноорогийг эх сурвалжтайгаар автоматаар үүсгэдэг RAG систем. Cloudflare Workers AI дээр RAG-ийн бүтэн сүлжээ (chunk → embedding → Vectorize хайлт), hallucination-аас сэргийлэх grounding prompt, шаардлага-нотолгооны тохируулга болон backend-ийн ихэнх хэсгийг хийсэн. Саналын ноорог бэлтгэх хугацааг 2–10 хоногоос хормын төдийд болгосон.",
      },
    ],
  },
  {
    company: "Pinecone Academy",
    companyMn: "Pinecone Academy",
    title: "Software Engineering Bootcamp — Fullstack Developer",
    titleMn: "Software Engineering Bootcamp — Fullstack хөгжүүлэгч",
    duration: "Jan 2026 – Aug 2026",
    durationMn: "2026 оны 1-р сар – 2026 оны 8-р сар",
  },
  {
    company: "Forise Group",
    companyMn: "Форайз Групп",
    title: "Senior Manager — Import & Retail Operations",
    titleMn: "Ахлах менежер — импорт, жижиглэн худалдааны үйл ажиллагаа",
    duration: "Nov 2019 – Aug 2025",
    durationMn: "2019 оны 11-р сар – 2025 оны 8-р сар",
    bullets: [
      {
        text: "Kept end-to-end records for 70+ product lines imported from Russia — orders, procurement, transport, and warehouse stock — tracking every item's status and movement by hand.",
        textMn:
          "ОХУ-аас импортлох 70 гаруй нэр төрлийн барааны захиалга, татан авалт, тээвэр, агуулахын үлдэгдэл хүртэлх бүх мөчлөгийн бүртгэлийг хөтөлж, бараа бүрийн төлөв, шилжилт бүрийг гараар хянасан.",
      },
      {
        text: "Reconciled ~10M MNT of daily sales against system records and real stock, tracing every discrepancy transaction by transaction to find and fix the cause.",
        textMn:
          "Өдөрт дунджаар 10 сая ₮-ийн борлуулалтын тооцоог системийн бүртгэл болон бодит үлдэгдэлтэй тулгаж, зөрүү гарвал гүйлгээ бүрээр ухаж шалтгааныг нь олоод залруулсан.",
      },
      {
        text: "Acted as the bridge between the team and partner sellers on one side and the Russian director and management on the other.",
        textMn:
          "Багийн болон түнш борлуулагчдын санал хүсэлтийг орос захирал, удирдлагад хүргэж, хоёр талыг холбох гүүр болж ажилласан.",
      },
      {
        text: "Regularly tested the internal web system for orders, transport, and stock, and reported bugs to the developer team to get them fixed.",
        textMn:
          "Барааны захиалга, тээвэр, үлдэгдэл бүртгэдэг дотоод веб системийн ажиллагааг тогтмол шалгаж, олдсон алдааг хөгжүүлэгчдийн багт мэдэгдэн засварлуулдаг байсан.",
      },
      {
        text: "Built formulas and dashboards in Google Sheets that automated sales and stock reporting.",
        textMn:
          "Google Sheets дээр томьёо болон dashboard бүтээж, борлуулалт, үлдэгдлийн тайланг автоматжуулсан.",
      },
    ],
  },
];
