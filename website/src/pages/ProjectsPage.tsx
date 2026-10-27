import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Sparkles, ArrowRight } from "lucide-react";
import { PROJECTS, ProjectItem } from "../data/portfolioData";
import { ProjectImageCard } from "../components/ProjectImageCard";
import { Reveal } from "../components/motion/Reveal";
import { SectionAura } from "../components/atmosphere/SectionAura";
import { cn } from "../lib/cn";

/** Aura tint per project, alternating to give each case study its own air. */
const PROJECT_AURAS = [
  {
    className: "-left-[14%] top-[4%] h-[52vh] w-[50vw]",
    color: "rgb(108 231 242 / 0.07)",
  },
  {
    className: "right-[-12%] top-[8%] h-[48vh] w-[46vw]",
    color: "rgb(62 123 199 / 0.08)",
  },
  {
    className: "left-[-10%] bottom-[6%] h-[46vh] w-[46vw]",
    color: "rgb(108 231 242 / 0.055)",
  },
  {
    className: "right-[-14%] bottom-[4%] h-[50vh] w-[48vw]",
    color: "rgb(62 123 199 / 0.07)",
  },
];

const ProjectSection: React.FC<{ project: ProjectItem; index: number }> = ({
  project,
  index,
}) => {
  const aura = PROJECT_AURAS[index % PROJECT_AURAS.length];

  return (
    <section
      id={project.id}
      className="relative flex items-center border-t border-white/[0.06] py-16 first:border-t-0 lg:min-h-[92vh] lg:py-24"
    >
      <SectionAura className={aura.className} color={aura.color} />

      <div className="relative grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* --- Info column ------------------------------------------------ */}
        <div className="relative lg:col-span-5">
          <div className="relative space-y-6">
            <Reveal y={16} className="flex items-center gap-3">
              <span className="font-mono text-2xl font-black text-[#6CE7F2] lg:text-3xl">
                {project.number}
              </span>
              <div className="h-4 w-px bg-white/20" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#94A3B8]">
                {project.category}
              </span>
            </Reveal>

            <Reveal
              as="h2"
              delay={70}
              y={22}
              className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl"
            >
              {project.title}
            </Reveal>

            <Reveal
              as="p"
              delay={140}
              y={20}
              className="text-sm font-light leading-relaxed text-[#94A3B8] sm:text-base"
            >
              {project.description}
            </Reveal>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <Reveal delay={200} y={20} className="pt-2">
                <div className="mb-3 font-mono text-xs uppercase tracking-wider text-[#64748B]">
                  Key Project Metrics
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="group rounded-xl border border-white/[0.08] bg-[#0D141C]/80 p-3.5 transition-all duration-300 ease-soft hover:-translate-y-0.5 hover:border-[#6CE7F2]/35 hover:bg-[#111A24]"
                    >
                      <div className="font-mono text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#6CE7F2] sm:text-2xl">
                        {metric.value}
                      </div>
                      <div className="mt-0.5 font-mono text-xs font-medium text-[#6CE7F2]">
                        {metric.label}
                      </div>
                      {metric.sublabel && (
                        <div className="mt-0.5 font-mono text-[10px] text-[#64748B]">
                          {metric.sublabel}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Dataset scope */}
            {project.datasetInfo && (
              <Reveal y={18} delay={120}>
                <div className="space-y-1.5 rounded-xl border border-white/[0.08] bg-[#0D141C]/80 p-3.5 font-mono text-xs">
                  <div className="font-semibold text-[#6CE7F2]">
                    Dataset Scope
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[#94A3B8]">
                    <div>
                      • Cleaned:{" "}
                      <span className="text-white">
                        {project.datasetInfo.cleanedRecords}
                      </span>
                    </div>
                    <div>
                      • Invoices:{" "}
                      <span className="text-white">
                        {project.datasetInfo.invoices}
                      </span>
                    </div>
                    <div>
                      • Unique SKUs:{" "}
                      <span className="text-white">
                        {project.datasetInfo.skus}
                      </span>
                    </div>
                    <div>
                      • Global Scope:{" "}
                      <span className="text-white">
                        {project.datasetInfo.countries} Countries
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}

            {/* Techniques */}
            <Reveal y={18} delay={140} className="space-y-2 pt-1">
              <div className="font-mono text-xs uppercase tracking-wider text-[#64748B]">
                Core Techniques &amp; Methods
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.techniques.map((technique) => (
                  <span
                    key={technique}
                    className="rounded-md border border-white/[0.06] bg-[#0D141C] px-2.5 py-1 font-mono text-xs text-[#94A3B8] transition-colors duration-200 hover:border-white/15 hover:text-white"
                  >
                    {technique}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Technologies */}
            <Reveal y={18} delay={180} className="space-y-2 pt-1">
              <div className="font-mono text-xs uppercase tracking-wider text-[#64748B]">
                Technologies Used
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-lg border border-[#6CE7F2]/20 bg-[#6CE7F2]/5 px-3 py-1 font-mono text-xs font-medium text-[#6CE7F2] transition-colors duration-200 hover:border-[#6CE7F2]/45 hover:bg-[#6CE7F2]/10"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal y={18} delay={220} className="pt-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-[#6CE7F2] px-6 py-3 font-mono text-xs font-semibold tracking-wide text-[#070B12] shadow-[0_12px_40px_-16px_rgba(108,231,242,0.8)] transition-all duration-300 ease-soft hover:-translate-y-0.5 hover:bg-[#8EF0F9] hover:shadow-[0_18px_48px_-16px_rgba(108,231,242,0.9)] sm:text-sm"
              >
                <Github className="h-4 w-4" />
                <span>View on GitHub</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>
        </div>

        {/* --- Visual column ---------------------------------------------- */}
        <div className="relative lg:col-span-7">
          <ProjectImageCard
            images={project.images}
            projectNumber={project.number}
            projectTitle={project.title}
          />
        </div>
      </div>
    </section>
  );
};

export const ProjectsPage: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState<string>(
    PROJECTS[0].id
  );

  // A single observer replaces the four window scroll listeners that used to
  // drive this page's active state.
  useEffect(() => {
    const sections = PROJECTS.map((project) =>
      document.getElementById(project.id)
    ).filter((element): element is HTMLElement => Boolean(element));
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveProjectId(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToProject = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden pb-20 pt-24 text-[#F1F5F9]">
      {/* Floating project navigator */}
      <aside
        aria-label="Project quick navigation"
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1.5 rounded-2xl border border-white/[0.08] bg-[#0D141C]/80 p-2.5 shadow-2xl backdrop-blur-md xl:flex"
      >
        <div className="mb-1 px-1 text-center font-mono text-[9px] tracking-[0.2em] text-[#64748B]">
          PROJECTS
        </div>
        {PROJECTS.map((project) => {
          const isActive = activeProjectId === project.id;
          return (
            <button
              key={project.id}
              type="button"
              onClick={() => scrollToProject(project.id)}
              title={project.title}
              aria-label={`Jump to project ${project.number}: ${project.title}`}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "group flex items-center gap-2.5 rounded-xl px-3 py-2 font-mono text-xs transition-all duration-300 ease-soft",
                isActive
                  ? "border border-[#6CE7F2]/30 bg-[#6CE7F2]/15 text-[#6CE7F2] shadow-[0_0_12px_-2px_rgba(108,231,242,0.4)]"
                  : "border border-transparent text-[#94A3B8] hover:bg-white/[0.04] hover:text-white"
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-all duration-300",
                  isActive
                    ? "bg-[#6CE7F2] shadow-[0_0_6px_#6CE7F2]"
                    : "bg-white/25 group-hover:bg-white/50"
                )}
              />
              <span>{project.number}</span>
            </button>
          );
        })}
      </aside>

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* ================================================================
            HEADER
            ================================================================ */}
        <header className="relative border-b border-white/[0.08] pb-14 pt-10 sm:pb-16 sm:pt-16">
          <SectionAura
            className="-left-[10%] -top-[40%] h-[60vh] w-[70vw]"
            color="rgb(108 231 242 / 0.075)"
          />
          <SectionAura
            className="right-[-10%] top-[10%] h-[40vh] w-[40vw]"
            color="rgb(62 123 199 / 0.07)"
            drift="b"
          />

          <div className="relative max-w-3xl space-y-5">
            <Reveal y={14}>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#6CE7F2]/20 bg-[#6CE7F2]/10 px-3 py-1 font-mono text-xs text-[#6CE7F2]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>CASE STUDIES &amp; SYSTEM ARCHITECTURE</span>
              </div>
            </Reveal>

            <Reveal
              as="h1"
              delay={70}
              y={22}
              className="text-edge-light text-4xl font-extrabold tracking-tight text-white sm:text-6xl"
            >
              PROJECTS
            </Reveal>

            <Reveal
              as="p"
              delay={140}
              y={20}
              className="font-mono text-xl font-medium text-[#6CE7F2] sm:text-2xl"
            >
              Building intelligent systems from data.
            </Reveal>

            <Reveal
              as="p"
              delay={200}
              y={20}
              className="max-w-2xl pt-1 text-base font-light leading-relaxed text-[#94A3B8] sm:text-lg"
            >
              A collection of AI/ML projects exploring predictive modeling,
              computer vision, unsupervised learning, semantic search, and
              data-driven applications.
            </Reveal>
          </div>
        </header>

        {/* ================================================================
            CASE STUDIES
            ================================================================ */}
        <div>
          {PROJECTS.map((project, index) => (
            <ProjectSection key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* ================================================================
            NEXT STEP
            ================================================================ */}
        <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0D141C]/70 px-6 py-16 text-center sm:px-12 sm:py-20">
          <SectionAura
            className="left-1/2 top-0 h-[60vh] w-[70vw] -translate-x-1/2 -translate-y-1/2"
            color="rgb(108 231 242 / 0.09)"
            drift="a"
          />

          <div className="relative mx-auto max-w-2xl space-y-6">
            <Reveal y={14} className="eyebrow">
              Next Step
            </Reveal>

            <Reveal
              as="h2"
              delay={70}
              y={22}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Have a project in mind?
            </Reveal>

            <Reveal
              as="p"
              delay={140}
              y={18}
              className="text-base font-light leading-relaxed text-[#94A3B8]"
            >
              Let&rsquo;s build something intelligent. Reach out to discuss
              machine learning applications, software architectures, or
              collaboration opportunities.
            </Reveal>

            <Reveal delay={200} y={16} className="pt-2">
              <Link
                to="/connect"
                className="group inline-flex items-center gap-3 rounded-xl bg-[#6CE7F2] px-8 py-4 font-mono text-base font-semibold tracking-wide text-[#070B12] shadow-[0_14px_50px_-16px_rgba(108,231,242,0.8)] transition-all duration-300 ease-soft hover:-translate-y-0.5 hover:bg-[#8EF0F9] hover:shadow-[0_20px_58px_-16px_rgba(108,231,242,0.9)]"
              >
                <span>Let&rsquo;s Connect</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-soft group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </section>
      </div>
    </div>
  );
};
