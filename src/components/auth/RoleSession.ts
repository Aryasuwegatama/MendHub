export type UserRole = "provider" | "admin";

export type SimulatedSession = {
  email: string;
  role: UserRole;
};

export const SESSION_KEY = "mendhub_session";

export function saveSession(session: SimulatedSession): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession(): SimulatedSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<SimulatedSession>;
    if ((parsed.role === "provider" || parsed.role === "admin") && typeof parsed.email === "string") {
      return { role: parsed.role, email: parsed.email };
    }
  } catch {
    return null;
  }

  return null;
}

export function clearSession(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
}
