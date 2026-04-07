import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment",
  description: "Complete your repair booking payment.",
};

export default function PaymentPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Payment</h1>
      <p className="mt-4 text-slate-600">Securely complete your payment here.</p>
    </div>
  );
}
