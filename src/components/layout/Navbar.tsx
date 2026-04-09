"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { routes } from "@/config/routes";
import ThemeToggle from "@/components/theme/ThemeToggle";
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

  return (
    <nav className="sticky top-0 z-50 border-b border-white/40 bg-white/40 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/45">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
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

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline gap-6">
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

          {/* CTA & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex">
              <ThemeToggle />
            </div>

            <Link
              href={routes.listYourBusiness}
              className="hidden rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-teal-400 sm:block"
            >
              List Your Business
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:bg-white/50 hover:text-slate-950 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white md:hidden"
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
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn("md:hidden", isOpen ? "block" : "hidden")}>
        <div className="space-y-1 border-t border-white/30 bg-white/55 px-2 pb-3 pt-2 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70 sm:px-3">
          <div className="px-3 py-2">
            <ThemeToggle compact />
          </div>

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
            href={routes.listYourBusiness}
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
