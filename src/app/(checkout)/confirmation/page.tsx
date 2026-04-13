import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { payments, bookings, quoteRequests, providers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { routes } from "@/config/routes";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import InfoBlock from "@/components/ui/InfoBlock";
import PageIntro from "@/components/ui/PageIntro";
import PageShell from "@/components/ui/PageShell";
import PriceBadge from "@/components/ui/PriceBadge";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Confirmation — MendHub",
  description: "Your booking or quote request has been confirmed.",
};

type ConfirmationPageProps = {
  searchParams: Promise<{ ref?: string }>;
};

/**
 * Server Component — reads transaction reference from URL, fetches the real
 * payment record from Neon DB, and renders a live receipt using real data.
 */
export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const { ref } = await searchParams;

  if (!ref) {
    redirect(routes.providers.index);
  }

  // Fetch payment via transaction reference
  const [payment] = await db
    .select()
    .from(payments)
    .where(eq(payments.transactionReference, ref))
    .limit(1);

  if (!payment) {
    redirect(routes.providers.index);
  }

  // Resolve the linked booking or quote request with provider name
  let customerName = "Unknown";
  let providerName = "Unknown";
  let bookingDate: string | null = null;
  let serviceAddress: string | null = null;
  let issueDescription: string | null = null;
  const linkedId = payment.bookingId ?? payment.quoteRequestId ?? "—";
  const isBooking = !!payment.bookingId;

  if (payment.bookingId) {
    const [booking] = await db
      .select({
        customerName: bookings.customerName,
        serviceAddress: bookings.serviceAddress,
        bookingDate: bookings.bookingDate,
        issueDescription: bookings.issueDescription,
        providerName: providers.businessName,
      })
      .from(bookings)
      .innerJoin(providers, eq(bookings.providerId, providers.id))
      .where(eq(bookings.id, payment.bookingId))
      .limit(1);

    if (booking) {
      customerName = booking.customerName;
      providerName = booking.providerName;
      serviceAddress = booking.serviceAddress;
      issueDescription = booking.issueDescription;
      bookingDate = new Date(booking.bookingDate).toLocaleDateString("en-AU", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  } else if (payment.quoteRequestId) {
    const [quote] = await db
      .select({
        customerName: quoteRequests.customerName,
        issueDescription: quoteRequests.issueDescription,
        preferredDate: quoteRequests.preferredDate,
        providerName: providers.businessName,
      })
      .from(quoteRequests)
      .innerJoin(providers, eq(quoteRequests.providerId, providers.id))
      .where(eq(quoteRequests.id, payment.quoteRequestId))
      .limit(1);

    if (quote) {
      customerName = quote.customerName;
      providerName = quote.providerName;
      issueDescription = quote.issueDescription;
      bookingDate = quote.preferredDate ?? null;
    }
  }

  const amountNum = parseFloat(payment.amount);
  const issuedAt = new Date(payment.createdAt).toLocaleString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <PageShell>
      <PageIntro
        badge="Confirmation"
        title={isBooking ? "Deposit confirmed and booking recorded." : "Quote request confirmed."}
        description="This receipt is generated from a real database record. No actual payment was processed. This confirms the end-to-end demo flow is working."
      >
        <div className="flex flex-wrap gap-3">
          <Badge variant="success">{isBooking ? "Payment confirmed" : "Quote request received"}</Badge>
          <Badge variant="info">Receipt issued</Badge>
        </div>
      </PageIntro>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left — booking/quote details */}
        <Card variant="default">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <SectionLabel>Receipt</SectionLabel>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white font-mono tracking-wide">
                {payment.transactionReference}
              </h2>
            </div>
            <PriceBadge>{issuedAt}</PriceBadge>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/70 bg-white/70 p-5 dark:border-white/10 dark:bg-slate-900/40">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
              Payment confirmation
            </p>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              {isBooking
                ? "Your booking deposit has been recorded in the system. A provider follow-up and confirmation email would be sent automatically in the live product."
                : "Your quote request is in the system. A provider will review it and respond within 24 hours in the live product."}
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <InfoBlock label={isBooking ? "Booking ID" : "Quote Request ID"}>
              <span className="font-mono text-xs">{linkedId}</span>
            </InfoBlock>
            <InfoBlock label="Provider">{providerName}</InfoBlock>
            {bookingDate && (
              <InfoBlock label={isBooking ? "Visit date" : "Preferred date"}>
                {bookingDate}
              </InfoBlock>
            )}
            <InfoBlock label="Customer">{customerName}</InfoBlock>
            {serviceAddress && (
              <InfoBlock label="Address">{serviceAddress}</InfoBlock>
            )}
          </div>

          {issueDescription && (
            <div className="mt-6 rounded-[1.5rem] border border-white/70 bg-white/70 p-5 dark:border-white/10 dark:bg-slate-900/40">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                Issue description
              </p>
              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                {issueDescription}
              </p>
            </div>
          )}
        </Card>

        {/* Right — receipt summary */}
        <Card variant="default">
          <SectionLabel>Payment receipt</SectionLabel>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
            {isBooking ? "Charges breakdown" : "Quote summary"}
          </h2>

          <div className="mt-6 space-y-4 rounded-[1.5rem] bg-slate-950/90 p-6 text-white dark:bg-slate-950">
            <div className="flex items-center justify-between gap-4 text-sm sm:text-base">
              <span className="text-slate-300">Transaction reference</span>
              <span className="font-mono text-xs font-semibold text-white">
                {payment.transactionReference}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 text-sm sm:text-base">
              <span className="text-slate-300">Payment method</span>
              <span className="font-semibold capitalize text-white">
                {payment.paymentMethod.replace("-", " ")}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 text-sm sm:text-base">
              <span className="text-slate-300">Status</span>
              <span className="font-semibold capitalize text-teal-300">
                {payment.status}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4">
              <span className="font-semibold text-teal-200">
                {isBooking ? "Deposit paid" : "Amount"}
              </span>
              <span className="text-lg font-bold text-white">
                ${amountNum.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Link
              href={routes.home}
              className="inline-flex w-full items-center justify-center rounded-full bg-teal-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-teal-400"
            >
              Back to Home
            </Link>
            <Link
              href={routes.providers.index}
              className="inline-flex w-full items-center justify-center rounded-full border border-slate-200/80 bg-white/70 px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700 dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-200"
            >
              Browse more providers
            </Link>
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              Reference: {payment.transactionReference}
            </p>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
