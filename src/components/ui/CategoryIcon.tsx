import {
  Gauge,
  Waves,
  Thermometer,
  AlignVerticalJustifyCenter,
  type LucideIcon,
} from "lucide-react";
import type { Category } from "@/lib/products";

export const categoryIcon: Record<Category, LucideIcon> = {
  pressure: Gauge,
  flow: Waves,
  temperature: Thermometer,
  level: AlignVerticalJustifyCenter,
};

export function CategoryIcon({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) {
  const Icon = categoryIcon[category];
  return <Icon className={className} strokeWidth={1.5} />;
}
