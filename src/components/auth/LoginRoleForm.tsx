"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { routes } from "@/config/routes";

type DemoRole = "provider" | "admin";

export default function LoginRoleForm() {
  const router = useRouter();
  const [role, setRole] = useState<DemoRole>("provider");
  const [email, setEmail] = useState("");

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    window.localStorage.setItem("mendhub_demo_role", role);
    window.localStorage.setItem("mendhub_demo_email", email || "demo@mendhub.local");

    if (role === "admin") {
      router.push(routes.admin);
      return;
    }

    router.push(routes.provider);
  }

  return (
    <Card variant="strong" className="border border-white/70 dark:border-white/10">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Sign In</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Select your role to continue to the appropriate dashboard.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-400 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Login As
          </label>
          <select
            id="role"
            value={role}
            onChange={(event) => setRole(event.target.value as DemoRole)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-400 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
          >
            <option value="provider">Provider</option>
            <option value="admin">MendHub Admin</option>
          </select>
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full">
          Login
        </Button>
      </form>
    </Card>
  );
}
