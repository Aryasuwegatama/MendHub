import Link from "next/link";
import { cn } from "@/lib/utils";

type LinkButtonVariant = "primary" | "outline" | "ghost";
type LinkButtonSize = "sm" | "md" | "lg";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: LinkButtonVariant;
  size?: LinkButtonSize;
  className?: string;
  fullWidth?: boolean;
}

const variantStyles: Record<LinkButtonVariant, string> = {
  primary:
    "bg-teal-500 text-slate-950 hover:bg-teal-400",
  outline:
    "border border-white/40 text-white hover:border-white hover:bg-white/10",
  ghost:
    "glass-pill text-slate-700 hover:bg-white/80 dark:text-slate-200 dark:hover:bg-white/10",
};

const sizeStyles: Record<LinkButtonSize, string> = {
  sm: "px-5 py-3 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-6 py-4 text-base",
};

export default function LinkButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  fullWidth = false,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold transition",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className
      )}
    >
      {children}
    </Link>
  );
}
