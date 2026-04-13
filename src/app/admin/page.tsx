import type { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Internal admin view for provider submissions, bookings, and quote requests.",
};

type ProviderSubmission = {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  status: "pending" | "approved";
};

type Booking = {
  id: string;
  customerName: string;
  serviceCategory: string;
  suburb: string;
  status: "confirmed" | "pending" | "completed";
  date: string;
};

type QuoteRequest = {
  id: string;
  customerName: string;
  issueSummary: string;
  suburb: string;
  status: "new" | "in-review" | "quoted";
};

const providerSubmissions: ProviderSubmission[] = [
  {
    id: "sub_1",
    businessName: "Northside Phone Repairs",
    contactName: "Amelia Tran",
    email: "amelia@northsidephones.com",
    status: "pending",
  },
  {
    id: "sub_2",
    businessName: "River City Appliance Care",
    contactName: "Luca Bennett",
    email: "luca@rivercityappliance.com.au",
    status: "approved",
  },
  {
    id: "sub_3",
    businessName: "East Brisbane IT Fix",
    contactName: "Priya Nair",
    email: "priya@ebitfix.com",
    status: "pending",
  },
];

const bookings: Booking[] = [
  {
    id: "book_1",
    customerName: "Mia Davidson",
    serviceCategory: "Phone Screen Repair",
    suburb: "New Farm",
    status: "confirmed",
    date: "2026-04-15",
  },
  {
    id: "book_2",
    customerName: "Noah Hayes",
    serviceCategory: "Laptop Tune-up",
    suburb: "West End",
    status: "pending",
    date: "2026-04-17",
  },
  {
    id: "book_3",
    customerName: "Olivia Singh",
    serviceCategory: "Appliance Diagnostics",
    suburb: "Chermside",
    status: "completed",
    date: "2026-04-10",
  },
];

const quoteRequests: QuoteRequest[] = [
  {
    id: "quote_1",
    customerName: "Ethan Cole",
    issueSummary: "Washer stops mid-cycle and shows error code E4.",
    suburb: "Indooroopilly",
    status: "new",
  },
  {
    id: "quote_2",
    customerName: "Sophie Ward",
    issueSummary: "MacBook battery drains from full in under two hours.",
    suburb: "Fortitude Valley",
    status: "in-review",
  },
  {
    id: "quote_3",
    customerName: "Liam Russo",
    issueSummary: "Bike gear shifter skips under load on uphill rides.",
    suburb: "Carindale",
    status: "quoted",
  },
];

function statusVariant(status: string) {
  if (status === "approved" || status === "confirmed" || status === "completed" || status === "quoted") {
    return "success";
  }

  if (status === "pending" || status === "in-review") {
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
    <Card className="border border-white/70 bg-white/60 dark:border-white/10 dark:bg-slate-950/45">
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
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="glass-panel-strong rounded-[2rem] px-6 py-8 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
                Internal Admin
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
                Track provider submissions, bookings, and quote requests in one simple view.
              </p>
            </div>

            <Link
              href={routes.home}
              className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white/70 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-800 sm:w-auto dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-200"
            >
              Back to Home
            </Link>
          </div>
        </header>

        <AdminSection
          title="Provider Submissions"
          description="Review new provider applications and set approval status."
        >
          <ul className="space-y-3">
            {providerSubmissions.map((submission) => (
              <li key={submission.id}>
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/55">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                      <p className="text-base font-semibold text-slate-900 dark:text-white">{submission.businessName}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">Contact: {submission.contactName}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">Email: {submission.email}</p>
                    </div>

                    <div className="flex flex-col gap-3 sm:items-end">
                      <Badge variant={statusVariant(submission.status)}>{submission.status}</Badge>
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
        </AdminSection>

        <AdminSection title="Bookings" description="Overview of current and recent booking records.">
          <ul className="space-y-3">
            {bookings.map((booking) => (
              <li key={booking.id}>
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/55">
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-slate-900 dark:text-white">Customer:</span> {booking.customerName}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-slate-900 dark:text-white">Service:</span> {booking.serviceCategory}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-slate-900 dark:text-white">Suburb:</span> {booking.suburb}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-slate-900 dark:text-white">Date:</span> {booking.date}
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

        <AdminSection
          title="Quote Requests"
          description="Recent quote requests submitted by customers."
        >
          <ul className="space-y-3">
            {quoteRequests.map((request) => (
              <li key={request.id}>
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/55">
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-slate-900 dark:text-white">Customer:</span> {request.customerName}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 lg:col-span-2">
                      <span className="font-semibold text-slate-900 dark:text-white">Issue:</span> {request.issueSummary}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-slate-900 dark:text-white">Suburb:</span> {request.suburb}
                    </p>
                  </div>
                  <div className="mt-3">
                    <Badge variant={statusVariant(request.status)}>{request.status}</Badge>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </AdminSection>
      </div>
    </div>
  );
}