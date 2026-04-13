import type { Metadata } from "next";
import Link from "next/link";
import RoleGate from "@/components/auth/RoleGate";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "Provider Dashboard",
  description: "Provider dashboard for tracking booking requests and actions.",
};

type ProviderBooking = {
  id: string;
  customerName: string;
  service: string;
  suburb: string;
  requestedDate: string;
  status: "new" | "approved" | "rejected";
};

const providerBookings: ProviderBooking[] = [
  {
    id: "pb_001",
    customerName: "Mia Davidson",
    service: "Phone Screen Repair",
    suburb: "New Farm",
    requestedDate: "2026-04-15",
    status: "new",
  },
  {
    id: "pb_002",
    customerName: "Noah Hayes",
    service: "Laptop Tune-up",
    suburb: "West End",
    requestedDate: "2026-04-17",
    status: "approved",
  },
  {
    id: "pb_003",
    customerName: "Olivia Singh",
    service: "Appliance Diagnostics",
    suburb: "Chermside",
    requestedDate: "2026-04-19",
    status: "rejected",
  },
];

function statusVariant(status: ProviderBooking["status"]) {
  if (status === "approved") {
    return "success";
  }

  if (status === "rejected") {
    return "error";
  }

  return "warning";
}

export default function ProviderDashboardPage() {
  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <RoleGate allowedRole="provider">
        <div className="mx-auto max-w-5xl space-y-8">
          <header className="glass-panel-strong rounded-[2rem] px-6 py-8 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
                  Provider Dashboard
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  My Booking Requests
                </h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
                  Review incoming bookings and keep track of your decisions.
                </p>
              </div>

              <div className="flex gap-2">
                <Link href={routes.login}>
                  <Button type="button" variant="outline" size="md">
                    Switch Role
                  </Button>
                </Link>
                <Link href={routes.home}>
                  <Button type="button" variant="secondary" size="md">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </header>

          <Card variant="strong" className="border border-white/70 dark:border-white/10">
            <div className="mb-5 border-b border-slate-200/70 pb-4 dark:border-slate-700/60">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Incoming Bookings</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Manage and track all incoming booking requests from customers.
              </p>
            </div>

            <ul className="space-y-3">
              {providerBookings.map((booking) => (
                <li key={booking.id}>
                  <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/55">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          <span className="font-semibold text-slate-900 dark:text-white">Customer:</span> {booking.customerName}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          <span className="font-semibold text-slate-900 dark:text-white">Service:</span> {booking.service}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          <span className="font-semibold text-slate-900 dark:text-white">Suburb:</span> {booking.suburb}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          <span className="font-semibold text-slate-900 dark:text-white">Date:</span> {booking.requestedDate}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3 lg:items-end">
                        <Badge variant={statusVariant(booking.status)}>{booking.status}</Badge>
                        <div className="flex gap-2">
                          <Button type="button" size="sm" variant="secondary">
                            Approve
                          </Button>
                          <Button type="button" size="sm" variant="outline">
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </RoleGate>
    </div>
  );
}
