import { useState, useEffect, useRef, useCallback } from 'react';
import { useLoaderData } from 'react-router';
import AppCard from '../components/AppCard';
import { FaChevronLeft, FaChevronRight, FaFire, FaRocket } from 'react-icons/fa';
import Button2 from '../components/Button2';

const NAVBAR_HEIGHT = 72;

const Apps = () => {
  const appsData = useLoaderData();

  const [apps, setApps] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const slidesRef = useRef([]);

  useEffect(() => {
    setApps(appsData);
    setIsLoading(false);
  }, [appsData]);

  const trendingApps = [...apps].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const categories = [...new Set(apps.map(app => app.category))];
  const sliderApps = apps.slice(0, 3);

  const nextSlide = useCallback(() => {
    if (sliderApps.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % sliderApps.length);
  }, [sliderApps.length]);

  const prevSlide = useCallback(() => {
    if (sliderApps.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + sliderApps.length) % sliderApps.length);
  }, [sliderApps.length]);

  useEffect(() => {
    if (sliderApps.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, sliderApps.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 pb-16" style={{ paddingTop: `${NAVBAR_HEIGHT + 24}px` }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Slider Section */}
        <div className="relative h-[500px] mb-20 rounded-3xl overflow-hidden shadow-2xl">
          {isLoading ? (
            <div className="h-full w-full animate-pulse bg-slate-800 flex flex-col items-center justify-end p-8">
              <div className="w-2/3 h-8 bg-slate-700 rounded mb-4"></div>
              <div className="w-1/2 h-6 bg-slate-700 rounded mb-6"></div>
              <div className="w-32 h-10 bg-slate-700 rounded"></div>
            </div>
          ) : sliderApps.length > 0 ? (
            <>
              {/* Slides */}
              <div className="h-full relative overflow-hidden">
                {sliderApps.map((app, index) => (
                  <div
                    key={app.id}
                    ref={el => slidesRef.current[index] = el}
                    className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${index === currentSlide
                      ? 'opacity-100 translate-x-0 z-10'
                      : index < currentSlide
                        ? 'opacity-0 -translate-x-full z-0'
                        : 'opacity-0 translate-x-full z-0'
                      }`}
                  >
                    <img
                      src={app.banner || app.thumbnail}
                      alt={app.name}
                      className="w-full h-full object-cover opacity-80"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/1200x400?text=App+Banner';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex items-end px-8 pb-12">
                      <div className="text-left text-white w-full md:w-2/3">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 font-inter drop-shadow-lg">{app.name}</h2>
                        <p className="text-lg md:text-xl mb-6 line-clamp-2 text-slate-200">{app.description}</p>
                        <Button2 text="View Details" className="text-lg" to={`/apps/${app.id}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-20">
                {sliderApps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${index === currentSlide
                      ? 'bg-emerald-400 w-8'
                      : 'bg-white/50 hover:bg-emerald-400/80'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  ></button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all focus:outline-none"
                aria-label="Previous slide"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all focus:outline-none"
                aria-label="Next slide"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            </>
          ) : (
            <div className="h-full flex items-center justify-center bg-slate-800">
              <p className="text-slate-400 font-medium">No featured apps available</p>
            </div>
          )}
        </div>

        {/* Trending Apps Section with Icon */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <FaFire className="text-amber-400 mr-3 text-2xl" />
            <h2 className="text-3xl md:text-4xl font-bold font-inter text-slate-100">Trending Apps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingApps.map(app => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </section>

        {/* Apps by Category */}
        {categories.map(category => (
          <section key={category} className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-inter text-slate-100">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {apps
                .filter(app => app.category === category)
                .map(app => (
                  <AppCard key={app.id} app={app} />
                ))}
            </div>
          </section>
        ))}

        {/* New Releases Section with Icon */}
        <section className="mb-20">
          <div className="flex items-center mb-6">
            <FaRocket className="text-sky-400 mr-3 text-2xl" />
            <h2 className="text-3xl md:text-4xl font-bold font-inter text-slate-100">New Releases</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {apps.slice(0, 4).map(app => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Apps;