import { db } from "@/db";
import { providers, services } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import QuoteRequestForm from "@/components/forms/QuoteRequestForm";
import PageShell from "@/components/ui/PageShell";
import PageIntro from "@/components/ui/PageIntro";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Request a Quote — MendHub",
  description: "Submit a quote request to this repair provider.",
};

export default async function QuoteRequestPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ serviceId?: string }>;
}) {
  const { id } = await params;
  const { serviceId } = await searchParams;

  const [provider] = await db
    .select()
    .from(providers)
    .where(eq(providers.id, id))
    .limit(1);

  if (!provider) notFound();

  let selectedService = null;
  if (serviceId) {
    const [service] = await db
      .select()
      .from(services)
      .where(and(eq(services.id, serviceId), eq(services.providerId, id)))
      .limit(1);
    selectedService = service;
  }

  return (
    <PageShell>
      <PageIntro
        badge="Quote Request"
        title="Get a repair quote"
        description={`Request a free estimate from ${provider.businessName}.`}
      />

      {selectedService && (
        <div className="mt-8 rounded-2xl bg-teal-500/10 border border-teal-500/20 p-6 dark:bg-teal-500/5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-500 text-slate-950">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-teal-700 dark:text-teal-400 uppercase tracking-wider">Service Selected</p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedService.name}</h3>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10">
        <QuoteRequestForm providerId={id} serviceId={serviceId} />
      </div>
    </PageShell>
  );
}
