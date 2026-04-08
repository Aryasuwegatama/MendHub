import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About MendHub",
  description: "Learn how MendHub is transforming the repair industry in Brisbane.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">About MendHub</h1>
      <p className="mt-4 text-slate-600 font-medium">
        Connecting Brisbane residents with trusted local repair shops.
      </p>
      <div className="mt-6 space-y-4 text-slate-600">
        <p>
          MendHub was founded on a simple idea: making it easier to find high-quality,
          local repair services. Whether it&apos;s a cracked screen, a leaking tap, or a 
          failing appliance, we help you find the right expert for the job.
        </p>
        <p>
          We pride ourselves on transparency, reliability, and supporting local
          Brisbane small businesses.
        </p>
      </div>
    </div>
  );
}
