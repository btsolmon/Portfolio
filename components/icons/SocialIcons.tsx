type IconProps = {
  className?: string;
};

export type SocialName =
  | "facebook"
  | "twitter"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "github";

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M14.5 8.5V6.8c0-.7.5-1.3 1.6-1.3h1.4V3h-2.3C12.4 3 11 4.6 11 6.6v1.9H9v2.6h2V21h3.5v-9.9h2.3l.4-2.6h-2.7Z"
      />
    </svg>
  );
}

function TwitterIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M22 6.1a7.8 7.8 0 0 1-2.1.6 3.7 3.7 0 0 0 1.6-2 7.4 7.4 0 0 1-2.3.9 3.7 3.7 0 0 0-6.3 3.4A10.5 10.5 0 0 1 3.1 5.1a3.7 3.7 0 0 0 1.1 4.9 3.6 3.6 0 0 1-1.7-.5v.1a3.7 3.7 0 0 0 3 3.6 3.7 3.7 0 0 1-1.7.1 3.7 3.7 0 0 0 3.4 2.6A7.4 7.4 0 0 1 2 17.6a10.5 10.5 0 0 0 16.1-8.8A7.5 7.5 0 0 0 22 6.1Z"
      />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm9.2 1.3a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 2a1.8 1.8 0 1 0 1.8 1.8A1.8 1.8 0 0 0 12 10.2Z"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M6.5 9.5H4V20h2.5V9.5ZM5.2 4A1.6 1.6 0 1 0 5.2 7.2 1.6 1.6 0 0 0 5.2 4ZM20 20h-2.5v-5.6c0-1.6-.6-2.5-1.8-2.5a1.9 1.9 0 0 0-1.8 1.3 2 2 0 0 0-.1.8V20H11s.1-9.3 0-10.5h2.5v1.6A3.3 3.3 0 0 1 16.7 9c2.4 0 3.3 1.6 3.3 4.6V20Z"
      />
    </svg>
  );
}

function YouTubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M22.5 7.2a3 3 0 0 0-2.1-2.1C18.6 4.7 12 4.7 12 4.7s-6.6 0-8.4.4A3 3 0 0 0 1.5 7.2 31 31 0 0 0 1.1 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.4 8.4.4 8.4.4s6.6 0 8.4-.4a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-4.8 31 31 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z"
      />
    </svg>
  );
}

function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.9.6-3.5-1.4-3.5-1.4a2.8 2.8 0 0 0-1.2-1.5c-1-.7.1-.7.1-.7a2.2 2.2 0 0 1 1.6 1.1 2.3 2.3 0 0 0 3.1.9 2.3 2.3 0 0 1 .7-1.4c-2.3-.3-4.8-1.2-4.8-5.2A4 4 0 0 1 6.7 8a3.8 3.8 0 0 1 .1-2.7s1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0C18.4 5 19.4 5.3 19.4 5.3a3.8 3.8 0 0 1 .1 2.7 4 4 0 0 1 1.1 2.8c0 4-2.5 4.9-4.8 5.2a2.5 2.5 0 0 1 .7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"
      />
    </svg>
  );
}

const ICONS = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  github: GitHubIcon,
};

export function SocialIcon({
  name,
  className = "size-5",
}: {
  name: SocialName;
  className?: string;
}) {
  const Icon = ICONS[name];
  return <Icon className={className} />;
}
