"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { routes } from "@/config/routes";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: routes.home },
  { label: "Find My Repair", href: routes.recommender },
  { label: "Providers", href: routes.providers.index },
  { label: "About", href: routes.about },
  { label: "Contact", href: routes.contact },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/40 bg-white/40 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/45">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          {/* ── LEFT ZONE ─────────────────────────────────────────── */}

          {/* Mobile: icon-only logo (left) */}
          <Link href="/" className="flex items-center md:hidden">
            <Image
              src="/MendHub_Logo__Icon_only_transparent_background.png"
              alt="MendHub"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
              priority
            />
          </Link>

          {/* Mobile: centered brand text (absolute) */}
          <span className="absolute left-1/2 -translate-x-1/2 text-base font-bold text-slate-950 dark:text-white md:hidden">
            MendHub
          </span>

          {/* Desktop: full logo + nav links */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/MendHub_Logo_transparent_background.png"
                alt="MendHub Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>
            <div className="flex items-baseline gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-slate-700 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── RIGHT ZONE ────────────────────────────────────────── */}

          {/* Mobile: icon-only theme toggle + hamburger */}
          <div className="flex items-center gap-1 md:hidden">
            {/* Icon-only theme pill: sun | moon */}
            <div className="inline-flex items-center gap-0.5 rounded-full border border-white/20 bg-white/20 p-1 dark:border-white/10 dark:bg-slate-800/60">
              {/* Sun — light mode button */}
              <button
                onClick={() => setTheme("light")}
                className={cn(
                  "inline-flex items-center justify-center rounded-full p-1.5 transition",
                  theme === "light"
                    ? "bg-teal-500 text-slate-950 shadow-sm"
                    : "text-slate-600 hover:bg-white/50 dark:text-slate-400 dark:hover:bg-white/10"
                )}
                aria-label="Light mode"
                aria-pressed={theme === "light"}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.5 1.5M17.8 17.8l1.5 1.5M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.5-1.5M17.8 6.2l1.5-1.5" strokeLinecap="round" />
                </svg>
              </button>
              {/* Moon — dark mode button */}
              <button
                onClick={() => setTheme("dark")}
                className={cn(
                  "inline-flex items-center justify-center rounded-full p-1.5 transition",
                  theme === "dark"
                    ? "bg-teal-500 text-slate-950 shadow-sm"
                    : "text-slate-600 hover:bg-white/50 dark:text-slate-400 dark:hover:bg-white/10"
                )}
                aria-label="Dark mode"
                aria-pressed={theme === "dark"}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 12.8A8.9 8.9 0 1 1 11.2 3a7.1 7.1 0 0 0 9.8 9.8Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>


            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:bg-white/50 hover:text-slate-950 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop: theme pill toggle + list CTA */}
          <div className="hidden md:flex md:items-center md:gap-3">
            <ThemeToggle />
            <Link
              href={routes.login}
              className="rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-800 dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-200"
            >
              Login
            </Link>
            <Link
              href={routes.register}
              className="rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-teal-400"
            >
              List Your Business
            </Link>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn("md:hidden", isOpen ? "block" : "hidden")}>
        <div className="space-y-1 border-t border-white/30 bg-white/55 px-2 pb-3 pt-2 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-white/60 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={routes.login}
            className="block rounded-md border border-slate-200 bg-white/70 px-3 py-2 text-base font-medium text-slate-700 hover:border-teal-300 hover:text-teal-800 dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-200"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            href={routes.register}
            className="block rounded-md bg-teal-500 px-3 py-2 text-base font-medium text-slate-950 hover:bg-teal-400 sm:hidden"
            onClick={() => setIsOpen(false)}
          >
            List Your Business
          </Link>
        </div>
      </div>
    </nav>
  );
}
