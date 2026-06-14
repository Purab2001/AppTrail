import { useEffect } from "react";
import { useLocation } from "react-router";
import { getLenis } from "../lib/lenis";

export default function ScrollToTopOnRoute() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Let any pending render/layout settle before scrolling
    const id = requestAnimationFrame(() => {
      const lenis = getLenis();
      if (lenis && typeof lenis.scrollTo === "function") {
        try {
          lenis.scrollTo(0, { duration: 0.4, force: true, immediate: false });
          return;
        } catch {
          /* fall through */
        }
      }
      try {
        window.scrollTo({ top: 0, behavior: "auto" });
      } catch {
        document.documentElement.scrollTop = 0;
      }
    });

    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
