import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router";
import { FiSearch, FiCommand, FiX, FiArrowRight, FiCornerDownLeft } from "react-icons/fi";

export default function SearchPalette({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    setLoading(true);
    fetch("/data.json")
      .then((r) => r.json())
      .then((d) => setApps(d))
      .catch(() => setApps([]))
      .finally(() => setLoading(false));
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [open]);

  const results = useMemo(() => {
    if (!query.trim()) {
      return apps.slice(0, 6).map((a) => ({ type: "app", data: a }));
    }
    const q = query.toLowerCase();
    const matched = apps
      .filter(
        (a) =>
          a.name?.toLowerCase().includes(q) ||
          a.developer?.toLowerCase().includes(q) ||
          a.category?.toLowerCase().includes(q) ||
          a.description?.toLowerCase().includes(q)
      )
      .slice(0, 8)
      .map((a) => ({ type: "app", data: a }));

    const navLinks = [
      { to: "/", label: "Home" },
      { to: "/apps", label: "All apps" },
      { to: "/featured", label: "Featured" },
      { to: "/reviews", label: "Reviews" },
    ]
      .filter((l) => l.label.toLowerCase().includes(q))
      .map((l) => ({ type: "nav", data: l }));

    return [...navLinks, ...matched];
  }, [query, apps]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    function onKey(e) {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const r = results[active];
        if (!r) return;
        if (r.type === "app") {
          onClose();
          navigate(`/apps/${r.data.id}`);
        } else {
          onClose();
          navigate(r.data.to);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active, navigate, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            aria-label="Close search"
            className="absolute inset-0 bg-[#0A0A0A]/35 backdrop-blur-sm cursor-default"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl rounded-2xl bg-white border border-[#E5E5E0] shadow-2xl overflow-hidden"
            role="dialog"
            aria-label="Search"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E5E5E0]">
              <FiSearch size={18} className="text-[#6B6B6B]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search apps, categories, pages…"
                className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-[#9A9A95] text-[#0A0A0A]"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono rounded border border-[#E5E5E0] text-[#6B6B6B]">
                ESC
              </kbd>
              <button
                onClick={onClose}
                className="sm:hidden p-1 text-[#6B6B6B]"
                aria-label="Close"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto py-2">
              {loading && (
                <div className="px-5 py-8 text-sm text-[#6B6B6B] font-mono">Loading library…</div>
              )}
              {!loading && results.length === 0 && (
                <div className="px-5 py-10 text-center">
                  <p className="text-sm text-[#6B6B6B]">No results for &ldquo;{query}&rdquo;</p>
                </div>
              )}
              {!loading && results.length > 0 && (
                <ul>
                  {results.map((r, i) => {
                    const isActive = i === active;
                    const item =
                      r.type === "app" ? (
                        <button
                          onMouseEnter={() => setActive(i)}
                          onClick={() => {
                            onClose();
                            navigate(`/apps/${r.data.id}`);
                          }}
                          className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${
                            isActive ? "bg-[#FAFAF7]" : "bg-transparent"
                          }`}
                        >
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F1EFE8] flex-shrink-0">
                            {r.data.thumbnail ? (
                              <img
                                src={r.data.thumbnail}
                                alt=""
                                className="w-full h-full object-cover"
                                onError={(e) => (e.currentTarget.style.display = "none")}
                              />
                            ) : null}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[14px] font-medium text-[#0A0A0A] truncate">
                              {r.data.name}
                            </div>
                            <div className="text-[12px] text-[#6B6B6B] truncate">
                              {r.data.developer} · {r.data.category}
                            </div>
                          </div>
                          <FiArrowRight size={14} className="text-[#9A9A95]" />
                        </button>
                      ) : (
                        <button
                          onMouseEnter={() => setActive(i)}
                          onClick={() => {
                            onClose();
                            navigate(r.data.to);
                          }}
                          className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${
                            isActive ? "bg-[#FAFAF7]" : "bg-transparent"
                          }`}
                        >
                          <div className="w-10 h-10 rounded-lg bg-[#0A0A0A] text-white flex items-center justify-center">
                            <FiCommand size={16} />
                          </div>
                          <div className="flex-1">
                            <div className="text-[14px] font-medium text-[#0A0A0A]">
                              Go to {r.data.label}
                            </div>
                            <div className="text-[12px] text-[#6B6B6B] font-mono">
                              {r.data.to}
                            </div>
                          </div>
                          <FiArrowRight size={14} className="text-[#9A9A95]" />
                        </button>
                      );
                    return <li key={i + (r.type === "app" ? r.data.id : r.data.to)}>{item}</li>;
                  })}
                </ul>
              )}
            </div>

            <div className="flex items-center justify-between px-5 py-2.5 border-t border-[#E5E5E0] text-[11px] font-mono text-[#6B6B6B]">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1 py-0.5 border border-[#E5E5E0] rounded">↑</kbd>
                  <kbd className="px-1 py-0.5 border border-[#E5E5E0] rounded">↓</kbd>
                  navigate
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1 py-0.5 border border-[#E5E5E0] rounded inline-flex items-center gap-0.5">
                    <FiCornerDownLeft size={10} />
                  </kbd>
                  open
                </span>
              </div>
              <span>AppTrail Search</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
