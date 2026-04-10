"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import Card from "@/components/ui/Card";
import SectionLabel from "@/components/ui/SectionLabel";

const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Credit or debit card",
    hint: "Visa, Mastercard, and Amex accepted in the live product. Demo mode: use 4242 4242 4242 4242.",
  },
  {
    id: "paypal",
    label: "PayPal",
    hint: "Simulated only. No account connection or charge is performed.",
  },
  {
    id: "bank-transfer",
    label: "Bank transfer",
    hint: "Manual payment option shown for demo purposes.",
  },
] as const;

interface PaymentMethodSelectorProps {
  bookingId?: string | null;
  quoteRequestId?: string | null;
  /** Numeric deposit amount as a string (e.g. "65"). Pass "0" for quote flow. */
  amount: string;
  /** Display label for the deposit (e.g. "$65.00"). */
  depositLabel: string;
  /** Remaining balance label for display. */
  balanceLabel: string;
}

/**
 * Client Component — handles payment method selection, the fake processing
 * delay, POST to /api/payments, and redirect to /confirmation.
 */
export default function PaymentMethodSelector({
  bookingId,
  quoteRequestId,
  amount,
  depositLabel,
  balanceLabel,
}: PaymentMethodSelectorProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<string>("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isQuoteFlow = !bookingId && !!quoteRequestId;

  const handlePay = async () => {
    setError(null);
    setLoading(true);

    try {
      // Simulate processing delay for demo realism
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: bookingId ?? null,
          quoteRequestId: quoteRequestId ?? null,
          amount: isQuoteFlow ? "0" : amount,
          paymentMethod: selected,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error ?? "Payment failed. Please try again.");
      }

      // Navigate to confirmation with the real transaction reference
      router.push(routes.confirmation(json.transactionReference));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <Card variant="default">
      <SectionLabel>Payment method</SectionLabel>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        {isQuoteFlow ? "Confirm quote request" : "Select how you would like to pay the deposit."}
      </h2>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        {isQuoteFlow
          ? "No upfront deposit required for a quote. Confirm your request to proceed."
          : "This simulated checkout does not process any real charges."}
      </p>

      {/* Payment method list — hidden for quote flow (no payment needed) */}
      {!isQuoteFlow && (
        <div className="mt-6 space-y-4">
          {PAYMENT_METHODS.map((method, index) => (
            <label
              key={method.id}
              className={`flex cursor-pointer items-start gap-4 rounded-[1.5rem] border p-4 transition ${
                selected === method.id
                  ? "border-teal-400 bg-teal-50/80 dark:border-teal-400/60 dark:bg-teal-400/10"
                  : "border-white/70 bg-white/70 hover:border-teal-300 dark:border-white/10 dark:bg-slate-900/40 dark:hover:border-teal-400"
              }`}
            >
              <input
                type="radio"
                name="payment-method"
                value={method.id}
                defaultChecked={index === 0}
                onChange={() => setSelected(method.id)}
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
        </div>
      )}

      {/* Deposit summary */}
      <div className="mt-6 rounded-[1.5rem] border border-dashed border-teal-300/80 bg-teal-50/80 p-5 dark:border-teal-400/20 dark:bg-teal-400/10">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-800 dark:text-teal-200">
          {isQuoteFlow ? "Quote request — no deposit" : "Deposit due now"}
        </p>
        <div className="mt-3 flex items-end justify-between gap-4">
          <span className="text-3xl font-bold text-slate-900 dark:text-white">
            {isQuoteFlow ? "$0.00" : depositLabel}
          </span>
          {!isQuoteFlow && (
            <span className="text-sm text-slate-600 dark:text-slate-300">
              Remaining balance: {balanceLabel}
            </span>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-200">
          {error}
        </p>
      )}

      <div className="mt-8 space-y-3">
        <button
          type="button"
          onClick={handlePay}
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" className="opacity-25" stroke="currentColor" strokeWidth="3" />
                <path d="M21 12a9 9 0 0 0-9-9" className="opacity-90" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Processing...
            </>
          ) : isQuoteFlow ? (
            "Confirm Quote Request"
          ) : (
            `Pay Deposit ${depositLabel}`
          )}
        </button>
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          {isQuoteFlow
            ? "A provider will contact you with a quote within 24 hours."
            : "Demo only — no real payment gateway is connected."}
        </p>
      </div>
    </Card>
  );
}
