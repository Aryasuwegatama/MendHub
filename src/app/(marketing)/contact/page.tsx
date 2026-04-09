import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import PageShell from "@/components/ui/PageShell";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the MendHub team.",
};

export default function ContactPage() {
  return (
    <PageShell>
        <div className="mb-10 max-w-3xl">
          <SectionLabel>Contact MendHub</SectionLabel>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Contact Us</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Have questions? We&apos;re here to help. Send us a message and our team will follow up.
          </p>
        </div>

        <ContactForm />
    </PageShell>
  );
}
