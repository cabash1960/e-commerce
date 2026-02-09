"use client";

import { useLayoutEffect, useRef, DependencyList } from "react";
import gsap from "gsap";

export function useGSAP(
  callback: (context: gsap.Context | null) => void | (() => void),
  dependencies: DependencyList = [],
) {
  const contextRef = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    contextRef.current = gsap.context(() => {
      const cleanup = callback(contextRef.current);
      return cleanup;
    });

    return () => {
      contextRef.current?.revert();
    };
  }, dependencies);

  return contextRef;
}
