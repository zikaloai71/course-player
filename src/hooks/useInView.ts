"use client";

import { useEffect, useRef, useState } from "react";

/**
 * True once the element has been scrolled into view. It never flips back, so
 * entrance animations do not replay.
 */
export function useInView<T extends HTMLElement>(rootMargin = "0px 0px -15% 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return [ref, inView] as const;
}
