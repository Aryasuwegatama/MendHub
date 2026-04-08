import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import PageIntro from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Submit a quote request to this repair provider.",
};

export default async function QuoteRequestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <PageIntro
          badge="Request a Quote"
          title="A quote flow with the same polished page framing."
          description={`This route is prepared for a quote request form. Current provider ID: ${id}.`}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card className="bg-white/52 dark:bg-slate-950/42">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Provider reference</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Quote request will be submitted for provider ID <span className="font-mono font-bold text-teal-700 dark:text-teal-300">{id}</span>.
            </p>
          </Card>
          <Card className="bg-white/52 dark:bg-slate-950/42">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Next implementation</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Add a quote form matching the booking and contact flows when you are ready.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
