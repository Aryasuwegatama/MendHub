import type { Metadata } from "next";
import Link from "next/link";
import LoginRoleForm from "@/components/auth/LoginRoleForm";
import Badge from "@/components/ui/Badge";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to access your dashboard.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="glass-panel-strong rounded-[2rem] px-6 py-8 sm:px-8">
          <Badge variant="info">Access Portal</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Login to Dashboard
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
            Providers can login to manage bookings. MendHub team can login to track all providers.
          </p>
        </header>

        <LoginRoleForm />

        <div className="text-center">
          <Link
            href={routes.listYourBusiness}
            className="text-sm font-semibold text-slate-700 transition hover:text-teal-700 dark:text-slate-200 dark:hover:text-teal-300"
          >
            New provider? Register your business here
          </Link>
        </div>
      </div>
    </div>
  );
}
