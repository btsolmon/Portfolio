export function SectionFlower({
  width = 25,
  className,
}: {
  width?: number;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2.2c.4 3.2 2.6 5.4 5.8 5.8-3.2.4-5.4 2.6-5.8 5.8-.4-3.2-2.6-5.4-5.8-5.8 3.2-.4 5.4-2.6 5.8-5.8Zm0 8c.25 2 1.6 3.35 3.6 3.6-2 .25-3.35 1.6-3.6 3.6-.25-2-1.6-3.35-3.6-3.6 2-.25 3.35-1.6 3.6-3.6Z" />
    </svg>
  );
}
