"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { routes } from "@/config/routes";

type DemoRole = "provider" | "admin";

type RoleGateProps = {
  allowedRole: DemoRole;
  children: React.ReactNode;
};

export default function RoleGate({ allowedRole, children }: RoleGateProps) {
  const [state] = useState(() => {
    const currentRole = window.localStorage.getItem("mendhub_demo_role");
    return {
      isChecking: false,
      hasAccess: currentRole === allowedRole,
    };
  });

  if (state.isChecking) {
    return (
      <Card variant="strong" className="mx-auto max-w-xl text-center">
        <p className="text-sm text-slate-600 dark:text-slate-300">Checking access...</p>
      </Card>
    );
  }

  if (!state.hasAccess) {
    return (
      <Card variant="strong" className="mx-auto max-w-xl text-center">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Login Required</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Sign in as {allowedRole} to access this dashboard.
        </p>
        <div className="mt-6">
          <Link href={routes.login}>
            <Button type="button" variant="primary" size="md">
              Go to Login
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  return <>{children}</>;
}
