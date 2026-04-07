import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Providers",
  description: "Search and filter repair service providers in Brisbane.",
};

export default function ProvidersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Find Providers</h1>
      <p className="mt-4 text-slate-600">
        Browse and compare the best repair providers in your area.
      </p>
    </div>
  );
}
