"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteSchema, type QuoteFormValues } from "@/lib/validations/quote";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionLabel from "@/components/ui/SectionLabel";
import Input from "@/components/ui/Input";

interface QuoteRequestFormProps {
  providerId: string;
  serviceId?: string;
}

export default function QuoteRequestForm({ providerId, serviceId }: QuoteRequestFormProps) {
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      suburb: "",
      issueDescription: "",
    },
  });

  const onSubmit = async (data: QuoteFormValues) => {
    setSubmitMessage(null);

    try {
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        throw new Error("You appear to be offline. Please reconnect and try again.");
      }

      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          providerId,
          serviceId,
          customerName: data.name,
          customerEmail: data.email,
          customerPhone: data.phone,
          issueDescription: data.issueDescription,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error ?? "Submission failed. Please try again.");
      }

      reset();
      setSubmitMessage({
        type: "success",
        text: "Your quote request has been submitted. The provider will review it and get back to you within 24 hours.",
      });
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Card variant="default" className="mx-auto max-w-3xl">
      <div className="mb-8">
        <SectionLabel>Quote request</SectionLabel>
        <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
          Request a Quote
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Share the issue details below and we will use this information to prepare a quote request.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Name"
          placeholder="Your full name"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Phone"
            type="tel"
            placeholder="0400 000 000"
            error={errors.phone?.message}
            {...register("phone")}
          />

          <Input
            label="Suburb"
            placeholder="e.g. Brisbane City"
            error={errors.suburb?.message}
            {...register("suburb")}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="issue-description" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Issue Description
          </label>
          <textarea
            id="issue-description"
            rows={5}
            placeholder="Describe the repair issue and anything the provider should know"
            className="glass-input w-full rounded-xl px-4 py-2.5 transition focus:outline-none focus:ring-2 focus:ring-[var(--surface-ring)]"
            {...register("issueDescription")}
          />
          {errors.issueDescription?.message && (
            <p className="text-sm text-red-600">{errors.issueDescription.message}</p>
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
          ) : "Submit Quote Request"}
        </Button>
      </form>
    </Card>
  );
}

