"use client";

import { useState } from "react";

const featuredCategories = [
  {
    title: "Phone Repair",
    description: "Screen, battery, and charging fixes.",
    icon: "📱",
    accent: "from-teal-400 to-teal-600",
  },
  {
    title: "Laptop Repair",
    description: "Hardware, software and performance help.",
    icon: "💻",
    accent: "from-teal-400 to-teal-600",
  },
  {
    title: "Appliance Repair",
    description: "Fast home appliance service and repairs.",
    icon: "🧰",
    accent: "from-teal-500 to-slate-800",
  },
  {
    title: "Bike & Gear",
    description: "Mobile repair for cycles and small equipment.",
    icon: "🚲",
    accent: "from-teal-500 to-teal-700",
  },
];

const providerCards = [
  {
    name: "CityFix Repairs",
    category: "Phone Repair",
    rating: "4.9",
    reviews: "125",
    price: "From $45",
    location: "Brisbane CBD",
    note: "Same-day screen repair",
  },
  {
    name: "HomeCare Electrical",
    category: "Electrical",
    rating: "4.8",
    reviews: "98",
    price: "From $75",
    location: "North Brisbane",
    note: "Licensed electricians with 24/7 support",
  },
  {
    name: "Handy Hive",
    category: "Carpentry",
    rating: "4.7",
    reviews: "83",
    price: "From $65",
    location: "West Brisbane",
    note: "Trusted local joinery and repairs",
  },
];

const recommender = [
  "Phone screen replacement",
  "Washer repair",
  "Laptop tune-up",
  "Faulty power outlet",
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100">
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
                  Search by category, suburb, or service type and compare top-rated providers in Brisbane. No API required — this page uses dummy data for the MVP frontend.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a href="#categories" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-slate-900/10 transition hover:bg-slate-100">
                    Browse Services
                  </a>
                  <a href="/recommender" className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-base font-semibold text-white transition hover:border-white hover:bg-white/10">
                    Smart Recommender
                  </a>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
                <div className="rounded-3xl border border-teal-400/30 bg-gradient-to-br from-teal-500/20 to-cyan-500/10 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">Innovation Feature</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Smart Category Recommender</h2>
                  <p className="mt-2 text-sm text-slate-200">
                    Not sure what service you need? Answer 4 short questions and get the right repair category before you browse providers.
                  </p>
                  <a
                    href="/recommender"
                    className="mt-4 inline-flex items-center justify-center rounded-full bg-teal-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
                  >
                    Try Smart Recommender
                  </a>
                </div>

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
                  <button type="button" className="rounded-3xl bg-teal-400 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-teal-300">
                    Search now
                  </button>
                  </form>
                </div>
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
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-300">Service categories</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Browse by category</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-300">Choose a repair type and get matched to local providers quickly.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCategories.map((category) => (
              <article key={category.title} className="glass-panel rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-xl">
                <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${category.accent} text-2xl`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{category.title}</h3>
                <p className="mt-3 text-slate-600 dark:text-slate-300">{category.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-teal-950/95 px-4 py-16 text-white sm:px-6 lg:px-8 dark:bg-slate-950/85">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-300">Smart category recommender</p>
              <h2 className="text-3xl font-bold sm:text-4xl">Not sure where to start?</h2>
              <p className="mt-4 max-w-xl text-slate-300">Use our most common repair recommendations to find the right service type for your needs.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {recommender.map((item) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-white/8 p-5 text-slate-100 backdrop-blur-xl">
                  <p className="text-sm font-semibold text-cyan-200">Recommended</p>
                  <p className="mt-3 text-base leading-7">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="providers" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-300">Provider listing</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Featured providers</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-300">Structured provider cards make it easy to compare services, ratings, and starting prices.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {providerCards.map((provider) => (
              <article key={provider.name} className="glass-panel rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">{provider.category}</p>
                    <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{provider.name}</h3>
                  </div>
                  <div className="glass-pill rounded-3xl px-4 py-2 text-sm font-semibold text-teal-800 dark:text-teal-200">{provider.price}</div>
                </div>
                <p className="text-slate-600 dark:text-slate-300">{provider.note}</p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-300">
                  <span className="glass-pill inline-flex items-center gap-2 rounded-full px-3 py-2 text-slate-700 dark:text-slate-200">
                    ⭐ {provider.rating}
                  </span>
                  <span className="glass-pill inline-flex items-center gap-2 rounded-full px-3 py-2 text-slate-700 dark:text-slate-200">
                    {provider.reviews} reviews
                  </span>
                  <span className="glass-pill inline-flex items-center gap-2 rounded-full px-3 py-2 text-slate-700 dark:text-slate-200">
                    {provider.location}
                  </span>
                </div>
                <button className="mt-8 w-full rounded-3xl bg-teal-500 px-5 py-3 text-base font-semibold text-slate-950 transition hover:bg-teal-400">
                  View Details
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="glass-panel-strong mx-auto max-w-6xl rounded-[2rem] p-10 text-slate-900 dark:text-white sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">List Your Business</p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Grow your repair business with MendHub</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300">Join the local marketplace, reach more customers, and get booked through a simple onboarding flow.</p>
            </div>
            <div className="space-y-4">
              <div className="glass-panel-muted rounded-3xl p-6 text-slate-900 dark:text-slate-100">
                <p className="font-semibold">Free listing setup</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Enter your business in minutes and start appearing in search results.</p>
              </div>
              <button className="w-full rounded-3xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300">
                List Your Business
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
