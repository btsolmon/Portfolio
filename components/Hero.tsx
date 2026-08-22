"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Laugh,
  Layers,
  PartyPopper,
  UserRoundSearch,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/lib/language/LanguageProvider";

const questionConfig = [
  { key: "Me", color: "#329696", icon: Laugh, label: "hero.me", question: "hero.qMe" },
  { key: "Skills", color: "#856ED9", icon: Layers, label: "hero.skills", question: "hero.qSkills" },
  { key: "Projects", color: "#3E9858", icon: BriefcaseBusiness, label: "hero.projects", question: "hero.qProjects" },
  { key: "Fun", color: "#B95F9D", icon: PartyPopper, label: "hero.fun", question: "hero.qFun" },
  { key: "Contact", color: "#C19433", icon: UserRoundSearch, label: "hero.contact", question: "hero.qContact" },
] as const;

const topElementVariants = {
  hidden: { opacity: 0, y: -60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const bottomElementVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type HeroProps = {
  onAsk: (query: string) => void;
  asking?: boolean;
};

export default function Hero({ onAsk, asking }: HeroProps) {
  const [input, setInput] = useState("");
  const { t } = useLanguage();

  const ask = (query: string) => {
    const q = query.trim();
    if (!q || asking) return;
    setInput("");
    onAsk(q);
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-10 md:pb-20"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden">
        <div
          className="hidden bg-gradient-to-b from-neutral-500/10 to-neutral-500/0 bg-clip-text text-[10rem] leading-none font-black text-transparent select-none sm:block lg:text-[16rem]"
          style={{ marginBottom: "-2.5rem" }}
        >
          Tsolmon
        </div>
      </div>

      <motion.div
        className="z-10 mt-24 mb-3 flex flex-col items-center text-center md:mt-4 md:mb-4"
        variants={topElementVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="mt-1 text-xl font-semibold text-neutral-600 md:text-2xl">
          {t("hero.hey")}
        </h2>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl md:text-6xl lg:text-7xl">
          {t("hero.role")}
        </h1>
      </motion.div>

      <div className="relative z-10 flex w-full flex-col items-center">
        <div className="relative z-0 flex h-72 w-56 items-end justify-center sm:h-[26rem] sm:w-80 lg:h-[28rem] lg:w-[22rem]">
          <Image
            src="/hero.png?v=nogra"
            alt="Tsolmon"
            width={1326}
            height={1981}
            priority
            unoptimized
            className="pointer-events-none h-full w-auto max-h-full max-w-full select-none object-contain object-bottom drop-shadow-[0_18px_35px_rgba(0,0,0,0.18)]"
          />
        </div>

        <motion.div
          variants={bottomElementVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 -mt-8 flex w-full flex-col items-center justify-center sm:-mt-10 md:px-0"
        >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
          className="relative w-full max-w-lg"
        >
          <div className="mx-auto flex items-center rounded-full border border-neutral-200 bg-white/30 py-2.5 pr-2 pl-6 backdrop-blur-lg transition-all hover:border-neutral-300">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("hero.ask")}
              className="w-full border-none bg-transparent text-base text-neutral-800 placeholder:text-neutral-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || asking}
              aria-label={t("hero.submit")}
              className="flex items-center justify-center rounded-full bg-primary p-2.5 text-white transition-colors hover:bg-[#015bb8] disabled:opacity-70"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </form>

        <div className="mt-4 grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {questionConfig.map(({ key, color, icon: Icon, label, question }) => (
            <button
              key={key}
              type="button"
              disabled={asking}
              onClick={() => ask(t(question))}
              className="aspect-square w-full cursor-pointer rounded-2xl border border-neutral-200 bg-white/30 py-8 shadow-none backdrop-blur-lg transition-transform hover:bg-neutral-100/50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 md:p-10"
            >
              <div className="flex h-full flex-col items-center justify-center gap-1 text-gray-700">
                <Icon size={22} strokeWidth={2} color={color} />
                <span className="text-xs font-medium sm:text-sm">{t(label)}</span>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
      </div>
    </section>
  );
}
