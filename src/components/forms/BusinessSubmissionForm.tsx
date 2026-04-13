"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listBusinessSchema, type ListBusinessFormValues } from "@/lib/validations/list-business";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionLabel from "@/components/ui/SectionLabel";
import Input from "@/components/ui/Input";

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
  } = useForm<ListBusinessFormValues>({
    resolver: zodResolver(listBusinessSchema),
    defaultValues: {
      businessName: "",
      contactName: "",
      email: "",
      phone: "",
      suburb: "",
      description: "",
    },
  });

  const onSubmit = async (data: ListBusinessFormValues) => {
    setSubmitMessage(null);

    try {
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        throw new Error("You appear to be offline. Please reconnect and try again.");
      }

      const res = await fetch("/api/list-business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error ?? "Submission failed. Please try again.");
      }

      setSubmitMessage({
        type: "success",
        text: "Application submitted! We will be in touch soon.",
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
    <Card variant="default" className="mx-auto max-w-4xl border-white/60">
      <div className="mb-8">
        <SectionLabel>Partner with us</SectionLabel>
        <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">List Your Business</h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          Join Australia&apos;s fastest growing repair network. Fill out the application below and our team will get back to you within 48 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Business Name"
            placeholder="e.g. Brisbane Tech Repairs"
            error={errors.businessName?.message}
            {...register("businessName")}
          />
          <Input
            label="Contact Person Name"
            placeholder="Your full name"
            error={errors.contactName?.message}
            {...register("contactName")}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Business Email"
            type="email"
            placeholder="contact@business.com.au"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Phone"
            type="tel"
            placeholder="0400 000 000"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>

        <Input
          label="Suburb / Location"
          placeholder="e.g. Brisbane QLD"
          error={errors.suburb?.message}
          {...register("suburb")}
        />

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Business Description & Services
          </label>
          <textarea
            id="description"
            rows={5}
            placeholder="Tell us about your repair business, years of experience, and the main types of items you repair (e.g., iPhones, Laptops, Bicycles)."
            className="glass-input w-full rounded-2xl px-4 py-3 transition focus:outline-none focus:ring-2 focus:ring-[var(--surface-ring)]"
            {...register("description")}
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

        <div className="flex flex-col gap-4 pt-4 sm:flex-row">
          <Button type="submit" size="lg" className="px-12" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" className="opacity-25" stroke="currentColor" strokeWidth="3" />
                  <path d="M21 12a9 9 0 0 0-9-9" className="opacity-90" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Submitting Application...
              </span>
            ) : "Submit Application"}
          </Button>
          <p className="flex items-center text-xs text-slate-500 dark:text-slate-400 sm:max-w-xs">
            By submitting, you agree to our terms of service and privacy policy. 
            We will contact you via email to verify your details.
          </p>
        </div>
      </form>
    </Card>
  );
}
