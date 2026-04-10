"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, FormEvent } from "react";

interface ServiceSearchInputProps {
  defaultValue?: string;
}

/**
 * Client Component — service keyword search input that updates the 'q' URL query param
 * on submit, triggering a server-side re-fetch of filtered providers based on service name/desc.
 */
export default function ServiceSearchInput({ defaultValue = "" }: ServiceSearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("q", value.trim());
    } else {
      params.delete("q");
    }

    router.push(`/providers?${params.toString()}`);
  };

  const handleClear = () => {
    setValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.push(`/providers?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. Screen repair, Battery, HVAC"
          className="w-full rounded-full border border-slate-200/80 bg-white/70 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 backdrop-blur-sm transition focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-300/40 dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder-slate-500"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear service search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
      <button
        type="submit"
        className="rounded-full bg-teal-500 px-6 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-400"
      >
        Search Services
      </button>
    </form>
  );
}
