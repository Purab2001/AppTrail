import { motion } from "framer-motion";
import CountUp from "react-countup";

const features = [
  {
    no: "01",
    title: "Curated discovery",
    desc: "A hand-picked library, not an algorithm dump. Every app earns its place on AppTrail.",
    stat: [<CountUp key="a" end={1200} duration={3} />, "+"],
    label: "apps in library",
  },
  {
    no: "02",
    title: "Honest reviews",
    desc: "Real users, real opinions. No paid placements, no five-star fluff.",
    stat: [<CountUp key="b" end={4.8} duration={3} decimals={1} decimal="." />],
    label: "avg. rating trust",
  },
  {
    no: "03",
    title: "One-tap install",
    desc: "From discovery to dock in a single gesture. No detours, no popups.",
    stat: [<CountUp key="c" end={25} duration={3} />, "M+"],
    label: "installs served",
  },
  {
    no: "04",
    title: "Cross-platform",
    desc: "iOS, Android, web, desktop. We follow the apps that follow you.",
    stat: [<CountUp key="d" end={6} duration={3} />],
    label: "platforms covered",
  },
];

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Features() {
  return (
    <section className="relative py-28 sm:py-36 bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <p className="eyebrow">— 02 / Why AppTrail</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight">
              Less noise.
              <br />
              <span className="italic text-[#FF4A1C]">More signal.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p className="text-[15px] leading-relaxed text-[#6B6B6B] max-w-md">
              We built AppTrail for the moments when you're tired of the algorithm and just want
              someone to point at the right app. No auctions. No tracking walls. Just the work.
            </p>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.12 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#E5E5E0]"
        >
          {features.map((f) => (
            <motion.div
              key={f.no}
              variants={item}
              className="group relative p-8 lg:p-10 border-b border-r border-[#E5E5E0] bg-white hover:bg-[#0A0A0A] hover:text-[#FAFAF7] transition-colors duration-500"
            >
              <p className="font-mono text-[11px] tracking-widest text-[#6B6B6B] group-hover:text-white/50 transition-colors">
                {f.no}
              </p>
              <h3 className="mt-6 font-display text-2xl tracking-tight">{f.title}</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-[#6B6B6B] group-hover:text-white/70 transition-colors">
                {f.desc}
              </p>
              <div className="mt-8 flex items-baseline gap-1.5">
                <span className="font-display text-4xl text-[#0A0A0A] group-hover:text-[#FF4A1C] transition-colors">
                  {f.stat[0]}
                </span>
                {f.stat[1] && (
                  <span className="font-display text-2xl text-[#FF4A1C] group-hover:text-white transition-colors">
                    {f.stat[1]}
                  </span>
                )}
                <span className="ml-1 text-[11px] font-mono tracking-widest text-[#6B6B6B] group-hover:text-white/50 transition-colors uppercase">
                  {f.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
