"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

export type ProductNavigationCategory = {
  id: string;
  label: string;
  href: string;
  products: { label: string; href: string; image: string }[];
};

export function ProductNavigation({
  active,
  label,
  href,
  categories,
  viewAllLabel,
  mobile = false,
  rtl = false,
  onNavigate,
}: {
  active: boolean;
  label: string;
  href: string;
  categories: ProductNavigationCategory[];
  viewAllLabel: string;
  mobile?: boolean;
  rtl?: boolean;
  onNavigate?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(categories[0].id);
  const rootRef = useRef<HTMLDivElement>(null);
  const catalogueRef = useRef<HTMLAnchorElement>(null);
  const disclosureRef = useRef<HTMLButtonElement>(null);
  const categoryRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);
  const touchInteraction = useRef(false);
  const id = useId();
  const panelId = `${id}-menu`;
  const current = categories.find((category) => category.id === selected) ?? categories[0];

  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 1024px)");
    const close = () => setExpanded(false);
    breakpoint.addEventListener("change", close);
    return () => breakpoint.removeEventListener("change", close);
  }, []);

  useEffect(() => {
    if (!expanded) return;

    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setExpanded(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setExpanded(false);
      if (rootRef.current?.contains(document.activeElement)) {
        (mobile ? disclosureRef : catalogueRef).current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    const blur = () => setExpanded(false);
    window.addEventListener("blur", blur);

    // Let the product pane scroll without moving the page behind the desktop menu.
    const previousOverflow = document.body.style.overflow;
    const previousGutter = document.documentElement.style.scrollbarGutter;
    if (!mobile) {
      document.documentElement.style.scrollbarGutter = "stable";
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
      window.removeEventListener("blur", blur);
      if (!mobile) {
        document.body.style.overflow = previousOverflow;
        document.documentElement.style.scrollbarGutter = previousGutter;
      }
    };
  }, [expanded, mobile]);

  const navigate = () => {
    setExpanded(false);
    onNavigate?.();
  };

  const selectCategory = (categoryId: string) => {
    setSelected(categoryId);
    if (resultsRef.current) resultsRef.current.scrollTop = 0;
  };

  return (
    <div
      ref={rootRef}
      className={mobile ? "relative" : "flex h-full items-center"}
      onPointerDown={(event) => { touchInteraction.current = event.pointerType === "touch"; }}
      onPointerEnter={(event) => {
        if (!mobile && event.pointerType === "mouse") setExpanded(true);
      }}
      onPointerLeave={(event) => {
        if (!mobile && event.pointerType === "mouse") setExpanded(false);
      }}
      onFocus={(event) => {
        if (!mobile && !touchInteraction.current && !event.currentTarget.contains(event.relatedTarget)) {
          setExpanded(true);
        }
      }}
      onBlur={(event) => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setExpanded(false);
      }}
      onKeyDown={(event) => {
        touchInteraction.current = false;
        if (event.key === "ArrowDown" && (event.target === catalogueRef.current || event.target === disclosureRef.current)) {
          event.preventDefault();
          setExpanded(true);
          requestAnimationFrame(() => categoryRefs.current[categories.indexOf(current)]?.focus());
        }
      }}
    >
      {mobile ? (
        <div className={`flex items-center rounded-lg px-3 ${active ? "bg-brand-soft" : ""}`}>
          <Link ref={catalogueRef} href={href} onClick={navigate}
            className={`flex-1 py-2.5 text-base font-bold ${active ? "text-link" : "text-brand hover:text-link"}`}>
            {label}
          </Link>
          <button ref={disclosureRef} type="button" aria-label={label} aria-expanded={expanded} aria-controls={panelId}
            onClick={() => setExpanded((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded text-brand focus-visible:outline-2 focus-visible:outline-link">
            <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      ) : (
        <Link ref={catalogueRef} href={href} aria-expanded={expanded} aria-controls={panelId}
          onClick={(event) => {
            if (touchInteraction.current && !expanded) {
              event.preventDefault();
              setExpanded(true);
            } else {
              navigate();
            }
            touchInteraction.current = false;
          }}
          className={`nav-link relative inline-flex items-center gap-1 py-1 text-[15px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-link ${active || expanded ? "is-active text-link" : "text-brand hover:text-link"}`}>
          {label}
          <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`} strokeWidth={2.5} />
        </Link>
      )}

      {expanded && !mobile && (
        <div aria-hidden="true" className="product-menu-backdrop"
          onPointerDown={() => setExpanded(false)}
          onPointerEnter={(event) => { if (event.pointerType === "mouse") setExpanded(false); }} />
      )}

      <section id={panelId} aria-label={label} hidden={!expanded}
        className={`product-menu-panel ${mobile ? "product-menu-panel-mobile" : "product-menu-panel-desktop"} ${expanded ? "" : "hidden"}`}>
        <div className="product-menu-sidebar">
          <h2 className="product-menu-title">{label}</h2>
          <div role="tablist" aria-label={label} aria-orientation={mobile ? "horizontal" : "vertical"}
            className="product-menu-categories">
            {categories.map((category, index) => (
              <button key={category.id} ref={(node) => { categoryRefs.current[index] = node; }} type="button" role="tab"
                id={`${id}-tab-${category.id}`} aria-selected={current.id === category.id}
                aria-controls={`${id}-products-${category.id}`} tabIndex={current.id === category.id ? 0 : -1}
                className="product-menu-category"
                onClick={() => selectCategory(category.id)}
                onKeyDown={(event) => {
                  const next = mobile ? (rtl ? "ArrowLeft" : "ArrowRight") : "ArrowDown";
                  const previous = mobile ? (rtl ? "ArrowRight" : "ArrowLeft") : "ArrowUp";
                  let nextIndex: number;
                  if (event.key === next) nextIndex = (index + 1) % categories.length;
                  else if (event.key === previous) nextIndex = (index - 1 + categories.length) % categories.length;
                  else if (event.key === "Home") nextIndex = 0;
                  else if (event.key === "End") nextIndex = categories.length - 1;
                  else return;
                  event.preventDefault();
                  categoryRefs.current[nextIndex]?.focus();
                }}>
                <span>{category.label}</span>
                <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 rtl:rotate-180" strokeWidth={2} />
              </button>
            ))}
          </div>
          <Link href={href} onClick={navigate} className="product-menu-all">
            <span>{viewAllLabel} {label}</span>
            <ChevronRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>

        <div ref={resultsRef} className="product-menu-results">
          {categories.map((category) => (
            <div key={category.id} role="tabpanel" id={`${id}-products-${category.id}`}
              aria-labelledby={`${id}-tab-${category.id}`} hidden={current.id !== category.id}>
              <div className="product-menu-grid">
                {category.products.map((product) => (
                  <Link key={product.href} href={product.href} onClick={navigate} className="product-menu-card">
                    <Image src={product.image} alt="" width={80} height={80} sizes="80px"
                      className="product-menu-image" />
                    <span>{product.label}</span>
                  </Link>
                ))}
              </div>
              <Link href={category.href} onClick={navigate} className="product-menu-category-link">
                <span>{viewAllLabel} {category.label}</span>
                <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 rtl:rotate-180" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
