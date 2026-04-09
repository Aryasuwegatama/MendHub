"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

type BusinessSubmissionFormValues = {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  suburb: string;
  description: string;
};

export default function BusinessSubmissionForm() {
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BusinessSubmissionFormValues>({
    defaultValues: {
      businessName: "",
      contactName: "",
      email: "",
      phone: "",
      suburb: "",
      description: "",
    },
  });

  const onSubmit = async (data: BusinessSubmissionFormValues) => {
    setSubmitMessage(null);

    try {
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        throw new Error("You appear to be offline. Please reconnect and try again.");
      }

      // Simulate API call for now (Phase 6 will include real fetch)
      await new Promise((resolve) => setTimeout(resolve, 800));

      console.log("Business submission form submitted:", data);

      setSubmitMessage({
        type: "success",
        text: "Your application has been submitted successfully! We will review it and get back to you soon.",
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
    <Card variant="default" className="mx-auto max-w-2xl border-white/60">
      <div className="mb-6">
        <SectionLabel>Listing application</SectionLabel>
        <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">List your business</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Fill out the details below and we will help you get started on MendHub.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Business Name"
          placeholder="e.g. Brisbane Bike Workshop"
          error={errors.businessName?.message}
          {...register("businessName", { required: "Business name is required." })}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Contact Name"
            placeholder="Your full name"
            error={errors.contactName?.message}
            {...register("contactName", { required: "Contact name is required." })}
          />

          <Input
            label="Phone"
            type="tel"
            placeholder="0400 000 000"
            error={errors.phone?.message}
            {...register("phone", { required: "Phone number is required." })}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Email"
            type="email"
            placeholder="you@business.com"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address.",
              },
            })}
          />

          <Input
            label="Suburb / Location"
            placeholder="e.g. New Farm, QLD"
            error={errors.suburb?.message}
            {...register("suburb", { required: "Location is required." })}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Tell us about your services
          </label>
          <textarea
            id="description"
            rows={5}
            placeholder="Briefly describe what you repair and your service area..."
            className="glass-input w-full rounded-xl px-4 py-2.5 transition focus:outline-none focus:ring-2 focus:ring-[var(--surface-ring)]"
            {...register("description", { required: "Description is required." })}
          />
          {errors.description?.message && (
            <p className="text-sm text-red-600">{errors.description.message}</p>
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
          ) : "Submit Application"}
        </Button>
      </form>
    </Card>
  );
}
