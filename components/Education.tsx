"use client";

import SectionTitle from "@/components/SectionTitle";
import { EDUCATION } from "@/lib/data";
import { useLanguage } from "@/lib/language/LanguageProvider";

export default function Education() {
  const { t, locale } = useLanguage();
  const mn = locale === "mn";

  return (
    <section className="relative z-10 py-section" id="education">
      <div className="mx-auto max-w-[1148px] px-4">
        <SectionTitle title={t("education.title")} />

        <div className="grid gap-12 md:gap-16">
          {EDUCATION.map((item) => (
            <div
              key={item.school}
              className="border-t border-border/60 pt-8 md:pt-10"
            >
              <p className="text-xl text-muted-foreground">
                {mn ? item.locationMn : item.location}
              </p>
              <p className="font-anton mt-3 mb-3 text-4xl leading-tight md:text-5xl">
                {mn ? item.schoolMn : item.school}
              </p>
              <p className="text-lg">{mn ? item.programMn : item.program}</p>
              {item.duration ? (
                <p className="mt-1 text-lg text-muted-foreground">
                  {mn ? item.durationMn : item.duration}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
