import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { providers, services, providerCategories, categories } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { routes } from "@/config/routes";
import Card from "@/components/ui/Card";
import PageIntro from "@/components/ui/PageIntro";
import PageShell from "@/components/ui/PageShell";
import PriceBadge from "@/components/ui/PriceBadge";

export const dynamic = "force-dynamic";

/** Shared helper — fetches provider, services, and categories from Neon DB directly. */
async function getProviderData(id: string) {
  const [provider] = await db
    .select()
    .from(providers)
    .where(eq(providers.id, id))
    .limit(1);

  if (!provider) return null;

  const [providerServices, providerCategoryList] = await Promise.all([
    db
      .select()
      .from(services)
      .where(and(eq(services.providerId, id), eq(services.isActive, true))),
    db
      .select({ id: categories.id, name: categories.name, slug: categories.slug })
      .from(providerCategories)
      .innerJoin(categories, eq(providerCategories.categoryId, categories.id))
      .where(eq(providerCategories.providerId, id)),
  ]);

  return { ...provider, services: providerServices, categories: providerCategoryList };
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const provider = await getProviderData(id);
  if (!provider) return { title: "Provider Not Found — MendHub" };
  return {
    title: `${provider.businessName} — MendHub`,
    description: provider.description,
  };
}

export default async function ProviderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const provider = await getProviderData(id);

  if (!provider) {
    notFound();
  }

  return (
    <PageShell>
      <PageIntro
        badge="Provider Details"
        title={provider.businessName}
        description={provider.description}
      >
        <div className="flex flex-col gap-3 mt-2">
          <div className="flex flex-wrap gap-3">
            <span className="glass-pill inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {provider.categories?.[0]?.name ?? "Repair Service"}
            </span>
            {provider.isFeatured ? (
              <span className="inline-flex items-center rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-slate-950">
                Featured Professional
              </span>
            ) : (
              <span className="glass-pill inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                Verified Provider
              </span>
            )}
          </div>
          {provider.suburb && (
            <div className="flex">
              <span className="glass-pill inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                {provider.suburb}
                {provider.serviceArea && provider.serviceArea !== provider.suburb && ` (${provider.serviceArea})`}
              </span>
            </div>
          )}
        </div>
      </PageIntro>

      <div className="mt-10 space-y-6">
        {/* Services — shown first so users see what they can book immediately */}
        <Card variant="default">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Services</h2>
            <span className="glass-pill rounded-full px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {provider.services.length} listed
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {provider.services.map((service) => (
              <div key={service.id} className="glass-panel-muted rounded-2xl p-5">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{service.description}</p>
                    <div className="mt-3">
                      <PriceBadge>
                        {service.startingPrice
                          ? service.priceMethod === "fixed"
                            ? `$${Number(service.startingPrice).toFixed(0)}`
                            : `From $${Number(service.startingPrice).toFixed(0)}`
                          : "Quote required"}
                      </PriceBadge>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col gap-2 min-w-[140px]">
                    {service.priceMethod === "fixed" ? (
                      <Link
                        href={routes.providers.book(id, service.id)}
                        className="inline-flex items-center justify-center rounded-full bg-teal-500 px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-teal-400"
                      >
                        Book Now
                      </Link>
                    ) : (
                      <Link
                        href={routes.providers.quote(id, service.id)}
                        className="inline-flex items-center justify-center rounded-full bg-teal-500 px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-teal-400"
                      >
                        Get Quote
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
