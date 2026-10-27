import React, { useCallback, useEffect, useRef, useState } from "react";
import { Maximize2, X } from "lucide-react";
import { ProjectImageSet } from "../data/portfolioData";
import { Reveal } from "./motion/Reveal";
import { useViewportProgress } from "../hooks/useMotion";
import { cn } from "../lib/cn";

interface ProjectImageCardProps {
  images: ProjectImageSet;
  projectNumber: string;
  projectTitle: string;
}

interface LayerSpec {
  id: keyof ProjectImageSet;
  role: string;
  label: string;
  /** Transform at unpack = 0 (stacked) and unpack = 1 (separated). */
  from: { x: number; y: number; rotate: number; scale: number };
  to: { x: number; y: number; rotate: number; scale: number };
  zIndex: number;
}

/**
 * Offsets are percentages of each card's own box. The `to` values open the four
 * screenshots into a tight 2x2 collage with a few pixels of overlap, so every
 * artifact stays legible at rest — the previous values kept all four stacked on
 * top of each other.
 */
const LAYERS: LayerSpec[] = [
  {
    id: "cover",
    role: "01 — PROJECT",
    label: "Overview",
    from: { x: 14, y: -10, rotate: -3, scale: 0.9 },
    to: { x: -48, y: -47, rotate: 0, scale: 1 },
    zIndex: 4,
  },
  {
    id: "website",
    role: "02 — APPLICATION",
    label: "Interface",
    from: { x: -12, y: -6, rotate: 2.5, scale: 0.88 },
    to: { x: 48, y: -47, rotate: 0, scale: 1 },
    zIndex: 3,
  },
  {
    id: "vscode",
    role: "03 — DEVELOPMENT",
    label: "Implementation",
    from: { x: 12, y: 8, rotate: -1.5, scale: 0.86 },
    to: { x: -48, y: 47, rotate: 0, scale: 1 },
    zIndex: 2,
  },
  {
    id: "terminal",
    role: "04 — EXECUTION",
    label: "Output",
    from: { x: -14, y: 12, rotate: 1.5, scale: 0.84 },
    to: { x: 48, y: 47, rotate: 0, scale: 1 },
    zIndex: 1,
  },
];

const PHASE_LABELS = [
  "Layered Project Artifact",
  "Unpacking System Architecture",
  "Full Architecture Breakdown",
];

/**
 * Interpolated transform expressed in CSS custom properties.
 *
 * Everything is driven by `--u` (0 = stacked, 1 = fully separated), which the
 * parent writes directly to the DOM. Using calc() against a variable means the
 * browser can composite the whole unpack sequence without React re-rendering
 * once per scroll frame.
 */
const layerTransform = (layer: LayerSpec): string => {
  const { from, to } = layer;
  return [
    `translate3d(calc((1 - var(--u, 0)) * ${from.x}% + var(--u, 0) * ${to.x}%), calc((1 - var(--u, 0)) * ${from.y}% + var(--u, 0) * ${to.y}%), 0)`,
    `rotate(calc((1 - var(--u, 0)) * ${from.rotate}deg))`,
    `scale(calc(${from.scale} + var(--u, 0) * ${(to.scale - from.scale).toFixed(3)}))`,
  ].join(" ");
};

export const ProjectImageCard: React.FC<ProjectImageCardProps> = ({
  images,
  projectNumber,
  projectTitle,
}) => {
  const compositionRef = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState(0);
  const [activeLayer, setActiveLayer] = useState<LayerSpec | null>(null);

  const handleProgress = useCallback((progress: number) => {
    // Hold briefly, then unpack across the middle of the card's journey and
    // settle. No re-packing on exit: the composition should read as a finished
    // artifact by the time the next case study arrives.
    const raw =
      progress <= 0.1 ? 0 : progress >= 0.62 ? 1 : (progress - 0.1) / 0.52;

    // Smoothstep — removes the mechanical start/stop at the phase boundaries.
    const eased = raw * raw * (3 - 2 * raw);

    compositionRef.current?.style.setProperty("--u", eased.toFixed(4));

    const next = eased < 0.35 ? 0 : eased < 0.85 ? 1 : 2;
    setPhase((current) => (current === next ? current : next));
  }, []);

  const progressRef = useViewportProgress<HTMLDivElement>(handleProgress, {
    start: 0.96,
    end: 0.44,
  });

  // Close the lightbox on Escape, which the button label already promises.
  useEffect(() => {
    if (!activeLayer) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveLayer(null);
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [activeLayer]);

  return (
    <div ref={progressRef} className="relative w-full">
      {/* Status row */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6CE7F2] shadow-[0_0_8px_#6CE7F2]" />
          <span className="font-mono text-xs uppercase tracking-wider text-[#94A3B8]">
            {PHASE_LABELS[phase]}
          </span>
        </div>
        <div className="hidden font-mono text-[11px] text-[#64748B] sm:block">
          Scroll to explore layers
        </div>
      </div>

      {/* Desktop composition */}
      <div
        ref={compositionRef}
        className="relative hidden aspect-[16/12] max-h-[560px] w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D141C]/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_50px_100px_-50px_rgba(0,0,0,1)] lg:block"
      >
        {/* Edge light that strengthens as the composition opens up.
            Opacity animation rather than a calc() inside rgba() — better
            supported and cheaper to composite. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#6CE7F2] to-transparent"
          style={{ opacity: "calc(0.16 + var(--u, 0) * 0.5)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_40%,rgba(108,231,242,0.30),transparent_70%)]"
          style={{ opacity: "calc(0.05 + var(--u, 0) * 0.16)" }}
        />

        <div className="relative flex h-full w-full items-center justify-center">
          {LAYERS.map((layer) => (
            <button
              type="button"
              key={layer.id}
              onClick={() => setActiveLayer(layer)}
              aria-label={`Open ${layer.label} screenshot of ${projectTitle}`}
              className="group absolute w-[44%] cursor-pointer text-left focus:outline-none"
              style={{
                transform: layerTransform(layer),
                zIndex: layer.zIndex,
                opacity: "calc(0.45 + var(--u, 0) * 0.55)",
                willChange: "transform, opacity",
              }}
            >
              <div className="relative aspect-[5/4] w-full overflow-hidden rounded-xl border border-white/[0.12] bg-[#070B12] shadow-[0_24px_50px_-20px_rgba(0,0,0,0.95)] transition-[border-color,box-shadow,transform] duration-400 ease-soft group-hover:-translate-y-0.5 group-hover:border-[#6CE7F2]/55 group-hover:shadow-[0_30px_60px_-22px_rgba(0,0,0,1),0_0_34px_-10px_rgba(108,231,242,0.45)] group-focus-visible:border-[#6CE7F2]">
                <img
                  src={images[layer.id]}
                  alt={`${projectTitle} — ${layer.label}`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 ease-soft group-hover:scale-[1.03]"
                />

                <div className="pointer-events-none absolute inset-x-2.5 top-2.5 flex items-center justify-between">
                  <span className="rounded-full border border-[#6CE7F2]/30 bg-[#070B12]/85 px-2 py-0.5 font-mono text-[10px] text-[#6CE7F2] backdrop-blur-sm">
                    {layer.role}
                  </span>
                  <span className="rounded-full bg-[#070B12]/80 p-1 text-[#94A3B8] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Maximize2 className="h-3 w-3 text-[#6CE7F2]" />
                  </span>
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070B12]/85 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </button>
          ))}
        </div>

        {/* Composition footer marker */}
        <span className="pointer-events-none absolute bottom-3 left-4 font-mono text-[10px] tracking-[0.2em] text-[#334155]">
          {projectNumber} / FOUR LAYERS
        </span>
      </div>

      {/* Mobile / tablet grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {LAYERS.map((layer, index) => (
          <Reveal key={layer.id} delay={index * 80} y={20}>
            <button
              type="button"
              onClick={() => setActiveLayer(layer)}
              aria-label={`Open ${layer.label} screenshot of ${projectTitle}`}
              className="group relative w-full overflow-hidden rounded-xl border border-white/[0.1] bg-[#0D141C] text-left shadow-[0_20px_40px_-24px_rgba(0,0,0,0.9)] transition-all duration-300 ease-soft hover:border-[#6CE7F2]/40 focus:outline-none focus-visible:border-[#6CE7F2]"
            >
              <div className="aspect-[5/4] w-full overflow-hidden">
                <img
                  src={images[layer.id]}
                  alt={`${projectTitle} — ${layer.label}`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-400 ease-soft group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex items-center justify-between border-t border-white/[0.06] bg-[#070B12]/90 p-3">
                <span className="font-mono text-xs text-[#6CE7F2]">
                  {layer.role}
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px] text-[#64748B]">
                  <span>View</span>
                  <Maximize2 className="h-3 w-3" />
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      {activeLayer && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${projectTitle} — ${activeLayer.label}`}
          onClick={() => setActiveLayer(null)}
          className="fixed inset-0 z-50 flex animate-fade-in cursor-zoom-out items-center justify-center bg-black/95 p-4 backdrop-blur-md sm:p-8"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className={cn(
              "relative w-full max-w-5xl rounded-2xl border border-white/20 bg-[#0D141C] p-2 shadow-2xl sm:p-4",
              "cursor-default"
            )}
          >
            <div className="mb-3 flex items-center justify-between border-b border-white/10 px-2 pb-3">
              <div className="flex items-center gap-3">
                <span className="rounded border border-[#6CE7F2]/30 bg-[#6CE7F2]/10 px-2 py-0.5 font-mono text-xs text-[#6CE7F2]">
                  {activeLayer.role}
                </span>
                <span className="font-mono text-sm font-medium text-white">
                  {projectTitle}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveLayer(null)}
                className="flex items-center gap-1.5 rounded bg-white/10 px-3 py-1 font-mono text-xs text-white transition-colors hover:bg-white/20"
                aria-label="Close preview"
              >
                <span>Close (ESC)</span>
                <X className="h-3 w-3" />
              </button>
            </div>
            <div className="relative flex max-h-[80vh] items-center justify-center overflow-hidden rounded-xl bg-[#070B12]">
              <img
                src={images[activeLayer.id]}
                alt={`${projectTitle} — ${activeLayer.label}`}
                className="h-auto max-h-[78vh] w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
