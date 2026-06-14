import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";
import { getLenis } from "../lib/lenis";

function getScrollY() {
  return (
    window.scrollY ||
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    0
  );
}

function scrollToTop() {
  const lenis = getLenis();
  if (lenis && typeof lenis.scrollTo === "function") {
    try {
      lenis.scrollTo(0, { duration: 0.8, force: true });
      return;
    } catch {
      /* fall through */
    }
  }
  try {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
}

export default function ScrollToTop({ threshold = 300 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(getScrollY() > threshold);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    // Tick once on mount in case Lenis restored a scroll position
    const t = setTimeout(update, 200);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      clearTimeout(t);
    };
  }, [threshold]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Scroll to top"
          className="group fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[60] w-12 h-12 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center shadow-[0_8px_24px_-8px_rgba(10,10,10,0.5)] hover:bg-[#FF4A1C] transition-colors duration-300 cursor-pointer"
        >
          <FiArrowUp
            size={16}
            className="transition-transform duration-300 group-hover:-translate-y-0.5"
          />
          <span className="sr-only">Back to top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
