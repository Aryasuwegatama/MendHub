"use client";

import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log("Contact form submitted:", data);
    reset();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <Card className="border-white/60 bg-white/52 dark:bg-slate-950/42">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">Contact form</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Send us a message</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">We usually reply within one business day.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Name"
            placeholder="Your full name"
            error={errors.name?.message}
            {...register("name", { required: "Name is required." })}
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

          <Input
            label="Subject"
            placeholder="How can we help?"
            error={errors.subject?.message}
            {...register("subject", { required: "Subject is required." })}
          />

          <div className="space-y-1.5">
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              placeholder="Tell us what you need help with"
              className="glass-input w-full rounded-xl px-4 py-2.5 transition focus:outline-none focus:ring-2 focus:ring-[var(--surface-ring)]"
              {...register("message", { required: "Message is required." })}
            />
            {errors.message?.message && (
              <p className="text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>

          <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Card>

      <div className="rounded-3xl border border-cyan-200/35 bg-gradient-to-br from-teal-900/88 via-slate-900/88 to-cyan-950/86 p-6 text-white shadow-2xl shadow-slate-950/20 backdrop-blur-xl dark:border-cyan-200/12 dark:from-teal-950/84 dark:via-slate-950/84 dark:to-cyan-950/84">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Business contact details</p>
        <h3 className="mt-2 text-2xl font-bold text-white">MendHub Support</h3>
        <p className="mt-3 text-slate-100/90">
          Reach us through any channel below and we will guide you on bookings, quotes, providers, or listing your business.
        </p>

        <div className="mt-6 space-y-4 text-sm">
          <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-sm">
            <p className="text-slate-300">Email</p>
            <a href="mailto:info@mendhub.com.au" className="font-semibold text-white hover:text-cyan-200">
              info@mendhub.com.au
            </a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-sm">
            <p className="text-slate-300">Phone</p>
            <a href="tel:+61712345678" className="font-semibold text-white hover:text-cyan-200">
              (07) 1234 5678
            </a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-sm">
            <p className="text-slate-300">Address</p>
            <p className="font-semibold text-white">Brisbane, QLD 4000</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-sm">
            <p className="text-slate-300">Business hours</p>
            <p className="font-semibold text-white">Mon-Fri: 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
