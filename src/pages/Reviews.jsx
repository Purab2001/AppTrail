import { useMemo, useState } from "react";
import { useLoaderData, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import {
  FiSearch,
  FiThumbsUp,
  FiThumbsDown,
  FiX,
  FiArrowUpRight,
} from "react-icons/fi";
import { Eyebrow, PageHeader } from "../components/Section";
import { StarRow, StarPicker } from "../components/Rating";

const SORTS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "highest", label: "Highest rated" },
  { value: "lowest", label: "Lowest rated" },
  { value: "mostHelpful", label: "Most helpful" },
];

const REVIEWS_PER_PAGE = 9;

const EMPTY = [];

export default function Reviews() {
  const loaded = useLoaderData();
  const appsData = useMemo(() => loaded || EMPTY, [loaded]);
  const { user } = useAuth();

  const allReviews = useMemo(
    () =>
      appsData.flatMap((app) =>
        (app.reviews || []).map((r) => ({
          ...r,
          appId: app.id,
          appName: app.name,
          appCategory: app.category,
          appThumbnail: app.thumbnail,
        }))
      ),
    [appsData]
  );

  const stats = useMemo(() => {
    const total = allReviews.length;
    const avg = total
      ? (allReviews.reduce((s, r) => s + (r.rating || 0), 0) / total).toFixed(1)
      : 0;
    const counts = [5, 4, 3, 2, 1].map((r) =>
      allReviews.filter((rv) => rv.rating === r).length
    );
    return { total, avg, counts };
  }, [allReviews]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [filterRating, setFilterRating] = useState(0);
  const [filterApp, setFilterApp] = useState("all");
  const [page, setPage] = useState(1);
  const [voteState, setVoteState] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ appId: "", rating: 5, comment: "" });
  const [formError, setFormError] = useState("");

  const filtered = useMemo(() => {
    let list = allReviews;
    if (filterRating) list = list.filter((r) => r.rating === filterRating);
    if (filterApp !== "all") list = list.filter((r) => r.appId === filterApp);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.comment?.toLowerCase().includes(q) ||
          r.user?.toLowerCase().includes(q) ||
          r.appName?.toLowerCase().includes(q)
      );
    }
    const sorted = [...list];
    if (sort === "newest")
      sorted.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    if (sort === "oldest")
      sorted.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
    if (sort === "highest") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "lowest") sorted.sort((a, b) => a.rating - b.rating);
    if (sort === "mostHelpful")
      sorted.sort(
        (a, b) =>
          (b.likes || 0) - (b.dislikes || 0) - ((a.likes || 0) - (a.dislikes || 0))
      );
    return sorted;
  }, [allReviews, filterRating, filterApp, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / REVIEWS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * REVIEWS_PER_PAGE,
    safePage * REVIEWS_PER_PAGE
  );

  const handleVote = (idx, type) => {
    setVoteState((p) => ({
      ...p,
      [idx]: {
        up: type === "up" ? !p[idx]?.up : p[idx]?.up,
        down: type === "down" ? !p[idx]?.down : p[idx]?.down,
      },
    }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      setFormError("You must be signed in to write a review.");
      return;
    }
    if (!form.appId || !form.comment.trim()) {
      setFormError("Pick an app and write at least a few words.");
      return;
    }
    setFormError("");
    setShowForm(false);
    setForm({ appId: "", rating: 5, comment: "" });
    toast.success("Review draft saved — will appear after moderation.");
  };

  return (
    <div className="bg-[#FAFAF7]">
      {/* Header */}
      <section className="pt-16 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <PageHeader
                eyebrow="— The reviews / Issue 01"
                title="Field notes"
                italic="from readers."
                description="Every review on AppTrail is written by a real reader. No paid placements, no five-star fluff."
              />
            </div>
            <div className="lg:col-span-5 lg:pt-10">
              <div className="bg-white border border-[#E5E5E0] rounded-2xl p-6 sm:p-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-6xl tracking-tight">
                    {stats.avg}
                  </span>
                  <span className="font-mono text-[12px] text-[#6B6B6B]">/ 5.0</span>
                </div>
                <div className="mt-2">
                  <StarRow value={Math.round(Number(stats.avg))} size={16} />
                </div>
                <p className="mt-1 text-[12px] font-mono text-[#6B6B6B]">
                  {stats.total} reader reviews
                </p>
                <div className="mt-5 space-y-2">
                  {[5, 4, 3, 2, 1].map((r, i) => {
                    const c = stats.counts[i] || 0;
                    const pct = stats.total
                      ? Math.round((c / stats.total) * 100)
                      : 0;
                    return (
                      <div key={r} className="flex items-center gap-3 text-[12px]">
                        <span className="font-mono w-3 text-[#6B6B6B]">{r}</span>
                        <div className="flex-1 h-1.5 bg-[#F1EFE8] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#FF4A1C]"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="font-mono text-[#6B6B6B] w-8 text-right">
                          {pct}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="border-y border-[#0A0A0A] py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {[0, 5, 4, 3, 2, 1].map((r) => {
                const active = filterRating === r;
                return (
                  <button
                    key={r}
                    onClick={() => {
                      setFilterRating(r);
                      setPage(1);
                    }}
                    className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 h-9 rounded-full text-[12.5px] tracking-tight transition-colors ${
                      active
                        ? "bg-[#0A0A0A] text-[#FAFAF7]"
                        : "bg-white border border-[#E5E5E0] text-[#0A0A0A] hover:border-[#0A0A0A]"
                    }`}
                  >
                    {r === 0 ? "All" : `${r} ★`}
                  </button>
                );
              })}
            </div>

            <div className="md:ml-auto flex items-center gap-2 flex-wrap">
              <div className="relative">
                <FiSearch
                  size={14}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B6B]"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search reviews…"
                  className="h-9 w-56 pl-9 pr-3 rounded-full bg-white border border-[#E5E5E0] text-[13px] text-[#0A0A0A] placeholder:text-[#9A9A95] outline-none focus:border-[#0A0A0A] transition-colors"
                />
              </div>
              <select
                value={filterApp}
                onChange={(e) => {
                  setFilterApp(e.target.value);
                  setPage(1);
                }}
                className="h-9 px-3 pr-7 rounded-full bg-white border border-[#E5E5E0] text-[12.5px] text-[#0A0A0A] outline-none focus:border-[#0A0A0A] appearance-none cursor-pointer"
                style={{
                  backgroundImage:
                    'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="%230A0A0A" stroke-width="1.5" stroke-linecap="round"/></svg>\')',
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.7rem center",
                }}
              >
                <option value="all">All apps</option>
                {appsData.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-9 px-3 pr-7 rounded-full bg-white border border-[#E5E5E0] text-[12.5px] text-[#0A0A0A] outline-none focus:border-[#0A0A0A] appearance-none cursor-pointer"
                style={{
                  backgroundImage:
                    'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="%230A0A0A" stroke-width="1.5" stroke-linecap="round"/></svg>\')',
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.7rem center",
                }}
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowForm(true)}
                className="h-9 px-4 rounded-full bg-[#FF4A1C] text-white text-[12.5px] font-medium hover:bg-[#0A0A0A] transition-colors"
              >
                Write a review
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* List */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="mb-8 font-mono text-[11px] tracking-widest uppercase text-[#6B6B6B]">
            Showing {paginated.length} of {filtered.length}
          </p>
          {paginated.length === 0 ? (
            <div className="border border-dashed border-[#E5E5E0] rounded-2xl p-16 text-center">
              <p className="font-display text-2xl">No reviews match.</p>
              <p className="mt-2 text-[13px] text-[#6B6B6B]">
                Try a different filter or clear your search.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((r, idx) => (
                <motion.article
                  key={`${r.user}-${idx}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.04 }}
                  className="bg-white border border-[#E5E5E0] rounded-2xl p-6 flex flex-col gap-4 hover:border-[#0A0A0A] transition-colors"
                >
                  <header className="flex items-center gap-3">
                    <img
                      src={
                        r.avatar ||
                        r.appThumbnail ||
                        `https://i.pravatar.cc/120?u=${r.user}`
                      }
                      alt={r.user}
                      className="w-10 h-10 rounded-full object-cover bg-[#F1EFE8]"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[13.5px] text-[#0A0A0A] truncate">
                        {r.user}
                      </p>
                      <p className="font-mono text-[10px] tracking-widest uppercase text-[#6B6B6B]">
                        {r.date
                          ? new Date(r.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Recently"}
                      </p>
                    </div>
                    <StarRow value={r.rating} size={13} />
                  </header>
                  <p className="text-[14.5px] leading-relaxed text-[#0A0A0A] line-clamp-4">
                    {r.comment}
                  </p>
                  <footer className="mt-auto pt-4 border-t border-[#E5E5E0] flex items-center justify-between text-[12px]">
                    <Link
                      to={`/apps/${r.appId}`}
                      className="inline-flex items-center gap-1.5 text-[#0A0A0A] link-underline"
                    >
                      <span className="font-mono text-[10px] tracking-widest uppercase text-[#6B6B6B]">
                        for
                      </span>
                      <span className="truncate max-w-[140px]">{r.appName}</span>
                      <FiArrowUpRight size={11} />
                    </Link>
                    <div className="flex items-center gap-3 text-[#6B6B6B]">
                      <button
                        onClick={() => handleVote(idx, "up")}
                        className={`inline-flex items-center gap-1 transition-colors ${
                          voteState[idx]?.up ? "text-[#FF4A1C]" : "hover:text-[#0A0A0A]"
                        }`}
                      >
                        <FiThumbsUp size={12} /> {r.likes || 0}
                      </button>
                      <button
                        onClick={() => handleVote(idx, "down")}
                        className={`inline-flex items-center gap-1 transition-colors ${
                          voteState[idx]?.down
                            ? "text-[#FF4A1C]"
                            : "hover:text-[#0A0A0A]"
                        }`}
                      >
                        <FiThumbsDown size={12} /> {r.dislikes || 0}
                      </button>
                    </div>
                  </footer>
                </motion.article>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => {
                const n = i + 1;
                return (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`min-w-9 h-9 px-3 rounded-full text-[13px] font-medium transition-colors ${
                      n === safePage
                        ? "bg-[#0A0A0A] text-[#FAFAF7]"
                        : "text-[#0A0A0A] hover:bg-[#F1EFE8]"
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Write review modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-[#0A0A0A]/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 sm:p-6"
            onClick={() => setShowForm(false)}
          >
            <motion.form
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleFormSubmit}
              className="relative w-full max-w-md bg-[#FAFAF7] rounded-2xl p-6 sm:p-8 space-y-5"
            >
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 p-2 text-[#6B6B6B] hover:text-[#0A0A0A]"
                aria-label="Close"
              >
                <FiX size={18} />
              </button>
              <Eyebrow>— Contribute</Eyebrow>
              <h2 className="font-display text-3xl tracking-tight">
                Write a <span className="italic text-[#FF4A1C]">review.</span>
              </h2>
              {formError && (
                <p className="text-[12px] text-[#FF4A1C] font-mono">{formError}</p>
              )}
              <div>
                <label className="block text-[12px] font-mono tracking-widest uppercase text-[#6B6B6B]">
                  App
                </label>
                <select
                  name="appId"
                  value={form.appId}
                  onChange={handleFormChange}
                  required
                  className="mt-2 w-full h-12 px-4 rounded-full bg-white border border-[#E5E5E0] text-[14px] text-[#0A0A0A] outline-none focus:border-[#0A0A0A] appearance-none"
                >
                  <option value="">Pick an app…</option>
                  {appsData.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-mono tracking-widest uppercase text-[#6B6B6B]">
                  Rating
                </label>
                <div className="mt-3">
                  <StarPicker
                    value={form.rating}
                    onChange={(n) => setForm((f) => ({ ...f, rating: n }))}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-mono tracking-widest uppercase text-[#6B6B6B]">
                  Your review
                </label>
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleFormChange}
                  rows={4}
                  required
                  minLength={10}
                  maxLength={500}
                  placeholder="Be honest. Be specific. 500 characters or less."
                  className="mt-2 w-full p-4 rounded-xl bg-white border border-[#E5E5E0] text-[14.5px] text-[#0A0A0A] placeholder:text-[#9A9A95] outline-none focus:border-[#0A0A0A] transition-colors"
                />
                <p className="mt-1 text-[10px] font-mono text-[#6B6B6B] text-right">
                  {form.comment.length} / 500
                </p>
              </div>
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="h-11 px-5 rounded-full text-[13px] text-[#0A0A0A] hover:bg-[#F1EFE8] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-11 px-5 rounded-full bg-[#FF4A1C] text-white text-[13px] font-medium hover:bg-[#0A0A0A] transition-colors"
                >
                  Publish
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
