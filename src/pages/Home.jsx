// Modern, visually appealing Home component with dark theme, stats, testimonials, and brand cohesion.
import { useLoaderData } from 'react-router';
import bannerImage from '../assets/banner.png';
import Button2 from '../components/Button2';
import Features from '../components/Features';
import { FiUsers, FiLayers, FiStar, FiCode } from 'react-icons/fi';

const stats = [
    { icon: <FiUsers size={28} />, label: 'Active Users', value: '120K+' },
    { icon: <FiLayers size={28} />, label: 'App Categories', value: '24' },
    { icon: <FiStar size={28} />, label: 'Reviews', value: '58K+' },
    { icon: <FiCode size={28} />, label: 'Developers', value: '1.2K+' },
];

const testimonials = [
    {
        name: 'Ayesha Rahman',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        quote: 'AppTrail helped me discover amazing productivity tools I never knew existed!',
        rating: 5,
    },
    {
        name: 'Tanvir Hasan',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        quote: 'The reviews and recommendations are spot on. My go-to app discovery platform.',
        rating: 5,
    },
    {
        name: 'Sadia Islam',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        quote: 'I love the clean interface and how easy it is to find new apps.',
        rating: 4,
    },
];

const Home = () => {
    const appsData = useLoaderData();
    const featuredApps = appsData.slice(0, 3);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
            {/* Hero Section */}
            <section
                className="relative flex flex-col justify-center items-center min-h-[600px] py-16 px-4 text-center overflow-hidden"
            >
                <img
                    src={bannerImage}
                    alt="Banner"
                    className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
                />
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg font-inter animate-fade-in">
                        Discover Your Next Favorite App
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 text-slate-200 font-medium animate-fade-in delay-100">
                        Explore, review, and install the best apps for every need. Curated by users, for users.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-200">
                        <Button2 text="Explore Apps" className="text-lg" to="/apps" />
                        <Button2 text="Join Community" className="text-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-100" to="/register" />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="flex flex-col items-center bg-slate-800 rounded-2xl shadow-lg p-6 hover:scale-105 hover:shadow-emerald-500/20 transition-all duration-300"
                    >
                        <div className="mb-3 text-emerald-400">{stat.icon}</div>
                        <div className="text-2xl font-bold text-slate-100">{stat.value}</div>
                        <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                    </div>
                ))}
            </section>

            {/* Featured Apps Section */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-inter text-slate-100">Featured Apps</h2>        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredApps.map(app => (
                        <div
                            key={app.id}
                            className="group bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-emerald-500/20 transition-all duration-300 flex flex-col"
                        >
                            <figure className="relative">
                                <img src={app.banner} alt={app.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                                <span className="absolute top-4 left-4 bg-emerald-500 text-xs font-bold px-3 py-1 rounded-full shadow text-white uppercase tracking-wide">
                                    {app.category || 'App'}
                                </span>
                            </figure>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex-grow">
                                    <h3 className="font-inter text-xl font-bold text-slate-100 mb-2">{app.name}</h3>
                                    <p className="text-slate-400 mb-2">Dev: {app.developer}</p>
                                    <p className="text-slate-300 text-base mb-4">{app.description}</p>
                                </div>
                                <div className="flex justify-between items-center mt-auto">
                                    <Button2 text="Learn More" to={`/apps/${app.id}`} />
                                    <span className="text-amber-400 font-bold">{'★'.repeat(app.rating || 4)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <Features />
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

            {/* Call-to-Action Section */}
            <section className="max-w-3xl mx-auto px-4 py-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-inter text-slate-100">Ready to get started?</h2>
                <p className="text-lg text-slate-300 mb-8">
                    Join AppTrail today and discover the best apps for your needs. Stay updated with our newsletter!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button2 text="Sign Up Free" className="text-lg" to="/register" />
                    <Button2 text="Subscribe Newsletter" className="text-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-100" to="/newsletter" />
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
      `}</style>
        </div>
    );
};

export default Home;