import { cn } from "@/lib/utils";

interface InfoBlockProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export default function InfoBlock({ label, children, className }: InfoBlockProps) {
  return (
    <div className={cn("glass-panel-muted rounded-2xl p-4", className)}>
      <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <div className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
        {children}
      </div>
    </div>
  );
}
