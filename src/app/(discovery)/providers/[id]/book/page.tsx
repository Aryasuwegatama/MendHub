import type { Metadata } from "next";
import { db } from "@/db";
import { providers, services } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { notFound } from "next/navigation";
import BookingForm from "@/components/forms/BookingForm";
import PageIntro from "@/components/ui/PageIntro";
import PageShell from "@/components/ui/PageShell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book a Repair — MendHub",
  description: "Schedule your repair appointment with this provider.",
};

export default async function BookingPage({
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
        badge="Booking Request"
        title="Schedule your repair"
        description={`Book your appointment with ${provider.businessName}.`}
      />

      {selectedService && (
        <div className="mt-8 rounded-2xl bg-teal-500/10 border border-teal-500/20 p-6 dark:bg-teal-500/5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-500 text-slate-950">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
        <BookingForm providerId={id} serviceId={serviceId} />
      </div>
    </PageShell>
  );
}
