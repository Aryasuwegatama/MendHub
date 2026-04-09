import { cn } from "@/lib/utils";

interface PageShellProps {
  children: React.ReactNode;
  /** Max-width constraint. Defaults to max-w-6xl */
  maxWidth?: "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
  className?: string;
}

const maxWidthStyles: Record<NonNullable<PageShellProps["maxWidth"]>, string> = {
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
};

export default function PageShell({
  children,
  maxWidth = "6xl",
  className,
}: PageShellProps) {
  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className={cn("mx-auto", maxWidthStyles[maxWidth], className)}>
        {children}
      </div>
    </div>
  );
}
