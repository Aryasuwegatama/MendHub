import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { categories, mockProviders } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "Find Providers",
  description: "Search and filter repair service providers in Brisbane.",
};

type ProvidersPageProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

export default async function ProvidersPage({ searchParams }: ProvidersPageProps) {
  const resolvedSearchParams = await searchParams;
  const categoryParam = Array.isArray(resolvedSearchParams.category)
    ? resolvedSearchParams.category[0]
    : resolvedSearchParams.category;

  const selectedCategory = categories.find((category) => category.key === categoryParam) ?? null;
  const filteredProviders = selectedCategory
    ? mockProviders.filter((provider) => provider.category === selectedCategory.key)
    : mockProviders;

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/50 px-6 py-12 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="inline-flex rounded-full border border-cyan-200 bg-cyan-50/80 px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-800">
                Provider listing
              </p>
              <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {selectedCategory ? `${selectedCategory.title} providers` : "Find Providers"}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                {selectedCategory
                  ? `Showing static demo providers for ${selectedCategory.title}. The selected category is coming from the URL query param.`
                  : "Browse and compare repair providers in Brisbane, or choose a category filter to narrow the list."}
              </p>
            </div>

            {selectedCategory ? (
              <Link
                href="/providers"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-800"
              >
                Clear category filter
              </Link>
            ) : null}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((category) => {
              const isActive = category.key === selectedCategory?.key;

              return (
                <Link
                  key={category.key}
                  href={`/providers?category=${category.key}`}
                  className={isActive
                    ? "inline-flex items-center rounded-full border border-teal-300 bg-teal-100/90 px-4 py-2 text-sm font-semibold text-teal-900"
                    : "inline-flex items-center rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-800"
                  }
                >
                  {category.title}
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProviders.map((provider) => (
            <Card key={provider.id} hoverable className="border-white/70 bg-white/55">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
                    {provider.categoryLabel}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">{provider.name}</h2>
                </div>
                <div className="rounded-full bg-teal-100/90 px-4 py-2 text-sm font-semibold text-teal-900">
                  {provider.price}
                </div>
              </div>

              <p className="mt-5 text-slate-600">{provider.note}</p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
                <span className="rounded-full border border-white/80 bg-white/75 px-3 py-2">⭐ {provider.rating}</span>
                <span className="rounded-full border border-white/80 bg-white/75 px-3 py-2">{provider.reviews} reviews</span>
                <span className="rounded-full border border-white/80 bg-white/75 px-3 py-2">{provider.location}</span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/providers/${provider.id}`}
                  className="inline-flex items-center justify-center rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-400"
                >
                  View Details
                </Link>
                <Link
                  href={`/providers/${provider.id}/book`}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-800"
                >
                  Book Now
                </Link>
              </div>
            </Card>
          ))}
        </section>

        {filteredProviders.length === 0 ? (
          <section className="mt-10">
            <Card className="border-white/70 bg-white/55 text-center">
              <h2 className="text-2xl font-semibold text-slate-900">No providers in this demo category yet</h2>
              <p className="mt-3 text-slate-600">
                Try another category filter or return to browse all providers.
              </p>
            </Card>
          </section>
        ) : null}
      </div>
    </div>
  );
}
