"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, FormEvent, useEffect, useRef } from "react";

export interface ServiceOption {
  name: string;
  category: string;
}

interface ServiceSearchInputProps {
  defaultValue?: string;
  availableServices?: ServiceOption[];
}

/**
 * Client Component — service keyword search input that updates the 'q' URL query param
 * on submit, triggering a server-side re-fetch of filtered providers based on service name/desc.
 */
export default function ServiceSearchInput({ defaultValue = "", availableServices = [] }: ServiceSearchInputProps) {
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
      params.set("q", value.trim());
    } else {
      params.delete("q");
    }

    router.push(`/providers?${params.toString()}`);
  };

  const handleClear = () => {
    setValue("");
    setIsOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.push(`/providers?${params.toString()}`);
  };

  const handleSelect = (service: string) => {
    setValue(service);
    setIsOpen(false);
    
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", service);
    router.push(`/providers?${params.toString()}`);
  };

  const filteredServices = availableServices.filter(
    (s) => s.name.toLowerCase().includes(value.toLowerCase())
  );

  const groupedServices = filteredServices.reduce((acc, current) => {
    if (!acc[current.category]) acc[current.category] = [];
    if (!acc[current.category].includes(current.name)) {
      acc[current.category].push(current.name);
    }
    return acc;
  }, {} as Record<string, string[]>);

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

        {isOpen && Object.keys(groupedServices).length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 z-50 max-h-80 overflow-y-auto rounded-2xl border border-slate-200/80 bg-white/95 p-1.5 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-slate-900/95">
            <div className="flex flex-col gap-2">
              {Object.entries(groupedServices).map(([category, services]) => (
                <div key={category} className="flex flex-col gap-0.5">
                  <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {category}
                  </div>
                  {services.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => handleSelect(service)}
                      className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800/80 dark:hover:text-white rounded-xl transition-colors"
                    >
                      {service}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <button
        type="submit"
        className="rounded-full bg-teal-500 px-6 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-400 shrink-0"
      >
        Search Services
      </button>
    </form>
  );
}
