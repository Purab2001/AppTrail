import { useLoaderData, Link } from "react-router";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiArrowDown, FiDownload, FiStar } from "react-icons/fi";
import { Eyebrow } from "../components/Section";
import { StarRating } from "../components/Rating";
import { formatNumber } from "../utils/format";

const TESTIMONIALS = [
  {
    quote:
      "The featured apps on AppTrail are always top-notch and super useful — it's how I find my weekend reading list.",
    name: "Ayesha Rahman",
    role: "Designer, Dhaka",
    avatar: "https://i.pravatar.cc/120?u=ayesha_r",
  },
  {
    quote:
      "I love discovering new apps every Friday. The recommendations feel like notes from a friend who reads more than me.",
    name: "Tanvir Hasan",
    role: "Engineer, Berlin",
    avatar: "https://i.pravatar.cc/120?u=tanvir_h",
  },
  {
    quote:
      "The featured section is my favorite part of the app — a genuine editorial filter in a sea of store rankings.",
    name: "Sadia Islam",
    role: "Writer, Toronto",
    avatar: "https://i.pravatar.cc/120?u=sadia_i",
  },
];

const PULL_QUOTE = {
  quote:
    "Featured is not a leaderboard. It's six apps the editors kept returning to this week — and one we couldn't stop thinking about.",
  author: "The editors",
  issue: "Issue 01",
};

export default function Featured() {
  const appsData = useLoaderData() || [];
  // Pick 6 featured by a score (rating weighted by downloads) so the editorial feels intentional
  const featured = [...appsData]
    .sort(
      (a, b) =>
        b.rating * Math.log10(b.downloads + 10) -
        a.rating * Math.log10(a.downloads + 10)
    )
    .slice(0, 6);

  const cover = featured[0];
  const rest = featured.slice(1);

  return (
    <div className="bg-[#FAFAF7]">
      {/* Magazine cover */}
      <section className="pt-16 sm:pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between gap-6 mb-12">
            <div>
              <Eyebrow>— Issue 01 / Featured</Eyebrow>
              <h1 className="mt-4 font-display text-[clamp(3rem,9vw,7rem)] leading-[0.9] tracking-[-0.03em]">
                Six apps,
                <br />
                <span className="italic text-[#FF4A1C]">one shelf.</span>
              </h1>
              <p className="mt-5 text-[15.5px] text-[#6B6B6B] max-w-lg leading-relaxed">
                Hand-picked from this week's submissions, the editors' late-night phone
                screens, and the apps our readers keep mentioning in the comments.
              </p>
            </div>
            <a
              href="#featured-list"
              className="hidden sm:inline-flex items-center gap-2 text-[12px] font-mono tracking-widest uppercase text-[#0A0A0A] link-underline"
            >
              Browse the issue
              <FiArrowDown size={12} />
            </a>
          </div>

          {/* Cover feature */}
          {cover && (
            <Link
              to={`/apps/${cover.id}`}
              className="group block relative overflow-hidden rounded-3xl bg-[#0A0A0A] text-[#FAFAF7]"
            >
              <div className="grid lg:grid-cols-12 min-h-[520px]">
                <div className="relative lg:col-span-7 aspect-[4/3] lg:aspect-auto overflow-hidden">
                  <img
                    src={cover.banner}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 h-7 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-mono tracking-widest uppercase text-[#0A0A0A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4A1C]" /> Cover story
                  </div>
                </div>
                <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
                  <div>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-white/50">
                      01 / Featured
                    </p>
                    <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.02em]">
                      {cover.name}
                    </h2>
                    {cover.tagline && (
                      <p className="mt-5 text-[20px] sm:text-[22px] font-display italic text-white/80 max-w-md">
                        &ldquo;{cover.tagline}&rdquo;
                      </p>
                    )}
                    <p className="mt-5 text-[14.5px] text-white/60 leading-relaxed max-w-md line-clamp-3">
                      {cover.description}
                    </p>
                  </div>
                  <div className="mt-10">
                    <div className="flex items-center gap-5 text-[12px] text-white/70">
                      <StarRating value={cover.rating} size={12} />
                      <span className="font-mono">
                        {formatNumber(cover.downloads)} downloads
                      </span>
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[#FF4A1C] text-white text-[13px] font-medium group-hover:bg-white group-hover:text-[#0A0A0A] transition-colors">
                      Read the cover story
                      <FiArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-[#0A0A0A] text-[#FAFAF7] noise py-20 sm:py-28">
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <Eyebrow className="text-white/50">— Editor's note</Eyebrow>
          <p className="mt-6 font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.01em]">
            &ldquo;{PULL_QUOTE.quote}&rdquo;
          </p>
          <p className="mt-8 font-mono text-[11px] tracking-widest uppercase text-white/50">
            — {PULL_QUOTE.author} · {PULL_QUOTE.issue}
          </p>
        </div>
      </section>

      {/* The list */}
      <section id="featured-list" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Eyebrow>— 02 / The list</Eyebrow>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl tracking-tight">
                This week's <span className="italic text-[#FF4A1C]">top picks.</span>
              </h2>
            </div>
            <p className="hidden sm:block font-mono text-[11px] tracking-widest uppercase text-[#6B6B6B]">
              Updated Friday 09:00 GMT
            </p>
          </div>

          <ul className="space-y-6">
            {rest.map((app, i) => (
              <motion.li
                key={app.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
              >
                <Link
                  to={`/apps/${app.id}`}
                  className="group grid grid-cols-12 gap-4 sm:gap-8 items-center bg-white border border-[#E5E5E0] rounded-2xl overflow-hidden hover:border-[#0A0A0A] transition-colors"
                >
                  <div className="col-span-4 sm:col-span-3 aspect-[4/3] overflow-hidden bg-[#F1EFE8]">
                    <img
                      src={app.thumbnail}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="col-span-8 sm:col-span-7 py-5 sm:py-8 pr-4 sm:pr-6">
                    <div className="flex items-center gap-3 text-[11px] font-mono tracking-widest uppercase text-[#6B6B6B]">
                      <span>0{i + 2}</span>
                      <span>·</span>
                      <span>{app.category}</span>
                    </div>
                    <h3 className="mt-2 font-display text-2xl sm:text-3xl tracking-tight group-hover:text-[#FF4A1C] transition-colors">
                      {app.name}
                    </h3>
                    {app.tagline && (
                      <p className="mt-2 text-[14.5px] text-[#6B6B6B] line-clamp-1">
                        {app.tagline}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-4 text-[12px] text-[#6B6B6B] font-mono">
                      <span className="inline-flex items-center gap-1.5">
                        <FiStar size={11} className="text-[#FF4A1C]" /> {app.rating?.toFixed(1)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <FiDownload size={11} /> {formatNumber(app.downloads)}
                      </span>
                    </div>
                  </div>
                  <div className="hidden sm:flex col-span-2 justify-end pr-8">
                    <span className="w-11 h-11 rounded-full border border-[#E5E5E0] flex items-center justify-center group-hover:bg-[#0A0A0A] group-hover:text-white group-hover:border-[#0A0A0A] transition-all">
                      <FiArrowUpRight size={16} />
                    </span>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28 border-t border-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <Eyebrow>— Letters</Eyebrow>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl tracking-tight">
              What readers <span className="italic text-[#FF4A1C]">tell us.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="bg-white border border-[#E5E5E0] rounded-2xl p-6 sm:p-8 hover:border-[#0A0A0A] transition-colors"
              >
                <span className="font-display text-5xl leading-none text-[#FF4A1C]">&ldquo;</span>
                <blockquote className="mt-2 font-display text-[18px] leading-[1.4] tracking-tight text-[#0A0A0A]">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-[13px] font-medium text-[#0A0A0A]">{t.name}</p>
                    <p className="text-[11px] font-mono text-[#6B6B6B] tracking-wider">
                      {t.role}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Submit CTA */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <Eyebrow>— Build something?</Eyebrow>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em]">
            Submit your app
            <br />
            <span className="italic text-[#FF4A1C]">to the editors.</span>
          </h2>
          <p className="mt-6 text-[15.5px] text-[#6B6B6B] max-w-md mx-auto">
            Independent apps only. We read every submission, get back within a week, and
            feature what deserves to be featured.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full bg-[#FF4A1C] text-white text-[14px] font-medium hover:bg-[#0A0A0A] transition-colors"
            >
              Submit your app <FiArrowUpRight size={14} />
            </Link>
            <Link
              to="/apps"
              className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full border border-[#0A0A0A] text-[#0A0A0A] text-[14px] font-medium hover:bg-[#0A0A0A] hover:text-[#FAFAF7] transition-colors"
            >
              Browse the library
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
