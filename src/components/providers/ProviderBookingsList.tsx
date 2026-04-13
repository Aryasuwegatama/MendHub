"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

type BookingStatus = "Pending" | "Approved" | "Rejected";

export type ProviderBooking = {
  id: string;
  customerName: string;
  service: string;
  date: string;
  status: BookingStatus;
};

type ProviderBookingsListProps = {
  initialBookings: ProviderBooking[];
};

function statusVariant(status: BookingStatus) {
  if (status === "Approved") {
    return "success";
  }

  if (status === "Rejected") {
    return "error";
  }

  return "warning";
}

export default function ProviderBookingsList({ initialBookings }: ProviderBookingsListProps) {
  const [bookings, setBookings] = useState(initialBookings);

  function updateStatus(id: string, status: "Approved" | "Rejected"): void {
    setBookings((current) =>
      current.map((booking) => (booking.id === id ? { ...booking, status } : booking))
    );
  }

  return (
    <ul className="space-y-3">
      {bookings.map((booking) => (
        <li key={booking.id}>
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/55">
            <div className="grid gap-2 md:grid-cols-4">
              <p className="text-sm text-slate-700 dark:text-slate-300"><span className="font-semibold">Customer:</span> {booking.customerName}</p>
              <p className="text-sm text-slate-700 dark:text-slate-300"><span className="font-semibold">Service:</span> {booking.service}</p>
              <p className="text-sm text-slate-700 dark:text-slate-300"><span className="font-semibold">Date:</span> {booking.date}</p>
              <div><Badge variant={statusVariant(booking.status)}>{booking.status}</Badge></div>
            </div>

            <div className="mt-3 flex gap-2">
              <Button type="button" size="sm" variant="secondary" onClick={() => updateStatus(booking.id, "Approved")}>Approve</Button>
              <Button type="button" size="sm" variant="outline" onClick={() => updateStatus(booking.id, "Rejected")}>Reject</Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
