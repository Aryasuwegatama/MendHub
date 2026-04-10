import Link from "next/link";
import { routes } from "@/config/routes";

/**
 * Hero panel for the home page.
 * Displays the Smart Recommender CTA and high-level platform stats.
 */
export default function HeroRecommenderPanel() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
      {/* Smart Recommender feature card */}
      <div className="rounded-3xl border border-teal-400/30 bg-gradient-to-br from-teal-500/20 to-cyan-500/10 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">Innovation Feature</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Smart Category Recommender</h2>
        <p className="mt-2 text-sm text-slate-200">
          Answer 3 quick questions to be instantly matched with the best local providers tailored exactly for your repair.
        </p>
        <Link
          href={routes.recommender}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-teal-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
        >
          Try Smart Recommender
        </Link>
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
