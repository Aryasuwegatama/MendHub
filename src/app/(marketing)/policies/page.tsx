import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import PageIntro from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Policies & Disclaimer",
  description: "Read our privacy policy, terms of service, and student project disclaimer.",
};

export default function PoliciesPage() {
  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <PageIntro
          badge="Policies & Disclaimer"
          title="Platform policies presented in the same clear visual system."
          description="These sections explain the project disclaimer, privacy expectations, and usage terms for the MendHub assignment demo."
        />

        <div className="mt-10 grid gap-6">
          <Card className="bg-white/52 dark:bg-slate-950/42">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Student Project Disclaimer</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              This website is a student project created for the course NIT3274 at James Cook University. It is not a real business, and no actual repair services are being offered or fulfilled through this platform.
            </p>
          </Card>

          <Card className="bg-white/52 dark:bg-slate-950/42">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Privacy Policy</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              As a student project, we do not intentionally collect or sell personal data for commercial purposes. Any data entered is used solely for the demonstration of functionality within the scope of the university assignment.
            </p>
          </Card>

          <Card className="bg-white/52 dark:bg-slate-950/42">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Terms of Service</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              By using this demo site, you acknowledge its status as a non-commercial educational project.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
