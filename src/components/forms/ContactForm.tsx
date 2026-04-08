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
      <Card className="border-slate-200 bg-white">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">Contact form</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Send us a message</h2>
          <p className="mt-2 text-slate-600">We usually reply within one business day.</p>
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
            <label htmlFor="message" className="block text-sm font-medium text-slate-700">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              placeholder="Tell us what you need help with"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
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

      <Card className="border-slate-200 bg-slate-900 text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Business contact details</p>
        <h3 className="mt-2 text-2xl font-bold">MendHub Support</h3>
        <p className="mt-3 text-slate-300">
          Reach us through any channel below and we will guide you on bookings, quotes, providers, or listing your business.
        </p>

        <div className="mt-6 space-y-4 text-sm">
          <div>
            <p className="text-slate-400">Email</p>
            <a href="mailto:info@mendhub.com.au" className="font-medium text-white hover:text-cyan-300">
              info@mendhub.com.au
            </a>
          </div>
          <div>
            <p className="text-slate-400">Phone</p>
            <a href="tel:+61712345678" className="font-medium text-white hover:text-cyan-300">
              (07) 1234 5678
            </a>
          </div>
          <div>
            <p className="text-slate-400">Address</p>
            <p className="font-medium text-white">Brisbane, QLD 4000</p>
          </div>
          <div>
            <p className="text-slate-400">Business hours</p>
            <p className="font-medium text-white">Mon-Fri: 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
