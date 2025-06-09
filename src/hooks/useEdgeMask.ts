import { useState, useEffect, type RefObject } from "react";

interface EdgeMaskOptions {
  /**
   * Number of pixels from each edge before the mask hides itself.
   * Default: 0 (mask shows until perfectly aligned with edge).
   */
  threshold?: number;
}

/**
 * Hook to determine whether a scroll container is scrolled away from its left or right edge.
 * Returns booleans for showing left and right edge masks.
 *
 * @param containerRef — ref to the scrollable container element
 * @param options.threshold — how many pixels from edge before hiding mask
 * @returns showLeftMask, showRightMask
 */
export function useEdgeMask(
  containerRef: RefObject<HTMLElement | null>,
  { threshold = 0 }: EdgeMaskOptions = {}
): { showLeftMask: boolean; showRightMask: boolean } {
  const [showLeftMask, setShowLeftMask] = useState(false);
  const [showRightMask, setShowRightMask] = useState(true);

  useEffect(() => {
    const el = containerRef.current;

    if (!el) return;

    const updateMasks = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setShowLeftMask(scrollLeft > threshold);
      setShowRightMask(scrollLeft + clientWidth < scrollWidth - threshold);
    };

    // initial check
    updateMasks();

    el.addEventListener("scroll", updateMasks, { passive: true });
    window.addEventListener("resize", updateMasks);

    return () => {
      el.removeEventListener("scroll", updateMasks);
      window.removeEventListener("resize", updateMasks);
    };
  }, [containerRef, threshold]);

  return { showLeftMask, showRightMask };
}
