import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirmation",
  description: "Your booking or quote request has been confirmed.",
};

export default function ConfirmationPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Thank You!</h1>
      <p className="mt-4 text-slate-600">
        Your request has been received. You will receive an email confirmation shortly.
      </p>
    </div>
  );
}
