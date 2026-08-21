"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { MoveUpRight } from "lucide-react";
import { GENERAL_INFO, SOCIAL_LINKS } from "@/lib/data";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { TranslationKey } from "@/lib/i18n/translations";

const COLORS = [
  "bg-yellow-500 text-black",
  "bg-blue-500 text-white",
  "bg-teal-500 text-black",
  "bg-indigo-500 text-white",
  "bg-rose-500 text-white",
];

const MENU_LINKS: { name: TranslationKey; url: string }[] = [
  { name: "nav.home", url: "#home" },
  { name: "nav.about", url: "#about-me" },
  { name: "nav.experience", url: "#my-experience" },
  { name: "nav.projects", url: "#selected-projects" },
  { name: "nav.github", url: "#github" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const go = (url: string) => {
    setIsMenuOpen(false);
    const el = document.querySelector(url);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="sticky top-0 z-40">
        <LanguageToggle className="absolute top-5 left-5 z-[2] md:left-10" />
        <button
          className="group absolute top-5 right-5 z-[2] size-12 md:right-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? t("nav.close") : t("nav.menu")}
        >
          <span
            className={cn(
              "absolute top-1/2 left-1/2 inline-block h-0.5 w-3/5 -translate-x-1/2 rounded-full bg-foreground duration-300",
              isMenuOpen ? "rotate-45 -translate-y-1/2" : "-translate-y-[5px] md:group-hover:rotate-12",
            )}
          />
          <span
            className={cn(
              "absolute top-1/2 left-1/2 inline-block h-0.5 w-3/5 -translate-x-1/2 rounded-full bg-foreground duration-300",
              isMenuOpen ? "-rotate-45 -translate-y-1/2" : "translate-y-[5px] md:group-hover:-rotate-12",
            )}
          />
        </button>
      </div>

      <div
        className={cn(
          "overlay fixed inset-0 z-30 bg-black/40 transition-all duration-150",
          { "pointer-events-none invisible opacity-0": !isMenuOpen },
        )}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={cn(
          "fixed top-0 right-0 z-30 flex h-[100dvh] w-[500px] max-w-[calc(100vw-3rem)] translate-x-full transform flex-col gap-y-10 overflow-y-auto py-10 transition-transform duration-700 lg:justify-center",
          { "translate-x-0": isMenuOpen },
        )}
      >
        <div
          className={cn(
            "fixed inset-0 z-[-1] scale-150 translate-x-1/2 rounded-[50%] bg-white duration-700 delay-150",
            { "translate-x-0": isMenuOpen },
          )}
        />

        <div className="mx-8 flex w-full max-w-[300px] grow md:items-center sm:mx-auto">
          <div className="flex w-full gap-10 max-lg:flex-col lg:justify-between">
            <div className="max-lg:order-2">
              <p className="mb-5 text-muted-foreground md:mb-8">{t("nav.social")}</p>
              <ul className="space-y-3">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg capitalize hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-5 text-muted-foreground md:mb-8">{t("nav.menuLabel")}</p>
              <ul className="space-y-3">
                {MENU_LINKS.map((link, idx) => (
                  <li key={link.name}>
                    <button
                      onClick={() => go(link.url)}
                      className="group flex items-center gap-3 text-xl"
                    >
                      <span
                        className={cn(
                          "flex size-3.5 items-center justify-center rounded-full bg-black/10 transition-all group-hover:scale-[200%]",
                          COLORS[idx],
                        )}
                      >
                        <MoveUpRight
                          size={8}
                          className="scale-0 transition-all group-hover:scale-100"
                        />
                      </span>
                      {t(link.name)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mx-8 w-full max-w-[300px] sm:mx-auto">
          <p className="mb-4 text-muted-foreground">{t("nav.contact")}</p>
          <a href={`mailto:${GENERAL_INFO.email}`}>{GENERAL_INFO.email}</a>
        </div>
      </div>
    </>
  );
}
