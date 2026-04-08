import { cn } from "@/lib/utils";

type PageIntroProps = {
  badge: string;
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
};

export default function PageIntro({
  badge,
  title,
  description,
  className,
  children,
}: PageIntroProps) {
  return (
    <section
      className={cn(
        "glass-panel-strong overflow-hidden rounded-[2rem] px-6 py-12 sm:px-10",
        className
      )}
    >
      <p className="inline-flex rounded-full border border-teal-200/80 bg-teal-50/80 px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-teal-800 dark:border-teal-300/10 dark:bg-teal-400/10 dark:text-teal-200">
        {badge}
      </p>
      <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
        {description}
      </p>
      {children ? <div className="mt-8">{children}</div> : null}
    </section>
  );
}
