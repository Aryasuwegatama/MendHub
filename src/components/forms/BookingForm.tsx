"use client";

import { useState } from "react";
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
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

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

  const onSubmit = async (data: BookingFormValues) => {
    setSubmitMessage(null);

    try {
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        throw new Error("You appear to be offline. Please reconnect and try again.");
      }

      await Promise.resolve();

      console.log("Booking form submitted:", {
        providerId,
        ...data,
      });

      setSubmitMessage({
        type: "success",
        text: "Booking request submitted successfully.",
      });
      reset();
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Card className="mx-auto max-w-3xl bg-white/52 dark:bg-slate-950/42">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">Booking request</p>
        <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">Book a Repair Service</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
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
          <label htmlFor="issue-summary" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Issue Summary
          </label>
          <textarea
            id="issue-summary"
            rows={5}
            placeholder="Briefly describe the repair issue"
            className="glass-input w-full rounded-xl px-4 py-2.5 transition focus:outline-none focus:ring-2 focus:ring-[var(--surface-ring)]"
            {...register("issueSummary", {
              required: "Issue summary is required.",
            })}
          />
          {errors.issueSummary?.message && (
            <p className="text-sm text-red-600">{errors.issueSummary.message}</p>
          )}
        </div>

        {submitMessage ? (
          <div
            className={submitMessage.type === "success"
              ? "rounded-2xl border border-teal-200 bg-teal-50/80 px-4 py-3 text-sm font-medium text-teal-800 dark:border-teal-400/20 dark:bg-teal-400/10 dark:text-teal-200"
              : "rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-200"
            }
          >
            {submitMessage.text}
          </div>
        ) : null}

        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" className="opacity-25" stroke="currentColor" strokeWidth="3" />
                <path d="M21 12a9 9 0 0 0-9-9" className="opacity-90" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Submitting...
            </span>
          ) : "Submit Booking"}
        </Button>
      </form>
    </Card>
  );
}
