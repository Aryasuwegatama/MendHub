import type { Metadata } from "next";
import RegisterBusinessForm from "@/components/forms/RegisterBusinessForm";
import PageIntro from "@/components/ui/PageIntro";
import PageShell from "@/components/ui/PageShell";

export const metadata: Metadata = {
  title: "Register",
  description: "List your business on MendHub.",
};

export default function RegisterPage() {
  return (
    <PageShell>
      <PageIntro
        badge="Business"
        title="List Your Business"
        description="Submit your business details to join the MendHub marketplace."
      />
      <div className="mx-auto mt-8 max-w-2xl">
        <RegisterBusinessForm />
      </div>
    </PageShell>
  );
}
