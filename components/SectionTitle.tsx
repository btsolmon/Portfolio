import { ReactNode } from "react";
import { SectionFlower } from "./icons/SectionFlower";
import { cn } from "@/lib/utils";

interface Props {
  icon?: ReactNode;
  className?: string;
  classNames?: {
    container?: string;
    title?: string;
    icon?: string;
  };
  title: string;
}

export default function SectionTitle({ icon, title, className, classNames }: Props) {
  return (
    <div
      className={cn(
        "mb-10 flex items-center gap-4",
        className,
        classNames?.container,
      )}
    >
      {icon ? (
        icon
      ) : (
        <SectionFlower
          width={25}
          className={cn("animate-spin duration-[7s]", classNames?.icon)}
        />
      )}
      <h2 className={cn("text-xl leading-none uppercase", classNames?.title)}>
        {title}
      </h2>
    </div>
  );
}
