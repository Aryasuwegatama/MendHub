import { cn } from "@/lib/utils";

type CardVariant = "default" | "strong" | "muted";

interface CardProps extends React.ComponentProps<"div"> {
  hoverable?: boolean;
  variant?: CardVariant;
}

const variantStyles: Record<CardVariant, string> = {
  // canonical opacity + dark pair — use this instead of passing raw bg classes
  default: "bg-white/52 dark:bg-slate-950/42",
  strong:  "bg-white/60 dark:bg-slate-950/55",
  muted:   "glass-panel-muted",
};

export default function Card({
  hoverable = false,
  variant,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-3xl p-6",
        hoverable && "transition duration-200 hover:-translate-y-1 hover:shadow-xl",
        variant && variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
