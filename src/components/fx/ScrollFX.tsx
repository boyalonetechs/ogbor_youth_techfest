"use client";

import { useEffect } from "react";

export default function ScrollFX() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("fx-live");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const items = Array.from(
      document.querySelectorAll<HTMLElement>("[data-fx]"),
    );

    const revealAll = () => {
      for (const item of items) item.classList.add("is-inview");
    };

    let observer: IntersectionObserver | undefined;

    if (!reduceMotion.matches && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const element = entry.target as HTMLElement;

            if (entry.isIntersecting) {
              element.classList.add("is-inview");
              if (!element.hasAttribute("data-fx-repeat")) {
                observer?.unobserve(element);
              }
            } else if (element.hasAttribute("data-fx-repeat")) {
              element.classList.remove("is-inview");
            }
          }
        },
        {
          root: null,
          // Expand the top edge by a viewport so anchor jumps that land past a
          // kicker still reveal it. The bottom edge is trimmed slightly so
          // reveals feel intentional.
          rootMargin: "100% 0px -10% 0px",
          threshold: 0.08,
        },
      );

      for (const item of items) observer.observe(item);
    } else {
      revealAll();
    }

    const parallaxItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    ).map((element) => {
      const speed = Number.parseFloat(element.dataset.parallax ?? "0.1");
      return {
        element,
        speed: Number.isFinite(speed) ? speed : 0.1,
      };
    });

    let ticking = false;

    const update = () => {
      ticking = false;

      if (reduceMotion.matches) return;

      for (const { element, speed } of parallaxItems) {
        const rect = element.getBoundingClientRect();
        const current =
          Number.parseFloat(
            element.style.getPropertyValue("--fx-parallax") || "0",
          ) || 0;
        const center = rect.top - current + rect.height / 2;
        const viewport = window.innerHeight;
        const offset = (center - viewport / 2) * -speed;
        element.style.setProperty("--fx-parallax", `${offset.toFixed(2)}px`);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const tiltItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-tilt]"),
    );
    const cleanups: Array<() => void> = [];

    if (finePointer.matches && !reduceMotion.matches) {
      for (const element of tiltItems) {
        const onPointerMove = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width;
          const y = (event.clientY - rect.top) / rect.height;

          const rotateX = (0.5 - y) * 7;
          const rotateY = (x - 0.5) * 9;
          const angle = Math.hypot(rotateX, rotateY);
          const divisor = angle || 1;

          element.classList.add("is-tilting");
          element.style.setProperty(
            "--fx-tilt-axis",
            `${(rotateX / divisor).toFixed(3)} ${(rotateY / divisor).toFixed(3)} 0`,
          );
          element.style.setProperty(
            "--fx-tilt-angle",
            `${angle.toFixed(2)}deg`,
          );
          element.style.setProperty("--fx-shine-x", `${(x * 100).toFixed(1)}%`);
          element.style.setProperty("--fx-shine-y", `${(y * 100).toFixed(1)}%`);
        };

        const onPointerLeave = () => {
          element.classList.remove("is-tilting");
          element.style.setProperty("--fx-tilt-axis", "0 0 0");
          element.style.setProperty("--fx-tilt-angle", "0deg");
        };

        element.addEventListener("pointermove", onPointerMove);
        element.addEventListener("pointerleave", onPointerLeave);

        cleanups.push(() => {
          element.removeEventListener("pointermove", onPointerMove);
          element.removeEventListener("pointerleave", onPointerLeave);
        });
      }
    }

    const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
      if (!event.matches) return;
      revealAll();
      observer?.disconnect();
      root.style.setProperty("--fx-scroll", "1");
    };

    reduceMotion.addEventListener("change", onMotionPreferenceChange);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduceMotion.removeEventListener("change", onMotionPreferenceChange);
      for (const cleanup of cleanups) cleanup();
      root.style.removeProperty("--fx-scroll");
    };
  }, []);

  return null;
}
