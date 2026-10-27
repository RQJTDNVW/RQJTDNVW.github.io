import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { SectionAura } from "./atmosphere/SectionAura";

const CONTACT_LINKS = [
  {
    href: PERSONAL_INFO.github,
    icon: Github,
    label: "GitHub",
    external: true,
  },
  {
    href: PERSONAL_INFO.linkedin,
    icon: Linkedin,
    label: "LinkedIn",
    external: true,
  },
  {
    href: `mailto:${PERSONAL_INFO.email}`,
    icon: Mail,
    label: "Email",
    external: false,
  },
];

const FOOTER_NAV = [
  { to: "/", label: "Profile" },
  { to: "/projects", label: "Projects" },
  { to: "/connect", label: "Connect" },
];

export const Footer: React.FC = () => {
  return (
    <footer className="relative mt-4 overflow-hidden">
      {/* Gradient hairline instead of a flat border — it reads as a light edge
          rather than a box outline. */}
      <div aria-hidden="true" className="hairline" />
      <SectionAura
        className="bottom-[-60%] left-1/2 h-[60vh] w-[80vw] -translate-x-1/2"
        color="rgb(108,231,242 / 0.045)"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/[0.06] pb-12 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-mono text-base font-bold tracking-wider text-white">
                {PERSONAL_INFO.name}
              </span>
              <span className="rounded-full border border-[#6CE7F2]/20 bg-[#6CE7F2]/10 px-2 py-0.5 font-mono text-xs text-[#6CE7F2]">
                2026
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] sm:text-sm">
              {PERSONAL_INFO.title}
            </p>
            <p className="mt-1 text-xs text-[#64748B]">
              {PERSONAL_INFO.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {CONTACT_LINKS.map(({ href, icon: Icon, label, external }) => (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group inline-flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-xs text-[#94A3B8] transition-all duration-300 ease-soft hover:bg-white/[0.04] hover:text-[#6CE7F2] sm:text-sm"
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
                <ArrowUpRight className="h-3 w-3 opacity-60 transition-transform duration-300 ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 font-mono text-xs text-[#64748B] sm:flex-row">
          <div>&copy; 2026 Joel Binu. All rights reserved.</div>
          <div className="flex items-center gap-6">
            {FOOTER_NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group relative py-0.5 transition-colors duration-300 hover:text-[#94A3B8]"
              >
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#6CE7F2]/60 transition-all duration-300 ease-soft group-hover:w-full"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
