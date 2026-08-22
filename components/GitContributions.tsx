"use client";

import SectionTitle from "@/components/SectionTitle";
import { GITHUB_USERNAME } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/lib/language/LanguageProvider";
import type { TranslationKey } from "@/lib/language/translations";

type Contribution = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type ApiResponse = {
  total: Record<string, number>;
  contributions: Contribution[];
};

const LEVEL_CLASS = [
  "bg-[var(--contrib-empty)]",
  "bg-[#9ecbff]",
  "bg-[#4da3f0]",
  "bg-primary",
  "bg-[#015bb8]",
] as const;

const MONTH_KEYS = [
  "github.m1",
  "github.m2",
  "github.m3",
  "github.m4",
  "github.m5",
  "github.m6",
  "github.m7",
  "github.m8",
  "github.m9",
  "github.m10",
  "github.m11",
  "github.m12",
] as const satisfies readonly TranslationKey[];

function toWeeks(days: Contribution[]) {
  if (!days.length) return [];

  const first = new Date(`${days[0].date}T00:00:00`);
  const weeks: (Contribution | null)[][] = [];
  let week: (Contribution | null)[] = Array.from({ length: first.getDay() }, () => null);

  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  return weeks;
}

function monthOfWeek(week: (Contribution | null)[]) {
  const day = week.find((entry) => entry);
  if (!day) return null;
  return new Date(`${day.date}T00:00:00`).getMonth();
}

function monthLabels(
  weeks: (Contribution | null)[][],
  months: readonly string[],
) {
  return weeks.map((week, index) => {
    const month = monthOfWeek(week);
    if (month === null) return "";
    const previous = index > 0 ? monthOfWeek(weeks[index - 1]) : null;
    return month !== previous ? months[month] : "";
  });
}

export default function GitContributions() {
  const [days, setDays] = useState<Contribution[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);
  const { t } = useLanguage();
  const monthNames = MONTH_KEYS.map((key) => t(key));
  const dayLabels = ["", t("github.dayMon"), "", t("github.dayWed"), "", t("github.dayFri"), ""];

  useEffect(() => {
    let cancelled = false;

    fetch("/api/contributions")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load contributions");
        return res.json() as Promise<ApiResponse>;
      })
      .then((data) => {
        if (cancelled) return;
        setDays(data.contributions ?? []);
        setTotal(Object.values(data.total ?? {}).reduce((sum, year) => sum + year, 0));
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const weeks = useMemo(() => toWeeks(days), [days]);
  const months = useMemo(() => monthLabels(weeks, monthNames), [weeks, monthNames]);

  return (
    <section className="relative z-10 py-section" id="github">
      <div className="mx-auto max-w-[1148px] px-4">
        <SectionTitle title={t("github.title")} />

        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-anton text-4xl leading-none sm:text-5xl">
              {GITHUB_USERNAME}
            </p>
            <p className="mt-3 text-muted-foreground">
              {error
                ? t("github.error")
                : days.length
                  ? t("github.count", { n: total })
                  : t("github.loading")}
            </p>
          </div>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            {t("github.profile")}
          </a>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-background/60 p-4 backdrop-blur-lg sm:p-6">
          {weeks.length ? (
            <div className="flex min-w-[720px] justify-center">
              <div className="mr-1.5 flex w-8 shrink-0 flex-col">
                <div className="mb-[3px] h-3.5" />
                {dayLabels.map((label, index) => (
                  <div
                    key={`${label}-${index}`}
                    className="flex h-[11px] items-center justify-end text-[10px] leading-none text-muted-foreground sm:h-3"
                    style={{ marginBottom: index === 6 ? 0 : 3 }}
                  >
                    {label}
                  </div>
                ))}
              </div>

              <div>
                <div className="mb-[3px] flex gap-[3px] text-[10px] leading-none text-muted-foreground">
                  {months.map((label, index) => (
                    <div
                      key={`month-${index}`}
                      className="relative h-3.5 w-[11px] shrink-0 sm:w-3"
                    >
                      {label ? (
                        <span className="absolute top-0 left-0 whitespace-nowrap">
                          {label}
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>

                <div className="flex gap-[3px]">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-[3px]">
                      {week.map((day, dayIndex) => (
                        <div
                          key={`${weekIndex}-${dayIndex}`}
                          title={
                            day
                              ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`
                              : undefined
                          }
                          className={cn(
                            "size-[11px] rounded-[2px] sm:size-3",
                            day ? LEVEL_CLASS[day.level] : "bg-transparent",
                          )}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[120px] animate-pulse rounded-xl bg-neutral-100" />
          )}

          <div className="mt-4 flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
            <span>{t("github.less")}</span>
            {LEVEL_CLASS.map((color) => (
              <span key={color} className={cn("size-2.5 rounded-[2px]", color)} />
            ))}
            <span>{t("github.more")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
