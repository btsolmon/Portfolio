"use client";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language/LanguageProvider";

export default function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-border bg-background/70 p-1 text-xs font-semibold tracking-wide backdrop-blur-md",
        className,
      )}
      role="group"
      aria-label={t("lang.switch")}
    >
      <button
        type="button"
        onClick={() => setLocale("mn")}
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          locale === "mn"
            ? "bg-primary text-white"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {t("lang.mn")}
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          locale === "en"
            ? "bg-primary text-white"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {t("lang.en")}
      </button>
    </div>
  );
}
