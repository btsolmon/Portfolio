"use client";

import SectionTitle from "@/components/SectionTitle";
import Project from "@/components/Project";
import { PROJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { MouseEvent, useRef, useState } from "react";
import { useLanguage } from "@/lib/language/LanguageProvider";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ProjectList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const imageContainer = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<string | null>(
    PROJECTS[0].slug,
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        const trigger = ScrollTrigger.create({
          trigger: listRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: () => {
            const titles =
              listRef.current?.querySelectorAll(".project-item h4");
            if (!titles?.length) return;

            const target = window.innerHeight * 0.42;
            let bestIdx = 0;
            let bestDist = Infinity;

            titles.forEach((title, index) => {
              const dist = Math.abs(title.getBoundingClientRect().top - target);
              if (dist < bestDist) {
                bestDist = dist;
                bestIdx = index;
              }
            });

            const slug = PROJECTS[bestIdx]?.slug;
            if (slug) {
              setSelectedProject((current) =>
                current === slug ? current : slug,
              );
            }
          },
        });

        return () => trigger.kill();
      });

      return () => mm.revert();
    },
    { scope: listRef },
  );

  useGSAP(
    (context, contextSafe) => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const handleMouseMove = contextSafe?.((e: MouseEvent) => {
          if (!containerRef.current || !imageContainer.current) return;
          if (document.documentElement.getAttribute("data-nav-open") === "true") {
            gsap.killTweensOf(imageContainer.current);
            gsap.set(imageContainer.current, { opacity: 0 });
            return;
          }

          const containerRect = containerRef.current.getBoundingClientRect();
          const imageRect = imageContainer.current.getBoundingClientRect();
          const offsetTop = e.clientY - containerRect.y;

          if (
            containerRect.y > e.clientY ||
            containerRect.bottom < e.clientY ||
            containerRect.x > e.clientX ||
            containerRect.right < e.clientX
          ) {
            gsap.to(imageContainer.current, {
              duration: 0.3,
              opacity: 0,
            });
            return;
          }

          gsap.to(imageContainer.current, {
            y: offsetTop - imageRect.height / 2,
            duration: 1,
            opacity: 1,
          });
        }) as unknown as EventListener;

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: listRef.current,
          start: "top bottom",
          end: "top 80%",
          toggleActions: "restart none none reverse",
          scrub: 1,
        },
      });

      tl.from(listRef.current, {
        y: 150,
        opacity: 0,
      });
    },
    { scope: listRef },
  );

  const hidePreview = () => {
    if (!imageContainer.current) return;
    gsap.killTweensOf(imageContainer.current);
    gsap.set(imageContainer.current, { opacity: 0 });
  };

  const isNavOpen = () =>
    document.documentElement.getAttribute("data-nav-open") === "true";

  const handleMouseEnter = (slug: string) => {
    if (window.innerWidth < 768) return;
    if (isNavOpen()) {
      hidePreview();
      return;
    }
    setSelectedProject(slug);
    if (imageContainer.current) {
      gsap.to(imageContainer.current, { opacity: 1, duration: 0.35 });
    }
  };

  return (
    <section className="relative z-10 pb-section" id="selected-projects">
      <div className="mx-auto max-w-[1148px] px-4">
        <SectionTitle title={t("projects.title")} />

        <div className="group/projects relative" ref={containerRef}>
          {selectedProject !== null && (
            <div
              className="project-hover-preview pointer-events-none absolute top-0 right-0 z-20 aspect-video w-[320px] overflow-hidden rounded-md bg-background/80 opacity-0 shadow-lg max-md:hidden xl:w-[480px]"
              ref={imageContainer}
            >
              {PROJECTS.map((project) => (
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  width={1280}
                  height={720}
                  className={cn(
                    "absolute inset-0 h-full w-full object-contain transition-all duration-500",
                    { "opacity-0": project.slug !== selectedProject },
                  )}
                  key={project.slug}
                />
              ))}
            </div>
          )}

          <div className="flex flex-col" ref={listRef}>
            {PROJECTS.map((project, index) => (
              <Project
                index={index}
                project={project}
                selectedProject={selectedProject}
                onMouseEnter={handleMouseEnter}
                key={project.slug}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
