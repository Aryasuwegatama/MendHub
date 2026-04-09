import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import PageIntro from "@/components/ui/PageIntro";
import PageShell from "@/components/ui/PageShell";

export const metadata: Metadata = {
  title: "About MendHub",
  description: "Learn how MendHub is transforming the repair industry in Brisbane.",
};

export default function AboutPage() {
  return (
    <PageShell>
        <PageIntro
          badge="About MendHub"
          title="A clearer way to find trusted local repairs."
          description="MendHub connects Brisbane residents with repair providers through simple browsing, guided recommendations, and focused booking flows."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card variant="default">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Why MendHub exists</h2>
            <div className="mt-4 space-y-4 text-slate-600 dark:text-slate-300">
              <p>
                MendHub was founded on a simple idea: making it easier to find high-quality,
                local repair services. Whether it&apos;s a cracked screen, a leaking tap, or a
                failing appliance, we help you find the right expert for the job.
              </p>
              <p>
                We focus on clarity, transparency, and helping Brisbane small businesses get discovered more easily.
              </p>
            </div>
          </Card>

          <Card variant="default">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">What the platform supports</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="glass-panel-muted rounded-2xl p-4">
                <p className="font-semibold text-slate-900 dark:text-white">Browse categories</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Start with the repair type you already know.</p>
              </div>
              <div className="glass-panel-muted rounded-2xl p-4">
                <p className="font-semibold text-slate-900 dark:text-white">Smart recommender</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Get guided toward the right category when you are unsure.</p>
              </div>
              <div className="glass-panel-muted rounded-2xl p-4">
                <p className="font-semibold text-slate-900 dark:text-white">Booking requests</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Submit clear repair details in a simple mobile-first form.</p>
              </div>
              <div className="glass-panel-muted rounded-2xl p-4">
                <p className="font-semibold text-slate-900 dark:text-white">Business listings</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Help local providers present their services more clearly.</p>
              </div>
            </div>
          </Card>
        </div>
    </PageShell>
  );
}
