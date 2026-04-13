"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { routes } from "@/config/routes";

type FormState = {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  suburb: string;
  category: string;
  description: string;
};

const initialState: FormState = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  suburb: "",
  category: "",
  description: "",
};

export default function RegisterBusinessForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChange<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
    setForm(initialState);
  }

  return (
    <Card variant="strong" className="rounded-3xl border border-white/70 p-6 dark:border-white/10">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Business Name"
            required
            value={form.businessName}
            onChange={(event) => handleChange("businessName", event.target.value)}
          />
          <Input
            label="Contact Name"
            required
            value={form.contactName}
            onChange={(event) => handleChange("contactName", event.target.value)}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(event) => handleChange("email", event.target.value)}
          />
          <Input
            label="Phone"
            type="tel"
            required
            value={form.phone}
            onChange={(event) => handleChange("phone", event.target.value)}
          />
        </div>
        <Input
          label="Suburb"
          required
          value={form.suburb}
          onChange={(event) => handleChange("suburb", event.target.value)}
        />

        <Select
          label="Service Category"
          required
          value={form.category}
          onChange={(event) => handleChange("category", event.target.value)}
          placeholder="Choose service category"
          options={[
            { value: "phone-repair", label: "Phone Repair" },
            { value: "laptop-repair", label: "Laptop Repair" },
            { value: "appliance-repair", label: "Appliance Repair" },
            { value: "general-maintenance", label: "General Maintenance" },
          ]}
        />

        <div className="space-y-1.5">
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Description
          </label>
          <textarea
            id="description"
            required
            rows={4}
            value={form.description}
            onChange={(event) => handleChange("description", event.target.value)}
            className="glass-input w-full rounded-xl px-4 py-2.5 transition focus:outline-none focus:ring-2 focus:ring-[var(--surface-ring)]"
          />
        </div>

        {isSubmitted ? (
          <div className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-medium text-teal-800 dark:border-teal-500/30 dark:bg-teal-500/10 dark:text-teal-200">
            Your business has been submitted for review
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="submit" size="lg">
            Submit Application
          </Button>
          <Link href={routes.login}>
            <Button type="button" variant="outline" size="lg">
              Go to Login
            </Button>
          </Link>
        </div>
      </form>
    </Card>
  );
}
