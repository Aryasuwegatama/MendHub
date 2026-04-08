import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/ui/Card";
import PageIntro from "@/components/ui/PageIntro";

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
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <PageIntro
          badge="Provider Details"
          title="A provider profile that matches the homepage visual system."
          description={`This static provider detail route is ready for richer provider content. Current provider ID: ${id}.`}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="bg-white/52 dark:bg-slate-950/42">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Provider overview</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Provider ID: <span className="font-mono font-bold text-teal-700 dark:text-teal-300">{id}</span>
            </p>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              This page will later show provider descriptions, service highlights, coverage areas, and booking actions.
            </p>
          </Card>

          <Card className="bg-white/52 dark:bg-slate-950/42">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Quick actions</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`/providers/${id}/book`} className="inline-flex items-center justify-center rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-400">
                Book Repair
              </Link>
              <Link href={`/providers/${id}/quote`} className="glass-pill inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white/80 dark:text-slate-200 dark:hover:bg-white/10">
                Request Quote
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
