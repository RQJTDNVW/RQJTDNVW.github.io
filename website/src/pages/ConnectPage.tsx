import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  ArrowUpRight,
  Copy,
  Check,
  Network,
  ArrowRight,
  Send,
} from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { Reveal } from "../components/motion/Reveal";
import { SectionAura } from "../components/atmosphere/SectionAura";
import { useProgressOnElement } from "../hooks/useMotion";
import { clamp } from "../lib/motion";
import { cn } from "../lib/cn";

/**
 * Node graph coordinates, in the 0..100 space shared by the SVG and the
 * absolutely-positioned labels. Because both use the same percentages, the
 * lines always terminate exactly at the nodes at every aspect ratio.
 */
const HUB = { x: 50, y: 50 };

const SATELLITES = [
  { label: "AI / ML", x: 18, y: 15 },
  { label: "PYTHON", x: 82, y: 15 },
  { label: "PROJECTS", x: 18, y: 85 },
  { label: "BUILD", x: 82, y: 85 },
];

const LINKS = [
  { d: "M50 50 L18 15", factor: 2.5, width: 1.3, pulse: true },
  { d: "M50 50 L82 15", factor: 2.5, width: 1.3, pulse: true },
  { d: "M50 50 L18 85", factor: 2.5, width: 1.3, pulse: true },
  { d: "M50 50 L82 85", factor: 2.5, width: 1.3, pulse: true },
  // Arcs stop at the edges of the node pills rather than their centres, so no
  // stub is left floating behind the labels.
  { d: "M23 15 Q50 4 77 15", factor: 1.35, width: 0.9, pulse: false },
  { d: "M23 85 Q50 96 77 85", factor: 1.35, width: 0.9, pulse: false },
  { d: "M18 18 Q6 50 18 82", factor: 1.15, width: 0.9, pulse: false },
  { d: "M82 18 Q94 50 82 82", factor: 1.15, width: 0.9, pulse: false },
];

const PHASE_LABELS = [
  "Phase 1: Center Identified",
  "Phase 2: Nodes Activated",
  "Phase 3: Converging",
  "Phase 4: Connected",
];

/** Draws a path from 0 to full length as `--net` climbs from 0 to 1. */
const drawOffset = (factor: number) =>
  `calc(100 - clamp(0, calc(var(--net, 0) * ${factor * 100}), 100))`;

const PROFILE_CARDS = [
  {
    key: "github",
    href: PERSONAL_INFO.github,
    icon: Github,
    label: "GITHUB",
    handle: PERSONAL_INFO.githubDisplay,
    description:
      "Explore my AI/ML projects, experiments, and development work.",
    meta: "Source Code & Commits",
    action: "Explore my work",
    aria: "Visit Joel Binu's GitHub profile",
  },
  {
    key: "linkedin",
    href: PERSONAL_INFO.linkedin,
    icon: Linkedin,
    label: "LINKEDIN",
    handle: PERSONAL_INFO.linkedinDisplay,
    description:
      "Connect with me professionally and follow my career journey.",
    meta: "Professional Network",
    action: "Connect professionally",
    aria: "Visit Joel Binu's LinkedIn profile",
  },
];

export const ConnectPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [phase, setPhase] = useState(0);
  const networkRef = useRef<HTMLDivElement | null>(null);

  useProgressOnElement<HTMLDivElement>(
    networkRef,
    (progress) => {
      // The topology assembles over the middle band of the panel's travel, then
      // holds in its fully-connected state.
      const net = clamp((progress - 0.04) / 0.6);

      networkRef.current?.style.setProperty("--net", net.toFixed(4));

      const next = net < 0.2 ? 0 : net < 0.55 ? 1 : net < 0.92 ? 2 : 3;
      setPhase((current) => (current === next ? current : next));
    },
    { start: 0.98, end: 0.38 }
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // Clipboard is unavailable over http or without permission — the address
      // is still selectable, so failing silently is the right call.
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden pb-20 pt-24 text-[#F1F5F9]">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        {/* ================================================================
            HERO
            ================================================================ */}
        <section className="relative pb-16 pt-10 text-center sm:pb-20 sm:pt-16">
          <SectionAura
            className="left-1/2 top-[-30%] h-[60vh] w-[80vw] -translate-x-1/2"
            color="rgb(108 231 242 / 0.085)"
            drift="a"
          />

          <div className="relative mx-auto max-w-3xl space-y-6">
            <Reveal y={14}>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#6CE7F2]/20 bg-[#6CE7F2]/10 px-3 py-1 font-mono text-xs text-[#6CE7F2]">
                <Network className="h-3.5 w-3.5" />
                <span>LET&rsquo;S CONNECT</span>
              </div>
            </Reveal>

            <Reveal
              as="h1"
              delay={80}
              y={24}
              className="text-edge-light text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl"
            >
              Let&rsquo;s build something intelligent.
            </Reveal>

            <Reveal
              as="p"
              delay={170}
              y={20}
              className="mx-auto max-w-2xl text-base font-light leading-relaxed text-[#94A3B8] sm:text-xl"
            >
              I&rsquo;m always interested in connecting with people working on
              interesting ideas, AI/ML projects, software development, and
              opportunities to build practical intelligent systems.
            </Reveal>
          </div>
        </section>

        {/* ================================================================
            CONNECTION TOPOLOGY
            ================================================================ */}
        <section className="relative py-4">
          <Reveal y={28} duration={900}>
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0D141C]/60 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_50px_100px_-60px_rgba(0,0,0,1)] backdrop-blur-md sm:p-8">
              <SectionAura
                className="left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2"
                color="rgb(108 231 242 / 0.07)"
              />

              <div
                ref={networkRef}
                className="relative mx-auto aspect-[4/3] w-full max-w-2xl sm:aspect-[16/10]"
              >
                {/* Decorative topology */}
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full overflow-visible"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {LINKS.map((link) => (
                    <g key={link.d}>
                      <path
                        d={link.d}
                        pathLength={100}
                        strokeDasharray="100"
                        strokeWidth={link.width}
                        vectorEffect="non-scaling-stroke"
                        stroke="rgba(108,231,242,0.34)"
                        fill="none"
                        style={{ strokeDashoffset: drawOffset(link.factor) }}
                      />
                      {link.pulse && (
                        <path
                          d={link.d}
                          pathLength={100}
                          strokeDasharray="1.4 8.6"
                          strokeWidth={1.6}
                          vectorEffect="non-scaling-stroke"
                          stroke="rgba(155,243,250,0.9)"
                          fill="none"
                          className="animate-dash-travel"
                          style={{
                            opacity:
                              "calc(clamp(0, calc(var(--net, 0) * 2 - 0.9), 1) * 0.9)",
                          }}
                        />
                      )}
                    </g>
                  ))}
                </svg>

                {/* Central hub */}
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
                >
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2.5 rounded-2xl border-2 border-[#6CE7F2] bg-[#070B12] px-4 py-2.5 shadow-[0_0_30px_-6px_rgba(108,231,242,0.55)] sm:px-5">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inset-0 animate-pulse-soft rounded-full bg-[#6CE7F2]/50" />
                        <span className="relative h-2.5 w-2.5 rounded-full bg-[#6CE7F2]" />
                      </span>
                      <span className="font-mono text-xs font-bold tracking-wider text-white sm:text-sm">
                        {PERSONAL_INFO.name}
                      </span>
                    </div>
                    <span className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6CE7F2]">
                      CENTRAL HUB
                    </span>
                  </div>
                </div>

                {/* Satellite nodes */}
                {SATELLITES.map((node) => (
                  <div
                    key={node.label}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                    <div
                      className="transition-transform duration-500"
                      style={{
                        // Satellites start faintly present ("isolated nodes")
                        // and only reach full strength once linked.
                        opacity:
                          "calc(0.32 + clamp(0, calc(var(--net, 0) * 4), 1) * 0.68)",
                        transform:
                          "scale(calc(0.9 + clamp(0, calc(var(--net, 0) * 4), 1) * 0.1))",
                      }}
                    >
                      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#111A24] px-3 py-1.5 shadow-md transition-colors duration-300 hover:border-[#6CE7F2]/50">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#6CE7F2]/70" />
                        <span className="font-mono text-[11px] text-[#94A3B8] sm:text-xs">
                          {node.label}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Micro markers that fill out the constellation late */}
                {[
                  { x: 4, y: 50 },
                  { x: 96, y: 50 },
                  { x: 50, y: 4 },
                  { x: 50, y: 96 },
                ].map((dot) => (
                  <span
                    key={`${dot.x}-${dot.y}`}
                    aria-hidden="true"
                    className="absolute h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6CE7F2]"
                    style={{
                      left: `${dot.x}%`,
                      top: `${dot.y}%`,
                      opacity: "clamp(0, calc(var(--net, 0) * 1.5 - 0.5), 1)",
                      boxShadow: "0 0 8px rgba(108,231,242,0.8)",
                    }}
                  />
                ))}
              </div>

              <div className="relative mt-2 flex items-center justify-between border-t border-white/[0.06] pt-4 font-mono text-[11px] text-[#64748B]">
                <span>Exploration → Discovery → Connection</span>
                <span className="text-[#6CE7F2]">{PHASE_LABELS[phase]}</span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ================================================================
            DIRECT CHANNEL
            ================================================================ */}
        <section className="relative mx-auto mt-24 max-w-2xl space-y-6 text-center sm:mt-28">
          <SectionAura
            className="left-1/2 top-1/2 h-[80%] w-[90%] -translate-x-1/2 -translate-y-1/2"
            color="rgb(62 123 199 / 0.06)"
          />

          <Reveal y={14} className="eyebrow">
            Direct Channel
          </Reveal>

          <Reveal
            as="h2"
            delay={70}
            y={20}
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Email Me
          </Reveal>

          <Reveal y={24} delay={130}>
            <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D141C]/85 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-400 ease-soft hover:border-[#6CE7F2]/40 hover:shadow-[0_36px_80px_-46px_rgba(0,0,0,1),0_0_50px_-30px_rgba(108,231,242,0.6)] sm:p-8">
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-soft group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(110% 80% at 50% 0%, rgba(108,231,242,0.09), transparent 62%)",
                }}
              />

              <div className="relative select-all break-all text-left font-mono text-base font-medium text-white sm:text-xl">
                {PERSONAL_INFO.email}
              </div>

              <div className="relative flex flex-wrap items-center justify-center gap-3 pt-5">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  aria-label="Email Joel Binu"
                  className="group/mail inline-flex items-center gap-2 rounded-xl bg-[#6CE7F2] px-6 py-3 font-mono text-xs font-semibold tracking-wide text-[#070B12] shadow-[0_12px_40px_-16px_rgba(108,231,242,0.8)] transition-all duration-300 ease-soft hover:-translate-y-0.5 hover:bg-[#8EF0F9] sm:text-sm"
                >
                  <Send className="h-4 w-4" />
                  <span>Send an email</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-soft group-hover/mail:-translate-y-0.5 group-hover/mail:translate-x-0.5" />
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-[#111A24] px-5 py-3 font-mono text-xs text-white transition-all duration-300 ease-soft hover:-translate-y-0.5 hover:border-[#6CE7F2]/40 hover:text-[#6CE7F2] sm:text-sm"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-[#6CE7F2]" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span>{copied ? "Copied to Clipboard" : "Copy Email"}</span>
                </button>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ================================================================
            PROFESSIONAL PROFILES
            ================================================================ */}
        <section className="relative mt-24 space-y-8 sm:mt-28">
          <SectionAura
            className="right-[-10%] top-[20%] h-[46vh] w-[46vw]"
            color="rgb(108 231 242 / 0.05)"
            drift="b"
          />

          <div className="space-y-2 text-center">
            <Reveal y={14} className="eyebrow">
              Professional Profiles
            </Reveal>
            <Reveal
              as="h2"
              delay={70}
              y={20}
              className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              Connect Across Platforms
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
            {PROFILE_CARDS.map((card, index) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.key} delay={index * 90} y={26}>
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={card.aria}
                    className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0D141C]/85 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-400 ease-soft hover:-translate-y-1 hover:border-[#6CE7F2]/45 hover:shadow-[0_40px_90px_-46px_rgba(0,0,0,1),0_0_54px_-28px_rgba(108,231,242,0.65)] sm:p-9">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-soft group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(120% 90% at 0% 0%, rgba(108,231,242,0.09), transparent 60%)",
                      }}
                    />

                    <div className="relative space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#111A24] text-[#6CE7F2] transition-transform duration-400 ease-soft group-hover:scale-105">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.04] text-[#94A3B8] transition-colors duration-300 group-hover:bg-[#6CE7F2]/10 group-hover:text-[#6CE7F2]">
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#6CE7F2]">
                          {card.label}
                        </span>
                        <div className="break-all font-mono text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#6CE7F2] sm:text-2xl">
                          {card.handle}
                        </div>
                        <p className="pt-1 text-sm font-light leading-relaxed text-[#94A3B8]">
                          {card.description}
                        </p>
                      </div>
                    </div>

                    <div className="relative mt-8 flex items-center justify-between border-t border-white/[0.06] pt-6 font-mono text-xs text-[#64748B]">
                      <span>{card.meta}</span>
                      <span className="flex items-center gap-1 text-white transition-colors duration-300 group-hover:text-[#6CE7F2]">
                        <span>{card.action}</span>
                        <ArrowRight className="h-3 w-3 transition-transform duration-300 ease-soft group-hover:translate-x-1" />
                      </span>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ================================================================
            FINAL CTA
            ================================================================ */}
        <section className="relative mt-24 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0D141C]/75 px-6 py-14 text-center sm:mt-28 sm:px-12 sm:py-20">
          <SectionAura
            className="left-1/2 top-0 h-[70vh] w-[80vw] -translate-x-1/2 -translate-y-1/3"
            color="rgb(108 231 242 / 0.1)"
            drift="a"
          />

          <div className="relative mx-auto max-w-2xl space-y-6">
            <Reveal y={14} className="eyebrow">
              Have an idea?
            </Reveal>

            <Reveal
              as="h2"
              delay={70}
              y={22}
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            >
              Let&rsquo;s build something intelligent.
            </Reveal>

            <Reveal
              as="p"
              delay={140}
              y={18}
              className="text-base font-light leading-relaxed text-[#94A3B8] sm:text-lg"
            >
              Whether you&rsquo;re exploring an AI/ML idea, building a software
              project, or simply want to connect, feel free to reach out.
            </Reveal>

            <Reveal
              delay={200}
              y={16}
              className={cn(
                "flex flex-wrap items-center justify-center gap-4 pt-4"
              )}
            >
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="group inline-flex items-center gap-3 rounded-xl bg-[#6CE7F2] px-8 py-4 font-mono text-base font-semibold tracking-wide text-[#070B12] shadow-[0_14px_50px_-16px_rgba(108,231,242,0.8)] transition-all duration-300 ease-soft hover:-translate-y-0.5 hover:bg-[#8EF0F9] hover:shadow-[0_20px_58px_-16px_rgba(108,231,242,0.9)]"
              >
                <span>Get in Touch</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-soft group-hover:translate-x-1" />
              </a>

              <Link
                to="/projects"
                className="group inline-flex items-center gap-2.5 rounded-xl border border-white/[0.12] bg-[#111A24] px-6 py-4 font-mono text-sm text-white transition-all duration-300 ease-soft hover:-translate-y-0.5 hover:border-[#6CE7F2]/40"
              >
                <span>View Projects</span>
                <ArrowUpRight className="h-4 w-4 text-[#6CE7F2] transition-transform duration-300 ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
        </section>
      </div>
    </div>
  );
};
