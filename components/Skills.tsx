"use client";

import SectionTitle from "@/components/SectionTitle";
import { MY_STACK } from "@/lib/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { useLanguage } from "@/lib/language/LanguageProvider";
import type { TranslationKey } from "@/lib/language/translations";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useLanguage();

  useGSAP(
    () => {
      const slideUpEl = containerRef.current?.querySelectorAll(".slide-up");
      if (!slideUpEl?.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 80%",
          scrub: 0.5,
        },
      });

      tl.from(".slide-up", {
        opacity: 0,
        y: 40,
        ease: "none",
        stagger: 0.4,
      });
    },
    { scope: containerRef, dependencies: [locale], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom 50%",
          end: "bottom 10%",
          scrub: 1,
        },
      });

      tl.to(containerRef.current, {
        y: -150,
        opacity: 0,
      });
    },
    { scope: containerRef, dependencies: [locale], revertOnUpdate: true },
  );

  return (
    <section id="my-stack" className="relative z-10" ref={containerRef}>
      <div className="mx-auto max-w-[1148px] px-4">
        <SectionTitle title={t("stack.title")} />

        <div className="space-y-20">
          {Object.entries(MY_STACK).map(([key, value]) => (
              <div className="grid gap-[25px] sm:grid-cols-12" key={key}>
              <div className="sm:col-span-5">
                <p className="slide-up font-anton text-5xl leading-none text-muted-foreground uppercase">
                  {t(`stack.${key}` as TranslationKey)}
                </p>
              </div>
              <div className="flex flex-wrap gap-x-11 gap-y-9 sm:col-span-7">
                {value.map((item) => (
                  <div
                    className="slide-up flex items-center gap-3.5 leading-none"
                    key={item.name}
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      width={40}
                      height={40}
                      className={`max-h-10 w-auto${item.name === "Prisma" || item.name === "Docker" ? " dark:invert" : ""}`}
                    />
                    <span className="text-2xl capitalize">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
