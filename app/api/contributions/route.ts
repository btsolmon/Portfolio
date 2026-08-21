import { GITHUB_USERNAME } from "@/lib/data";

export const revalidate = 3600;

export async function GET() {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    return Response.json({ error: "Failed to load contributions" }, { status: 502 });
  }

  return Response.json(await res.json());
}
