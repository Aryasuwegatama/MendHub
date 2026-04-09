"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { routes } from "@/config/routes";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import PageShell from "@/components/ui/PageShell";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

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

type NextStepType = "quote" | "book" | "browse";

type RecommenderAnswers = {
  item: ItemType | "";
  problem: ProblemType | "";
  suburb: string;
  nextStep: NextStepType | "";
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

const NEXT_STEP_OPTIONS: { value: NextStepType; label: string }[] = [
  { value: "quote", label: "Request a quote" },
  { value: "book", label: "Book a service" },
  { value: "browse", label: "Browse providers first" },
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

const NEXT_STEP_TO_CTA: Record<NextStepType, string> = {
  quote: "Request Quote",
  book: "Book Service",
  browse: "See Providers",
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

function getProvidersHref(answers: RecommenderAnswers) {
  if (answers.item && answers.item !== "other") {
    return routes.providers.byCategory(answers.item);
  }

  if (answers.problem === "cracked") {
    return routes.providers.byCategory("phone");
  }

  if (answers.problem === "not-turning-on") {
    return routes.providers.byCategory("laptop");
  }

  if (answers.problem === "not-working") {
    return routes.providers.byCategory("appliance");
  }

  if (answers.problem === "adjustment") {
    return routes.providers.byCategory("clothing");
  }

  if (answers.problem === "noise-damage-wear") {
    return routes.providers.byCategory("bicycle");
  }

  return routes.providers.index;
}

const TOTAL_STEPS = 4;

export default function RecommenderPage() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState<RecommenderAnswers>({
    item: "",
    problem: "",
    suburb: "",
    nextStep: "",
  });

  const recommendation = useMemo(() => getRecommendation(answers), [answers]);
  const providersHref = useMemo(() => getProvidersHref(answers), [answers]);

  const handleNext = () => {
    if (step === 1 && !answers.item) {
      setError("Please choose what item needs repair.");
      return;
    }

    if (step === 2 && !answers.problem) {
      setError("Please choose the problem type.");
      return;
    }

    if (step === 3 && !answers.suburb.trim()) {
      setError("Please enter your preferred suburb or area.");
      return;
    }

    if (step === 4 && !answers.nextStep) {
      setError("Please choose your preferred next step.");
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
      nextStep: "",
    });
    setError("");
    setStep(1);
  };

  const ctaLabel = answers.nextStep ? NEXT_STEP_TO_CTA[answers.nextStep] : "See Providers";

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
            <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">Answer 4 short questions</h2>
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
                <Input
                  label="What suburb or area is preferred?"
                  placeholder="e.g. Brisbane City"
                  value={answers.suburb}
                  onChange={(event) => {
                    setAnswers((current) => ({ ...current, suburb: event.target.value }));
                    setError("");
                  }}
                />
              )}

              {step === 4 && (
                <Select
                  label="What would you prefer next?"
                  value={answers.nextStep}
                  onChange={(event) => {
                    setAnswers((current) => ({ ...current, nextStep: event.target.value as NextStepType }));
                    setError("");
                  }}
                  options={NEXT_STEP_OPTIONS}
                  placeholder="Choose next action"
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

          <Card variant="default">
            <SectionLabel>Recommended outcome</SectionLabel>
            {step <= TOTAL_STEPS ? (
              <>
                <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">Your recommendation will appear here</h3>
                <p className="mt-3 text-slate-600 dark:text-slate-300">
                  Complete all 4 questions to get a category match and your best next step.
                </p>
              </>
            ) : (
              <>
                <h3 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{recommendation}</h3>
                <p className="mt-4 text-slate-600 dark:text-slate-300">
                  Suggested next step: {ctaLabel}
                  {answers.suburb.trim() ? ` in ${answers.suburb.trim()}` : ""}.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={providersHref}
                    className="inline-flex items-center justify-center rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
                  >
                    {ctaLabel}
                  </Link>
                  <Button type="button" variant="ghost" size="md" className="text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white" onClick={handleReset}>
                    Start Again
                  </Button>
                </div>
              </>
            )}
          </Card>
        </div>
    </PageShell>
  );
}
