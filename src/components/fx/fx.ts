import type { CSSProperties } from "react";

/**
 * Returns an inline style with the scroll-animation delay variable used by
 * the shared `data-fx` reveal system. Safe to use from server components.
 */
export function fxDelay(ms: number): CSSProperties {
  return { "--fx-delay": `${ms}ms` } as CSSProperties;
}

/**
 * Returns an inline style with a custom CSS variable. Handy for the small
 * per-item values used by the animation system.
 */
export function fxVar(name: string, value: string): CSSProperties {
  return { [name]: value } as CSSProperties;
}
