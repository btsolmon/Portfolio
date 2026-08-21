"use client";

import { IProject } from "@/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

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
      {selectedProject === null && (
        <Image
          src={project.thumbnail}
          alt={project.title}
          width={1280}
          height={720}
          className="mb-6 aspect-video w-full bg-neutral-100 object-contain"
          loading="lazy"
        />
      )}
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
          {project.liveUrl ? (
            <p className="mt-3 text-sm text-primary underline-offset-4 group-hover:underline">
              {project.liveUrl.replace(/^https?:\/\//, "")}
            </p>
          ) : null}
        </div>
      </div>
    </>
  );

  const className =
    "project-item group block cursor-pointer py-5 leading-none transition-all first:!pt-0 last:border-none last:pb-0 md:border-b md:group-hover/projects:opacity-30 md:hover:!opacity-100";

  if (project.liveUrl) {
    return (
      <a
        href={project.liveUrl}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {inner}
      </a>
    );
  }

  return (
    <div
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {inner}
    </div>
  );
}
