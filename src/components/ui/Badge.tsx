import type { ReactNode } from "react";

type BadgeVariant = "default" | "muted" | "success" | "warning" | "danger";

type BadgeProps = {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
};

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-zinc-900 text-white",
  muted: "border border-zinc-200 bg-zinc-50 text-zinc-600",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-700",
};

export default function Badge({
  variant = "muted",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        variantStyles[variant]
      } ${className}`}
    >
      {children}
    </span>
  );
}
