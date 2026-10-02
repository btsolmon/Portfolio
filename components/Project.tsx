"use client";

import { IProject } from "@/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import { useLanguage } from "@/lib/language/LanguageProvider";

gsap.registerPlugin(useGSAP);

interface Props {
  index: number;
  project: IProject;
  selectedProject: string | null;
  onMouseEnter: (_slug: string) => void;
}

export default function Project({
  index,
  project,
  selectedProject,
  onMouseEnter,
}: Props) {
  const { locale } = useLanguage();
  const description =
    locale === "mn" ? project.descriptionMn : project.description;
  const externalLinkSVGRef = useRef<SVGSVGElement>(null);
  const { context, contextSafe } = useGSAP(() => {}, {
    scope: externalLinkSVGRef,
    revertOnUpdate: true,
  });

  const handleMouseEnter = contextSafe?.(() => {
    onMouseEnter(project.slug);

    const arrowLine = externalLinkSVGRef.current?.querySelector(
      "#arrow-line",
    ) as SVGPathElement;
    const arrowCurb = externalLinkSVGRef.current?.querySelector(
      "#arrow-curb",
    ) as SVGPathElement;
    const box = externalLinkSVGRef.current?.querySelector(
      "#box",
    ) as SVGPathElement;

    gsap.set(box, {
      opacity: 0,
      strokeDasharray: box?.getTotalLength(),
      strokeDashoffset: box?.getTotalLength(),
    });
    gsap.set(arrowLine, {
      opacity: 0,
      strokeDasharray: arrowLine?.getTotalLength(),
      strokeDashoffset: arrowLine?.getTotalLength(),
    });
    gsap.set(arrowCurb, {
      opacity: 0,
      strokeDasharray: arrowCurb?.getTotalLength(),
      strokeDashoffset: arrowCurb?.getTotalLength(),
    });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.to(externalLinkSVGRef.current, { autoAlpha: 1 })
      .to(box, { opacity: 1, strokeDashoffset: 0 })
      .to(arrowLine, { opacity: 1, strokeDashoffset: 0 }, "<0.2")
      .to(arrowCurb, { opacity: 1, strokeDashoffset: 0 })
      .to(externalLinkSVGRef.current, { autoAlpha: 0 }, "+=1");
  });

  const handleMouseLeave = contextSafe?.(() => {
    context.kill();
  });

  const inner = (
    <>
      <div className="flex gap-2 md:gap-5">
        <div className="font-anton text-muted-foreground">
          _{String(index + 1).padStart(2, "0")}.
        </div>
        <div>
          <h4 className="font-anton flex gap-4 bg-gradient-to-r from-primary from-[50%] to-foreground to-[50%] bg-[length:200%] bg-right bg-clip-text text-4xl text-transparent transition-all duration-700 group-hover:bg-left sm:text-6xl">
            {project.title}
            <span className="text-foreground opacity-0 transition-all group-hover:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                ref={externalLinkSVGRef}
              >
                <path
                  id="box"
                  d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                />
                <path id="arrow-line" d="M10 14 21 3" />
                <path id="arrow-curb" d="M15 3h6v6" />
              </svg>
            </span>
          </h4>
          <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
            {project.techStack.map((tech, idx) => (
              <div className="flex items-center gap-3" key={`${tech}-${idx}`}>
                <span>{tech}</span>
                {idx !== project.techStack.length - 1 && (
                  <span className="inline-block size-2 rounded-full bg-background-light" />
                )}
              </div>
            ))}
          </div>
          {description ? (
            <p className="mt-3 max-w-[560px] text-sm leading-relaxed text-muted-foreground md:max-w-[50%]">
              {description}
            </p>
          ) : null}
          {project.liveUrl ? (
            <p className="mt-3 text-sm text-primary underline-offset-4 group-hover:underline">
              {project.liveUrl.replace(/^https?:\/\//, "")}
            </p>
          ) : null}
        </div>
      </div>
      <div
        className={
          selectedProject === project.slug
            ? "mt-5 grid grid-rows-[1fr] transition-[grid-template-rows,margin] duration-500 ease-out md:hidden"
            : "mt-0 grid grid-rows-[0fr] transition-[grid-template-rows,margin] duration-500 ease-out md:hidden"
        }
      >
        <div className="min-h-0 overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            width={1280}
            height={720}
            className="aspect-video w-full bg-background-light object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );

  const className =
    "project-item group block cursor-pointer border-b py-5 leading-none transition-all first:!pt-0 last:border-none last:pb-0 md:group-hover/projects:opacity-30 md:hover:!opacity-100";

  const codeLink = project.sourceCode ? (
    <a
      href={project.sourceCode}
      target="_blank"
      rel="noreferrer"
      className="mt-3 inline-block text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline md:ml-11"
    >
      Code ↗
    </a>
  ) : null;

  if (project.liveUrl) {
    return (
      <div className={className}>
        <a
          href={project.liveUrl}
          className="block"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {inner}
        </a>
        {codeLink}
      </div>
    );
  }

  return (
    <div
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {inner}
      {codeLink}
    </div>
  );
}
