import { useLoaderData, Link } from "react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  FiArrowUpRight,
  FiSearch,
  FiCommand,
  FiStar,
  FiDownload,
} from "react-icons/fi";
import CountUp from "react-countup";
import PrimaryButton from "../components/Button2";
import AppCard from "../components/AppCard";
import { StarRating } from "../components/Rating";
import Features from "../components/Features";

const CATEGORIES = [
  "Education",
  "Productivity",
  "Gaming",
  "Health",
  "Finance",
  "Design",
  "Music",
  "Photography",
  "Utilities",
  "Lifestyle",
];

const TESTIMONIALS = [
  {
    name: "Ayesha Rahman",
    role: "Designer, Dhaka",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "AppTrail helped me discover three tools that have genuinely changed how I work. I haven't opened the App Store in months.",
  },
  {
    name: "Tanvir Hasan",
    role: "Engineer, Berlin",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "The reviews are honest, the curation is sharp, and the interface is the cleanest I've seen in the space. A genuine reference.",
  },
  {
    name: "Sadia Islam",
    role: "Writer, Toronto",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "I love that AppTrail feels like a magazine, not a marketplace. It treats apps as artifacts, not commodities.",
  },
];

const STATS = [
  { value: 120, suffix: "K+", label: "Active readers" },
  { value: 24, suffix: "", label: "Categories" },
  { value: 58, suffix: "K+", label: "Reviews written" },
  { value: 1200, suffix: "+", label: "Apps in library" },
];

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

function Eyebrow({ children, className = "" }) {
  return (
    <p
      className={`font-mono text-[11px] tracking-[0.2em] uppercase text-[#6B6B6B] ${className}`}
    >
      {children}
    </p>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 8]);

  return (
    <section ref={ref} className="relative pt-12 sm:pt-20 pb-20 sm:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            >
              <motion.div variants={item}>
                <Eyebrow>— Issue 01 / App discovery, refined</Eyebrow>
              </motion.div>
              <motion.h1
                variants={item}
                className="mt-5 font-display text-[clamp(2.5rem,7vw,5.75rem)] leading-[0.95] tracking-[-0.02em] text-[#0A0A0A]"
              >
                The apps
                <br />
                <span className="italic text-[#FF4A1C]">worth your</span>
                <br />
                attention.
              </motion.h1>
              <motion.p
                variants={item}
                className="mt-7 max-w-lg text-[16px] leading-relaxed text-[#6B6B6B]"
              >
                AppTrail is a curated journal of the tools we use, the ones we don't, and the
                ones we keep coming back to. No auctions. No algorithmic sludge.
              </motion.p>
              <motion.div variants={item} className="mt-9 flex flex-col sm:flex-row gap-3">
                <PrimaryButton text="Explore apps" to="/apps" />
                <PrimaryButton text="Start reading" to="/featured" variant="ghost" />
              </motion.div>
              <motion.div
                variants={item}
                className="mt-10 flex items-center gap-4 text-[12px] font-mono text-[#6B6B6B]"
              >
                <div className="flex -space-x-2">
                  {TESTIMONIALS.map((t) => (
                    <img
                      key={t.name}
                      src={t.avatar}
                      alt=""
                      className="w-7 h-7 rounded-full border-2 border-[#FAFAF7] object-cover"
                    />
                  ))}
                </div>
                <span>
                  Joined this week by <span className="text-[#0A0A0A]">2,184 readers</span>
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Hero visual */}
          <motion.div
            style={{ y: y1 }}
            className="lg:col-span-5 relative h-[420px] sm:h-[520px] hidden lg:block"
          >
            <div className="absolute inset-0 rounded-3xl border border-[#E5E5E0] bg-white overflow-hidden">
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF4A1C]" />
                  <span className="font-mono text-[10px] tracking-widest text-[#6B6B6B]">
                    APPS / FEATURED
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#9A9A95]">2026.06</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  style={{ rotate, y: y2 }}
                  className="relative w-72 h-96"
                >
                  <div className="absolute inset-0 rounded-2xl bg-[#0A0A0A] shadow-2xl" />
                  <div className="absolute -top-6 -right-8 w-56 h-72 rounded-2xl bg-[#FF4A1C] shadow-xl" />
                  <div className="absolute -bottom-8 -left-10 w-52 h-64 rounded-2xl bg-[#F1EFE8] shadow-xl overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center font-display text-5xl text-[#0A0A0A]">
                      a.
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-[#1F3D2B] text-[#FAFAF7] flex items-center justify-center text-center font-display text-xs leading-tight p-3 shadow-xl">
              curated<br />weekly
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <section className="border-y border-[#0A0A0A] bg-[#0A0A0A] text-[#FAFAF7] overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-5">
        {[...CATEGORIES, ...CATEGORIES].map((c, i) => (
          <div key={i} className="flex items-center gap-6 px-6">
            <span className="font-display text-2xl tracking-tight">{c}</span>
            <span className="text-[#FF4A1C] text-2xl">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 border-y border-[#0A0A0A]"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`p-8 sm:p-10 ${
                i < STATS.length - 1 ? "border-b lg:border-b-0 lg:border-r border-[#E5E5E0]" : ""
              } ${i % 2 === 0 ? "border-r lg:border-r" : ""}`}
            >
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B]">
                0{i + 1}
              </p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-5xl sm:text-6xl tracking-tight text-[#0A0A0A]">
                  <CountUp end={s.value} duration={2.4} enableScrollSpy scrollSpyOnce />
                </span>
                <span className="font-display text-2xl text-[#FF4A1C]">{s.suffix}</span>
              </div>
              <p className="mt-2 text-[13px] text-[#6B6B6B]">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedApps({ apps }) {
  const featured = apps?.slice(0, 6) || [];
  return (
    <section className="py-24 sm:py-32 bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <Eyebrow>— 01 / Featured this week</Eyebrow>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight max-w-xl">
              Six apps <span className="italic text-[#FF4A1C]">on rotation</span> right now.
            </h2>
          </div>
          <Link
            to="/apps"
            className="group inline-flex items-center gap-2 text-[13px] font-mono tracking-widest uppercase text-[#0A0A0A]"
          >
            See full library
            <FiArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:rotate-45"
            />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {featured.map((app, i) => (
            <AppCard key={app.id} app={app} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryGrid() {
  return (
    <section className="py-24 sm:py-32 bg-[#0A0A0A] text-[#FAFAF7] noise">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/50">
              — 03 / The index
            </p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight max-w-2xl">
              Browse by <span className="italic text-[#FF4A1C]">category</span>.
            </h2>
          </div>
          <Link
            to="/apps"
            className="text-[13px] font-mono tracking-widest uppercase text-white/70 hover:text-white"
          >
            All categories →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-t border-l border-white/10">
          {CATEGORIES.slice(0, 10).map((c, i) => (
            <Link
              key={c}
              to={`/apps?category=${c.toLowerCase()}`}
              className="group relative aspect-square border-b border-r border-white/10 p-6 flex flex-col justify-between hover:bg-white hover:text-[#0A0A0A] transition-colors duration-500"
            >
              <span className="font-mono text-[10px] tracking-widest text-white/40 group-hover:text-[#0A0A0A]/40">
                0{i + 1}
              </span>
              <div>
                <p className="font-display text-2xl tracking-tight">{c}</p>
                <FiArrowUpRight
                  size={16}
                  className="mt-2 -rotate-12 group-hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-5">
            <Eyebrow>— 04 / Field notes</Eyebrow>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight">
              Read by
              <br />
              <span className="italic text-[#FF4A1C]">the curious.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p className="text-[15px] leading-relaxed text-[#6B6B6B] max-w-md">
              Writers, engineers, designers and one very opinionated cat. AppTrail is built around
              the people who write for it — and the people who read it on the train.
            </p>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure
              key={t.name}
              variants={item}
              className="relative bg-white border border-[#E5E5E0] p-8 sm:p-10 flex flex-col gap-6 hover:border-[#0A0A0A] transition-colors"
            >
              <span className="font-display text-6xl leading-none text-[#FF4A1C] absolute top-4 right-6">
                &ldquo;
              </span>
              <blockquote className="font-display text-[19px] leading-[1.45] tracking-tight text-[#0A0A0A]">
                {t.quote}
              </blockquote>
              <div className="mt-auto flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-[13px] font-medium text-[#0A0A0A]">{t.name}</p>
                  <p className="text-[11px] font-mono text-[#6B6B6B] tracking-wider">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative py-28 sm:py-40 bg-[#FAFAF7] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-[#0A0A0A]" />
      <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow>— Closing</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.95] tracking-[-0.02em]">
            Open the
            <br />
            <span className="italic text-[#FF4A1C]">next issue.</span>
          </h2>
          <p className="mt-7 text-[16px] text-[#6B6B6B] max-w-md mx-auto">
            Get the weekly dispatch in your inbox. One note, every Friday. No tracking, no
            upsells.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <PrimaryButton text="Subscribe free" to="/register" />
            <PrimaryButton text="Browse library" to="/apps" variant="ghost" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const appsData = useLoaderData() || [];

  return (
    <div className="bg-[#FAFAF7]">
      <Hero />
      <Marquee />
      <Stats />
      <FeaturedApps apps={appsData} />
      <Features />
      <CategoryGrid />
      <Testimonials />
      <FinalCTA />
    </div>
  );
}
