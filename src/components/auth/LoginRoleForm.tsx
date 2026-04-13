"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { routes } from "@/config/routes";
import { saveSession, type UserRole } from "@/components/auth/RoleSession";

export default function LoginRoleForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("provider");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (!email || !password) {
      return;
    }

    saveSession({ email, role });

    if (role === "admin") {
      router.push(routes.admin);
      return;
    }

    router.push(routes.provider);
  }

  return (
    <Card variant="strong" className="rounded-3xl border border-white/70 p-6 dark:border-white/10">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />

        <Input
          label="Password"
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
        />

        <Select
          label="Login as"
          required
          value={role}
          onChange={(event) => setRole(event.target.value as UserRole)}
          options={[
            { value: "provider", label: "Provider" },
            { value: "admin", label: "Admin" },
          ]}
        />

        <Button type="submit" size="lg" className="w-full">
          Login
        </Button>
      </form>
    </Card>
  );
}
