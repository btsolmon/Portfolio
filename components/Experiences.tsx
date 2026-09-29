"use client";

import SectionTitle from "@/components/SectionTitle";
import { MY_EXPERIENCE } from "@/lib/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { useLanguage } from "@/lib/language/LanguageProvider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Experiences() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useLanguage();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 50%",
          toggleActions: "restart none none reverse",
          scrub: 1,
        },
      });

      tl.from(".experience-item", {
        y: 50,
        opacity: 0,
        stagger: 0.3,
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
          end: "bottom 20%",
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
    <section className="relative z-10 py-section" id="my-experience">
      <div className="mx-auto max-w-[1148px] px-4" ref={containerRef}>
        <SectionTitle title={t("experience.title")} />

        <div className="grid gap-14">
          {MY_EXPERIENCE.map((item) => (
            <div key={`${item.company}-${item.title}`} className="experience-item">
              <p className="text-xl text-muted-foreground">
                {locale === "mn" ? item.companyMn : item.company}
              </p>
              <p className="font-anton mt-3.5 mb-2.5 text-5xl leading-none">
                {locale === "mn" ? item.titleMn : item.title}
              </p>
              <p className="text-lg text-muted-foreground">
                {locale === "mn" ? item.durationMn : item.duration}
              </p>
              {"projects" in item && item.projects && (
                <div className="mt-6 grid gap-6">
                  {item.projects.map((project) => (
                    <div key={project.name}>
                      <p className="text-2xl">{project.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {project.stack}
                      </p>
                      <p className="mt-2 max-w-[760px] text-lg">
                        {locale === "mn"
                          ? project.descriptionMn
                          : project.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
