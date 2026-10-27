import React from "react";
import { cn } from "../../lib/cn";
import { Reveal } from "../motion/Reveal";

interface SectionHeadingProps {
  /** Two-digit section index, e.g. "02". */
  index: string;
  /** Short uppercase label, e.g. "CAPABILITIES". */
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "split";
  className?: string;
}

/**
 * Section heading with the site's recurring marker: index, hairline tick, then
 * the uppercase label. The tick draws in, which gives every section the same
 * small sign of life without animating the heading itself.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  index,
  label,
  title,
  description,
  align = "left",
  className,
}) => {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "relative",
        align === "split" &&
          "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className={cn(centered && "flex flex-col items-center text-center")}>
        <Reveal y={12} className="flex items-center gap-3">
          <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-[#6CE7F2]">
            {index}
          </span>
          <span className="h-px w-7 bg-gradient-to-r from-[#6CE7F2]/60 to-transparent" />
          <span className="eyebrow">{label}</span>
        </Reveal>

        <Reveal
          as="h2"
          delay={70}
          y={20}
          className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          {title}
        </Reveal>
      </div>

      {description && (
        <Reveal
          as="p"
          delay={140}
          y={18}
          className={cn(
            "max-w-md text-xs leading-relaxed text-[#94A3B8] font-mono sm:text-sm",
            align === "split" && "md:pb-1 md:text-right"
          )}
        >
          {description}
        </Reveal>
      )}
    </div>
  );
};
