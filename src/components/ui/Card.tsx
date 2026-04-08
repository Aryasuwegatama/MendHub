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
        "glass-panel rounded-3xl p-6",
        hoverable && "transition duration-200 hover:-translate-y-1 hover:shadow-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
