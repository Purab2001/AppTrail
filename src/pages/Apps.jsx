import { useMemo, useState } from "react";
import { useLoaderData, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiSliders, FiX, FiArrowUpRight } from "react-icons/fi";
import AppCard from "../components/AppCard";
import { Eyebrow, PageHeader } from "../components/Section";
import PrimaryButton from "../components/Button2";

const SORTS = [
  { value: "rating", label: "Top rated" },
  { value: "downloads", label: "Most downloaded" },
  { value: "updated", label: "Recently updated" },
  { value: "name", label: "A — Z" },
];

const FILTERS = [
  { value: "all", label: "All apps" },
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
];

const EMPTY = [];

export default function Apps() {
  const loaded = useLoaderData();
  const appsData = useMemo(() => loaded || EMPTY, [loaded]);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("rating");
  const [filter, setFilter] = useState("all");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(appsData.map((a) => a.category)))],
    [appsData]
  );

  const filtered = useMemo(() => {
    let list = appsData;
    if (activeCategory !== "All") list = list.filter((a) => a.category === activeCategory);
    if (filter === "free") list = list.filter((a) => a.price === "Free");
    if (filter === "paid") list = list.filter((a) => a.price && a.price !== "Free");
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.name?.toLowerCase().includes(q) ||
          a.developer?.toLowerCase().includes(q) ||
          a.description?.toLowerCase().includes(q)
      );
    }
    const sorted = [...list];
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "downloads") sorted.sort((a, b) => b.downloads - a.downloads);
    if (sort === "updated")
      sorted.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [appsData, activeCategory, sort, filter, search]);

  const trending = useMemo(
    () => [...appsData].sort((a, b) => b.rating * Math.log10(b.downloads + 10) - a.rating * Math.log10(a.downloads + 10)).slice(0, 3),
    [appsData]
  );

  return (
    <div className="bg-[#FAFAF7]">
      {/* Header */}
      <section className="pt-16 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <PageHeader
              eyebrow="— The library / Issue 01"
              title="Every app"
              italic="we stock."
              description="A complete index of the apps in our library. Filter by category, sort by signal, search for a name."
            />
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#6B6B6B] tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4A1C]" />
              {filtered.length} of {appsData.length} apps
            </div>
          </div>
        </div>
      </section>

      {/* Editorial strip: trending */}
      <section className="bg-[#0A0A0A] text-[#FAFAF7] noise py-12 sm:py-16">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/50">
                — On rotation
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl tracking-tight">
                Trending <span className="italic text-[#FF4A1C]">this week.</span>
              </h2>
            </div>
            <Link
              to="/featured"
              className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-mono tracking-widest uppercase text-white/70 hover:text-white"
            >
              All featured <FiArrowUpRight size={12} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {trending.map((app, i) => (
              <Link
                key={app.id}
                to={`/apps/${app.id}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-[#FF4A1C] transition-colors"
              >
                <div className="aspect-[5/3] overflow-hidden bg-[#1A1A1A]">
                  <img
                    src={app.thumbnail}
                    alt={app.name}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <div className="p-5">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-white/40">
                    0{i + 1} / Trending
                  </p>
                  <h3 className="mt-2 font-display text-xl tracking-tight">{app.name}</h3>
                  <p className="mt-1 text-[12px] text-white/50 font-mono">{app.developer}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Toolbar + Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Sidebar (desktop) */}
            <aside className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-28 space-y-10">
                <div>
                  <Eyebrow>— Search</Eyebrow>
                  <div className="mt-3 relative">
                    <FiSearch
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6B6B]"
                    />
                    <input
                      type="text"
                      placeholder="Find an app…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full h-11 pl-9 pr-3 rounded-full bg-white border border-[#E5E5E0] text-[14px] text-[#0A0A0A] placeholder:text-[#9A9A95] outline-none focus:border-[#0A0A0A] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <Eyebrow>— Categories</Eyebrow>
                  <ul className="mt-3 space-y-1">
                    {categories.map((c) => {
                      const count =
                        c === "All"
                          ? appsData.length
                          : appsData.filter((a) => a.category === c).length;
                      const active = activeCategory === c;
                      return (
                        <li key={c}>
                          <button
                            onClick={() => setActiveCategory(c)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13.5px] transition-all ${
                              active
                                ? "bg-[#0A0A0A] text-[#FAFAF7]"
                                : "text-[#0A0A0A] hover:bg-[#F1EFE8]"
                            }`}
                          >
                            <span>{c}</span>
                            <span
                              className={`font-mono text-[10px] tracking-widest ${
                                active ? "text-white/50" : "text-[#9A9A95]"
                              }`}
                            >
                              {String(count).padStart(2, "0")}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div>
                  <Eyebrow>— Price</Eyebrow>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {FILTERS.map((f) => (
                      <button
                        key={f.value}
                        onClick={() => setFilter(f.value)}
                        className={`px-3 h-9 rounded-full text-[12px] tracking-tight transition-colors ${
                          filter === f.value
                            ? "bg-[#0A0A0A] text-[#FAFAF7]"
                            : "bg-white border border-[#E5E5E0] text-[#0A0A0A] hover:border-[#0A0A0A]"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main */}
            <div className="lg:col-span-9">
              {/* Mobile filter bar */}
              <div className="lg:hidden flex items-center gap-2 mb-6">
                <div className="flex-1 relative">
                  <FiSearch
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6B6B]"
                  />
                  <input
                    type="text"
                    placeholder="Find an app…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-11 pl-9 pr-3 rounded-full bg-white border border-[#E5E5E0] text-[14px] text-[#0A0A0A] placeholder:text-[#9A9A95] outline-none focus:border-[#0A0A0A]"
                  />
                </div>
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="h-11 w-11 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center"
                  aria-label="Filters"
                >
                  <FiSliders size={16} />
                </button>
              </div>

              <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                  {categories.map((c) => {
                    const active = activeCategory === c;
                    return (
                      <button
                        key={c}
                        onClick={() => setActiveCategory(c)}
                        className={`flex-shrink-0 px-3.5 h-9 rounded-full text-[12.5px] tracking-tight transition-colors ${
                          active
                            ? "bg-[#0A0A0A] text-[#FAFAF7]"
                            : "bg-white border border-[#E5E5E0] text-[#0A0A0A] hover:border-[#0A0A0A]"
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#6B6B6B] hidden sm:inline">
                    Sort
                  </span>
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
                </div>
              </div>

              <AnimatePresence mode="wait">
                {filtered.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="border border-dashed border-[#E5E5E0] rounded-2xl p-16 text-center"
                  >
                    <p className="font-display text-2xl tracking-tight">
                      Nothing in stock.
                    </p>
                    <p className="mt-2 text-[13px] text-[#6B6B6B]">
                      Try a different category or clear your search.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeCategory + sort + filter + search}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12"
                  >
                    {filtered.map((app, i) => (
                      <AppCard key={app.id} app={app} index={i} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#0A0A0A] py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <Eyebrow>— Don't see what you need?</Eyebrow>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-[1.05] tracking-tight">
            Tell us what you're <span className="italic text-[#FF4A1C]">looking for.</span>
          </h2>
          <p className="mt-5 text-[15px] text-[#6B6B6B] max-w-md mx-auto">
            We add to the library every Friday. Drop a note and we'll add it to the next shortlist.
          </p>
          <div className="mt-8">
            <PrimaryButton text="Request an app" to="/contact" />
          </div>
        </div>
      </section>

      {/* Mobile filters sheet */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-[80] bg-[#FAFAF7]"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-[#E5E5E0]">
              <p className="font-display text-lg tracking-tight">Filters</p>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 -mr-2"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-4rem)]">
              <div>
                <Eyebrow>— Category</Eyebrow>
                <div className="mt-3 flex flex-wrap gap-2">
                  {categories.map((c) => {
                    const active = activeCategory === c;
                    return (
                      <button
                        key={c}
                        onClick={() => setActiveCategory(c)}
                        className={`px-3.5 h-9 rounded-full text-[12.5px] ${
                          active
                            ? "bg-[#0A0A0A] text-[#FAFAF7]"
                            : "bg-white border border-[#E5E5E0] text-[#0A0A0A]"
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <Eyebrow>— Price</Eyebrow>
                <div className="mt-3 flex flex-wrap gap-2">
                  {FILTERS.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setFilter(f.value)}
                      className={`px-3 h-9 rounded-full text-[12.5px] ${
                        filter === f.value
                          ? "bg-[#0A0A0A] text-[#FAFAF7]"
                          : "bg-white border border-[#E5E5E0] text-[#0A0A0A]"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              <PrimaryButton
                text="Show results"
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full justify-center"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
