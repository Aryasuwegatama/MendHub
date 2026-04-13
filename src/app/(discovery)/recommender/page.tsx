"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { routes } from "@/config/routes";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import PageShell from "@/components/ui/PageShell";
import Select from "@/components/ui/Select";
import PriceBadge from "@/components/ui/PriceBadge";
import SuburbAutocomplete from "@/components/SuburbAutocomplete";
import { getRecommendedProviders } from "./actions";

// ── Types ────────────────────────────────────────────────────────────────────

type ItemType = "phone" | "laptop" | "appliance" | "clothing" | "bicycle";

type ProblemOption = {
  value: string;
  label: string;
  /** Service name(s) in the DB to filter by. null = show all providers in the category. */
  serviceFilter: string[] | null;
};

type RecommenderAnswers = {
  item: ItemType | "";
  problem: string;
  /** Resolved service names to pass to the server action. null = no service filter. */
  serviceFilter: string[] | null;
  suburb: string;
};

// ── Static Data ───────────────────────────────────────────────────────────────

const ITEM_OPTIONS: { value: ItemType; label: string }[] = [
  { value: "phone", label: "Phone" },
  { value: "laptop", label: "Laptop" },
  { value: "appliance", label: "Appliance (fridge, oven, washer…)" },
  { value: "clothing", label: "Clothing or garment" },
  { value: "bicycle", label: "Bicycle" },
];

/**
 * Per-item problem options. Each entry maps directly to a real service name
 * in the database (serviceFilter). null means "show all providers in category".
 * Service names are sourced from the DB: services.name column.
 */
const ITEM_PROBLEM_OPTIONS: Record<ItemType, ProblemOption[]> = {
  phone: [
    // Both "Screen Replacement" (FixIt Phone Lab) and "On-Site Screen Repair" (Mobile Medics)
    // represent the same user problem — include both so neither provider is excluded.
    { value: "screen", label: "Screen is cracked or broken", serviceFilter: ["Screen Replacement", "On-Site Screen Repair"] },
    { value: "battery", label: "Battery or charging issue", serviceFilter: ["Battery Replacement"] },
    { value: "charging-port", label: "Charging port not working", serviceFilter: ["Charging Port Fix"] },
    { value: "water", label: "Water damage", serviceFilter: ["Water Damage Repair"] },
    { value: "data", label: "Need data recovered", serviceFilter: ["Data Recovery"] },
    { value: "other", label: "Other / Not sure", serviceFilter: null },
  ],
  laptop: [
    { value: "screen", label: "Screen is cracked or broken", serviceFilter: ["Laptop Screen Replacement"] },
    { value: "slow", label: "Running slow / needs upgrade", serviceFilter: ["RAM/SSD Upgrade"] },
    { value: "diagnostic", label: "Won't turn on / needs full diagnostic", serviceFilter: ["Full Diagnostic"] },
    { value: "data", label: "Need data recovered", serviceFilter: ["Data Recovery"] },
    { value: "other", label: "Other / Not sure", serviceFilter: null },
  ],
  appliance: [
    { value: "fridge", label: "Fridge issue", serviceFilter: ["Fridge Repair"] },
    { value: "oven", label: "Oven or stove issue", serviceFilter: ["Oven/Stove Repair"] },
    { value: "washing", label: "Washing machine issue", serviceFilter: ["Washing Machine Repair"] },
    { value: "other", label: "Other appliance", serviceFilter: null },
  ],
  clothing: [
    { value: "hemming", label: "Hemming or shortening", serviceFilter: ["Hemming"] },
    { value: "zip", label: "Broken zip", serviceFilter: ["Zip Replacement"] },
    { value: "fitting", label: "Custom fitting or tailoring", serviceFilter: ["Custom Fitting"] },
    { value: "other", label: "Other alteration", serviceFilter: null },
  ],
  bicycle: [
    { value: "tune", label: "Needs a tune-up", serviceFilter: ["Basic Tune-Up"] },
    { value: "brakes", label: "Brake issue", serviceFilter: ["Brake Adjustment"] },
    { value: "full-service", label: "Full service", serviceFilter: ["Full Service"] },
    { value: "tyre", label: "Flat tyre or tyre replacement", serviceFilter: ["Tyre Replacement"] },
    { value: "wheel", label: "Wheel or rim issue", serviceFilter: ["Wheel Truing"] },
    { value: "other", label: "Other / Not sure", serviceFilter: null },
  ],
};

/** Maps item type directly to a database category name (categories.name). */
const ITEM_TO_CATEGORY: Record<ItemType, string> = {
  phone: "Phone Repair",
  laptop: "Laptop Repair",
  appliance: "Appliance Repair",
  clothing: "Clothing Alteration",
  bicycle: "Bicycle Repair",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function getRecommendation(answers: RecommenderAnswers): string {
  return answers.item ? ITEM_TO_CATEGORY[answers.item] : "";
}

function getProblemLabel(answers: RecommenderAnswers): string | null {
  if (!answers.item || !answers.problem) return null;
  return (
    ITEM_PROBLEM_OPTIONS[answers.item]?.find((o) => o.value === answers.problem)?.label ?? null
  );
}

const TOTAL_STEPS = 3;

// ── Component ─────────────────────────────────────────────────────────────────

export default function RecommenderPage() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [matchedProviders, setMatchedProviders] = useState<Array<{ id: string; businessName: string }> | null>(null);

  const [answers, setAnswers] = useState<RecommenderAnswers>({
    item: "",
    problem: "",
    serviceFilter: null,
    suburb: "",
  });

  const recommendation = useMemo(() => getRecommendation(answers), [answers]);
  const problemLabel = useMemo(() => getProblemLabel(answers), [answers]);

  const handleNext = () => {
    if (step === 1 && !answers.item) {
      setError("Please choose what item needs repair.");
      return;
    }

    if (step === 2 && !answers.problem) {
      setError("Please choose the type of issue.");
      return;
    }

    if (step === 3 && !answers.suburb.trim()) {
      setError("Please enter your preferred suburb or area.");
      return;
    }

    if (step === 3) {
      setError("");
      // Advance the step BEFORE the async call so the right panel
      // enters the loading branch immediately (isPending becomes true).
      setStep(4);
      startTransition(async () => {
        try {
          const results = await getRecommendedProviders(
            recommendation,
            answers.suburb,
            answers.serviceFilter
          );
          setMatchedProviders(results);
        } catch {
          // On DB / network failure, bring the user back to step 3
          // and surface a recoverable error message.
          setStep(3);
          setError("Something went wrong fetching providers. Please try again.");
        }
      });
      return;
    }

    setError("");
    setStep((current) => current + 1);
  };

  const handleBack = () => {
    setError("");
    setStep((current) => Math.max(1, current - 1));
  };

  const handleReset = () => {
    setAnswers({ item: "", problem: "", serviceFilter: null, suburb: "" });
    setMatchedProviders(null);
    setError("");
    setStep(1);
  };

  // The problem options to display in Step 2, computed from Step 1 selection
  const currentProblemOptions = answers.item
    ? ITEM_PROBLEM_OPTIONS[answers.item].map((opt) => ({
        value: opt.value,
        label: opt.label,
      }))
    : [];

  return (
    <PageShell>
      <div className="mb-10 max-w-3xl">
        <SectionLabel>MVP innovation feature</SectionLabel>
        <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          Smart Recommender
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Answer 3 short questions and we&apos;ll find the right repair professionals for your exact issue — no browsing required.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        {/* ── Left: Question wizard ── */}
        <Card variant="default">
          <SectionLabel>Smart recommender</SectionLabel>
          <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
            Answer 3 short questions
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            We&apos;ll match you with providers who offer exactly what you need.
          </p>

          {step <= TOTAL_STEPS && (
            <p className="mt-6 text-sm font-medium text-slate-500 dark:text-slate-400">
              Step {step} of {TOTAL_STEPS}
            </p>
          )}

          <div className="mt-4 space-y-5">
            {/* Step 1: Item type */}
            {step === 1 && (
              <Select
                label="What item needs repair?"
                value={answers.item}
                onChange={(event) => {
                  // Reset Step 2 state whenever item changes
                  setAnswers((current) => ({
                    ...current,
                    item: event.target.value as ItemType,
                    problem: "",
                    serviceFilter: null,
                  }));
                  setError("");
                }}
                options={ITEM_OPTIONS}
                placeholder="Select item type"
              />
            )}

            {/* Step 2: Problem — rendered dynamically based on Step 1 selection */}
            {step === 2 && answers.item && (
              <Select
                label="What's the issue?"
                value={answers.problem}
                onChange={(event) => {
                  // Resolve the serviceFilter array from the selected problem option
                  const selectedOption = ITEM_PROBLEM_OPTIONS[answers.item as ItemType].find(
                    (opt) => opt.value === event.target.value
                  );
                  setAnswers((current) => ({
                    ...current,
                    problem: event.target.value,
                    serviceFilter: selectedOption?.serviceFilter ?? null,
                  }));
                  setError("");
                }}
                options={currentProblemOptions}
                placeholder="Select the issue"
              />
            )}

            {/* Step 3: Suburb autocomplete */}
            {step === 3 && (
              <SuburbAutocomplete
                label="What suburb or area is preferred?"
                placeholder="e.g. Brisbane City"
                value={answers.suburb}
                onChange={(val) => {
                  setAnswers((current) => ({ ...current, suburb: val }));
                  setError("");
                }}
              />
            )}

            {error && <p className="text-sm font-medium text-red-600">{error}</p>}

            {step <= TOTAL_STEPS && (
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={handleBack}
                  disabled={step === 1 || isPending}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={handleNext}
                  disabled={isPending}
                >
                  {step === TOTAL_STEPS ? "Find Providers" : "Continue"}
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* ── Right: Results panel ── */}
        <Card variant="default" className="flex flex-col">
          <SectionLabel>Matched providers</SectionLabel>

          {/* Check isPending first — step advances to 4 before the fetch so
              the spinner must be evaluated before the step <= TOTAL_STEPS guard. */}
          {isPending ? (
            <div className="flex flex-1 flex-col items-center justify-center py-10">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" />
              <p className="mt-4 text-slate-600 dark:text-slate-300">Finding best providers for you...</p>
            </div>
          ) : step <= TOTAL_STEPS ? (
            <>
              <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">
                Your matches will appear here
              </h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300">
                Complete all 3 questions and we&apos;ll find providers for your exact issue.
              </p>
            </>
          ) : matchedProviders && matchedProviders.length > 0 ? (
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{recommendation}</h3>

                {/* Show the specific issue label when a service filter is active */}
                {problemLabel && answers.serviceFilter && answers.serviceFilter.length > 0 && (
                  <p className="mt-1 text-sm font-semibold text-teal-600 dark:text-teal-400">
                    Filtered for: {problemLabel}
                  </p>
                )}

                <p className="mt-2 text-slate-600 dark:text-slate-300">
                  We found {matchedProviders.length} provider{matchedProviders.length !== 1 ? "s" : ""} matching your needs
                  {answers.suburb.trim() ? ` in ${answers.suburb.trim()}` : ""}.
                </p>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto pr-2 max-h-[500px]">
                {matchedProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-teal-300 dark:border-white/10 dark:bg-slate-900"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                          {provider.businessName}
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{provider.suburb}</p>
                      </div>
                      <PriceBadge className="px-3 py-1 text-xs">{provider.price}</PriceBadge>
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
                      {provider.description}
                    </p>

                    <div className="mt-4">
                      <Link
                        href={routes.providers.details(provider.id)}
                        className="inline-flex w-full items-center justify-center rounded-full bg-teal-500 py-2 text-sm font-semibold text-slate-950 transition hover:bg-teal-400"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-6 dark:border-white/5">
                <Button type="button" variant="ghost" size="md" onClick={handleReset}>
                  Start Again
                </Button>
                <Link
                  href={routes.providers.index}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
                >
                  Browse All Providers
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">No exact matches found</h3>
              <p className="mt-3 max-w-xs text-slate-600 dark:text-slate-300">
                We couldn&apos;t find providers
                {answers.suburb.trim() ? ` in "${answers.suburb.trim()}"` : ""} for{" "}
                {problemLabel ?? recommendation}.
              </p>
              <div className="mt-6 space-y-3">
                <Button type="button" variant="primary" size="md" onClick={handleReset}>
                  Try Different Options
                </Button>
                <Link
                  href={routes.providers.index}
                  className="block text-sm font-semibold text-teal-600 hover:text-teal-500 dark:text-teal-400"
                >
                  See all Brisbane providers
                </Link>
              </div>
            </div>
          )}
        </Card>
      </div>
    </PageShell>
  );
}
