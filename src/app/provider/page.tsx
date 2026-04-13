import type { Metadata } from "next";
import RoleGate from "@/components/auth/RoleGate";
import Card from "@/components/ui/Card";
import ProviderBookingsList, { type ProviderBooking } from "@/components/providers/ProviderBookingsList";

export const metadata: Metadata = {
  title: "Provider Dashboard",
  description: "Provider booking and quote request dashboard.",
};

type ProviderQuote = {
  id: string;
  customerName: string;
  issueSummary: string;
  suburb: string;
};

const bookings: ProviderBooking[] = [
  { id: "b1", customerName: "Mia Davidson", service: "Phone Screen Repair", date: "2026-04-15", status: "Pending" },
  { id: "b2", customerName: "Noah Hayes", service: "Laptop Tune-up", date: "2026-04-17", status: "Pending" },
  { id: "b3", customerName: "Olivia Singh", service: "Appliance Diagnostics", date: "2026-04-19", status: "Pending" },
];

const quotes: ProviderQuote[] = [
  { id: "q1", customerName: "Ethan Cole", issueSummary: "Washer stops mid-cycle and shows E4.", suburb: "Indooroopilly" },
  { id: "q2", customerName: "Sophie Ward", issueSummary: "MacBook battery drains very fast.", suburb: "Fortitude Valley" },
  { id: "q3", customerName: "Liam Russo", issueSummary: "Bike gear shifter skips under load.", suburb: "Carindale" },
];

export default function ProviderDashboardPage() {
  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <RoleGate allowedRole="provider">
        <div className="mx-auto max-w-6xl space-y-8">
          <header className="glass-panel-strong rounded-3xl p-6 shadow">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Provider Dashboard</h1>
          </header>

          <Card variant="strong" className="rounded-3xl border border-white/70 p-6 dark:border-white/10">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">My Bookings</h2>
            <div className="mt-4">
              <ProviderBookingsList initialBookings={bookings} />
            </div>
          </Card>

          <Card variant="strong" className="rounded-3xl border border-white/70 p-6 dark:border-white/10">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Quote Requests</h2>
            <ul className="mt-4 space-y-3">
              {quotes.map((quote) => (
                <li key={quote.id}>
                  <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/55">
                    <p className="text-sm text-slate-700 dark:text-slate-300"><span className="font-semibold">Customer Name:</span> {quote.customerName}</p>
                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-300"><span className="font-semibold">Issue Summary:</span> {quote.issueSummary}</p>
                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-300"><span className="font-semibold">Suburb:</span> {quote.suburb}</p>
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
