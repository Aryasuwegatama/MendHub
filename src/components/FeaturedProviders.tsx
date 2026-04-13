import Link from "next/link";
import { routes } from "@/config/routes";
import SectionLabel from "@/components/ui/SectionLabel";
import PriceBadge from "@/components/ui/PriceBadge";
import { db } from "@/db";
import { providers, providerCategories, categories, services, reviews } from "@/db/schema";
import { eq, and, avg, count } from "drizzle-orm";

export default async function FeaturedProviders() {
  // Fetch featured active providers from Neon database
  const featuredProviders = await db
    .select()
    .from(providers)
    .where(and(eq(providers.isFeatured, true), eq(providers.status, "active")))
    .limit(4);

  const providerData = await Promise.all(
    featuredProviders.map(async (p) => {
      const [cat] = await db
        .select({ name: categories.name })
        .from(providerCategories)
        .innerJoin(categories, eq(providerCategories.categoryId, categories.id))
        .where(eq(providerCategories.providerId, p.id))
        .limit(1);

      const [svc] = await db
        .select({ startingPrice: services.startingPrice, priceMethod: services.priceMethod })
        .from(services)
        .where(and(eq(services.providerId, p.id), eq(services.isActive, true)))
        .orderBy(services.startingPrice)
        .limit(1);

      const [reviewStats] = await db
        .select({
          avgRating: avg(reviews.rating),
          reviewCount: count(reviews.id),
        })
        .from(reviews)
        .where(eq(reviews.providerId, p.id));

      const price = svc?.startingPrice
        ? `From $${Number(svc.startingPrice).toFixed(0)}`
        : "Quote required";

      const avgRating = reviewStats?.avgRating ? Number(reviewStats.avgRating) : null;
      const reviewCount = reviewStats?.reviewCount ?? 0;

      return {
        ...p,
        category: cat?.name ?? "Repair Service",
        price,
        avgRating,
        reviewCount,
      };
    })
  );
  return (
    <section id="providers" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <SectionLabel>Featured Providers</SectionLabel>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Featured Providers
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
            Top repair services in Brisbane
          </p>
        </div>

        <div className="-mx-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:px-0">
          <div className="flex snap-x gap-4 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
            {providerData.map((provider) => (
              <article
                key={provider.id}
                className="glass-panel min-w-[285px] snap-start rounded-2xl p-6 shadow-lg shadow-slate-900/5 lg:min-w-0"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                      {provider.category}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">
                      {provider.businessName}
                    </h3>
                  </div>
                  <span className="glass-pill rounded-full px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {provider.isFeatured ? "Featured" : "Listed"}
                  </span>
                </div>

                <p className="mt-4 text-sm font-medium text-teal-800 dark:text-teal-200">
                  {provider.suburb}
                </p>
                <p className="mt-3 line-clamp-2 text-slate-600 dark:text-slate-300">
                  {provider.description}
                </p>

                {provider.avgRating !== null && provider.reviewCount > 0 && (
                  <div className="mt-4 flex items-center gap-1.5">
                    <span className="text-amber-400 text-sm" aria-hidden="true">★★★★★</span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {provider.avgRating.toFixed(1)}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      ({provider.reviewCount} reviews)
                    </span>
                  </div>
                )}

                <PriceBadge className="mt-5">{provider.price}</PriceBadge>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Link
                    href={routes.providers.details(provider.id)}
                    className="inline-flex items-center justify-center rounded-full bg-teal-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-400"
                  >
                    View Details
                  </Link>
                  <Link
                    href={routes.providers.quote(provider.id)}
                    className="glass-pill inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white/80 dark:text-slate-200 dark:hover:bg-white/10"
                  >
                    Request Quote
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
