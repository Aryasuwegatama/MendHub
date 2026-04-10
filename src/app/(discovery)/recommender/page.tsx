"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { routes } from "@/config/routes";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import PageShell from "@/components/ui/PageShell";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import PriceBadge from "@/components/ui/PriceBadge";
import SuburbAutocomplete from "@/components/SuburbAutocomplete";
import { getRecommendedProviders } from "./actions";

type ItemType =
  | "phone"
  | "laptop"
  | "appliance"
  | "clothing"
  | "bicycle"
  | "other";

type ProblemType =
  | "cracked"
  | "not-turning-on"
  | "not-working"
  | "adjustment"
  | "noise-damage-wear"
  | "other";

type RecommenderAnswers = {
  item: ItemType | "";
  problem: ProblemType | "";
  suburb: string;
};

const ITEM_OPTIONS: { value: ItemType; label: string }[] = [
  { value: "phone", label: "Phone" },
  { value: "laptop", label: "Laptop" },
  { value: "appliance", label: "Appliance" },
  { value: "clothing", label: "Clothing" },
  { value: "bicycle", label: "Bicycle" },
  { value: "other", label: "Other / Not sure" },
];

const PROBLEM_OPTIONS: { value: ProblemType; label: string }[] = [
  { value: "cracked", label: "Cracked or broken" },
  { value: "not-turning-on", label: "Not turning on" },
  { value: "not-working", label: "Not working properly" },
  { value: "adjustment", label: "Needs adjustment or replacement" },
  { value: "noise-damage-wear", label: "Noise / damage / wear" },
  { value: "other", label: "Other" },
];

const ITEM_TO_CATEGORY: Record<ItemType, string> = {
  phone: "Phone Repair",
  laptop: "Laptop Repair",
  appliance: "Appliance Repair",
  clothing: "Clothing Alteration",
  bicycle: "Bicycle Repair",
  other: "General Repair Services",
};

const PROBLEM_FALLBACK_TO_CATEGORY: Record<ProblemType, string> = {
  cracked: "Phone Repair",
  "not-turning-on": "Laptop Repair",
  "not-working": "Appliance Repair",
  adjustment: "Clothing Alteration",
  "noise-damage-wear": "Bicycle Repair",
  other: "General Repair Services",
};

function getRecommendation(answers: RecommenderAnswers) {
  if (answers.item && answers.item !== "other") {
    return ITEM_TO_CATEGORY[answers.item];
  }

  if (answers.problem) {
    return PROBLEM_FALLBACK_TO_CATEGORY[answers.problem];
  }

  return "General Repair Services";
}

const TOTAL_STEPS = 3;

export default function RecommenderPage() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [matchedProviders, setMatchedProviders] = useState<any[] | null>(null);

  const [answers, setAnswers] = useState<RecommenderAnswers>({
    item: "",
    problem: "",
    suburb: "",
  });

  const recommendation = useMemo(() => getRecommendation(answers), [answers]);

  const handleNext = () => {
    if (step === 3 && !answers.suburb.trim()) {
      setError("Please enter your preferred suburb or area.");
      return;
    }

    if (step === 3) {
      setError("");
      startTransition(async () => {
        const results = await getRecommendedProviders(recommendation, answers.suburb);
        setMatchedProviders(results);
        setStep(4); // Showing results
      });
      return;
    }

    setError("");
    setStep((currentStep) => currentStep + 1);
  };

  const handleBack = () => {
    setError("");
    setStep((currentStep) => Math.max(1, currentStep - 1));
  };

  const handleReset = () => {
    setAnswers({
      item: "",
      problem: "",
      suburb: "",
    });
    setMatchedProviders(null);
    setError("");
    setStep(1);
  };

  return (
    <PageShell>
        <div className="mb-10 max-w-3xl">
          <SectionLabel>MVP innovation feature</SectionLabel>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Smart Category Recommender</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            If you are unsure what repair service you need, this guided flow recommends the most suitable category before you continue.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Card variant="default">
            <SectionLabel>Smart category recommender</SectionLabel>
            <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">Answer 3 short questions</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              This guided flow helps you choose the right repair category before browsing providers.
            </p>

            {step <= TOTAL_STEPS && (
              <p className="mt-6 text-sm font-medium text-slate-500 dark:text-slate-400">Step {step} of {TOTAL_STEPS}</p>
            )}

            <div className="mt-4 space-y-5">
              {step === 1 && (
                <Select
                  label="What item needs repair?"
                  value={answers.item}
                  onChange={(event) => {
                    setAnswers((current) => ({ ...current, item: event.target.value as ItemType }));
                    setError("");
                  }}
                  options={ITEM_OPTIONS}
                  placeholder="Select item type"
                />
              )}

              {step === 2 && (
                <Select
                  label="What problem is happening?"
                  value={answers.problem}
                  onChange={(event) => {
                    setAnswers((current) => ({ ...current, problem: event.target.value as ProblemType }));
                    setError("");
                  }}
                  options={PROBLEM_OPTIONS}
                  placeholder="Select problem type"
                />
              )}

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
                  <Button type="button" variant="outline" size="md" onClick={handleBack} disabled={step === 1}>
                    Back
                  </Button>
                  <Button type="button" variant="primary" size="md" onClick={handleNext}>
                    {step === TOTAL_STEPS ? "See Result" : "Continue"}
                  </Button>
                </div>
              )}
            </div>
          </Card>

          <Card variant="default" className="flex flex-col">
            <SectionLabel>Recommended outcome</SectionLabel>
            {step <= TOTAL_STEPS ? (
              <>
                <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">Your recommendation will appear here</h3>
                <p className="mt-3 text-slate-600 dark:text-slate-300">
                  Complete all 3 questions to get a category match and matched providers.
                </p>
              </>
            ) : isPending ? (
              <div className="flex flex-1 flex-col items-center justify-center py-10">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
                <p className="mt-4 text-slate-600 dark:text-slate-300">Finding best providers for you...</p>
              </div>
            ) : matchedProviders && matchedProviders.length > 0 ? (
              <div className="flex flex-1 flex-col overflow-hidden">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{recommendation}</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">
                    We found {matchedProviders.length} providers matching your needs
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
                          <h4 className="text-lg font-bold text-slate-900 dark:text-white">{provider.businessName}</h4>
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
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">No exact matches yet</h3>
                <p className="mt-3 max-w-xs text-slate-600 dark:text-slate-300">
                  We couldn&apos;t find providers in &quot;{answers.suburb}&quot; for {recommendation}.
                </p>
                <div className="mt-6 space-y-3">
                  <Button type="button" variant="primary" size="md" onClick={handleReset}>
                    Try Another Suburb
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
