// Modern Features section with dark theme, consistent with navbar/footer/home design
import React from 'react';
import CountUp from 'react-countup';
import { FaSearch, FaStar, FaRocket, FaMobileAlt } from 'react-icons/fa';

const features = [
  {
    icon: <FaSearch className="text-3xl text-emerald-400" />,
    title: 'Easy Discovery',
    desc: 'Find the perfect apps with our intuitive search and categorization system.',
    stat: <><CountUp end={1000} duration={5} />+</>,
    label: 'apps to explore',
  },
  {
    icon: <FaStar className="text-3xl text-amber-400" />,
    title: 'User Reviews',
    desc: 'Make informed decisions with authentic user reviews and ratings.',
    stat: <CountUp end={4.8} duration={10} decimals={1} decimal="." />,
    label: 'average rating',
  },
  {
    icon: <FaRocket className="text-3xl text-sky-400" />,
    title: 'Quick Installation',
    desc: 'Install your favorite apps with just one click, no complications.',
    stat: <><CountUp end={25} duration={15} />M+</>,
    label: 'total downloads',
  },
  {
    icon: <FaMobileAlt className="text-3xl text-indigo-400" />,
    title: 'Cross-Platform',
    desc: 'Access your favorite apps on any device, anytime, anywhere.',
    stat: <><CountUp end={15} duration={15} />+</>,
    label: 'supported platforms',
  },
];

const Features = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-inter text-slate-100">
          Why Choose AppTrail?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-10 flex flex-col items-center text-center shadow-xl hover:shadow-emerald-500/20 hover:scale-105 transition-all duration-300"
            >
              <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 shadow-lg">
                {f.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4 font-inter text-slate-100">{f.title}</h3>
              <p className="mb-6 text-slate-400">{f.desc}</p>
              <div className="flex items-end justify-center gap-2">
                <div className="text-3xl font-bold text-emerald-400">{f.stat}</div>
                <span className="text-sm text-slate-400 mb-1">{f.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </section>
  );
};

export default Features;