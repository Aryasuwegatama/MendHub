import type { Metadata } from "next";
import BookingForm from "@/components/forms/BookingForm";

export const metadata: Metadata = {
  title: "Book a Repair",
  description: "Schedule your repair appointment with this provider.",
};

export default async function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-3xl">
          <h1 className="text-3xl font-bold text-slate-900">Book a Repair</h1>
          <p className="mt-3 text-slate-600">
            Provider ID: <span className="font-mono font-bold text-teal-700">{id}</span>
          </p>
        </div>

        <BookingForm providerId={id} />
      </div>
    </div>
  );
}
