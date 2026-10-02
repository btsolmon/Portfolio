import { GITHUB_USERNAME } from "@/lib/data";

export const dynamic = "force-dynamic";

const LEVELS: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const NO_STORE = { "Cache-Control": "no-store" };

async function fromGitHub(token: string) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks { contributionDays { date contributionCount contributionLevel } }
            }
          }
        }
      }`,
      variables: { login: GITHUB_USERNAME },
    }),
  });
  if (!res.ok) return null;

  const calendar = (await res.json())?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) return null;

  const contributions = (
    calendar.weeks as {
      contributionDays: { date: string; contributionCount: number; contributionLevel: string }[];
    }[]
  ).flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: LEVELS[day.contributionLevel] ?? 0,
    })),
  );

  return { total: { lastYear: calendar.totalContributions as number }, contributions };
}

async function fromPublicApi() {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last&t=${Date.now()}`,
    { cache: "no-store" },
  );
  return res.ok ? res.json() : null;
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const data = (token && (await fromGitHub(token).catch(() => null))) || (await fromPublicApi().catch(() => null));

  if (!data) {
    return Response.json({ error: "Failed to load contributions" }, { status: 502, headers: NO_STORE });
  }
  return Response.json(data, { headers: NO_STORE });
}
