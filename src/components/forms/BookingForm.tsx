"use client";

import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

type BookingFormValues = {
  name: string;
  email: string;
  phone: string;
  suburb: string;
  preferredDate: string;
  issueSummary: string;
};

interface BookingFormProps {
  providerId: string;
}

export default function BookingForm({ providerId }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      suburb: "",
      preferredDate: "",
      issueSummary: "",
    },
  });

  const onSubmit = (data: BookingFormValues) => {
    console.log("Booking form submitted:", {
      providerId,
      ...data,
    });
    reset();
  };

  return (
    <Card className="mx-auto max-w-3xl border-slate-200 bg-white">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">Booking request</p>
        <h2 className="mt-3 text-2xl font-bold text-slate-900">Book a Repair Service</h2>
        <p className="mt-3 text-slate-600">
          Fill out the details below and we will use this information to start your booking.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Name"
          placeholder="Your full name"
          error={errors.name?.message}
          {...register("name", {
            required: "Name is required.",
          })}
        />

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address.",
            },
          })}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Phone"
            type="tel"
            placeholder="0400 000 000"
            error={errors.phone?.message}
            {...register("phone", {
              required: "Phone is required.",
            })}
          />

          <Input
            label="Suburb"
            placeholder="e.g. Brisbane City"
            error={errors.suburb?.message}
            {...register("suburb", {
              required: "Suburb is required.",
            })}
          />
        </div>

        <Input
          label="Preferred Date"
          type="date"
          error={errors.preferredDate?.message}
          {...register("preferredDate", {
            required: "Preferred date is required.",
          })}
        />

        <div className="space-y-1.5">
          <label htmlFor="issue-summary" className="block text-sm font-medium text-slate-700">
            Issue Summary
          </label>
          <textarea
            id="issue-summary"
            rows={5}
            placeholder="Briefly describe the repair issue"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            {...register("issueSummary", {
              required: "Issue summary is required.",
            })}
          />
          {errors.issueSummary?.message && (
            <p className="text-sm text-red-600">{errors.issueSummary.message}</p>
          )}
        </div>

        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Booking"}
        </Button>
      </form>
    </Card>
  );
}
