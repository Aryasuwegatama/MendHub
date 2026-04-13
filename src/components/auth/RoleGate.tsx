"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { routes } from "@/config/routes";
import { getSession, type UserRole } from "@/components/auth/RoleSession";

type RoleGateProps = {
  allowedRole: UserRole;
  children: React.ReactNode;
};

export default function RoleGate({ allowedRole, children }: RoleGateProps) {
  const [state] = useState(() => {
    const session = getSession();
    return {
      isReady: true,
      canAccess: session?.role === allowedRole,
    };
  });

  if (!state.isReady) {
    return (
      <Card className="mx-auto max-w-xl rounded-xl p-6 shadow">
        <p className="text-sm text-slate-600 dark:text-slate-300">Checking access...</p>
      </Card>
    );
  }

  if (!state.canAccess) {
    return (
      <Card className="mx-auto max-w-xl rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Login Required</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Please login as {allowedRole} to access this dashboard.
        </p>
        <div className="mt-5">
          <Link href={routes.login}>
            <Button type="button" size="md">Go to Login</Button>
          </Link>
        </div>
      </Card>
    );
  }

  return <>{children}</>;
}
