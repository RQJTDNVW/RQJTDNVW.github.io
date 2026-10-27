import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { cn } from "../lib/cn";

const NAV_LINKS = [
  { label: "PROFILE", path: "/" },
  { label: "PROJECTS", path: "/projects" },
  { label: "CONNECT", path: "/connect" },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 24);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close the drawer on navigation.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[padding,background-color,box-shadow,border-color] duration-400 ease-soft",
        scrolled
          ? "border-b border-white/[0.07] bg-[#070B12]/78 py-3 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Brand */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 rounded-sm text-sm font-semibold tracking-widest text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6CE7F2] sm:text-base"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-[#6CE7F2]/40 animate-pulse-soft" />
            <span className="relative h-2 w-2 rounded-full bg-[#6CE7F2] shadow-[0_0_8px_#6CE7F2] transition-transform duration-300 group-hover:scale-125" />
          </span>
          <span className="font-mono font-bold tracking-wider text-white transition-colors duration-200 group-hover:text-[#6CE7F2]">
            {PERSONAL_INFO.name}
          </span>
          <span className="ml-1 hidden border-l border-white/10 pl-2 font-mono text-xs text-[#64748B] lg:inline">
            AI/ML
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex sm:gap-2">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative rounded-md px-4 py-2 font-mono text-xs tracking-wider transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6CE7F2] sm:text-sm",
                  active
                    ? "bg-[#6CE7F2]/10 font-semibold text-[#6CE7F2] shadow-[inset_0_0_0_1px_rgba(108,231,242,0.22)]"
                    : "text-[#94A3B8] hover:bg-white/[0.04] hover:text-white"
                )}
              >
                {link.label}
                {/* Active indicator grows out from the centre. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-px left-1/2 h-px -translate-x-1/2 rounded-full bg-[#6CE7F2] shadow-[0_0_6px_#6CE7F2] transition-all duration-400 ease-soft",
                    active ? "w-6 opacity-100" : "w-0 opacity-0"
                  )}
                />
              </Link>
            );
          })}

          <div className="mx-2 h-4 w-px bg-white/10" />

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 rounded border border-white/[0.08] px-3 py-1.5 font-mono text-xs text-[#94A3B8] transition-colors duration-200 hover:border-[#6CE7F2]/30 hover:bg-[#6CE7F2]/5 hover:text-[#6CE7F2]"
            title="GitHub Profile"
          >
            <span>GitHub</span>
            <ArrowUpRight className="h-3 w-3 text-[#6CE7F2] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="rounded-md p-2 text-[#94A3B8] transition-colors hover:bg-white/[0.06] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6CE7F2] md:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5 text-[#6CE7F2]" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Reading progress. Driven by a CSS variable so it costs no renders. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 h-px overflow-hidden transition-opacity duration-300",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      >
        <div
          className="h-full bg-gradient-to-r from-[#6CE7F2]/0 via-[#6CE7F2]/60 to-[#6CE7F2]"
          style={{ width: "calc(var(--scroll-progress, 0) * 100%)" }}
        />
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="absolute inset-x-0 top-full animate-fade-in border-b border-white/[0.08] bg-[#070B12]/96 px-6 pb-6 pt-4 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-4 py-3 font-mono text-sm tracking-wider transition-colors",
                    active
                      ? "border border-[#6CE7F2]/30 bg-[#6CE7F2]/10 font-semibold text-[#6CE7F2]"
                      : "text-[#94A3B8] hover:bg-white/[0.04] hover:text-white"
                  )}
                >
                  <span>{link.label}</span>
                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#6CE7F2] shadow-[0_0_8px_#6CE7F2]" />
                  )}
                </Link>
              );
            })}

            <div className="mt-3 flex items-center justify-between border-t border-white/[0.08] pt-4">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs text-[#94A3B8] hover:text-[#6CE7F2]"
              >
                <span>GitHub Profile</span>
                <ArrowUpRight className="h-3 w-3 text-[#6CE7F2]" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs text-[#94A3B8] hover:text-[#6CE7F2]"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3 w-3 text-[#6CE7F2]" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
