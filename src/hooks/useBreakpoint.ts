import { useState, useEffect } from "react";
import { breakpoints } from "../tokens/breakpoints";

export type Breakpoint = keyof typeof breakpoints;

export function useBreakpoint() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>("sm");

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;

      if (width >= parseInt(breakpoints["2xl"])) {
        setCurrentBreakpoint("2xl");
      } else if (width >= parseInt(breakpoints.xl)) {
        setCurrentBreakpoint("xl");
      } else if (width >= parseInt(breakpoints.lg)) {
        setCurrentBreakpoint("lg");
      } else if (width >= parseInt(breakpoints.md)) {
        setCurrentBreakpoint("md");
      } else if (width >= parseInt(breakpoints.sm)) {
        setCurrentBreakpoint("sm");
      } else {
        setCurrentBreakpoint("xs");
      }
    };

    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint);

    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  const isAbove = (breakpoint: Breakpoint) => {
    const breakpointOrder: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "2xl"];
    const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
    const targetIndex = breakpointOrder.indexOf(breakpoint);
    return currentIndex >= targetIndex;
  };

  const isBelow = (breakpoint: Breakpoint) => {
    const breakpointOrder: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "2xl"];
    const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
    const targetIndex = breakpointOrder.indexOf(breakpoint);
    return currentIndex < targetIndex;
  };

  return {
    currentBreakpoint,
    isAbove,
    isBelow,
    isMobile: isBelow("md"),
    isTablet: currentBreakpoint === "md" || currentBreakpoint === "lg",
    isDesktop: isAbove("lg"),
  };
}
