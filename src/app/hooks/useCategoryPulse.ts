import { useCallback, useEffect, useRef, useState } from "react";
import { CATEGORY_PULSE_MS, isCategoryRouteActive, toPath } from "../data/categories";

export function useCategoryPulse(currentPath: string) {
  const [categoryPulse, setCategoryPulse] = useState<string | null>(null);
  const pulseTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (pulseTimerRef.current) {
        window.clearTimeout(pulseTimerRef.current);
      }
    };
  }, []);

  const triggerCategoryPulse = useCallback((label: string) => {
    setCategoryPulse(label);

    if (pulseTimerRef.current) {
      window.clearTimeout(pulseTimerRef.current);
    }

    pulseTimerRef.current = window.setTimeout(() => {
      setCategoryPulse(null);
      pulseTimerRef.current = null;
    }, CATEGORY_PULSE_MS);
  }, []);

  const isRouteActive = useCallback(
    (label: string) => isCategoryRouteActive(label, currentPath),
    [currentPath],
  );

  const navigateToCategory = useCallback(
    (label: string, onNavigate?: (path: string) => void) => {
      const targetPath = toPath(label);
      triggerCategoryPulse(label);
      onNavigate?.(targetPath);

      if (!onNavigate && typeof window !== "undefined") {
        window.location.href = targetPath;
      }

      return targetPath;
    },
    [triggerCategoryPulse],
  );

  return {
    categoryPulse,
    triggerCategoryPulse,
    navigateToCategory,
    isRouteActive,
  };
}
