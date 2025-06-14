import { useLoaderData } from 'react-router';
import { FaStar, FaArrowRight } from 'react-icons/fa';

const NAVBAR_HEIGHT = 52;

const testimonials = [
  {
    name: 'Ayesha Rahman',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote: 'The featured apps on AppTrail are always top-notch and super useful!',
    rating: 5,
  },
  {
    name: 'Tanvir Hasan',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote: 'I love discovering new apps every week. The recommendations are spot on.',
    rating: 5,
  },
  {
    name: 'Sadia Islam',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    quote: 'The interface is beautiful and the featured section is my favorite!',
    rating: 4,
  },
];

const Featured = () => {
  const appsData = useLoaderData() || [];
  const featuredApps = appsData.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 pb-16" style={{ paddingTop: `${NAVBAR_HEIGHT + 24}px` }}>
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center min-h-[400px] py-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-500/10 to-sky-400/10 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg font-inter animate-fade-in">
            Featured Apps
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-slate-200 font-medium animate-fade-in delay-100">
            Handpicked apps that are trending, innovative, and highly rated by our community.
          </p>
          <a
            href="#featured-grid"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-400 hover:from-emerald-600 hover:to-sky-500 text-white font-semibold shadow-md transition-all duration-200 animate-fade-in delay-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            Explore Featured <FaArrowRight />
          </a>
        </div>
      </section>

      {/* Featured Content Grid */}
      <section id="featured-grid" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-inter text-slate-100">This Week's Top Picks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredApps.map(app => (
            <div
              key={app.id}
              className="group bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-emerald-500/20 hover:scale-105 transition-all duration-300 focus-within:ring-2 focus-within:ring-emerald-400"
              tabIndex={0}
              aria-label={`View details for ${app.name}`}
            >
              <img
                className="w-full h-48 object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
                src={app.banner || app.thumbnail}
                alt={app.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
                }}
              />
              <div className="flex-1 flex flex-col p-6 gap-3">
                <h3 className="mb-1 text-xl font-bold font-inter text-slate-100 truncate group-hover:text-emerald-400 transition-colors duration-200">
                  {app.name}
                </h3>
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                    <FaStar aria-label="Rating" /> {app.rating}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="inline-flex items-center gap-1 text-sky-400 font-semibold">
                    {app.downloads.toLocaleString()} downloads
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-4 line-clamp-3">{app.description}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {app.category || 'App'}
                  </span>
                  <a
                    href={`/apps/${app.id}`}
                    className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-sky-400 rounded-xl shadow hover:from-emerald-600 hover:to-sky-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200"
                    aria-label={`View details for ${app.name}`}
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-inter text-slate-100">Want to get featured?</h2>
        <p className="text-lg text-slate-300 mb-8">
          Submit your app to AppTrail and reach thousands of users. Join our growing community of developers and innovators!
        </p>
        <a
          href="/register"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-400 hover:from-emerald-600 hover:to-sky-500 text-white font-semibold shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          Submit Your App <FaArrowRight />
        </a>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-inter text-slate-100">What Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-slate-900 border border-slate-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-emerald-500/20 transition-all duration-300"
            >
              <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mb-4 border-2 border-emerald-400 shadow" />
              <blockquote className="italic text-slate-200 mb-4">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="flex gap-1 mb-2">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-amber-400 text-lg">★</span>
                ))}
              </div>
              <div className="font-bold text-emerald-400">{t.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Animations */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(.4,0,.2,1) both;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Featured;