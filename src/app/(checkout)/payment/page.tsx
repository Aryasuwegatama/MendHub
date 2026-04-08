import type { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { routes } from "@/config/routes";
import Card from "@/components/ui/Card";
import PageIntro from "@/components/ui/PageIntro";
import { checkoutBookingDetails, paymentMethodOptions, receiptLineItems } from "@/lib/checkoutData";

export const metadata: Metadata = {
  title: "Payment",
  description: "Complete your repair booking payment.",
};

export default function PaymentPage() {
  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <PageIntro
          badge="Payment"
          title="Pay the booking deposit to secure the repair visit."
          description="Review the booking summary, choose a payment method preview, and continue to confirmation. This flow is presentation-only and does not process a real charge."
        >
          <div className="flex flex-wrap gap-3">
            <Badge variant="success">Deposit ready</Badge>
            <Badge variant="info">UI only checkout</Badge>
          </div>
        </PageIntro>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="bg-white/52 dark:bg-slate-950/42">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
                  Booking summary
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
                  {checkoutBookingDetails.service}
                </h2>
              </div>
              <div className="rounded-full bg-teal-100/90 px-4 py-2 text-sm font-semibold text-teal-900 dark:bg-teal-400/15 dark:text-teal-200">
                {checkoutBookingDetails.bookingId}
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
                  Visit window
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                  {checkoutBookingDetails.preferredDate}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {checkoutBookingDetails.arrivalWindow}
                </p>
              </div>
            </div>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                  Customer
                </dt>
                <dd className="mt-2 text-base text-slate-700 dark:text-slate-200">
                  {checkoutBookingDetails.customerName}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                  Suburb
                </dt>
                <dd className="mt-2 text-base text-slate-700 dark:text-slate-200">
                  {checkoutBookingDetails.suburb}
                </dd>
              </div>
            </dl>

            <div className="mt-6 rounded-[1.5rem] border border-white/70 bg-white/70 p-5 dark:border-white/10 dark:bg-slate-900/40">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                Reported issue
              </p>
              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                {checkoutBookingDetails.issueSummary}
              </p>
            </div>

            <div className="mt-6 space-y-3 rounded-[1.5rem] bg-slate-950/90 p-6 text-white dark:bg-slate-950">
              {receiptLineItems.map((lineItem) => (
                <div key={lineItem.label} className="flex items-center justify-between gap-4 text-sm sm:text-base">
                  <span className="text-slate-300">{lineItem.label}</span>
                  <span className="font-semibold text-white">{lineItem.amount}</span>
                </div>
              ))}
              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-200">
                    Estimated total
                  </span>
                  <span className="text-xl font-bold text-white">
                    {checkoutBookingDetails.totalEstimate}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-white/52 dark:bg-slate-950/42">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
              Payment method
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
              Select how you would like to pay the deposit.
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              This UI demonstrates the checkout flow only. No gateway, tokenization, or real transaction is connected.
            </p>

            <form className="mt-6 space-y-4">
              {paymentMethodOptions.map((method, index) => (
                <label
                  key={method.id}
                  className="flex cursor-pointer items-start gap-4 rounded-[1.5rem] border border-white/70 bg-white/70 p-4 transition hover:border-teal-300 dark:border-white/10 dark:bg-slate-900/40"
                >
                  <input
                    type="radio"
                    name="payment-method"
                    value={method.id}
                    defaultChecked={index === 0}
                    className="mt-1 h-4 w-4 border-slate-300 text-teal-500 focus:ring-teal-500"
                  />
                  <span className="block">
                    <span className="block text-base font-semibold text-slate-900 dark:text-white">
                      {method.label}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {method.hint}
                    </span>
                  </span>
                </label>
              ))}
            </form>

            <div className="mt-6 rounded-[1.5rem] border border-dashed border-teal-300/80 bg-teal-50/80 p-5 dark:border-teal-400/20 dark:bg-teal-400/10">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-800 dark:text-teal-200">
                Deposit due now
              </p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">
                  {checkoutBookingDetails.depositAmount}
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  Remaining balance: {checkoutBookingDetails.estimatedBalance}
                </span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Link
                href={routes.confirmation}
                className="inline-flex w-full items-center justify-center rounded-full bg-teal-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-teal-400"
              >
                Pay Deposit
              </Link>
              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                Clicking this button only moves to the confirmation screen for the demo.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
