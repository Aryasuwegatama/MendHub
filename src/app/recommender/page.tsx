import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Repair Finder",
  description: "Answer a few questions to find the right repair category for your needs.",
};

export default function RecommenderPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Find My Repair</h1>
      <p className="mt-4 text-slate-600">
        Not sure what you need? Use our recommender to find the perfect repair service.
      </p>
    </div>
  );
}
