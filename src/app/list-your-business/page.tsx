import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import PageIntro from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "List Your Business",
  description: "Join the MendHub marketplace and grow your repair business in Brisbane.",
};

export default function ListBusinessPage() {
  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <PageIntro
          badge="List Your Business"
          title="Bring your repair business into the MendHub marketplace."
          description="Show your services, service areas, and pricing highlights in a format built for fast comparisons and mobile browsing."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Card className="bg-white/52 dark:bg-slate-950/42">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Why join</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Reach local customers who are actively looking for repair help.</p>
          </Card>
          <Card className="bg-white/52 dark:bg-slate-950/42">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">What you add</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Business details, service categories, pricing approach, and service suburbs.</p>
          </Card>
          <Card className="bg-white/52 dark:bg-slate-950/42">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Next step</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Complete the provider submission flow when that form is ready.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
