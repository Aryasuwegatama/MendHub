import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db";
import { providers, providerCategories, categories, services, reviews } from "@/db/schema";
import { eq, and, ilike, exists, avg, count } from "drizzle-orm";
import { routes } from "@/config/routes";
import Card from "@/components/ui/Card";
import PageIntro from "@/components/ui/PageIntro";
import PageShell from "@/components/ui/PageShell";
import PriceBadge from "@/components/ui/PriceBadge";
import SectionLabel from "@/components/ui/SectionLabel";
import SuburbFilterInput from "@/components/SuburbFilterInput";
import { BRISBANE_SUBURBS } from "@/lib/brisbane-suburbs";

import ServiceSearchInput from "@/components/providers/ServiceSearchInput";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Find Providers — MendHub",
  description: "Search and filter repair service providers in Brisbane.",
};

type ProvidersPageProps = {
  searchParams: Promise<{
    category?: string | string[];
    suburb?: string;
    q?: string;
  }>;
};

/**
 * Server Component — queries Neon DB directly via Drizzle (no HTTP round-trip).
 * Supports filtering by category slug, suburb, and service keyword 'q'.
 */
export default async function ProvidersPage({ searchParams }: ProvidersPageProps) {
  const resolvedParams = await searchParams;

  // Normalise array params (Next.js may give string[] for repeated keys)
  const categoryParam = Array.isArray(resolvedParams.category)
    ? resolvedParams.category[0]
    : resolvedParams.category;
  const suburbParam = resolvedParams.suburb?.trim() ?? "";
  const queryParam = resolvedParams.q?.trim() ?? "";

  // ── Filters ─────────────────────────────────────────────────────────────
  const conditions = [eq(providers.status, "active")];

  if (suburbParam) {
    conditions.push(ilike(providers.suburb, `%${suburbParam}%`));
  }

  if (categoryParam) {
    conditions.push(
      exists(
        db
          .select()
          .from(providerCategories)
          .innerJoin(categories, eq(providerCategories.categoryId, categories.id))
          .where(
            and(
              eq(providerCategories.providerId, providers.id),
              eq(categories.slug, categoryParam)
            )
          )
      )
    );
  }

  // Filter by service keyword if 'q' is provided
  if (queryParam) {
    conditions.push(
      exists(
        db
          .select()
          .from(services)
          .where(
            and(
              eq(services.providerId, providers.id),
              eq(services.isActive, true),
              and(
                ilike(services.name, `%${queryParam}%`),
              )
            )
          )
      )
    );
  }

  // ── Data fetching ────────────────────────────────────────────────────────
  const [rawProviders, dbCategories, rawServices] = await Promise.all([
    db
      .select()
      .from(providers)
      .where(and(...conditions))
      .orderBy(providers.isFeatured, providers.businessName),
    db
      .select()
      .from(categories)
      .where(eq(categories.isActive, true))
      .orderBy(categories.name),
    db
      .selectDistinct({ name: services.name, category: categories.name })
      .from(services)
      .innerJoin(providerCategories, eq(providerCategories.providerId, services.providerId))
      .innerJoin(categories, eq(categories.id, providerCategories.categoryId))
      .where(eq(services.isActive, true)),
  ]);

  const availableSuburbs = BRISBANE_SUBURBS;
  
  // Sort category alphabetically, then service name alphabetically
  const availableServices = rawServices
    .filter((s) => s.name && s.category)
    .sort((a, b) => {
      if (a.category === b.category) return a.name.localeCompare(b.name);
      return a.category.localeCompare(b.category);
    });

  // Augment each provider with category names, starting price, AND matching services
  const augmentedProviders = await Promise.all(
    rawProviders.map(async (p) => {
      const cats = await db
        .select({ name: categories.name, slug: categories.slug })
        .from(providerCategories)
        .innerJoin(categories, eq(providerCategories.categoryId, categories.id))
        .where(eq(providerCategories.providerId, p.id));

      const [cheapest] = await db
        .select({ startingPrice: services.startingPrice })
        .from(services)
        .where(and(eq(services.providerId, p.id), eq(services.isActive, true)))
        .orderBy(services.startingPrice)
        .limit(1);

      // Fetch sample of matching services if searching by keyword
      let matchingServices: { id: string, name: string }[] = [];
      if (queryParam) {
        matchingServices = await db
          .select({ id: services.id, name: services.name })
          .from(services)
          .where(
            and(
              eq(services.providerId, p.id),
              eq(services.isActive, true),
              ilike(services.name, `%${queryParam}%`)
            )
          )
          .limit(3);
      }

      const [reviewStats] = await db
        .select({
          avgRating: avg(reviews.rating),
          reviewCount: count(reviews.id),
        })
        .from(reviews)
        .where(eq(reviews.providerId, p.id));

      const price = cheapest?.startingPrice
        ? `From $${Number(cheapest.startingPrice).toFixed(0)}`
        : "Quote required";

      const avgRating = reviewStats?.avgRating ? Number(reviewStats.avgRating) : null;
      const reviewCount = reviewStats?.reviewCount ?? 0;

      return { ...p, categories: cats, price, matchingServices, avgRating, reviewCount };
    })
  );

  const selectedCategory = dbCategories.find((c) => c.slug === categoryParam) ?? null;

  return (
    <PageShell>
      <PageIntro
        badge="Provider Listing"
        title={selectedCategory ? `${selectedCategory.name} providers` : "Find Providers"}
        description={
          selectedCategory
            ? `Browse professional ${selectedCategory.name.toLowerCase()} services in Brisbane.`
            : "Find and compare top-rated repair professionals across Brisbane suburbs."
        }
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid w-full gap-6 md:grid-cols-2 lg:max-w-3xl">
            {/* Functional suburb filter — Client Component */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Filter by suburb
              </label>
              <SuburbFilterInput defaultValue={suburbParam} availableSuburbs={availableSuburbs} />
            </div>

            {/* Service keyword search — Client Component */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Search specific services
              </label>
              <ServiceSearchInput defaultValue={queryParam} availableServices={availableServices} />
            </div>
          </div>

          {/* Clear active filters */}
          {(selectedCategory || suburbParam || queryParam) && (
            <Link
              href={routes.providers.index}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-800 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-200 dark:hover:border-teal-300 dark:hover:text-teal-200"
            >
              Clear all filters
            </Link>
          )}
        </div>

        {/* Status messages for filters */}
        {(suburbParam || queryParam) && (
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-teal-700 dark:text-teal-300">
            {suburbParam && (
              <p>
                Filtering results for: <strong>{suburbParam}</strong>
              </p>
            )}
            {queryParam && (
              <p>
                Searching for services matching: <strong>&quot;{queryParam}&quot;</strong>
              </p>
            )}
          </div>
        )}

        {/* Category filter pills */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Filter by category</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Select a repair category to narrow down providers.
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {dbCategories.map((category) => {
            const isActive = category.slug === categoryParam;
            return (
              <Link
                key={category.id}
                href={routes.providers.byCategory(category.slug)}
                className={
                  isActive
                    ? "inline-flex items-center rounded-full border border-teal-300 bg-teal-100/90 px-4 py-2 text-sm font-semibold text-teal-900"
                    : "inline-flex items-center rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-800 dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:border-teal-400 dark:hover:text-teal-200"
                }
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      </PageIntro>

      {/* Provider grid */}
      {augmentedProviders.length > 0 ? (
        <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {augmentedProviders.map((provider) => (
            <Card key={provider.id} hoverable variant="default" className="border-white/70">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <SectionLabel>{provider.categories?.[0]?.name ?? "Repair Service"}</SectionLabel>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
                    {provider.businessName}
                  </h2>
                </div>
                <PriceBadge>{provider.price}</PriceBadge>
              </div>

              <p className="mt-5 line-clamp-3 text-slate-600 dark:text-slate-300">
                {provider.description}
              </p>

              {/* Matching services preview if searching */}
              {provider.matchingServices.length > 0 && (
                <div className="mt-4 space-y-2 rounded-xl bg-teal-50/50 p-3 dark:bg-teal-950/20 text-teal-900 dark:text-teal-200">
                  <p className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                    Services matching &quot;{queryParam}&quot;
                  </p>
                  <ul className="space-y-1">
                    {provider.matchingServices.map((s) => (
                      <li key={s.id} className="text-sm font-medium">
                        • {s.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
                <span className="rounded-full border border-white/80 bg-white/75 px-3 py-2 dark:border-white/10 dark:bg-slate-900/40">
                  {provider.isFeatured ? "Featured" : "Verified Professional"}
                </span>
                <span className="rounded-full border border-white/80 bg-white/75 px-3 py-2 dark:border-white/10 dark:bg-slate-900/40">
                  Suburb: {provider.suburb}
                </span>
                {provider.avgRating !== null && provider.reviewCount > 0 && (
                  <span className="flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50/80 px-3 py-2 dark:border-amber-400/20 dark:bg-amber-400/10">
                    <span className="text-amber-400 text-sm leading-none">{'★'.repeat(Math.round(provider.avgRating))}{'☆'.repeat(5 - Math.round(provider.avgRating))}</span>
                    <span className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                      {provider.avgRating.toFixed(1)}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      ({provider.reviewCount} {provider.reviewCount === 1 ? 'review' : 'reviews'})
                    </span>
                  </span>
                )}
              </div>

              <div className="mt-8">
                <Link
                  href={routes.providers.details(provider.id)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-400"
                >
                  View Services & Details
                </Link>
              </div>
            </Card>
          ))}
        </section>
      ) : (
        <section className="mt-10">
          <Card variant="default" className="border-white/70 text-center">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              No providers found
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              {suburbParam || selectedCategory || queryParam
                ? "No providers match your current filters. Try adjusting or clearing them."
                : "No active providers are available right now."}
            </p>
            {(suburbParam || selectedCategory || queryParam) && (
              <div className="mt-6">
                <Link
                  href={routes.providers.index}
                  className="inline-flex items-center justify-center rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-400"
                >
                  View all providers
                </Link>
              </div>
            )}
          </Card>
        </section>
      )}
    </PageShell>
  );
}
