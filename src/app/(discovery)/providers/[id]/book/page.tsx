import type { Metadata } from "next";
import BookingForm from "@/components/forms/BookingForm";
import PageIntro from "@/components/ui/PageIntro";
import { getMockProviderParams } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "Book a Repair",
  description: "Schedule your repair appointment with this provider.",
};

export function generateStaticParams() {
  return getMockProviderParams();
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <PageIntro
          badge="Book a Repair"
          title="Book a repair with the same polished framing used across the site."
          description={`Complete the booking form below for provider ID ${id}. This route stays frontend-only for now.`}
        />

        <div className="mt-10">
          <BookingForm providerId={id} />
        </div>
      </div>
    </div>
  );
}
