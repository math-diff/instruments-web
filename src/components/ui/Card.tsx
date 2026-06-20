import type { ReactNode } from "react";

export function Card({
  children,
  className,
  hover,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div className={`card ${hover ? "card-hover" : ""} p-6 ${className ?? ""}`}>
      {children}
    </div>
  );
}

export function Badge({
  children,
  color = "brand",
}: {
  children: ReactNode;
  color?: "brand" | "red" | "yellow" | "green" | "neutral";
}) {
  const colors: Record<string, string> = {
    brand: "bg-brand-soft text-brand-strong",
    red: "bg-red-50 text-accent-red",
    yellow: "bg-yellow-50 text-accent-yellow",
    green: "bg-green-50 text-accent-green",
    neutral: "bg-surface-muted text-ink-soft",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${colors[color]}`}
    >
      {children}
    </span>
  );
}
