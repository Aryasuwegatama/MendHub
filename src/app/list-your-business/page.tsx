import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Your Business",
  description: "Join the MendHub marketplace and grow your repair business in Brisbane.",
};

export default function ListBusinessPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">List Your Business</h1>
      <p className="mt-4 text-slate-600">
        Become a MendHub provider and connect with local customers needing repairs.
      </p>
    </div>
  );
}
