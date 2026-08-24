"use client";

import FollowMe from "@/components/FollowMe";
import { GENERAL_INFO } from "@/lib/data";
import { useLanguage } from "@/lib/language/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative z-10" id="contact">
      <div className="mx-auto max-w-[1148px] px-4 pt-2 pb-8 text-center">
        <p className="text-lg">{t("footer.cta")}</p>
        <a
          href={`mailto:${GENERAL_INFO.email}`}
          className="font-anton mt-5 mb-0 inline-block text-3xl hover:underline sm:text-4xl"
        >
          {GENERAL_INFO.email}
        </a>
      </div>
      <FollowMe />
    </footer>
  );
}
