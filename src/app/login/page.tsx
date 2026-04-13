import type { Metadata } from "next";
import LoginRoleForm from "@/components/auth/LoginRoleForm";
import PageIntro from "@/components/ui/PageIntro";
import PageShell from "@/components/ui/PageShell";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page for provider and admin dashboard access.",
};

export default function LoginPage() {
  return (
    <PageShell>
      <PageIntro
        badge="Access"
        title="Login to MendHub"
        description="Sign in to access your Provider Dashboard or MendHub Admin Dashboard."
      />
      <div className="mx-auto mt-8 max-w-xl">
        <LoginRoleForm />
      </div>
    </PageShell>
  );
}
