import { cn } from "@/lib/utils";

interface PriceBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function PriceBadge({ children, className }: PriceBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full bg-teal-100/90 px-4 py-2 text-sm font-semibold text-teal-900 dark:bg-teal-400/15 dark:text-teal-200",
        className
      )}
    >
      {children}
    </span>
  );
}
