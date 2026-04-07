import { cn } from "@/lib/utils";

interface CardProps extends React.ComponentProps<"div"> {
  hoverable?: boolean;
}

export default function Card({
  hoverable = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-200 bg-white p-6 shadow-sm",
        hoverable && "transition hover:-translate-y-1 hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
