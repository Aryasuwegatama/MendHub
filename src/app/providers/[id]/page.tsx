import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/ui/Card";
import PageIntro from "@/components/ui/PageIntro";
import { getMockProviderById } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "Provider Details",
  description: "View provider information, services, and pricing.",
};

export default async function ProviderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const provider = getMockProviderById(id);

  if (!provider) {
    return (
      <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <PageIntro
            badge="Provider Details"
            title="Provider not found"
            description="This provider does not exist in the current mock dataset. Return to the providers page to browse available demo listings."
          />

          <div className="mt-10">
            <Card className="bg-white/52 dark:bg-slate-950/42">
              <div className="flex flex-wrap gap-3">
                <Link href="/providers" className="inline-flex items-center justify-center rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-400">
                  Back to Providers
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <PageIntro
          badge="Provider Details"
          title={provider.name}
          description={provider.description}
        >
          <div className="flex flex-wrap gap-3">
            <span className="glass-pill inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {provider.categoryLabel}
            </span>
            {provider.verified ? (
              <span className="inline-flex items-center rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-slate-950">
                Verified Provider
              </span>
            ) : null}
            <span className="glass-pill inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
              ⭐ {provider.rating} rating placeholder
            </span>
          </div>
        </PageIntro>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <Card className="bg-white/52 dark:bg-slate-950/42">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Business overview</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300">{provider.note}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="glass-panel-muted rounded-2xl p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">Suburb</p>
                  <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">{provider.suburb}</p>
                </div>
                <div className="glass-panel-muted rounded-2xl p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">Service Area</p>
                  <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">{provider.serviceArea}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/52 dark:bg-slate-950/42">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Services</h2>
                <span className="glass-pill rounded-full px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {provider.services.length} listed
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {provider.services.map((service) => (
                  <div key={service.name} className="glass-panel-muted rounded-2xl p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{service.name}</h3>
                        <p className="mt-2 text-slate-600 dark:text-slate-300">{service.description}</p>
                      </div>
                      <div className="rounded-full bg-teal-100/90 px-4 py-2 text-sm font-semibold text-teal-900 dark:bg-teal-400/15 dark:text-teal-200">
                        {service.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/52 dark:bg-slate-950/42">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Pricing info</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300">{provider.pricingInfo}</p>
              <div className="mt-5 rounded-2xl bg-teal-500 px-5 py-4 text-sm font-semibold text-slate-950 shadow-sm shadow-teal-900/10">
                {provider.price}
              </div>
            </Card>

            <Card className="bg-white/52 dark:bg-slate-950/42">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Take the next step</h2>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link href={`/providers/${id}/quote`} className="inline-flex items-center justify-center rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-400">
                  Request Quote
                </Link>
                <Link href={`/providers/${id}/book`} className="glass-pill inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white/80 dark:text-slate-200 dark:hover:bg-white/10">
                  Book Service
                </Link>
              </div>
            </Card>

            <Card className="bg-white/52 dark:bg-slate-950/42">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Map</h2>
              <div className="mt-5 rounded-[1.5rem] border border-dashed border-slate-300/80 bg-gradient-to-br from-teal-100/70 via-white/60 to-cyan-100/70 p-6 dark:border-slate-700 dark:from-slate-900/80 dark:via-slate-950/70 dark:to-cyan-950/40">
                <div className="flex min-h-52 flex-col items-center justify-center rounded-[1.25rem] border border-white/60 bg-white/40 text-center backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/40">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Map placeholder</p>
                  <p className="mt-3 max-w-xs text-sm text-slate-600 dark:text-slate-300">
                    Interactive map will appear here later. Current suburb: {provider.suburb}. Service area: {provider.serviceArea}.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
