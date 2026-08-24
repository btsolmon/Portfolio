"use client";

import { SocialIcon } from "@/components/icons/SocialIcons";
import { SOCIAL_LINKS } from "@/lib/data";
import { useLanguage } from "@/lib/language/LanguageProvider";

export default function FollowMe() {
  const { t } = useLanguage();

  return (
    <div className="relative z-10 mt-20 border-t border-white/20 bg-white/12 py-16 text-foreground shadow-[0_-16px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_-16px_50px_rgba(0,0,0,0.2)]">
      <div className="mx-auto flex max-w-[1148px] flex-col items-center px-4">
        <p className="text-sm font-medium tracking-[0.42em]">
          {t("footer.follow")}
        </p>
        <ul className="mt-7 flex items-center gap-6 sm:gap-8">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.name}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="inline-flex text-foreground transition-transform duration-200 hover:scale-110 hover:text-primary"
              >
                <SocialIcon name={link.name} className="size-[22px] sm:size-6" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
