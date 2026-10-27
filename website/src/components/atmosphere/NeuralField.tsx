import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/cn";
import { prefersReducedMotion } from "../../lib/motion";

interface NeuralFieldProps {
  className?: string;
  /** Upper bound on node count at a desktop viewport. */
  maxNodes?: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  accent: boolean;
}

interface Pulse {
  a: number;
  b: number;
  t: number;
  speed: number;
}

const TAU = Math.PI * 2;

/**
 * The ambient "intelligent system" layer: a slow field of nodes, faint
 * connections and the occasional signal travelling along an edge.
 *
 * Deliberate constraints, in priority order:
 *  - Node count is derived from canvas area and hard-capped, so a large monitor
 *    does not turn into confetti.
 *  - The loop pauses when the tab is hidden and never runs at all for
 *    reduced-motion users (they get a single static frame).
 *  - Only fill/stroke calls and a handful of radial gradients per frame; no
 *    shadow blur, no filters, no DOM churn.
 *  - The canvas carries 160px of vertical bleed so it can drift with the page
 *    without ever exposing an edge.
 */
export const NeuralField: React.FC<NeuralFieldProps> = ({
  className,
  maxNodes = 46,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = prefersReducedMotion();

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let linkDistance = 150;
    let frame = 0;
    let visible = true;
    let lastTime = 0;

    const buildNodes = () => {
      const area = width * height;
      const narrow = width < 768;
      const count = Math.max(
        10,
        Math.min(maxNodes, Math.round(area / 46000))
      );

      linkDistance = narrow ? 108 : 158;

      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.13,
        vy: (Math.random() - 0.5) * 0.13,
        r: Math.random() * 1.25 + 0.65,
        alpha: Math.random() * 0.22 + 0.1,
        accent: Math.random() < 0.22,
      }));

      pulses = [];
      for (let i = 0; i < 3; i++) {
        const pulse = spawnPulse();
        if (pulse) pulses.push(pulse);
      }
    };

    const spawnPulse = (): Pulse | null => {
      if (nodes.length < 2) return null;
      for (let attempt = 0; attempt < 14; attempt++) {
        const a = Math.floor(Math.random() * nodes.length);
        const b = Math.floor(Math.random() * nodes.length);
        if (a === b) continue;
        const dx = nodes[a].x - nodes[b].x;
        const dy = nodes[a].y - nodes[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 50 && distance < linkDistance) {
          return {
            a,
            b,
            t: Math.random(),
            speed: 0.0016 + Math.random() * 0.002,
          };
        }
      }
      return null;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildNodes();
      if (reduced) render(0);
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, width, height);
      if (!nodes.length) return;

      if (dt > 0) {
        for (const node of nodes) {
          node.x += node.vx * dt;
          node.y += node.vy * dt;

          if (node.x < -40) {
            node.x = -40;
            node.vx = Math.abs(node.vx);
          } else if (node.x > width + 40) {
            node.x = width + 40;
            node.vx = -Math.abs(node.vx);
          }

          if (node.y < -40) {
            node.y = -40;
            node.vy = Math.abs(node.vy);
          } else if (node.y > height + 40) {
            node.y = height + 40;
            node.vy = -Math.abs(node.vy);
          }
        }
      }

      // --- Connections -----------------------------------------------------
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distanceSq = dx * dx + dy * dy;
          if (distanceSq > linkDistance * linkDistance) continue;

          const distance = Math.sqrt(distanceSq);
          const alpha = (1 - distance / linkDistance) * 0.085;
          if (alpha < 0.006) continue;

          ctx.strokeStyle = `rgba(108, 231, 242, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // --- Nodes -----------------------------------------------------------
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, TAU);
        ctx.fillStyle = node.accent
          ? `rgba(108, 231, 242, ${node.alpha + 0.12})`
          : `rgba(124, 165, 200, ${node.alpha * 0.85})`;
        ctx.fill();
      }

      // --- Travelling signals ----------------------------------------------
      for (const pulse of pulses) {
        const a = nodes[pulse.a];
        const b = nodes[pulse.b];
        if (!a || !b) continue;

        if (dt > 0) {
          pulse.t += pulse.speed * dt;
          if (pulse.t > 1) {
            const next = spawnPulse();
            if (next) Object.assign(pulse, next);
            else pulse.t = 0;
            continue;
          }
        }

        const px = a.x + (b.x - a.x) * pulse.t;
        const py = a.y + (b.y - a.y) * pulse.t;

        const glow = ctx.createRadialGradient(px, py, 0, px, py, 18);
        glow.addColorStop(0, "rgba(155, 243, 250, 0.34)");
        glow.addColorStop(1, "rgba(108, 231, 242, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, 18, 0, TAU);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, 1.7, 0, TAU);
        ctx.fillStyle = "rgba(200, 250, 255, 0.9)";
        ctx.fill();
      }
    };

    const render = (dt: number) => draw(dt);

    const loop = (time: number) => {
      frame = requestAnimationFrame(loop);
      if (!visible) {
        lastTime = 0;
        return;
      }
      const dt = lastTime ? Math.min((time - lastTime) / 16.667, 2.5) : 1;
      lastTime = time;
      render(dt);
    };

    resize();

    if (!reduced) {
      frame = requestAnimationFrame(loop);
    }

    const handleVisibility = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(resize)
        : null;
    observer?.observe(canvas);
    window.addEventListener("resize", resize);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", resize);
      observer?.disconnect();
    };
  }, [maxNodes]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute left-0 h-[calc(100%+160px)] w-full"
        style={{
          top: "-80px",
          // Barely-there parallax: 46px across the entire page scroll.
          transform:
            "translate3d(0, calc(var(--scroll-progress, 0) * -46px), 0)",
        }}
      />
    </div>
  );
};
