import React, { useEffect, useRef } from "react";
import { observeReveal } from "../../lib/motion";
import { cn } from "../../lib/cn";

export interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  /** Element to render. Defaults to a div so the wrapper stays out of the way. */
  as?: React.ElementType;
  /** Stagger in milliseconds. Keep steps between 60 and 120. */
  delay?: number;
  /** Vertical travel in px. 12–28 keeps the motion restrained. */
  y?: number;
  /** Horizontal travel in px, for lateral reveals. */
  x?: number;
  scale?: number;
  duration?: number;
}

/**
 * One-shot scroll reveal.
 *
 * The element is visible by default; the hidden state only applies once
 * `.motion-ready` exists on <html>, which means content survives a JS failure
 * and respects `prefers-reduced-motion` without any branching here.
 */
export const Reveal: React.FC<RevealProps> = ({
  as: Tag = "div",
  delay = 0,
  y = 22,
  x = 0,
  scale = 1,
  duration,
  className,
  style,
  children,
  ...rest
}) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => observeReveal(ref.current), []);

  const revealStyle = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-y": `${y}px`,
    "--reveal-x": `${x}px`,
    "--reveal-scale": scale,
    ...(duration ? { "--reveal-duration": `${duration}ms` } : null),
    ...style,
  } as React.CSSProperties;

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={cn(className)}
      style={revealStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
};
