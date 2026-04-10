"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, FormEvent, useEffect, useRef } from "react";

interface SuburbFilterInputProps {
  defaultValue?: string;
  availableSuburbs?: string[];
}

/**
 * Client Component — suburb search input that updates the URL query param
 * on submit, triggering a server-side re-fetch of filtered providers.
 */
export default function SuburbFilterInput({ defaultValue = "", availableSuburbs = [] }: SuburbFilterInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    setIsOpen(false);

    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("suburb", value.trim());
    } else {
      params.delete("suburb");
    }

    router.push(`/providers?${params.toString()}`);
  };

  const handleClear = () => {
    setValue("");
    setIsOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("suburb");
    router.push(`/providers?${params.toString()}`);
  };

  const handleSelect = (suburb: string) => {
    setValue(suburb);
    setIsOpen(false);

    const params = new URLSearchParams(searchParams.toString());
    params.set("suburb", suburb);
    router.push(`/providers?${params.toString()}`);
  };

  const filteredSuburbs = availableSuburbs.filter(
    (suburb) => suburb.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1" ref={wrapperRef}>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="e.g. Brisbane, West End"
          className="w-full rounded-full border border-slate-200/80 bg-white/70 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 backdrop-blur-sm transition focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-300/40 dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder-slate-500"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear suburb filter"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {isOpen && filteredSuburbs.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 z-50 max-h-60 overflow-y-auto rounded-2xl border border-slate-200/80 bg-white/95 p-1.5 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-slate-900/95">
            <ul className="flex flex-col gap-0.5">
              {filteredSuburbs.map((suburb) => (
                <li key={suburb}>
                  <button
                    type="button"
                    onClick={() => handleSelect(suburb)}
                    className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800/80 dark:hover:text-white rounded-xl transition-colors"
                  >
                    {suburb}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        type="submit"
        className="rounded-full bg-teal-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-400 shrink-0"
      >
        Search
      </button>
    </form>
  );
}
