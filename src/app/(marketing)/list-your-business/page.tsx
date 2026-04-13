import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/ui/Card";
import PageIntro from "@/components/ui/PageIntro";
import PageShell from "@/components/ui/PageShell";
import Button from "@/components/ui/Button";
import BusinessSubmissionForm from "@/components/forms/BusinessSubmissionForm";
import { routes } from "@/config/routes";

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
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href={routes.login}>
                <Button type="button" size="sm" variant="secondary">Login</Button>
              </Link>
              <Link href={routes.provider}>
                <Button type="button" size="sm" variant="outline">Provider Dashboard</Button>
              </Link>
            </div>
          </Card>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/55">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Complete the registration form below to submit your business. Once approved, you can login to track bookings and manage requests.
          </p>
        </div>

        <div className="mt-16">
          <BusinessSubmissionForm />
        </div>
    </PageShell>
  );
}
