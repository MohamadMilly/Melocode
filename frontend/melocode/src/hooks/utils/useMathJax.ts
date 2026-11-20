import { useEffect } from "react";

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: (elements?: HTMLElement[]) => Promise<void>;
      typesetClear?: (elements?: HTMLElement[]) => void;
      startup?: {
        promise?: Promise<void>;
      };
    };
  }
}

export function useMathJax(dependencies: unknown[] = []) {
  useEffect(() => {
    const runMathJax = async () => {
      if (!window.MathJax) return;

      try {
        // Wait for MathJax to finish its own initial startup if needed
        if (window.MathJax.startup?.promise) {
          await window.MathJax.startup.promise;
        }

        if (window.MathJax.typesetPromise) {
          // Clear old tracked math so dynamic updates don't get skipped
          window.MathJax.typesetClear?.();
          await window.MathJax.typesetPromise();
        }
      } catch (err) {
        console.error("MathJax typesetting failed:", err);
      }
    };

    runMathJax();
    // Spread or pass dependencies directly—do NOT wrap in [dependencies]
  }, dependencies);
}
