import { GENERAL_INFO } from "@/lib/data";

export default function StickyEmail() {
  return (
    <div className="fixed bottom-32 left-0 z-20 hidden xl:block">
      <a
        href={`mailto:${GENERAL_INFO.email}`}
        className="px-3 tracking-[1px] text-muted-foreground transition-all hover:text-foreground"
        style={{ textOrientation: "mixed", writingMode: "vertical-rl" }}
      >
        {GENERAL_INFO.email}
      </a>
    </div>
  );
}
