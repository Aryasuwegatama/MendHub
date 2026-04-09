import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  as?: "p" | "span";
  className?: string;
}

export default function SectionLabel({
  children,
  as: Tag = "p",
  className,
}: SectionLabelProps) {
  return (
    <Tag
      className={cn(
        "text-sm font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-300",
        className
      )}
    >
      {children}
    </Tag>
  );
}
