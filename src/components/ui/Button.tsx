import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = {
  variant?: ButtonVariant;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm",
  secondary: "border border-zinc-200 text-zinc-700 hover:bg-zinc-50",
  ghost: "text-zinc-600 hover:bg-zinc-100",
  danger: "border border-red-200 text-red-600 hover:bg-red-50",
};

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`rounded-md px-4 py-2 text-sm font-medium transition disabled:opacity-60 ${
        variantStyles[variant]
      } ${className}`}
    />
  );
}
