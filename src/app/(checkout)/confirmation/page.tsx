import type { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { routes } from "@/config/routes";
import InfoBlock from "@/components/ui/InfoBlock";
import PageIntro from "@/components/ui/PageIntro";
import PageShell from "@/components/ui/PageShell";
import PriceBadge from "@/components/ui/PriceBadge";
import SectionLabel from "@/components/ui/SectionLabel";
import { checkoutBookingDetails, receiptLineItems } from "@/lib/checkoutData";

export const metadata: Metadata = {
  title: "Confirmation",
  description: "Your booking or quote request has been confirmed.",
};

export default function ConfirmationPage() {
  return (
    <PageShell>
        <PageIntro
          badge="Confirmation"
          title="Deposit confirmed and booking request recorded."
          description="This receipt confirms the demo payment step and summarizes the scheduled repair visit. No real payment was processed."
        >
          <div className="flex flex-wrap gap-3">
            <Badge variant="success">Payment confirmed</Badge>
            <Badge variant="info">Receipt issued</Badge>
          </div>
        </PageIntro>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card variant="default">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <SectionLabel>Receipt</SectionLabel>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
                  {checkoutBookingDetails.paymentReference}
                </h2>
              </div>
              <PriceBadge>{checkoutBookingDetails.receiptIssuedAt}</PriceBadge>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-white/70 bg-white/70 p-5 dark:border-white/10 dark:bg-slate-900/40">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                Payment confirmation
              </p>
              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                Your booking deposit has been marked as received in this demo checkout flow. A confirmation email and provider follow-up would be triggered here in the live product.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoBlock label="Booking ID">{checkoutBookingDetails.bookingId}</InfoBlock>
              <InfoBlock label="Provider">{checkoutBookingDetails.providerName}</InfoBlock>
              <InfoBlock label="Visit date">
                {checkoutBookingDetails.preferredDate}
                <p className="mt-1 text-sm font-normal text-slate-600 dark:text-slate-300">{checkoutBookingDetails.arrivalWindow}</p>
              </InfoBlock>
              <InfoBlock label="Customer">
                {checkoutBookingDetails.customerName}
                <p className="mt-1 text-sm font-normal text-slate-600 dark:text-slate-300">{checkoutBookingDetails.suburb}</p>
              </InfoBlock>
            </div>
          </Card>

          <Card variant="default">
            <SectionLabel>Simple receipt</SectionLabel>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
              Booking details and charges
            </h2>

            <div className="mt-6 space-y-4 rounded-[1.5rem] bg-slate-950/90 p-6 text-white dark:bg-slate-950">
              <div>
                <p className="text-sm uppercase tracking-[0.15em] text-teal-200">
                  Service booked
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {checkoutBookingDetails.service}
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 text-sm leading-7 text-slate-300">
                {checkoutBookingDetails.issueSummary}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                {receiptLineItems.map((lineItem) => (
                  <div key={lineItem.label} className="flex items-center justify-between gap-4 text-sm sm:text-base">
                    <span className="text-slate-300">{lineItem.label}</span>
                    <span className="font-semibold text-white">{lineItem.amount}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                  <span className="font-semibold text-teal-200">Estimated total</span>
                  <span className="text-lg font-bold text-white">{checkoutBookingDetails.totalEstimate}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Link
                href={routes.home}
                className="inline-flex w-full items-center justify-center rounded-full bg-teal-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-teal-400"
              >
                Back to Home
              </Link>
              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                You can return to the marketplace and continue browsing providers.
              </p>
            </div>
          </Card>
        </div>
    </PageShell>
  );
}
