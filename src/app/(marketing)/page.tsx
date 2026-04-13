import type { Metadata } from "next";
import Link from "next/link";
import { routes } from "@/config/routes";
import { categoryConfig as categories } from "@/lib/categoryConfig";
import SectionLabel from "@/components/ui/SectionLabel";
import LinkButton from "@/components/ui/LinkButton";
import FeaturedProviders from "@/components/FeaturedProviders";
// Client Component — isolated so this page can stay a Server Component
import HeroRecommenderPanel from "@/components/HeroRecommenderPanel";

export const metadata: Metadata = {
  title: "MendHub — Find Trusted Repair Services in Brisbane",
  description:
    "Search by category, suburb, or service type and compare top-rated repair providers across Brisbane.",
};

/**
 * Home page — Server Component.
 * Interactive elements (search inputs) are delegated to HeroSearchForm (Client Component).
 * FeaturedProviders uses local mock data for UI-only mode.
 */
export default function Home() {
  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100">
      {/* Hero section */}
      <section className="overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-slate-950 px-4 py-16 sm:px-6 lg:px-8 dark:from-slate-950 dark:via-teal-950 dark:to-slate-900">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-xl sm:p-12 dark:bg-white/6">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="mb-4 inline-flex rounded-full bg-teal-100 px-4 py-1 text-sm font-semibold text-teal-900">
                  Brisbane Repair Marketplace
                </p>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  Find trusted local repair services fast.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">
                  Search by category, suburb, or service type and compare top-rated providers in Brisbane.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a
                    href="#categories"
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-slate-900/10 transition hover:bg-slate-100"
                  >
                    Browse Services
                  </a>
                  <LinkButton href={routes.recommender} variant="outline">Smart Recommender</LinkButton>
                </div>
              </div>

              {/* Interactive search panel — Client Component */}
              <HeroRecommenderPanel />
            </div>
          </div>
        </div>
      </section>

      {/* Categories section */}
      <section id="categories" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <SectionLabel>Service categories</SectionLabel>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Browse by category</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
              Choose a repair type and get matched to local providers quickly.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <Link key={category.slug} href={category.href} className="glass-panel group block rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-xl">
                <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${category.accent} text-2xl`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 transition group-hover:text-teal-800 dark:text-white dark:group-hover:text-teal-300">
                  {category.title}
                </h3>
                <p className="mt-3 text-slate-600 dark:text-slate-300">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recommender CTA section */}
      <section className="bg-teal-950/95 px-4 py-16 text-white sm:px-6 lg:px-8 dark:bg-slate-950/85">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-300">Concierge Matching</p>
              <h2 className="text-3xl font-bold sm:text-4xl">Not sure where to start?</h2>
              <p className="mt-4 max-w-xl text-lg text-slate-300">
                Skip the search bar. Tell us what&rsquo;s broken, your precise issue, and your location, and we&rsquo;ll instantly match you with accurate pricing from exact-fit local providers.
              </p>
              <div className="mt-8">
                <LinkButton href={routes.recommender} className="!rounded-3xl border border-white/20 hover:border-white/40">
                  Try the Smart Recommender
                </LinkButton>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-slate-100 backdrop-blur-xl">
                <p className="text-sm font-bold text-cyan-300">1. Select Item</p>
                <p className="mt-1 text-base">What device or item needs fixing?</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-slate-100 backdrop-blur-xl">
                <p className="text-sm font-bold text-cyan-300">2. Specify Problem</p>
                <p className="mt-1 text-base">We map common symptoms to distinct services.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-slate-100 backdrop-blur-xl">
                <p className="text-sm font-bold text-cyan-300">3. Add Location</p>
                <p className="mt-1 text-base">Get instant, inline results for your suburb.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured providers — Server Component, UI-only mock data */}
      <FeaturedProviders />

      {/* List your business CTA */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="glass-panel-strong mx-auto max-w-6xl rounded-[2rem] p-10 text-slate-900 dark:text-white sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <SectionLabel>List Your Business</SectionLabel>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                Grow your repair business with MendHub
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300">
                Join the local marketplace, reach more customers, and get booked through a simple onboarding flow.
              </p>
            </div>
            <div className="space-y-4">
              <div className="glass-panel-muted rounded-3xl p-6 text-slate-900 dark:text-slate-100">
                <p className="font-semibold">Free listing setup</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Enter your business in minutes and start appearing in search results.
                </p>
              </div>
              <LinkButton href={routes.listYourBusiness} size="lg" fullWidth className="!rounded-3xl">
                List Your Business
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
