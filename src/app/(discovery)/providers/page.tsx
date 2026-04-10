import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db";
import { providers, providerCategories, categories, services } from "@/db/schema";
import { eq, and, ilike, exists } from "drizzle-orm";
import { routes } from "@/config/routes";
import Card from "@/components/ui/Card";
import PageIntro from "@/components/ui/PageIntro";
import PageShell from "@/components/ui/PageShell";
import PriceBadge from "@/components/ui/PriceBadge";
import SectionLabel from "@/components/ui/SectionLabel";
import SuburbFilterInput from "@/components/SuburbFilterInput";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Find Providers — MendHub",
  description: "Search and filter repair service providers in Brisbane.",
};

type ProvidersPageProps = {
  searchParams: Promise<{
    category?: string | string[];
    suburb?: string;
  }>;
};

/**
 * Server Component — queries Neon DB directly via Drizzle (no HTTP round-trip).
 * Supports filtering by category slug and suburb (partial, case-insensitive).
 */
export default async function ProvidersPage({ searchParams }: ProvidersPageProps) {
  const resolvedParams = await searchParams;

  // Normalise array params (Next.js may give string[] for repeated keys)
  const categoryParam = Array.isArray(resolvedParams.category)
    ? resolvedParams.category[0]
    : resolvedParams.category;
  const suburbParam = resolvedParams.suburb?.trim() ?? "";

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

  // ── Data fetching ────────────────────────────────────────────────────────
  const [rawProviders, dbCategories] = await Promise.all([
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
  ]);

  // Augment each provider with category names and starting price
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

      const price = cheapest?.startingPrice
        ? `From $${Number(cheapest.startingPrice).toFixed(0)}`
        : "Quote required";

      return { ...p, categories: cats, price };
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
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          {/* Functional suburb filter — Client Component */}
          <div className="w-full max-w-md">
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Filter by suburb
            </label>
            <SuburbFilterInput defaultValue={suburbParam} />
            {suburbParam && (
              <p className="mt-2 text-sm text-teal-700 dark:text-teal-300">
                Filtering results for: <strong>{suburbParam}</strong>
              </p>
            )}
          </div>

          {/* Clear active filters */}
          {(selectedCategory || suburbParam) && (
            <Link
              href={routes.providers.index}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-800 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-200 dark:hover:border-teal-300 dark:hover:text-teal-200"
            >
              Clear all filters
            </Link>
          )}
        </div>

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

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
                <span className="rounded-full border border-white/80 bg-white/75 px-3 py-2 dark:border-white/10 dark:bg-slate-900/40">
                  {provider.isFeatured ? "Featured" : "Verified Professional"}
                </span>
                <span className="rounded-full border border-white/80 bg-white/75 px-3 py-2 dark:border-white/10 dark:bg-slate-900/40">
                  Suburb: {provider.suburb}
                </span>
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
      ) : (
        <section className="mt-10">
          <Card variant="default" className="border-white/70 text-center">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              No providers found
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              {suburbParam || selectedCategory
                ? "No providers match your current filters. Try adjusting or clearing them."
                : "No active providers are available right now."}
            </p>
            {(suburbParam || selectedCategory) && (
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
