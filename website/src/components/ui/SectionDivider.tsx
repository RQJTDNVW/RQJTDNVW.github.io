import React from "react";
import { cn } from "../../lib/cn";
import { Reveal } from "../motion/Reveal";

interface SectionDividerProps {
  className?: string;
  /** Visually stronger variant, used before the closing call to action. */
  accent?: boolean;
}

/**
 * Hairline that grows from the centre as it enters the viewport. Cheaper and
 * more quiet than a full-width rule, and it keeps the long scroll continuous
 * instead of chopping it into slabs.
 */
export const SectionDivider: React.FC<SectionDividerProps> = ({
  className,
  accent = false,
}) => (
  <div className={cn("relative", className)} aria-hidden="true">
    <Reveal
      y={0}
      scale={0.92}
      duration={900}
      className={cn("h-px w-full", accent ? "hairline-accent" : "hairline")}
    />
    <span className="pointer-events-none absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6CE7F2]/70 shadow-[0_0_10px_rgba(108,231,242,0.9)]" />
  </div>
);
