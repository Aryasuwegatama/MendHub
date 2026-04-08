import type { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { routes } from "@/config/routes";
import Card from "@/components/ui/Card";
import PageIntro from "@/components/ui/PageIntro";
import { checkoutBookingDetails, receiptLineItems } from "@/lib/checkoutData";

export const metadata: Metadata = {
  title: "Confirmation",
  description: "Your booking or quote request has been confirmed.",
};

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
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
          <Card className="bg-white/52 dark:bg-slate-950/42">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
                  Receipt
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
                  {checkoutBookingDetails.paymentReference}
                </h2>
              </div>
              <div className="rounded-full bg-teal-100/90 px-4 py-2 text-sm font-semibold text-teal-900 dark:bg-teal-400/15 dark:text-teal-200">
                {checkoutBookingDetails.receiptIssuedAt}
              </div>
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
              <div className="glass-panel-muted rounded-2xl p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                  Booking ID
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                  {checkoutBookingDetails.bookingId}
                </p>
              </div>
              <div className="glass-panel-muted rounded-2xl p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                  Provider
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                  {checkoutBookingDetails.providerName}
                </p>
              </div>
              <div className="glass-panel-muted rounded-2xl p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                  Visit date
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                  {checkoutBookingDetails.preferredDate}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {checkoutBookingDetails.arrivalWindow}
                </p>
              </div>
              <div className="glass-panel-muted rounded-2xl p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                  Customer
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                  {checkoutBookingDetails.customerName}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {checkoutBookingDetails.suburb}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/52 dark:bg-slate-950/42">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
              Simple receipt
            </p>
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
      </div>
    </div>
  );
}
