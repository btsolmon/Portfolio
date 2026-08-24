"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React from "react";
import { useLanguage } from "@/lib/language/LanguageProvider";
import { translations } from "@/lib/language/translations";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutMe() {
  const container = React.useRef<HTMLDivElement>(null);
  const { t, locale } = useLanguage();
  void translations;

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      tl.from(".slide-up-and-fade", {
        y: 150,
        opacity: 0,
        stagger: 0.05,
      });
    },
    { scope: container, dependencies: [locale], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "bottom 50%",
          end: "bottom 10%",
          scrub: 0.5,
        },
      });

      tl.to(".slide-up-and-fade", {
        y: -150,
        opacity: 0,
        stagger: 0.02,
      });
    },
    { scope: container, dependencies: [locale], revertOnUpdate: true },
  );

  return (
    <section className="relative z-10 pb-section" id="about-me">
      <div className="mx-auto max-w-[1148px] px-4" ref={container}>
        <h2 className="about-belief slide-up-and-fade mb-20 text-4xl font-thin md:text-6xl">
          {t("about.belief")}
        </h2>

        <p className="slide-up-and-fade border-b border-border pb-3 text-muted-foreground">
          {t("about.label")}
        </p>

        <div className="mt-9 grid md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="slide-up-and-fade text-5xl">{t("about.hi")}</p>
          </div>
          <div className="md:col-span-7">
            <div className="max-w-[540px] text-lg text-muted-foreground">
              <p className="slide-up-and-fade">{t("about.p1")}</p>
              <p className="slide-up-and-fade mt-3">{t("about.p2")}</p>
              <p className="slide-up-and-fade mt-3">{t("about.p3")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
