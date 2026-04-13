"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate API call for assessment purposes
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-800">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
        Subscribe to our newsletter
      </h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Get the latest repair tips and special offers delivered to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 sm:flex max-w-md">
        <label htmlFor="email-address" className="sr-only">
          Email address
        </label>
        <div className="flex-grow">
          <input
            type="email"
            name="email-address"
            id="email-address"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full min-w-0 appearance-none rounded-2xl border border-slate-300 bg-white/50 px-4 py-2 text-base text-slate-900 placeholder-slate-500 backdrop-blur-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:placeholder-slate-400"
            placeholder="Enter your email"
            disabled={status === "loading" || status === "success"}
          />
        </div>
        <div className="mt-3 rounded-md sm:ml-3 sm:mt-0 sm:flex-shrink-0">
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="flex w-full items-center justify-center rounded-2xl border border-transparent bg-teal-600 px-6 py-2 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-teal-500 dark:hover:bg-teal-600"
          >
            {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
          </button>
        </div>
      </form>
      {status === "success" && (
        <p className="mt-3 text-sm font-medium text-teal-600 dark:text-teal-400">
          🎉 Thank you for subscribing! We&apos;ve sent a verification link to your email.
        </p>
      )}
    </div>
  );
}
