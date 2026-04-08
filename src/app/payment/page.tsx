import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import PageIntro from "@/components/ui/PageIntro";

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
          title="Complete payment in a clear, focused flow."
          description="This page will support secure repair booking payments with a simple summary, payment method, and confirmation step."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="bg-white/52 dark:bg-slate-950/42">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Payment summary</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">A booking or quote summary will appear here before payment is confirmed.</p>
          </Card>
          <Card className="bg-white/52 dark:bg-slate-950/42">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Status</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Payment integration is not connected yet, so this page is currently presentation-only.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
