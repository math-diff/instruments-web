import type { ReactNode } from "react";

/**
 * Lightweight entrance animation that never leaves content hidden when
 * client-side observers or hydration are unavailable.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={`animate-fade-up ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
