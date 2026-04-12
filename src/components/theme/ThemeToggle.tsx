"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";

const themeOptions = [
  { value: "light", label: "Light", icon: "Sun" },
  { value: "dark", label: "Dark", icon: "Moon" },
] as const;

function ThemeIcon({ icon }: { icon: "Sun" | "Moon" }) {
  if (icon === "Sun") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.5 1.5M17.8 17.8l1.5 1.5M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.5-1.5M17.8 6.2l1.5-1.5" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 12.8A8.9 8.9 0 1 1 11.2 3a7.1 7.1 0 0 0 9.8 9.8Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme();
  const isMounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );

  return (
    <div className="glass-pill inline-flex items-center gap-1 rounded-full p-1">
      {themeOptions.map((option) => {
        const isActive = isMounted ? theme === option.value : option.value === "light";

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition",
              compact ? "w-full" : "",
              isActive
                ? "bg-teal-500 text-slate-950 shadow-sm"
                : "text-slate-700 hover:bg-white/50 dark:text-slate-200 dark:hover:bg-white/10"
            )}
            aria-pressed={isActive}
          >
            <ThemeIcon icon={option.icon} />
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
