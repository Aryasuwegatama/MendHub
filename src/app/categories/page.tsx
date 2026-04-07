import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Categories",
  description: "Browse all repair service categories in Brisbane.",
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Browse Categories</h1>
      <p className="mt-4 text-slate-600">
        Find the right category for your repair. This page is under construction.
      </p>
    </div>
  );
}
