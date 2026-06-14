import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";
import { StarRating } from "./Rating";
import { formatNumber } from "../utils/format";

export default function AppCard({ app, index = 0, variant = "default" }) {
  const compact = variant === "compact";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      className="group"
    >
      <Link to={`/apps/${app.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-[#F1EFE8] aspect-[4/3]">
          {app.thumbnail || app.banner ? (
            <img
              src={app.thumbnail || app.banner}
              alt={app.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-[#F1EFE8] flex items-center justify-center text-[#0A0A0A] font-display text-4xl">
              {app.name?.[0]}
            </div>
          )}
          <div className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[10px] font-mono tracking-widest uppercase text-[#0A0A0A]">
            {app.category || "App"}
          </div>
          <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/15 transition-colors duration-500" />
          <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <FiArrowUpRight size={16} />
          </div>
        </div>

        <div className="pt-5 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-xl tracking-tight text-[#0A0A0A] truncate">
              {app.name}
            </h3>
            <p className="mt-1 text-[12px] font-mono text-[#6B6B6B] tracking-wider truncate">
              {app.developer}
            </p>
            {!compact && app.tagline && (
              <p className="mt-2 text-[13px] text-[#6B6B6B] line-clamp-1">{app.tagline}</p>
            )}
          </div>
          <StarRating value={app.rating} />
        </div>

        {!compact && (
          <div className="mt-3 flex items-center gap-4 text-[11px] font-mono text-[#6B6B6B] tracking-wider">
            <span className="inline-flex items-center gap-1.5">
              <FiDownload size={11} /> {formatNumber(app.downloads)}
            </span>
            <span className="text-[#E5E5E0]">·</span>
            <span className="uppercase tracking-widest">{app.price || "Free"}</span>
          </div>
        )}
      </Link>
    </motion.div>
  );
}
