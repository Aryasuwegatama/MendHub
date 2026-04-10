"use client";

import { useState } from "react";
import Link from "next/link";
import { routes } from "@/config/routes";

/**
 * Interactive hero panel for the home page.
 * This is a Client Component because it uses useState for the search inputs.
 * It is intentionally isolated so that the parent page.tsx can remain a
 * Server Component and correctly render server-only components like FeaturedProviders.
 */
export default function HeroSearchForm() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
      {/* Smart Recommender feature card */}
      <div className="rounded-3xl border border-teal-400/30 bg-gradient-to-br from-teal-500/20 to-cyan-500/10 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">Innovation Feature</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Smart Category Recommender</h2>
        <p className="mt-2 text-sm text-slate-200">
          Not sure what service you need? Answer 4 short questions and get the right repair category before you browse providers.
        </p>
        <Link
          href={routes.recommender}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-teal-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
        >
          Try Smart Recommender
        </Link>
      </div>

      {/* Quick search form */}
      <div className="mt-6 border-t border-white/10 pt-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Quick search</h3>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">Secondary</span>
        </div>

        <form className="grid gap-4">
          <label className="block">
            <span className="sr-only">Search services</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="What repair do you need?"
              className="w-full rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            />
          </label>
          <label className="block">
            <span className="sr-only">Location</span>
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Suburb or postcode"
              className="w-full rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            />
          </label>
          <button
            type="button"
            className="rounded-3xl bg-teal-400 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-teal-300"
          >
            Search now
          </button>
        </form>
      </div>

      {/* Stats bar */}
      <div className="mt-8 grid gap-3 rounded-3xl bg-teal-950/80 p-4 text-slate-300 sm:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Verified pros</p>
          <p className="mt-2 text-2xl font-semibold text-white">500+</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Jobs completed</p>
          <p className="mt-2 text-2xl font-semibold text-white">10,000+</p>
        </div>
      </div>
    </div>
  );
}
