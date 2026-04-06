import type { Metadata } from "next";

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
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Book a Repair</h1>
      <p className="mt-4 text-slate-600">
        Booking a repair appointment with provider ID: <span className="font-mono font-bold text-teal-600">{id}</span>
      </p>
    </div>
  );
}
