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
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-slate-950 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] bg-slate-950/10 p-8 backdrop-blur-xl sm:p-12">
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
                  <a href="#providers" className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-base font-semibold text-white transition hover:border-white hover:bg-white/10">
                    Find My Repair
                  </a>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-slate-950/20">
                <h2 className="text-xl font-semibold text-white">Quick search</h2>
                <form className="mt-6 grid gap-4">
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

      <section id="categories" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-600">Service categories</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Browse by category</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">Choose a repair type and get matched to local providers quickly.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCategories.map((category) => (
              <article key={category.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${category.accent} text-2xl`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{category.title}</h3>
                <p className="mt-3 text-slate-600">{category.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-teal-950 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-300">Smart category recommender</p>
              <h2 className="text-3xl font-bold sm:text-4xl">Not sure where to start?</h2>
              <p className="mt-4 max-w-xl text-slate-300">Use our most common repair recommendations to find the right service type for your needs.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {recommender.map((item) => (
                <div key={item} className="rounded-3xl border border-teal-500/20 bg-teal-950/80 p-5 text-slate-100">
                  <p className="text-sm font-semibold text-cyan-200">Recommended</p>
                  <p className="mt-3 text-base leading-7">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="providers" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-600">Provider listing</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Featured providers</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">Structured provider cards make it easy to compare services, ratings, and starting prices.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {providerCards.map((provider) => (
              <article key={provider.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">{provider.category}</p>
                    <h3 className="mt-3 text-2xl font-semibold text-slate-900">{provider.name}</h3>
                  </div>
                  <div className="rounded-3xl bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800">{provider.price}</div>
                </div>
                <p className="text-slate-600">{provider.note}</p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-slate-700">
                    ⭐ {provider.rating}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-slate-700">
                    {provider.reviews} reviews
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-slate-700">
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

      <section className="bg-slate-900 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-cyan-500/20 bg-slate-950/90 p-10 shadow-2xl shadow-slate-950/20 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">List Your Business</p>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Grow your repair business with MendHub</h2>
              <p className="mt-4 text-slate-300">Join the local marketplace, reach more customers, and get booked through a simple onboarding flow.</p>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl bg-slate-900/80 p-6 text-slate-100">
                <p className="font-semibold">Free listing setup</p>
                <p className="mt-2 text-sm text-slate-400">Enter your business in minutes and start appearing in search results.</p>
              </div>
              <button className="w-full rounded-3xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300">
                List Your Business
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 px-4 py-12 text-slate-300 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">MendHub</h3>
            <p className="max-w-md text-slate-400">A mobile-first repair marketplace for Brisbane, built for small businesses and local customers.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Explore</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li>Services</li>
                <li>Providers</li>
                <li>How it works</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Company</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li>About</li>
                <li>Contact</li>
                <li>Privacy</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Contact</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li>info@mendhub.com.au</li>
                <li>(07) 1234 5678</li>
                <li>Brisbane, QLD</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Follow</p>
              <div className="mt-4 flex items-center gap-3 text-2xl text-slate-400">
                <span>📘</span>
                <span>🐦</span>
                <span>📷</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          &copy; 2026 MendHub. This platform is for informational purposes only.
        </div>
      </footer>
    </main>
  );
}
