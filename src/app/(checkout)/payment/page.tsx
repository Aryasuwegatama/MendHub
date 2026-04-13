import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { bookings, quoteRequests, providers, services } from "@/db/schema";
import { eq } from "drizzle-orm";
import { routes } from "@/config/routes";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import InfoBlock from "@/components/ui/InfoBlock";
import PageIntro from "@/components/ui/PageIntro";
import PageShell from "@/components/ui/PageShell";
import SectionLabel from "@/components/ui/SectionLabel";
import PaymentMethodSelector from "@/components/PaymentMethodSelector";

export const metadata: Metadata = {
  title: "Payment — MendHub",
  description: "Review your booking and complete the simulated deposit payment.",
};

type PaymentPageProps = {
  searchParams: Promise<{
    bookingId?: string;
    quoteRequestId?: string;
    amount?: string;
  }>;
};

/**
 * Server Component — reads bookingId or quoteRequestId from URL params,
 * fetches the real record from Neon DB, and renders the booking summary.
 * The interactive payment selector is an isolated Client Component.
 */
export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const { bookingId, quoteRequestId, amount = "65" } = await searchParams;

  // Must have at least one of these to proceed, and DB must be available
  if ((!bookingId && !quoteRequestId) || !db) {
    redirect(routes.providers.index);
  }

  // ── Booking flow ──────────────────────────────────────────────────────────
  if (bookingId) {
    const [booking] = await db
      .select({
        id: bookings.id,
        providerId: bookings.providerId,
        serviceId: bookings.serviceId,
        serviceName: services.name,
        servicePrice: services.startingPrice,
        servicePriceMethod: services.priceMethod,
        customerName: bookings.customerName,
        customerEmail: bookings.customerEmail,
        customerPhone: bookings.customerPhone,
        serviceAddress: bookings.serviceAddress,
        bookingDate: bookings.bookingDate,
        issueDescription: bookings.issueDescription,
        status: bookings.status,
        providerName: providers.businessName,
      })
      .from(bookings)
      .innerJoin(providers, eq(bookings.providerId, providers.id))
      // Left join — serviceId is optional on a booking
      .leftJoin(services, eq(bookings.serviceId, services.id))
      .where(eq(bookings.id, bookingId))
      .limit(1);

    if (!booking) {
      redirect(routes.providers.index);
    }

    // ── Pricing ───────────────────────────────────────────────────────────────
    // Use the real service price from DB when available (fixed-price services).
    // Fall back to the URL `amount` param for quote-based or unpriced services.
    const hasRealPrice =
      booking.servicePriceMethod === "fixed" &&
      booking.servicePrice !== null &&
      booking.servicePrice !== undefined;

    const serviceTotal = hasRealPrice ? parseFloat(booking.servicePrice!) : null;
    const fallbackAmount = parseFloat(amount); // URL param, default "65"

    // Deposit is 30% of total for fixed-price services, otherwise use URL param
    const depositNum = serviceTotal !== null
      ? Math.round(serviceTotal * 0.3 * 100) / 100
      : fallbackAmount;

    const totalNum = serviceTotal ?? fallbackAmount * 3;
    const balanceNum = Math.round((totalNum - depositNum) * 100) / 100;

    const depositLabel = `$${depositNum.toFixed(2)}`;
    const balanceLabel = `$${balanceNum.toFixed(2)}`;
    const totalLabel = `$${totalNum.toFixed(2)}`;

    const formattedDate = new Date(booking.bookingDate).toLocaleDateString("en-AU", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <PageShell>
        <PageIntro
          badge="Payment"
          title="Pay the booking deposit to secure your repair visit."
          description="Review the booking summary, select a payment method, and confirm. No real charge is processed in this demo."
        >
          <div className="flex flex-wrap gap-3">
            <Badge variant="success">Booking recorded</Badge>
            <Badge variant="info">Simulated checkout</Badge>
          </div>
        </PageIntro>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Booking summary — real data from DB */}
          <Card variant="default">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <SectionLabel>Booking summary</SectionLabel>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
                  {booking.providerName}
                </h2>
              </div>
              <span className="rounded-full bg-teal-100 px-4 py-1.5 text-sm font-semibold text-teal-900 dark:bg-teal-400/20 dark:text-teal-200">
                {depositLabel} deposit
              </span>
            </div>

            {/* Selected service chip */}
            {booking.serviceName && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <svg className="h-4 w-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {booking.serviceName}
              </div>
            )}

            {/* Back button — lets user correct booking details before paying */}
            <div className="mt-4">
              <Link
                href={(() => {
                  // Build all query params in one object to avoid double-? URLs
                  const params = new URLSearchParams({
                    prefillName: booking.customerName,
                    prefillEmail: booking.customerEmail,
                    prefillPhone: booking.customerPhone ?? "",
                    prefillSuburb: booking.serviceAddress ?? "",
                    prefillDate: new Date(booking.bookingDate).toLocaleDateString("en-CA"),
                    prefillIssue: booking.issueDescription ?? "",
                  });
                  if (booking.serviceId) params.set("serviceId", booking.serviceId);
                  return `/providers/${booking.providerId}/book?${params.toString()}`;
                })()}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-300"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Go back and edit booking details
              </Link>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoBlock label="Customer">{booking.customerName}</InfoBlock>
              <InfoBlock label="Visit date">{formattedDate}</InfoBlock>
              <InfoBlock label="Suburb / address">{booking.serviceAddress}</InfoBlock>
              <InfoBlock label="Status">
                <span className="capitalize">{booking.status}</span>
              </InfoBlock>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-white/70 bg-white/70 p-5 dark:border-white/10 dark:bg-slate-900/40">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                Reported issue
              </p>
              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                {booking.issueDescription}
              </p>
            </div>

              <div className="mt-6 space-y-3 rounded-[1.5rem] bg-slate-950/90 p-6 text-white dark:bg-slate-950">
                <div className="flex items-center justify-between gap-4 text-sm sm:text-base">
                  <span className="text-slate-300">Booking deposit (30%)</span>
                  <span className="font-semibold text-white">{depositLabel}</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm sm:text-base">
                  <span className="text-slate-300">Remaining balance due on completion</span>
                  <span className="font-semibold text-white">{balanceLabel}</span>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-200">
                      {hasRealPrice ? "Service total" : "Estimated total"}
                    </span>
                    <span className="text-xl font-bold text-white">
                      {totalLabel}
                    </span>
                  </div>
                </div>
              </div>
          </Card>

          {/* Interactive payment selector — Client Component */}
          <PaymentMethodSelector
            bookingId={bookingId}
            amount={depositNum.toString()}
            depositLabel={depositLabel}
            balanceLabel={balanceLabel}
          />
        </div>
      </PageShell>
    );
  }

  // ── Quote flow ────────────────────────────────────────────────────────────
  const [quote] = await db
    .select({
      id: quoteRequests.id,
      customerName: quoteRequests.customerName,
      customerEmail: quoteRequests.customerEmail,
      issueDescription: quoteRequests.issueDescription,
      preferredDate: quoteRequests.preferredDate,
      status: quoteRequests.status,
      providerName: providers.businessName,
    })
    .from(quoteRequests)
    .innerJoin(providers, eq(quoteRequests.providerId, providers.id))
    .where(eq(quoteRequests.id, quoteRequestId!))
    .limit(1);

  if (!quote) {
    redirect(routes.providers.index);
  }

  return (
    <PageShell>
      <PageIntro
        badge="Quote Request"
        title="Your quote request has been received."
        description="Review your request details below and confirm to finalise. A provider will contact you within 24 hours with a quote."
      >
        <div className="flex flex-wrap gap-3">
          <Badge variant="success">Quote request recorded</Badge>
          <Badge variant="info">No deposit required</Badge>
        </div>
      </PageIntro>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Quote summary — real data from DB */}
        <Card variant="default">
          <SectionLabel>Quote request summary</SectionLabel>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
            {quote.providerName}
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <InfoBlock label="Customer">{quote.customerName}</InfoBlock>
            {quote.preferredDate && (
              <InfoBlock label="Preferred date">{quote.preferredDate}</InfoBlock>
            )}
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/70 bg-white/70 p-5 dark:border-white/10 dark:bg-slate-900/40">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
              Issue description
            </p>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              {quote.issueDescription}
            </p>
          </div>
        </Card>

        {/* Interactive confirm selector — Client Component */}
        <PaymentMethodSelector
          quoteRequestId={quoteRequestId}
          amount="0"
          depositLabel="$0.00"
          balanceLabel="TBD after quote"
        />
      </div>
    </PageShell>
  );
}
