import type { Metadata } from "next";
import Link from "next/link";
import { routes } from "@/config/routes";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import PageIntro from "@/components/ui/PageIntro";
import PageShell from "@/components/ui/PageShell";
import PriceBadge from "@/components/ui/PriceBadge";
import SectionLabel from "@/components/ui/SectionLabel";
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
    <PageShell>
        <PageIntro
          badge="Provider Listing"
          title={selectedCategory ? `${selectedCategory.title} providers` : "Find Providers"}
          description={selectedCategory
            ? `Showing static mock providers for ${selectedCategory.title}. The selected category is being read from the URL query param.`
            : "Browse and compare repair providers in Brisbane using static demo data only. Category filtering comes from the URL query string."}
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="w-full max-w-md">
              <Input
                label="Filter by suburb"
                placeholder="UI only for now, e.g. Brisbane CBD"
                aria-label="Filter providers by suburb"
              />
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                This suburb field is visual only for now and does not filter results yet.
              </p>
            </div>

            {selectedCategory ? (
              <Link
                href={routes.providers.index}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-800 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-200 dark:hover:border-teal-300 dark:hover:text-teal-200"
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
                  href={routes.providers.byCategory(category.key)}
                  className={isActive
                    ? "inline-flex items-center rounded-full border border-teal-300 bg-teal-100/90 px-4 py-2 text-sm font-semibold text-teal-900"
                    : "inline-flex items-center rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-800 dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:border-teal-400 dark:hover:text-teal-200"
                  }
                >
                  {category.title}
                </Link>
              );
            })}
          </div>
        </PageIntro>

        <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProviders.map((provider) => (
            <Card key={provider.id} hoverable variant="default" className="border-white/70">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <SectionLabel>{provider.categoryLabel}</SectionLabel>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{provider.name}</h2>
                </div>
                <PriceBadge>{provider.price}</PriceBadge>
              </div>

              <p className="mt-5 text-slate-600 dark:text-slate-300">{provider.note}</p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
                <span className="rounded-full border border-white/80 bg-white/75 px-3 py-2 dark:border-white/10 dark:bg-slate-900/40">⭐ {provider.rating}</span>
                <span className="rounded-full border border-white/80 bg-white/75 px-3 py-2 dark:border-white/10 dark:bg-slate-900/40">{provider.reviews} reviews</span>
                <span className="rounded-full border border-white/80 bg-white/75 px-3 py-2 dark:border-white/10 dark:bg-slate-900/40">Suburb: {provider.suburb}</span>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <Link
                  href={routes.providers.details(provider.id)}
                  className="inline-flex items-center justify-center rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-400"
                >
                  View Details
                </Link>
                <Link
                  href={routes.providers.quote(provider.id)}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-800 dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:border-teal-300 dark:hover:text-teal-200"
                >
                  Request Quote
                </Link>
                <Link
                  href={routes.providers.book(provider.id)}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-800 dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:border-teal-300 dark:hover:text-teal-200"
                >
                  Book Service
                </Link>
              </div>
            </Card>
          ))}
        </section>

        {filteredProviders.length === 0 ? (
          <section className="mt-10">
            <Card variant="default" className="border-white/70 text-center">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">No providers in this demo category yet</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300">
                Try another category filter or return to browse all providers.
              </p>
            </Card>
          </section>
        ) : null}
    </PageShell>
  );
}
