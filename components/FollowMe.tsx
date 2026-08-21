import { SocialIcon } from "@/components/icons/SocialIcons";
import { SOCIAL_LINKS } from "@/lib/data";

export default function FollowMe() {
  return (
    <div className="relative z-10 mt-20 bg-neutral-950/20 py-16 text-white">
      <div className="mx-auto flex max-w-[1148px] flex-col items-center px-4">
        <p className="text-sm font-medium tracking-[0.42em] drop-shadow-[0_1px_10px_rgba(0,0,0,0.35)]">FOLLOW ME</p>
        <ul className="mt-7 flex items-center gap-6 sm:gap-8">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.name}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="inline-flex text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-110 hover:text-primary"
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
