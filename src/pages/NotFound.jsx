import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiSearch } from "react-icons/fi";
import { Eyebrow } from "../components/Section";

export default function NotFound() {
  return (
    <div className="relative min-h-[calc(100vh-72px)] bg-[#FAFAF7] overflow-hidden flex items-center">
      {/* Background giant type */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display text-[clamp(18rem,40vw,40rem)] leading-none tracking-[-0.05em] text-[#0A0A0A]/5">
          404
        </span>
      </div>

      <div className="relative max-w-3xl mx-auto px-6 lg:px-10 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow>— Error / Page not found</Eyebrow>
          <p className="mt-5 font-mono text-[12px] tracking-widest uppercase text-[#FF4A1C]">
            Issue 01 — Page 404
          </p>
          <h1 className="mt-4 font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-[-0.02em]">
            We couldn't find
            <br />
            <span className="italic text-[#FF4A1C]">that page.</span>
          </h1>
          <p className="mt-6 text-[15.5px] text-[#6B6B6B] max-w-md mx-auto leading-relaxed">
            The link you followed is broken, or the page has been moved. Either way, the
            library is just a click away.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full bg-[#FF4A1C] text-white text-[14px] font-medium hover:bg-[#0A0A0A] transition-colors"
          >
            Back to home <FiArrowUpRight size={14} />
          </Link>
          <Link
            to="/apps"
            className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full border border-[#0A0A0A] text-[#0A0A0A] text-[14px] font-medium hover:bg-[#0A0A0A] hover:text-[#FAFAF7] transition-colors"
          >
            <FiSearch size={14} /> Browse apps
          </Link>
        </motion.div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] font-mono text-[#6B6B6B]">
          <span>— Try one of these:</span>
          <Link to="/" className="text-[#0A0A0A] link-underline">
            Home
          </Link>
          <span className="text-[#E5E5E0]">·</span>
          <Link to="/apps" className="text-[#0A0A0A] link-underline">
            All apps
          </Link>
          <span className="text-[#E5E5E0]">·</span>
          <Link to="/featured" className="text-[#0A0A0A] link-underline">
            Featured
          </Link>
          <span className="text-[#E5E5E0]">·</span>
          <Link to="/reviews" className="text-[#0A0A0A] link-underline">
            Reviews
          </Link>
        </div>
      </div>
    </div>
  );
}
