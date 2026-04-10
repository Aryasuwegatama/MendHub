"use client";

import { useState, useEffect, useRef } from "react";
import { BRISBANE_SUBURBS } from "@/lib/brisbane-suburbs";
import Input from "./ui/Input";

interface SuburbAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
}

export default function SuburbAutocomplete({
  value,
  onChange,
  label,
  placeholder,
  error,
}: SuburbAutocompleteProps) {
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

  const filteredSuburbs = BRISBANE_SUBURBS.filter((suburb) =>
    suburb.toLowerCase().includes(value.toLowerCase())
  ).slice(0, 10);

  const handleSelect = (suburb: string) => {
    onChange(suburb);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <Input
        label={label}
        placeholder={placeholder}
        value={value}
        error={error}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
      />

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
  );
}
