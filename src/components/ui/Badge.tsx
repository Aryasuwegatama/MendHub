import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info";

interface BadgeProps extends React.ComponentProps<"span"> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200",
  success: "bg-teal-50 text-teal-800 dark:bg-teal-900/60 dark:text-teal-200",
  warning: "bg-amber-50 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200",
  error: "bg-red-50 text-red-800 dark:bg-red-900/60 dark:text-red-200",
  info: "bg-cyan-50 text-cyan-800 dark:bg-cyan-900/60 dark:text-cyan-200",
};

export default function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
