import React from "react";

interface TechPillProps {
  name: string;
}

/**
 * A single technology chip.
 *
 * Hover is pure CSS on purpose: it costs no React renders, cannot desync from
 * the pointer, and still works if JS fails. The `tech-pill` marker class is
 * what lets the parent category card light up via `:has()` (see index.css).
 */
export const TechPill: React.FC<TechPillProps> = ({ name }) => (
  <span className="tech-pill group inline-flex cursor-default items-center gap-2 rounded-lg border border-white/[0.08] bg-[#0D141C] px-3.5 py-1.5 font-mono text-xs text-[#94A3B8] transition-all duration-300 ease-soft hover:-translate-y-0.5 hover:border-[#6CE7F2]/65 hover:bg-[#6CE7F2]/[0.13] hover:text-white hover:shadow-[0_0_18px_-5px_rgba(108,231,242,0.65)] sm:px-4 sm:py-2 sm:text-sm">
    <span className="h-1 w-1 shrink-0 rounded-full bg-white/25 transition-colors duration-300 group-hover:bg-[#6CE7F2] group-hover:shadow-[0_0_6px_#6CE7F2]" />
    <span>{name}</span>
  </span>
);
