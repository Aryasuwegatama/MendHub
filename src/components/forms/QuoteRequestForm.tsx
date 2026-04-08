"use client";

import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

type QuoteRequestFormValues = {
  name: string;
  email: string;
  phone: string;
  suburb: string;
  issueDescription: string;
};

interface QuoteRequestFormProps {
  providerId: string;
}

export default function QuoteRequestForm({ providerId }: QuoteRequestFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteRequestFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      suburb: "",
      issueDescription: "",
    },
  });

  const onSubmit = (data: QuoteRequestFormValues) => {
    console.log("Quote request submitted:", {
      providerId,
      ...data,
    });
    reset();
  };

  return (
    <Card className="mx-auto max-w-3xl bg-white/52 dark:bg-slate-950/42">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
          Quote request
        </p>
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

        <div className="space-y-1.5">
          <label htmlFor="issue-description" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Issue Description
          </label>
          <textarea
            id="issue-description"
            rows={5}
            placeholder="Describe the repair issue and anything the provider should know"
            className="glass-input w-full rounded-xl px-4 py-2.5 transition focus:outline-none focus:ring-2 focus:ring-[var(--surface-ring)]"
            {...register("issueDescription", {
              required: "Issue description is required.",
            })}
          />
          {errors.issueDescription?.message && (
            <p className="text-sm text-red-600">{errors.issueDescription.message}</p>
          )}
        </div>

        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Quote Request"}
        </Button>
      </form>
    </Card>
  );
}
