import { motion } from "framer-motion";
import { Eyebrow } from "./Section";

export default function Loading({ label = "Loading the library…" }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="flex flex-col items-center gap-8">
        <div className="relative w-16 h-16">
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-[#E5E5E0]"
          />
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#FF4A1C]"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <span className="absolute inset-3 rounded-full bg-[#FF4A1C] flex items-center justify-center font-display text-white text-[15px] font-semibold leading-none">
            a
          </span>
        </div>
        <div className="text-center">
          <Eyebrow>— One moment</Eyebrow>
          <p className="mt-3 font-display text-2xl tracking-tight">{label}</p>
        </div>
      </div>
    </div>
  );
}
