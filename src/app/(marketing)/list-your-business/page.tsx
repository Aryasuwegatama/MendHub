import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import PageIntro from "@/components/ui/PageIntro";
import PageShell from "@/components/ui/PageShell";
import BusinessSubmissionForm from "@/components/forms/BusinessSubmissionForm";

export const metadata: Metadata = {
  title: "List Your Business",
  description: "Join the MendHub marketplace and grow your repair business in Brisbane.",
};

export default function ListBusinessPage() {
  return (
    <PageShell>
        <PageIntro
          badge="List Your Business"
          title="Bring your repair business into the MendHub marketplace."
          description="Show your services, service areas, and pricing highlights in a format built for fast comparisons and mobile browsing."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Card variant="default">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Why join</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Reach local customers who are actively looking for repair help.</p>
          </Card>
          <Card variant="default">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">What you add</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Business details, service categories, pricing approach, and service suburbs.</p>
          </Card>
          <Card variant="default">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Next step</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Complete the form below to submit your business for review.</p>
          </Card>
        </div>

        <div className="mt-16">
          <BusinessSubmissionForm />
        </div>
    </PageShell>
  );
}
