import React from "react";
import { useGlobalScrollProgress } from "../../hooks/useMotion";

/**
 * The site-wide atmosphere stack.
 *
 * Seven cheap layers, back to front: tonal base, three soft light sources that
 * drift on independent cycles, an architectural grid, film grain and an edge
 * vignette. Everything is a gradient — there is not a single `filter: blur()`
 * on a large surface anywhere, which is what kept the previous version both
 * expensive and visually flat.
 */
export const Atmosphere: React.FC = () => {
  useGlobalScrollProgress();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      {/* Base tonal shift. Content never sits on a single flat black. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0A121C_0%,#070B12_34%,#08101A_68%,#060A10_100%)]" />

      {/* Light sources. They drift on 34s and 42s cycles so they never
          visibly loop together. */}
      <div
        className="absolute inset-0"
        style={{
          transform:
            "translate3d(0, calc(var(--scroll-progress, 0) * -3.5%), 0)",
        }}
      >
        <div
          className="aura animate-atmo-drift absolute -top-[20%] left-[2%] h-[72vh] w-[78vw]"
          style={{ "--aura-color": "rgb(108 231 242 / 0.075)" } as React.CSSProperties}
        />
        <div
          className="aura animate-atmo-drift-alt absolute top-[18%] right-[-10%] h-[64vh] w-[58vw]"
          style={{ "--aura-color": "rgb(62 123 199 / 0.10)" } as React.CSSProperties}
        />
        <div
          className="aura animate-atmo-drift absolute bottom-[-6%] left-[24%] h-[52vh] w-[62vw]"
          style={
            {
              "--aura-color": "rgb(108 231 242 / 0.05)",
              animationDelay: "-14s",
            } as React.CSSProperties
          }
        />
      </div>

      {/* Grid — shifts a few hundred px across the full page scroll. */}
      <div
        className="atmo-grid absolute inset-0"
        style={{
          backgroundPositionY: "calc(var(--scroll-progress, 0) * -260px)",
        }}
      />

      <div className="atmo-grain absolute inset-0" />
      <div className="atmo-vignette absolute inset-0" />
    </div>
  );
};
