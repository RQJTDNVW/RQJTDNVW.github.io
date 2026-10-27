import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Eye,
  BarChart3,
  Cpu,
  Github,
  Linkedin,
  Sparkles,
  Database,
  Layers,
  Activity,
} from "lucide-react";
import {
  PERSONAL_INFO,
  CAPABILITIES,
  TECH_CATEGORIES,
} from "../data/portfolioData";
import { TechPill } from "../components/TechPill";
import { Reveal } from "../components/motion/Reveal";
import { SectionAura } from "../components/atmosphere/SectionAura";
import { SectionHeading } from "../components/ui/SectionHeading";
import { SectionDivider } from "../components/ui/SectionDivider";
import { cn } from "../lib/cn";

/** Stagger helper for the load-time hero entrance. */
const enter = (delay: number): React.CSSProperties =>
  ({ "--enter-delay": `${delay}ms` } as React.CSSProperties);

const CAPABILITY_ICONS = { Brain, Eye, BarChart3, Cpu } as const;

const PIPELINE_STAGES = [
  { stage: "DATA", desc: "Raw transactional & tabular signals", icon: Database },
  { stage: "MODEL", desc: "Supervised & unsupervised learning", icon: Brain },
  {
    stage: "INTELLIGENCE",
    desc: "Inference, vector search & rules",
    icon: Sparkles,
  },
  {
    stage: "APPLICATION",
    desc: "Production APIs, UIs & dashboards",
    icon: Layers,
  },
];

const CAPABILITY_BADGES: Record<string, [idle: string, active: string]> = {
  ml: ["Supervised & Unsupervised", "Nodes Connected"],
  cv: ["Vision Pipelines", "Spatial Grid Active"],
  data: ["Feature Engineering", "Distributions Mapped"],
  apps: ["APIs & Dashboards", "Endpoints Ready"],
};

export const ProfilePage: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden pb-16 pt-24 text-[#F1F5F9]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* ================================================================
            HERO
            ================================================================ */}
        <section className="relative flex flex-col items-center justify-between gap-14 pb-14 pt-8 sm:pt-14 lg:min-h-[76vh] lg:flex-row lg:gap-16 lg:pb-20">
          <SectionAura
            className="-top-24 left-[-12%] h-[58vh] w-[70vw]"
            color="rgb(108 231 242 / 0.085)"
          />
          <SectionAura
            className="right-[-8%] top-[16%] h-[46vh] w-[42vw]"
            color="rgb(62 123 199 / 0.075)"
            drift="b"
          />

          {/* Text column. The pointer offset moves it against the card so the
              two planes separate slightly on desktop. */}
          <div
            className="relative max-w-2xl space-y-8 text-left"
            style={{
              transform:
                "translate3d(calc(var(--px, 0) * -5px), calc(var(--py, 0) * -3px), 0)",
            }}
          >
            <div data-enter="true" style={enter(0)}>
              <div className="inline-flex max-w-full flex-wrap items-center gap-x-2.5 gap-y-1 rounded-full border border-white/[0.08] bg-[#0D141C]/80 px-3.5 py-1.5 font-mono text-[11px] text-[#94A3B8] backdrop-blur-sm sm:text-xs">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inset-0 animate-pulse-soft rounded-full bg-[#6CE7F2]/45" />
                  <span className="relative h-2 w-2 rounded-full bg-[#6CE7F2]" />
                </span>
                <span className="whitespace-nowrap">
                  {PERSONAL_INFO.status}
                </span>
                <span className="hidden text-[#334155] sm:inline">/</span>
                <span className="whitespace-nowrap">
                  {PERSONAL_INFO.location}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h1
                data-enter="true"
                style={enter(90)}
                className="text-edge-light text-4xl font-extrabold leading-[1.03] tracking-tight text-white sm:text-6xl md:text-7xl"
              >
                {PERSONAL_INFO.name}
              </h1>

              <div
                data-enter="true"
                style={enter(180)}
                className="flex items-center gap-3"
              >
                <span className="h-px w-10 shrink-0 bg-gradient-to-r from-[#6CE7F2]/70 to-transparent" />
                <span className="font-mono text-base font-medium tracking-wide text-[#6CE7F2] sm:text-2xl">
                  {PERSONAL_INFO.title}
                </span>
              </div>
            </div>

            <p
              data-enter="true"
              style={enter(280)}
              className="max-w-xl text-lg font-light leading-relaxed text-[#94A3B8] sm:text-xl"
            >
              {PERSONAL_INFO.tagline}
            </p>

            <div
              data-enter="true"
              style={enter(390)}
              className="flex w-full flex-wrap items-center gap-3 pt-2 sm:w-auto sm:gap-4"
            >
              <Link
                to="/projects"
                className="group relative inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#6CE7F2] px-6 py-3.5 text-sm font-semibold tracking-wide text-[#070B12] shadow-[0_12px_44px_-16px_rgba(108,231,242,0.75)] transition-all duration-300 ease-soft hover:-translate-y-0.5 hover:bg-[#8EF0F9] hover:shadow-[0_18px_50px_-16px_rgba(108,231,242,0.85)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto sm:text-base"
              >
                <span>View Projects</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-soft group-hover:translate-x-1" />
              </Link>

              <Link
                to="/connect"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/[0.12] bg-[#0D141C]/70 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 ease-soft hover:-translate-y-0.5 hover:border-[#6CE7F2]/40 hover:bg-[#162230] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6CE7F2] sm:w-auto sm:text-base"
              >
                <span>Let&rsquo;s Connect</span>
                <ArrowUpRight className="h-4 w-4 text-[#6CE7F2] transition-transform duration-300 ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Pipeline card */}
          <div
            className="relative w-full max-w-md lg:max-w-lg"
            style={{
              transform:
                "translate3d(calc(var(--px, 0) * 8px), calc(var(--py, 0) * 6px), 0)",
            }}
          >
            <div
              data-enter="true"
              style={enter(500)}
              className="relative flex aspect-square flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D141C]/55 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_40px_90px_-40px_rgba(0,0,0,0.95)] backdrop-blur-sm"
            >
              <SectionAura
                className="left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2"
                color="rgb(108 231 242 / 0.1)"
              />
              <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-[#6CE7F2]/30" />
              <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-[#6CE7F2]/30" />

              <div className="relative flex items-center justify-between border-b border-white/[0.06] pb-4 font-mono text-xs text-[#94A3B8]">
                <span className="flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-[#6CE7F2]" />
                  <span>SYSTEM PIPELINE</span>
                </span>
                <span className="text-[#64748B]">END-TO-END</span>
              </div>

              <div className="relative flex flex-1 flex-col justify-center py-6">
                {/* Spine with a slow travelling signal */}
                <div className="absolute bottom-8 left-5 top-8 w-px bg-white/[0.07]">
                  <div className="spine-scan absolute inset-0" />
                </div>

                <div className="relative space-y-5">
                  {PIPELINE_STAGES.map((item, index) => (
                    <div
                      key={item.stage}
                      className="group flex items-center gap-4"
                    >
                      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#070B12] text-[#6CE7F2] transition-all duration-300 ease-soft group-hover:border-[#6CE7F2]/70 group-hover:shadow-[0_0_18px_rgba(108,231,242,0.35)]">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold tracking-wider text-white transition-colors duration-200 group-hover:text-[#6CE7F2]">
                            {item.stage}
                          </span>
                          <span className="font-mono text-[10px] text-[#64748B]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <p className="mt-0.5 font-mono text-xs text-[#94A3B8]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative flex items-center justify-between border-t border-white/[0.06] pt-4 font-mono text-[11px] text-[#64748B]">
                <span>Continuous Iteration</span>
                <span className="text-[#6CE7F2]">Practical ML Focus</span>
              </div>
            </div>
          </div>

          {/* Scroll cue — gives the space under the hero a purpose on tall
              viewports without adding another decorative badge. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 left-0 hidden items-center gap-3 lg:flex"
          >
            <span className="relative h-12 w-px overflow-hidden bg-gradient-to-b from-transparent via-white/15 to-transparent">
              <span className="spine-scan absolute inset-0" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.24em] text-[#475569]">
              SCROLL
            </span>
          </div>
        </section>

        <SectionDivider />

        {/* ================================================================
            ABOUT
            ================================================================ */}
        <section className="relative py-16 sm:py-24">
          <SectionAura
            className="right-[-20%] top-[6%] h-[40vh] w-[46vw]"
            color="rgb(62 123 199 / 0.06)"
          />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading index="01" label="BACKGROUND" title="About Me" />
            </div>

            <div className="space-y-6 lg:col-span-8">
              {PERSONAL_INFO.aboutMe.paragraphs.map((paragraph, index) => (
                <Reveal
                  key={index}
                  as="p"
                  delay={index * 90}
                  y={18}
                  className="border-l border-white/[0.09] pl-5 text-base font-light leading-relaxed text-[#94A3B8] transition-colors duration-300 hover:border-[#6CE7F2]/40 sm:text-lg"
                >
                  {paragraph}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ================================================================
            CAPABILITIES
            ================================================================ */}
        <section className="relative py-16 sm:py-24">
          <SectionAura
            className="left-[-14%] top-[20%] h-[52vh] w-[52vw]"
            color="rgb(108 231 242 / 0.06)"
            drift="a"
          />

          <SectionHeading
            index="02"
            label="CAPABILITIES"
            title="What I Work With"
            description="Core domains spanning predictive modeling, computer vision, data pipelines, and application engineering."
            align="split"
            className="mb-12"
          />

          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2">
            {CAPABILITIES.map((card, index) => {
              const Icon = CAPABILITY_ICONS[card.iconName];
              const isHovered = hoveredCard === card.id;
              const [idleBadge, activeBadge] = CAPABILITY_BADGES[card.id];

              return (
                <Reveal key={card.id} delay={index * 80} y={26}>
                  <article
                    onMouseEnter={() => setHoveredCard(card.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={cn(
                      "group relative h-full overflow-hidden rounded-2xl border bg-[#0D141C]/80 p-7 transition-all duration-400 ease-soft sm:p-8",
                      isHovered
                        ? "-translate-y-1 border-[#6CE7F2]/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_36px_80px_-40px_rgba(0,0,0,1),0_0_50px_-24px_rgba(108,231,242,0.55)]"
                        : "border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]"
                    )}
                  >
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 transition-opacity duration-500 ease-soft",
                        isHovered ? "opacity-100" : "opacity-0"
                      )}
                      style={{
                        background:
                          "radial-gradient(120% 90% at 0% 0%, rgba(108,231,242,0.10), transparent 62%)",
                      }}
                    />

                    <div className="relative flex items-start justify-between">
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-400 ease-soft",
                          isHovered
                            ? "border-[#6CE7F2]/60 bg-[#6CE7F2]/[0.12] text-[#6CE7F2] shadow-[0_0_20px_-4px_rgba(108,231,242,0.5)]"
                            : "border-white/10 bg-[#111A24] text-white"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <span className="font-mono text-[11px] tracking-[0.2em] text-[#334155]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="relative mt-6 space-y-3">
                      <h3 className="text-xl font-bold text-white transition-colors duration-200 group-hover:text-[#6CE7F2]">
                        {card.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#94A3B8] sm:text-base">
                        {card.description}
                      </p>
                    </div>

                    <div className="relative mt-5 flex items-center gap-2 border-t border-white/[0.06] pt-4">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                          isHovered
                            ? "bg-[#6CE7F2] shadow-[0_0_6px_#6CE7F2]"
                            : "bg-white/20"
                        )}
                      />
                      <span className="font-mono text-[11px] tracking-wide text-[#64748B] transition-colors duration-300 group-hover:text-[#6CE7F2]/80">
                        {isHovered ? activeBadge : idleBadge}
                      </span>
                    </div>

                    <p className="relative mt-3 font-mono text-xs leading-relaxed text-[#64748B]">
                      {card.details}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        <SectionDivider />

        {/* ================================================================
            TECH STACK
            ================================================================ */}
        <section className="relative py-16 sm:py-24">
          <SectionAura
            className="right-[-16%] top-[16%] h-[44vh] w-[46vw]"
            color="rgb(108 231 242 / 0.05)"
          />

          <SectionHeading
            index="03"
            label="TECHNICAL ARSENAL"
            title="Tech Stack"
            description="Hover over technologies to explore contextual domains."
            align="split"
            className="mb-12"
          />

          <div className="relative grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-7">
            {TECH_CATEGORIES.map((category, index) => (
                <Reveal key={category.title} delay={index * 80} y={24}>
                  <div className="tech-pill-group rounded-2xl border border-white/[0.08] bg-[#0D141C]/70 p-6 sm:p-7">
                    <div className="mb-5 flex items-center justify-between border-b border-white/[0.06] pb-3.5">
                      <h3 className="flex items-center gap-2.5 font-mono text-sm uppercase tracking-wider text-white">
                        <span className="tech-pill-dot h-1.5 w-1.5 rounded-full bg-[#94A3B8]/50" />
                        <span>{category.title}</span>
                      </h3>
                      <span className="font-mono text-[11px] text-[#64748B]">
                        {category.skills.length} tools
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {category.skills.map((skill) => (
                        <TechPill key={skill} name={skill} />
                      ))}
                    </div>
                  </div>
                </Reveal>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* ================================================================
            EDUCATION
            ================================================================ */}
        <section className="relative py-16 sm:py-24">
          <SectionAura
            className="left-[-10%] top-[24%] h-[34vh] w-[38vw]"
            color="rgb(62 123 199 / 0.05)"
          />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading
                index="04"
                label="ACADEMIC FOUNDATION"
                title="Education"
              />
            </div>

            <div className="lg:col-span-8">
              <div className="relative pl-6 sm:pl-8">
                {/* Rail draws downward as the card reveals */}
                <Reveal
                  y={0}
                  duration={1100}
                  className="absolute bottom-2 left-0 top-2 w-px bg-gradient-to-b from-[#6CE7F2]/60 via-white/12 to-transparent"
                />

                <Reveal y={26} delay={110}>
                  <div className="relative rounded-2xl border border-white/[0.08] bg-[#0D141C]/85 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors duration-300 hover:border-[#6CE7F2]/30 sm:p-8">
                    <span className="absolute -left-[27px] top-8 h-2.5 w-2.5 rounded-full bg-[#6CE7F2] shadow-[0_0_12px_#6CE7F2] sm:-left-[35px]" />

                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-md border border-[#6CE7F2]/20 bg-[#6CE7F2]/10 px-2.5 py-1 font-mono text-xs font-semibold text-[#6CE7F2]">
                        Graduation: {PERSONAL_INFO.education.year}
                      </span>
                      <span className="rounded-md bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-[#94A3B8]">
                        CGPA: {PERSONAL_INFO.education.cgpa}
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                      {PERSONAL_INFO.education.degree}
                    </h3>
                    <p className="mt-1 font-mono text-base text-[#94A3B8]">
                      {PERSONAL_INFO.education.institution}
                    </p>
                    <p className="mt-4 font-mono text-xs text-[#64748B]">
                      Curriculum focused on software engineering principles,
                      algorithms, data structures, and practical application
                      development.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            CAREER DIRECTION
            ================================================================ */}
        <section className="relative py-8 sm:py-12">
          <Reveal y={30} duration={900}>
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0D141C]/80 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-12">
              <SectionAura
                className="-right-[6%] -top-[30%] h-[60vh] w-[50vw]"
                color="rgb(108 231 242 / 0.075)"
                drift="a"
              />
              <SectionAura
                className="-bottom-[40%] left-[6%] h-[50vh] w-[40vw]"
                color="rgb(62 123 199 / 0.07)"
                drift="b"
              />

              <div className="relative mb-10 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-[#6CE7F2]">
                    05
                  </span>
                  <span className="h-px w-7 bg-gradient-to-r from-[#6CE7F2]/60 to-transparent" />
                  <span className="eyebrow">DIRECTION &amp; GOAL</span>
                </div>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {PERSONAL_INFO.careerDirection.targetRole}
                </h2>
                <p className="mt-4 text-base font-light leading-relaxed text-[#94A3B8] sm:text-lg">
                  {PERSONAL_INFO.careerDirection.text}
                </p>
              </div>

              <div className="relative grid grid-cols-1 gap-4 border-t border-white/[0.06] pt-8 sm:grid-cols-2 lg:grid-cols-4">
                {PERSONAL_INFO.careerDirection.stages.map((stage, index, all) => {
                  const isTarget = index === all.length - 1;

                  return (
                    <Reveal key={stage.label} delay={index * 90} y={20}>
                      <div
                        className={cn(
                          "h-full rounded-xl border p-5 transition-all duration-400 ease-soft",
                          isTarget
                            ? "border-[#6CE7F2]/40 bg-[#111A24] shadow-[0_0_24px_-12px_rgba(108,231,242,0.55)]"
                            : "border-white/[0.06] bg-[#070B12]/70 hover:border-white/[0.14]"
                        )}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-mono text-xs text-[#6CE7F2]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {isTarget && (
                            <span className="rounded bg-[#6CE7F2] px-2 py-0.5 font-mono text-[10px] font-bold text-[#070B12]">
                              TARGET
                            </span>
                          )}
                        </div>
                        <h4 className="mb-1 font-mono text-sm font-bold text-white">
                          {stage.label}
                        </h4>
                        <p className="text-xs leading-relaxed text-[#94A3B8]">
                          {stage.desc}
                        </p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </section>

        <SectionDivider accent className="mt-10" />

        {/* ================================================================
            CLOSING
            ================================================================ */}
        <section className="relative flex flex-col items-center justify-between gap-6 pb-8 pt-10 sm:flex-row sm:pt-14">
          <Reveal y={16} className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-white">
              Connect &amp; Review Code
            </h3>
            <p className="text-xs text-[#94A3B8] sm:text-sm">
              Verify projects, review commits, or reach out directly.
            </p>
          </Reveal>

          <Reveal y={16} delay={90} className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-[#0D141C]/70 px-5 py-2.5 font-mono text-xs text-white transition-all duration-300 ease-soft hover:-translate-y-0.5 hover:border-[#6CE7F2]/45 hover:bg-[#162230] sm:text-sm"
            >
              <Github className="h-4 w-4 text-[#6CE7F2]" />
              <span>GitHub</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-[#0D141C]/70 px-5 py-2.5 font-mono text-xs text-white transition-all duration-300 ease-soft hover:-translate-y-0.5 hover:border-[#6CE7F2]/45 hover:bg-[#162230] sm:text-sm"
            >
              <Linkedin className="h-4 w-4 text-[#6CE7F2]" />
              <span>LinkedIn</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
            </a>
          </Reveal>
        </section>
      </div>
    </div>
  );
};
