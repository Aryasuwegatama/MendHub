import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/ui/Card";
import PageShell from "@/components/ui/PageShell";
import { categoryConfig as categories } from "@/lib/categoryConfig";

export const metadata: Metadata = {
  title: "Browse Categories",
  description: "Browse all repair service categories in Brisbane.",
};

export default function CategoriesPage() {
  return (
    <PageShell>
        <section className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/50 px-6 py-12 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:px-10 dark:border-white/10 dark:bg-slate-950/60">
          <p className="inline-flex rounded-full border border-teal-200 bg-teal-50/80 px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-teal-800">
            Browse categories
          </p>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Choose a repair category with confidence.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Pick a category below to jump into provider listings. Each card routes to the providers page with a category filter in the URL.
          </p>
        </section>

        <section className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <Link key={category.slug} href={category.href} className="group block">
              <Card hoverable variant="default" className="h-full overflow-hidden border-white/70">
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${category.accent} text-3xl shadow-lg shadow-slate-900/10`}>
                  {category.icon}
                </div>
                <h2 className="mt-6 text-2xl font-semibold text-slate-900 dark:text-white transition group-hover:text-teal-800 dark:group-hover:text-teal-300">
                  {category.title}
                </h2>
                <p className="mt-3 text-slate-600 dark:text-slate-300">{category.description}</p>
                <div className="mt-6 inline-flex items-center rounded-full border border-slate-200/80 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 transition group-hover:border-teal-300 group-hover:text-teal-800 dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-200 dark:group-hover:border-teal-400 dark:group-hover:text-teal-300">
                  View providers
                </div>
              </Card>
            </Link>
          ))}
        </section>
    </PageShell>
  );
}
