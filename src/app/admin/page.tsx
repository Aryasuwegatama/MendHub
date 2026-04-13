import type { Metadata } from "next";
import RoleGate from "@/components/auth/RoleGate";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "MendHub Admin Dashboard",
  description: "Admin dashboard for providers, bookings, and quote requests.",
};

type AdminProvider = {
  id: string;
  businessName: string;
  suburb: string;
  category: string;
  status: "Approved" | "Pending";
};

type AdminBooking = {
  id: string;
  customerName: string;
  providerName: string;
  service: string;
  status: "Confirmed" | "Pending" | "Completed";
};

type AdminQuoteRequest = {
  id: string;
  customerName: string;
  issueSummary: string;
  provider: string;
};

const providers: AdminProvider[] = [
  {
    id: "p_1",
    businessName: "Northside Phone Repairs",
    suburb: "Fortitude Valley",
    category: "Phone Repair",
    status: "Pending",
  },
  {
    id: "p_2",
    businessName: "River City Appliance Care",
    suburb: "Indooroopilly",
    category: "Appliance Repair",
    status: "Approved",
  },
  {
    id: "p_3",
    businessName: "East Brisbane IT Fix",
    suburb: "Carindale",
    category: "Laptop Repair",
    status: "Approved",
  },
];

const bookings: AdminBooking[] = [
  {
    id: "ab_1",
    customerName: "Mia Davidson",
    providerName: "Northside Phone Repairs",
    service: "Phone Screen Repair",
    status: "Pending",
  },
  {
    id: "ab_2",
    customerName: "Noah Hayes",
    providerName: "East Brisbane IT Fix",
    service: "Laptop Tune-up",
    status: "Confirmed",
  },
  {
    id: "ab_3",
    customerName: "Olivia Singh",
    providerName: "River City Appliance Care",
    service: "Appliance Diagnostics",
    status: "Completed",
  },
];

const quoteRequests: AdminQuoteRequest[] = [
  {
    id: "aq_1",
    customerName: "Ethan Cole",
    issueSummary: "Washer stops mid-cycle and shows error code E4.",
    provider: "River City Appliance Care",
  },
  {
    id: "aq_2",
    customerName: "Sophie Ward",
    issueSummary: "MacBook battery drains from full in under two hours.",
    provider: "East Brisbane IT Fix",
  },
  {
    id: "aq_3",
    customerName: "Liam Russo",
    issueSummary: "Bike gear shifter skips under load on uphill rides.",
    provider: "Northside Phone Repairs",
  },
];

function statusVariant(status: string) {
  if (status === "Approved" || status === "Confirmed" || status === "Completed") {
    return "success";
  }

  if (status === "Pending") {
    return "warning";
  }

  return "info";
}

type AdminSectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

function AdminSection({ title, description, children }: AdminSectionProps) {
  return (
    <Card variant="strong" className="rounded-3xl border border-white/70 dark:border-white/10">
      <div className="mb-5 border-b border-slate-200/70 pb-4 dark:border-slate-700/60">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{description}</p>
      </div>
      {children}
    </Card>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <RoleGate allowedRole="admin">
        <div className="mx-auto max-w-6xl space-y-8">
          <header className="glass-panel-strong rounded-3xl p-6 shadow">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">MendHub Admin Dashboard</h1>
          </header>

          <AdminSection title="All Providers" description="Track provider listing status and service coverage.">
            <ul className="space-y-3">
              {providers.map((provider) => (
                <li key={provider.id}>
                  <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/55">
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                      <p className="text-sm text-slate-600 dark:text-slate-300 lg:col-span-2">
                        <span className="font-semibold text-slate-900 dark:text-white">Business Name:</span> {provider.businessName}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        <span className="font-semibold text-slate-900 dark:text-white">Suburb:</span> {provider.suburb}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        <span className="font-semibold text-slate-900 dark:text-white">Category:</span> {provider.category}
                      </p>
                      <div>
                        <Badge variant={statusVariant(provider.status)}>{provider.status}</Badge>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </AdminSection>

          <AdminSection title="All Bookings" description="View bookings across all providers.">
            <ul className="space-y-3">
              {bookings.map((booking) => (
                <li key={booking.id}>
                  <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/55">
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        <span className="font-semibold text-slate-900 dark:text-white">Customer Name:</span> {booking.customerName}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        <span className="font-semibold text-slate-900 dark:text-white">Provider Name:</span> {booking.providerName}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        <span className="font-semibold text-slate-900 dark:text-white">Service:</span> {booking.service}
                      </p>
                      <div>
                        <Badge variant={statusVariant(booking.status)}>{booking.status}</Badge>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </AdminSection>

          <AdminSection title="All Quote Requests" description="Track customer quote requests by provider.">
            <ul className="space-y-3">
              {quoteRequests.map((request) => (
                <li key={request.id}>
                  <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/55">
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        <span className="font-semibold text-slate-900 dark:text-white">Customer Name:</span> {request.customerName}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 lg:col-span-2">
                        <span className="font-semibold text-slate-900 dark:text-white">Issue Summary:</span> {request.issueSummary}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        <span className="font-semibold text-slate-900 dark:text-white">Provider:</span> {request.provider}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </AdminSection>
        </div>
      </RoleGate>
    </div>
  );
}