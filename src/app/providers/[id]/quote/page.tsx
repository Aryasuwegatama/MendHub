import type { Metadata } from "next";
import QuoteRequestForm from "@/components/forms/QuoteRequestForm";
import PageIntro from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Submit a quote request to this repair provider.",
};

export default async function QuoteRequestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <PageIntro
          badge="Request a Quote"
          title="Request a quote with a clear, simple form."
          description={`Complete the form below to request a quote from provider ID ${id}. This flow is frontend-only for now.`}
        />

        <div className="mt-10">
          <QuoteRequestForm providerId={id} />
        </div>
      </div>
    </div>
  );
}
