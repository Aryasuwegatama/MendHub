import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-teal-500 text-slate-950 hover:bg-teal-400 shadow-sm shadow-teal-900/10 transition-colors",
  secondary:
    "glass-panel-strong text-slate-900 hover:bg-white/90 dark:text-slate-100 dark:hover:bg-slate-900/90 transition-colors",
  outline:
    "glass-pill text-slate-700 hover:bg-white/85 dark:text-slate-200 dark:hover:bg-slate-900/80 transition-colors",
  ghost:
    "text-slate-600 hover:text-slate-900 hover:bg-white/40 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white transition-colors",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold transition focus:outline-none focus:ring-2 focus:ring-teal-500/50 disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
