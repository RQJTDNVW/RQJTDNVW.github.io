import React from "react";
import { cn } from "../../lib/cn";

interface SectionAuraProps {
  /** Positioning and sizing. Must include an absolute/fixed position. */
  className?: string;
  /** Any CSS colour; alpha should stay at or below ~0.10. */
  color?: string;
  drift?: "a" | "b" | false;
}

/**
 * A single soft light source. Used to give each section its own atmosphere
 * without changing the base palette — this is what breaks the page into
 * distinct zones rather than one uniform field.
 */
export const SectionAura: React.FC<SectionAuraProps> = ({
  className,
  color = "rgb(108 231 242 / 0.07)",
  drift = false,
}) => (
  <div
    aria-hidden="true"
    className={cn(
      "aura pointer-events-none absolute",
      drift === "a" && "animate-atmo-drift",
      drift === "b" && "animate-atmo-drift-alt",
      className
    )}
    style={{ "--aura-color": color } as React.CSSProperties}
  />
);
