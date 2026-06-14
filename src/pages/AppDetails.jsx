import { useState } from "react";
import { useParams, useLoaderData, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import {
  FiDownload,
  FiArrowUpRight,
  FiThumbsUp,
  FiThumbsDown,
  FiShare2,
  FiCheck,
  FiPlus,
} from "react-icons/fi";
import { StarRating, StarRow, StarPicker } from "../components/Rating";
import { formatNumber } from "../utils/format";
import { Eyebrow } from "../components/Section";
import PrimaryButton from "../components/Button2";
import Loading from "../components/Loading";

const RelatedSection = ({ apps, currentId }) => {
  const related = apps.filter((a) => a.id !== currentId).slice(0, 3);
  return (
    <section className="py-20 sm:py-28 bg-[#0A0A0A] text-[#FAFAF7] noise">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/50">
              — Also worth a look
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl tracking-tight">
              You might <span className="italic text-[#FF4A1C]">also like.</span>
            </h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {related.map((app) => (
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
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg tracking-tight">{app.name}</h3>
                  <p className="text-[12px] text-white/50 font-mono">{app.category}</p>
                </div>
                <FiArrowUpRight
                  size={16}
                  className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const AppDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const appsData = useLoaderData() || [];
  const app = appsData.find((a) => a.id === id);

  const [isInstalled, setIsInstalled] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState(app?.reviews || []);
  const [voteState, setVoteState] = useState({});
  const [showForm, setShowForm] = useState(false);

  if (!app) return <Loading />;

  const handleInstall = () => {
    setIsInstalled(!isInstalled);
    toast.success(isInstalled ? "App removed from your shelf." : "Installed. Enjoy the new habit.");
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Sign in to leave a review.");
      return;
    }
    if (!isInstalled) {
      toast.warning("Install the app first — then tell us what you think.");
      return;
    }
    const newReview = {
      user: user?.displayName || "Anonymous",
      avatar: user?.photoURL || `https://i.pravatar.cc/120?u=${user?.uid}`,
      rating,
      comment: review,
      date: new Date().toISOString().slice(0, 10),
      likes: 0,
      dislikes: 0,
    };
    setReviews([newReview, ...reviews]);
    setReview("");
    setRating(5);
    setShowForm(false);
    toast.success("Review published.");
  };

  const handleVote = (idx, type) => {
    setVoteState((p) => ({
      ...p,
      [idx]: {
        up: type === "up" ? !p[idx]?.up : p[idx]?.up,
        down: type === "down" ? !p[idx]?.down : p[idx]?.down,
      },
    }));
  };

  return (
    <div className="bg-[#FAFAF7]">
      {/* HERO */}
      <section className="relative">
        <div className="relative h-[60vh] min-h-[480px] max-h-[640px] overflow-hidden bg-[#0A0A0A]">
          <img
            src={app.banner || app.thumbnail}
            alt={app.name}
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF7] via-[#FAFAF7]/20 to-transparent" />
          <div className="absolute top-0 inset-x-0 p-6 lg:p-10">
            <Link
              to="/apps"
              className="inline-flex items-center gap-2 text-[12px] font-mono tracking-widest uppercase text-white/90 hover:text-white"
            >
              ← All apps
            </Link>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 -mt-48 sm:-mt-56 pb-16">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <Eyebrow>— {app.category}</Eyebrow>
                <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.02em] text-[#0A0A0A]">
                  {app.name}
                </h1>
                <p className="mt-3 text-[16px] text-[#6B6B6B] font-mono tracking-wider">
                  {app.developer}
                </p>
                {app.tagline && (
                  <p className="mt-5 text-[20px] sm:text-[22px] font-display italic text-[#0A0A0A] max-w-xl">
                    &ldquo;{app.tagline}&rdquo;
                  </p>
                )}
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-[#0A0A0A]">
                  <StarRating value={app.rating} size={14} />
                  <span className="font-mono text-[#6B6B6B]">{formatNumber(app.downloads)} downloads</span>
                  <span className="font-mono text-[#6B6B6B] uppercase tracking-widest text-[11px]">
                    {app.price || "Free"}
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-[#E5E5E0] rounded-2xl p-6 lg:p-8 lg:sticky lg:top-28"
              >
                <div className="flex items-start gap-5">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#F1EFE8] flex-shrink-0">
                    <img src={app.thumbnail} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-mono tracking-widest uppercase text-[#6B6B6B]">
                      {app.platforms?.join(" · ")}
                    </p>
                    <h3 className="mt-1 font-display text-2xl tracking-tight">{app.name}</h3>
                    <p className="text-[12px] text-[#6B6B6B] mt-0.5">{app.developer}</p>
                  </div>
                </div>

                <button
                  onClick={handleInstall}
                  className={`mt-6 w-full inline-flex items-center justify-center gap-2 h-12 rounded-full text-[14px] font-medium transition-all duration-300 ${
                    isInstalled
                      ? "bg-[#0A0A0A] text-[#FAFAF7]"
                      : "bg-[#FF4A1C] text-white hover:bg-[#0A0A0A] hover:-translate-y-0.5"
                  }`}
                >
                  {isInstalled ? (
                    <>
                      <FiCheck size={16} /> Installed
                    </>
                  ) : (
                    <>
                      <FiPlus size={16} /> Install
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    toast.success("Link copied.");
                  }}
                  className="mt-3 w-full inline-flex items-center justify-center gap-2 h-12 rounded-full border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#FAFAF7] transition-colors text-[14px] font-medium"
                >
                  <FiShare2 size={14} /> Share
                </button>

                <dl className="mt-6 pt-6 border-t border-[#E5E5E0] grid grid-cols-2 gap-y-3 gap-x-4 text-[12.5px]">
                  <div>
                    <dt className="font-mono text-[10px] tracking-widest uppercase text-[#6B6B6B]">
                      Version
                    </dt>
                    <dd className="mt-0.5 text-[#0A0A0A]">{app.version}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] tracking-widest uppercase text-[#6B6B6B]">
                      Size
                    </dt>
                    <dd className="mt-0.5 text-[#0A0A0A]">{app.size}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] tracking-widest uppercase text-[#6B6B6B]">
                      Updated
                    </dt>
                    <dd className="mt-0.5 text-[#0A0A0A]">
                      {new Date(app.updated).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] tracking-widest uppercase text-[#6B6B6B]">
                      Languages
                    </dt>
                    <dd className="mt-0.5 text-[#0A0A0A]">{app.languages?.join(", ")}</dd>
                  </div>
                </dl>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* DESCRIPTION + FEATURES */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <Eyebrow>— About</Eyebrow>
              <p className="mt-4 text-[18px] leading-relaxed text-[#0A0A0A] font-display">
                {app.description}
              </p>
              <p className="mt-5 text-[15px] leading-relaxed text-[#6B6B6B]">
                {app.longDescription}
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-white border border-[#E5E5E0] rounded-2xl p-6 lg:p-8">
                <Eyebrow>— What's inside</Eyebrow>
                <ul className="mt-5 divide-y divide-[#E5E5E0]">
                  {app.features?.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 py-3 text-[14px] text-[#0A0A0A]"
                    >
                      <span className="font-mono text-[10px] tracking-widest text-[#9A9A95] w-6">
                        0{i + 1}
                      </span>
                      <span className="flex-1">{f}</span>
                      <FiCheck size={14} className="text-[#FF4A1C]" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 sm:py-24 border-t border-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <Eyebrow>— Field notes</Eyebrow>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl tracking-tight">
                Reader <span className="italic text-[#FF4A1C]">reviews.</span>
              </h2>
            </div>
            <button
              onClick={() => setShowForm((v) => !v)}
              className="self-start inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[#0A0A0A] text-white text-[13px] font-medium hover:bg-[#FF4A1C] transition-colors"
            >
              {showForm ? "Close" : "Write a review"}
            </button>
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleSubmitReview}
                className="overflow-hidden mb-10"
              >
                <div className="bg-white border border-[#0A0A0A] rounded-2xl p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                    <div>
                      <Eyebrow>— Rating</Eyebrow>
                      <div className="mt-3">
                        <StarPicker value={rating} onChange={setRating} />
                      </div>
                    </div>
                    <p className="text-[13px] text-[#6B6B6B] sm:ml-auto">
                      Posting as <span className="text-[#0A0A0A]">{user?.displayName || "guest"}</span>
                    </p>
                  </div>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Tell us what you think — what worked, what didn't."
                    rows={4}
                    className="mt-5 w-full p-4 rounded-xl bg-[#FAFAF7] border border-[#E5E5E0] text-[14.5px] text-[#0A0A0A] placeholder:text-[#9A9A95] outline-none focus:border-[#0A0A0A] transition-colors"
                    required
                  />
                  <div className="mt-4 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="h-11 px-5 rounded-full text-[13px] text-[#0A0A0A] hover:bg-[#F1EFE8] transition-colors"
                    >
                      Cancel
                    </button>
                    <PrimaryButton text="Publish review" type="submit" />
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="grid lg:grid-cols-12 gap-10">
            <aside className="lg:col-span-4">
              <div className="bg-white border border-[#E5E5E0] rounded-2xl p-6 lg:p-8">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-6xl tracking-tight text-[#0A0A0A]">
                    {app.rating?.toFixed(1)}
                  </span>
                  <span className="font-mono text-[12px] text-[#6B6B6B]">/ 5.0</span>
                </div>
                <div className="mt-3">
                  <StarRow value={Math.round(app.rating)} size={16} />
                </div>
                <p className="mt-2 text-[12px] font-mono text-[#6B6B6B]">
                  {reviews.length} reader reviews
                </p>
                <div className="mt-6 space-y-2">
                  {[5, 4, 3, 2, 1].map((r) => {
                    const count = reviews.filter((rv) => rv.rating === r).length;
                    const pct = reviews.length
                      ? Math.round((count / reviews.length) * 100)
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
                        <span className="font-mono text-[#6B6B6B] w-8 text-right">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </aside>

            <div className="lg:col-span-8 space-y-6">
              {reviews.length === 0 ? (
                <div className="border border-dashed border-[#E5E5E0] rounded-2xl p-12 text-center">
                  <p className="font-display text-2xl">No reviews yet.</p>
                  <p className="mt-2 text-[13px] text-[#6B6B6B]">Be the first to take notes.</p>
                </div>
              ) : (
                reviews.map((r, idx) => (
                  <article
                    key={idx}
                    className="bg-white border border-[#E5E5E0] rounded-2xl p-6 lg:p-8"
                  >
                    <header className="flex items-center gap-4">
                      <img
                        src={
                          r.avatar ||
                          `https://i.pravatar.cc/120?u=${r.user}`
                        }
                        alt={r.user}
                        className="w-11 h-11 rounded-full object-cover bg-[#F1EFE8]"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[14px] text-[#0A0A0A]">{r.user}</p>
                        <p className="font-mono text-[11px] tracking-widest uppercase text-[#6B6B6B]">
                          {r.date
                            ? new Date(r.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "Recently"}
                        </p>
                      </div>
                      <StarRow value={r.rating} size={14} />
                    </header>
                    <p className="mt-4 text-[15px] leading-relaxed text-[#0A0A0A]">
                      {r.comment}
                    </p>
                    <footer className="mt-5 pt-4 border-t border-[#E5E5E0] flex items-center gap-5 text-[12px] text-[#6B6B6B]">
                      <button
                        onClick={() => handleVote(idx, "up")}
                        className={`inline-flex items-center gap-1.5 transition-colors ${
                          voteState[idx]?.up ? "text-[#FF4A1C]" : "hover:text-[#0A0A0A]"
                        }`}
                      >
                        <FiThumbsUp size={13} /> {r.likes || 0}
                      </button>
                      <button
                        onClick={() => handleVote(idx, "down")}
                        className={`inline-flex items-center gap-1.5 transition-colors ${
                          voteState[idx]?.down ? "text-[#FF4A1C]" : "hover:text-[#0A0A0A]"
                        }`}
                      >
                        <FiThumbsDown size={13} /> {r.dislikes || 0}
                      </button>
                    </footer>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <RelatedSection apps={appsData} currentId={app.id} />
    </div>
  );
};

export default AppDetails;
