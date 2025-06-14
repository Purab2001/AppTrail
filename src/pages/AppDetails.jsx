// Modern AppDetails page with dark theme, consistent design system, and responsive layout
import { useState } from 'react';
import { useParams, useLoaderData } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { FaStar, FaDownload, FaUser, FaThumbsUp, FaThumbsDown, FaCalendarAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const NAVBAR_HEIGHT = 72; // px, adjust if your navbar is taller

const AppDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const appsData = useLoaderData();
  const app = appsData.find(app => app.id === id);

  const [isInstalled, setIsInstalled] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState(app?.reviews || []);

  const handleInstall = () => {
    setIsInstalled(!isInstalled);
    toast.success(isInstalled ? 'App uninstalled successfully' : 'App installed successfully');
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to submit a review');
      return;
    }
    if (!isInstalled) {
      toast.warning('Please install the app first to submit a review');
      return;
    }
    const newReview = {
      user: user?.displayName || 'Anonymous User',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      rating,
      comment: review,
      likes: 0,
      dislikes: 0
    };
    setReviews([...reviews, newReview]);
    setReview('');
    setRating(5);
    toast.success('Review submitted successfully!');
  };

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Format numbers nicely
  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M+`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K+`;
    return num;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 pb-16" style={{ paddingTop: `${NAVBAR_HEIGHT + 24}px` }}>
      <div className="max-w-5xl mx-auto px-4">
        {/* App Header with Banner */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl mb-10 flex flex-col md:flex-row">
          <div className="md:w-1/3 p-8 flex justify-center items-center bg-slate-800">
            <img
              src={app.thumbnail}
              alt={app.name}
              className="w-48 h-48 object-contain rounded-2xl shadow-lg"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x300?text=App';
              }}
            />
          </div>
          <div className="md:w-2/3 p-8 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 font-inter text-emerald-400">{app.name}</h1>
            <p className="text-lg text-slate-400 mb-4">{app.developer}</p>
            <p className="text-slate-200 mb-6">{app.description}</p>
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                <FaDownload /> {formatNumber(app.downloads)} downloads
              </span>
              <span className="inline-flex items-center gap-2 bg-sky-500/10 text-sky-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                <FaStar /> {app.rating} rating
              </span>
              <span className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                <FaCalendarAlt /> Updated {app.updated}
              </span>
            </div>
            <button
              onClick={handleInstall}
              className={`px-8 py-3 rounded-2xl font-semibold text-lg shadow bg-gradient-to-r from-emerald-500 to-sky-400 hover:from-emerald-600 hover:to-sky-500 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 w-fit ${isInstalled ? 'opacity-80' : ''}`}
            >
              {isInstalled ? 'Uninstall' : 'Install'}
            </button>
          </div>
        </section>

        {/* Features */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl mb-10 p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 font-inter text-slate-100">Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <li className="pb-2 border-b border-slate-800 font-medium text-slate-200">Discover a wide range of apps</li>
            <li className="pb-2 border-b border-slate-800 font-medium text-slate-200">Read detailed app descriptions and user reviews</li>
            <li className="pb-2 border-b border-slate-800 font-medium text-slate-200">Install and manage your apps easily</li>
            <li className="pb-2 border-b border-slate-800 font-medium text-slate-200">Share your feedback and reviews with the community</li>
            {app.features.map((feature, index) => (
              <li key={index} className="pb-2 border-b border-slate-800 font-medium text-slate-200">{feature}</li>
            ))}
          </ul>
        </section>

        {/* App Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow">
            <p className="text-slate-400 text-sm mb-1">Average Rating</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-amber-400">{app.rating}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map(star => (
                  <FaStar key={star}
                    className={star <= Math.round(app.rating)
                      ? "text-amber-400"
                      : "text-slate-700"}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow">
            <p className="text-slate-400 text-sm mb-1">Total Downloads</p>
            <p className="text-3xl font-bold text-emerald-400">{formatNumber(app.downloads)}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow">
            <p className="text-slate-400 text-sm mb-1">Reviews</p>
            <p className="text-3xl font-bold text-sky-400">{reviews.length}</p>
          </div>
        </section>

        {/* App Metadata */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow">
            <p className="text-slate-400 text-sm mb-1">Developer</p>
            <p className="font-medium text-slate-200">{app.developer}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow">
            <p className="text-slate-400 text-sm mb-1">App Version</p>
            <p className="font-medium text-slate-200">{app.version}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow">
            <p className="text-slate-400 text-sm mb-1">App Size</p>
            <p className="font-medium text-slate-200">{app.size}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow">
            <p className="text-slate-400 text-sm mb-1">Last Updated</p>
            <p className="font-medium text-slate-200">{app.updated}</p>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl p-8 mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 font-inter text-slate-100">Reviews</h2>
          {/* Submit review button */}
          <div className="mb-8">
            <button
              onClick={() => document.getElementById('review-form').classList.toggle('hidden')}
              className="bg-gradient-to-r from-emerald-500 to-sky-400 hover:from-emerald-600 hover:to-sky-500 text-white font-semibold rounded-2xl px-6 py-2 transition-all duration-200"
            >
              Submit Review
            </button>
            {/* Review form (hidden by default) */}
            <form id="review-form" className="mt-4 bg-slate-800 p-6 rounded-xl hidden">
              <div className="mb-4">
                <label className="block text-slate-400 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-2xl focus:outline-none"
                    >
                      <FaStar
                        className={star <= rating ? 'text-amber-400' : 'text-slate-700'}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <textarea
                  className="w-full p-3 border border-slate-700 rounded-lg bg-slate-900 text-slate-100 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                  placeholder="Write your review..."
                  rows={4}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                onClick={handleSubmitReview}
                className="bg-gradient-to-r from-emerald-500 to-sky-400 hover:from-emerald-600 hover:to-sky-500 text-white font-semibold rounded-2xl px-6 py-2 transition-all duration-200"
              >
                Submit Review
              </button>
            </form>
          </div>
          {/* Reviews List */}
          <div className="space-y-8">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="border-b border-slate-800 pb-8 mb-8 last:border-b-0 last:mb-0">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 font-medium">
                      {review.user[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-slate-200">{review.user}</p>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span>{review.date || 'June 10, 2024'}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i}
                              className={i < review.rating ? 'text-amber-400' : 'text-slate-700'}
                              size={12}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-slate-300">{review.comment}</p>
                  <div className="flex mt-3 gap-4 text-sm">
                    <button className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors">
                      <FaThumbsUp /> <span>{review.likes || 15}</span>
                    </button>
                    <button className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition-colors">
                      <FaThumbsDown /> <span>{review.dislikes || 2}</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-center py-8">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AppDetails;