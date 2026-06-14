import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLoaderData, Link } from "react-router";
import { motion } from "framer-motion";
import {
  FiUser,
  FiImage,
  FiEdit3,
  FiCheck,
  FiStar,
  FiDownload,
  FiArrowUpRight,
} from "react-icons/fi";
import { Eyebrow } from "../components/Section";
import { StarRow } from "../components/Rating";
import Loading from "../components/Loading";

const STATS_TEMPLATE = [
  { key: "reviews", label: "Reviews", value: 0, Icon: FiEdit3 },
  { key: "saved", label: "Saved", value: 0, Icon: FiStar },
  { key: "installed", label: "Installed", value: 0, Icon: FiDownload },
];

export default function Profile() {
  const { user, updateUserProfile, loading: authLoading } = useAuth();
  const appsData = useLoaderData() || [];

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [saving, setSaving] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  if (authLoading) return <Loading />;

  const initials =
    (user?.displayName || user?.email || "?")
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateUserProfile(name, photoURL);
      setEditing(false);
    } catch {
      /* toast handled in context */
    } finally {
      setSaving(false);
    }
  };

  // Build a tiny activity feed by joining user name to reviews in the data set
  const userReviews = (() => {
    if (!user?.displayName) return [];
    const matches = [];
    appsData.forEach((app) => {
      (app.reviews || []).forEach((r) => {
        if (r.user === user.displayName) {
          matches.push({ ...r, app });
        }
      });
    });
    return matches;
  })();

  return (
    <div className="bg-[#FAFAF7]">
      {/* Hero */}
      <section className="pt-16 sm:pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Eyebrow>— The desk / Your account</Eyebrow>
          <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#F1EFE8] flex items-center justify-center">
                {user?.photoURL && !imgError ? (
                  <img
                    src={user.photoURL}
                    alt=""
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-display text-3xl text-[#0A0A0A]">{initials}</span>
                )}
              </div>
              <div>
                <h1 className="font-display text-4xl sm:text-5xl leading-[1] tracking-tight">
                  {user?.displayName || "Welcome"}
                </h1>
                <p className="mt-2 font-mono text-[12px] tracking-widest uppercase text-[#6B6B6B]">
                  {user?.email}
                </p>
                <p className="mt-2 text-[14px] text-[#6B6B6B]">
                  Member since {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </p>
              </div>
            </div>
            <button
              onClick={() => setEditing((v) => !v)}
              className="self-start inline-flex items-center gap-2 h-11 px-5 rounded-full border border-[#0A0A0A] text-[#0A0A0A] text-[13px] font-medium hover:bg-[#0A0A0A] hover:text-white transition-colors"
            >
              <FiEdit3 size={14} /> {editing ? "Cancel" : "Edit profile"}
            </button>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 border-t border-b border-[#0A0A0A]">
            {STATS_TEMPLATE.map((s, i) => {
              const value = s.key === "reviews" ? userReviews.length : s.value;
              const Icon = s.Icon;
              return (
                <div
                  key={s.key}
                  className={`p-6 sm:p-8 ${
                    i < STATS_TEMPLATE.length - 1 ? "border-r border-[#0A0A0A]" : ""
                  }`}
                >
                  <Icon size={14} className="text-[#6B6B6B]" />
                  <p className="mt-3 font-display text-3xl sm:text-4xl tracking-tight">
                    {String(value).padStart(2, "0")}
                  </p>
                  <p className="mt-1 font-mono text-[10px] tracking-widest uppercase text-[#6B6B6B]">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Edit form */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <motion.div
            layout
            className="bg-white border border-[#E5E5E0] rounded-2xl p-6 sm:p-8"
          >
            <Eyebrow>— Details</Eyebrow>
            <h2 className="mt-3 font-display text-2xl tracking-tight">
              Profile information
            </h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="block text-[12px] font-mono tracking-widest uppercase text-[#6B6B6B]">
                  Display name
                </label>
                <div className="mt-2 relative flex items-center">
                  <FiUser size={14} className="absolute left-4 text-[#9A9A95]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!editing}
                    className="w-full h-12 pl-10 pr-4 rounded-full bg-[#FAFAF7] border border-[#E5E5E0] text-[14.5px] text-[#0A0A0A] outline-none focus:border-[#0A0A0A] transition-colors disabled:opacity-60"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-mono tracking-widest uppercase text-[#6B6B6B]">
                  Photo URL
                </label>
                <div className="mt-2 relative flex items-center">
                  <FiImage size={14} className="absolute left-4 text-[#9A9A95]" />
                  <input
                    type="url"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    disabled={!editing}
                    placeholder="https://…"
                    className="w-full h-12 pl-10 pr-4 rounded-full bg-[#FAFAF7] border border-[#E5E5E0] text-[14.5px] text-[#0A0A0A] placeholder:text-[#9A9A95] outline-none focus:border-[#0A0A0A] transition-colors disabled:opacity-60"
                  />
                </div>
                <p className="mt-2 ml-1 text-[11px] font-mono text-[#6B6B6B]">
                  Paste a public image URL. We'll show it everywhere your name does.
                </p>
              </div>
              {editing && (
                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="h-11 px-5 rounded-full text-[13px] text-[#0A0A0A] hover:bg-[#F1EFE8] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[#FF4A1C] text-white text-[13px] font-medium hover:bg-[#0A0A0A] transition-colors disabled:opacity-60"
                  >
                    <FiCheck size={14} /> {saving ? "Saving…" : "Save changes"}
                  </button>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* Activity */}
      <section className="py-12 sm:py-20 border-t border-[#0A0A0A]">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-8">
            <div>
              <Eyebrow>— Your reviews</Eyebrow>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl tracking-tight">
                Your <span className="italic text-[#FF4A1C]">field notes.</span>
              </h2>
            </div>
            <Link
              to="/reviews"
              className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-mono tracking-widest uppercase text-[#0A0A0A] link-underline"
            >
              All reviews <FiArrowUpRight size={12} />
            </Link>
          </div>

          {userReviews.length === 0 ? (
            <div className="border border-dashed border-[#E5E5E0] rounded-2xl p-12 text-center">
              <p className="font-display text-2xl">No reviews yet.</p>
              <p className="mt-2 text-[13px] text-[#6B6B6B]">
                Install an app and tell us what you think.
              </p>
              <Link
                to="/apps"
                className="mt-5 inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[#0A0A0A] text-white text-[13px] font-medium"
              >
                Browse apps <FiArrowUpRight size={14} />
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {userReviews.map((r, idx) => (
                <li
                  key={idx}
                  className="bg-white border border-[#E5E5E0] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <img
                    src={r.app.thumbnail}
                    alt=""
                    className="w-14 h-14 rounded-xl object-cover bg-[#F1EFE8]"
                  />
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/apps/${r.app.id}`}
                      className="font-display text-lg tracking-tight hover:text-[#FF4A1C] transition-colors"
                    >
                      {r.app.name}
                    </Link>
                    <p className="mt-1 text-[13.5px] text-[#6B6B6B] line-clamp-2">
                      {r.comment}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                    <StarRow value={r.rating} size={14} />
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#6B6B6B]">
                      {r.date || "Recently"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
