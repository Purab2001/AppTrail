import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiTwitter, FiInstagram, FiFacebook, FiArrowUpRight, FiCheck } from "react-icons/fi";

const FOOTER_GROUPS = [
  {
    label: "Product",
    items: [
      { to: "/apps", label: "Browse apps" },
      { to: "/featured", label: "Featured" },
      { to: "/reviews", label: "Reviews" },
      { to: "/apps?sort=new", label: "New releases" },
    ],
  },
  {
    label: "Company",
    items: [
      { to: "/about", label: "About" },
      { to: "/careers", label: "Careers" },
      { to: "/press", label: "Press" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    label: "Resources",
    items: [
      { to: "/blog", label: "Journal" },
      { to: "/guides", label: "Guides" },
      { to: "/changelog", label: "Changelog" },
      { to: "/api", label: "Developers" },
    ],
  },
  {
    label: "Legal",
    items: [
      { to: "/terms", label: "Terms" },
      { to: "/privacy", label: "Privacy" },
      { to: "/cookies", label: "Cookies" },
      { to: "/licenses", label: "Licenses" },
    ],
  },
];

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | error | success

  const submit = (e) => {
    e.preventDefault();
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <form onSubmit={submit} className="mt-5 max-w-md" noValidate>
      <div className="flex items-stretch border border-[#0A0A0A] rounded-full p-1 bg-white">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="you@studio.com"
          aria-label="Email address"
          className="flex-1 bg-transparent px-4 py-2.5 text-[14px] text-[#0A0A0A] placeholder:text-[#9A9A95] outline-none"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 px-4 h-10 rounded-full bg-[#0A0A0A] text-white text-[13px] font-medium hover:bg-[#FF4A1C] transition-colors"
        >
          Subscribe
          <FiArrowUpRight size={14} />
        </button>
      </div>
      <div className="min-h-[20px] mt-2 text-[12px] font-mono">
        {status === "error" && <span className="text-[#FF4A1C]">Please enter a valid email.</span>}
        {status === "success" && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1 text-[#1F3D2B]"
          >
            <FiCheck size={12} /> Subscribed — see you in your inbox.
          </motion.span>
        )}
      </div>
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] text-[#FAFAF7] overflow-hidden">
      <div className="absolute inset-0 noise pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        {/* Top editorial row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 pb-14 border-b border-white/10">
          <div className="max-w-xl">
            <p className="eyebrow text-white/50">— The dispatch</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-[1.05] tracking-tight">
              A weekly note on the
              <br />
              <span className="italic text-[#FF4A1C]">apps worth your time.</span>
            </h2>
            <Newsletter />
          </div>
          <div className="flex flex-col gap-3">
            <p className="eyebrow text-white/50">Follow</p>
            <div className="flex gap-2">
              {[
                { Comp: FiTwitter, label: "Twitter", href: "https://twitter.com" },
                { Comp: FiInstagram, label: "Instagram", href: "https://instagram.com" },
                { Comp: FiFacebook, label: "Facebook", href: "https://facebook.com" },
              ].map((entry) => {
                const Comp = entry.Comp;
                return (
                  <a
                    key={entry.label}
                    href={entry.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={entry.label}
                    className="w-11 h-11 inline-flex items-center justify-center rounded-full border border-white/15 text-white/80 hover:text-[#0A0A0A] hover:bg-[#FAFAF7] hover:border-[#FAFAF7] transition-all duration-300"
                  >
                    <Comp size={16} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 py-14">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="relative w-8 h-8 rounded-lg bg-[#FAFAF7] flex items-center justify-center">
                <span className="absolute inset-[3px] rounded-md bg-[#FF4A1C]" />
                <span className="relative font-display text-[#0A0A0A] text-[15px] font-semibold leading-none">
                  a
                </span>
              </span>
              <span className="font-display text-[22px] font-semibold tracking-tight">
                AppTrail
              </span>
            </Link>
            <p className="mt-4 text-[13px] leading-relaxed text-white/60 max-w-[220px]">
              A curated journal of apps. Built for the curious, written by people who use them.
            </p>
          </div>
          {FOOTER_GROUPS.map((g) => (
            <div key={g.label}>
              <p className="eyebrow text-white/50">{g.label}</p>
              <ul className="mt-4 space-y-2.5">
                {g.items.map((it) => (
                  <li key={it.label}>
                    <Link
                      to={it.to}
                      className="text-[13px] text-white/80 hover:text-white link-underline"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-[12px] font-mono text-white/50">
            © {new Date().getFullYear()} AppTrail Industries — Issue No. 01
          </p>
          <div className="flex items-center gap-5 text-[12px] font-mono text-white/50">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4A1C] animate-pulse" />
              All systems normal
            </span>
            <span>Built with care</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
