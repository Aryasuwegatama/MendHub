import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import PageIntro from "@/components/ui/PageIntro";

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
          title="Your request has been received."
          description="This confirmation screen acknowledges a completed booking or quote step and keeps the next action clear."
        />

        <div className="mt-10 flex justify-center">
          <Card className="max-w-2xl bg-white/52 text-center dark:bg-slate-950/42">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Thank you</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Your request has been received. You will receive an email confirmation shortly.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
