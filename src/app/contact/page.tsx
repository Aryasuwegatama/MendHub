import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the MendHub team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-700">Contact MendHub</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Contact Us</h1>
          <p className="mt-4 text-slate-600">
            Have questions? We&apos;re here to help. Send us a message and our team will follow up.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
