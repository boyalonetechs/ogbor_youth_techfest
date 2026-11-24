"use client";

import { useEffect, useRef } from "react";

type CounterProps = {
  value: number;
  suffix?: string;
  className?: string;
};

/**
 * Counts up from zero the first time the number scrolls into view.
 * The server renders the final value so the content is complete without JS.
 */
export default function Counter({
  value,
  suffix = "",
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const formatter = new Intl.NumberFormat("en-US");
    const finalValue = `${formatter.format(value)}${suffix}`;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.textContent = finalValue;
      return;
    }

    let frame = 0;
    let startedAt = 0;
    const duration = 1500;

    const tick = (now: number) => {
      if (!startedAt) startedAt = now;
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);

      element.textContent = `${formatter.format(
        Math.round(value * eased),
      )}${suffix}`;

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    if (typeof IntersectionObserver === "undefined") {
      element.textContent = finalValue;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        element.textContent = `0${suffix}`;
        frame = window.requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [value, suffix]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
