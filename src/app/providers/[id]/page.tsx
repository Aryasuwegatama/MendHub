import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Provider Details",
  description: "View provider information, services, and pricing.",
};

export default async function ProviderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Provider Details</h1>
      <p className="mt-4 text-slate-600">
        Showing details for provider ID: <span className="font-mono font-bold text-teal-600">{id}</span>
      </p>
      <p className="mt-4 text-slate-600">
        This page is under construction. Content coming soon.
      </p>
    </div>
  );
}
