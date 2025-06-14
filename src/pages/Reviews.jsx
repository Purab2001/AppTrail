// Comprehensive Reviews page with error handling for missing loader data
import { useState, useMemo } from 'react';
import { useLoaderData } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { FaStar, FaUser, FaThumbsUp, FaThumbsDown, FaSearch } from 'react-icons/fa';

const NAVBAR_HEIGHT = 72; // px, adjust if your navbar is taller
const REVIEWS_PER_PAGE = 6;

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'highest', label: 'Highest Rated' },
  { value: 'lowest', label: 'Lowest Rated' },
  { value: 'mostHelpful', label: 'Most Helpful' },
];

const Reviews = () => {
  let appsData = useLoaderData();
  const { user } = useAuth();

  // Defensive: fallback to empty array if loader data is undefined/null
  if (!Array.isArray(appsData)) appsData = [];

  // Flatten all reviews from all apps, add app info for context
  const allReviews = useMemo(() =>
    appsData.flatMap(app =>
      (app.reviews || []).map(review => ({
        ...review,
        appName: app.name,
        appId: app.id,
        appThumbnail: app.thumbnail,
      }))
    ), [appsData]
  );

  // Stats
  const stats = useMemo(() => {
    const total = allReviews.length;
    const avg = total ? (allReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / total).toFixed(1) : 0;
    const five = allReviews.filter(r => r.rating === 5).length;
    const four = allReviews.filter(r => r.rating === 4).length;
    const three = allReviews.filter(r => r.rating === 3).length;
    const two = allReviews.filter(r => r.rating === 2).length;
    const one = allReviews.filter(r => r.rating === 1).length;
    return { total, avg, five, four, three, two, one };
  }, [allReviews]);

  // State
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [filterRating, setFilterRating] = useState(0);
  const [page, setPage] = useState(1);
  const [voteState, setVoteState] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ appId: '', rating: 5, comment: '' });
  const [formError, setFormError] = useState('');

  // Filtering, sorting, searching
  const filtered = useMemo(() => {
    let reviews = allReviews;
    if (filterRating) reviews = reviews.filter(r => r.rating === filterRating);
    if (search) reviews = reviews.filter(r =>
      r.comment.toLowerCase().includes(search.toLowerCase()) ||
      r.user?.toLowerCase().includes(search.toLowerCase()) ||
      r.appName?.toLowerCase().includes(search.toLowerCase())
    );
    switch (sort) {
      case 'newest': reviews = reviews.slice().sort((a, b) => new Date(b.date) - new Date(a.date)); break;
      case 'oldest': reviews = reviews.slice().sort((a, b) => new Date(a.date) - new Date(b.date)); break;
      case 'highest': reviews = reviews.slice().sort((a, b) => b.rating - a.rating); break;
      case 'lowest': reviews = reviews.slice().sort((a, b) => a.rating - b.rating); break;
      case 'mostHelpful': reviews = reviews.slice().sort((a, b) => ((b.likes || 0) - (b.dislikes || 0)) - ((a.likes || 0) - (a.dislikes || 0))); break;
      default: break;
    }
    return reviews;
  }, [allReviews, filterRating, search, sort]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / REVIEWS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * REVIEWS_PER_PAGE, page * REVIEWS_PER_PAGE);

  // Voting
  const handleVote = (idx, type) => {
    setVoteState(prev => ({
      ...prev,
      [idx]: {
        up: type === 'up' ? !prev[idx]?.up : prev[idx]?.up,
        down: type === 'down' ? !prev[idx]?.down : prev[idx]?.down,
      }
    }));
  };

  // Review submission
  const handleFormChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    if (!user) {
      setFormError('You must be logged in to submit a review.');
      return;
    }
    if (!form.appId || !form.comment.trim()) {
      setFormError('Please select an app and enter your review.');
      return;
    }
    setFormError('');
    setShowForm(false);
    setForm({ appId: '', rating: 5, comment: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 pb-16" style={{ paddingTop: `${NAVBAR_HEIGHT + 24}px` }}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 font-inter text-emerald-400 text-center">User Reviews</h1>
        {/* Stats Summary */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="text-5xl font-bold text-amber-400">{stats.avg}</div>
            <div>
              <div className="flex gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className={i < Math.round(stats.avg) ? 'text-amber-400' : 'text-slate-700'} />
                ))}
              </div>
              <div className="text-slate-400 text-sm">{stats.total} reviews</div>
            </div>
          </div>
          <div className="flex gap-2 text-xs md:text-sm">
            {[5, 4, 3, 2, 1].map(r => (
              <div key={r} className="flex items-center gap-1">
                <button
                  className={`px-2 py-1 rounded-lg ${filterRating === r ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-emerald-500 hover:text-white'} transition`}
                  onClick={() => setFilterRating(filterRating === r ? 0 : r)}
                >
                  {r} <FaStar className="inline text-amber-400" />
                </button>
                <span className="text-slate-400">{stats[['zero', 'one', 'two', 'three', 'four', 'five'][r]] || stats[`${['zero', 'one', 'two', 'three', 'four', 'five'][r]}`] || stats[`${r}`]}</span>
              </div>
            ))}
            <button
              className={`px-2 py-1 rounded-lg ${filterRating === 0 ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-emerald-500 hover:text-white'} transition`}
              onClick={() => setFilterRating(0)}
            >
              All
            </button>
          </div>
          <button
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-400 hover:from-emerald-600 hover:to-sky-500 text-white font-semibold shadow-md transition-all duration-200"
            onClick={() => setShowForm(true)}
          >
            Write a Review
          </button>
        </div>
        {/* Filter, Sort, Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex gap-2 items-center">
            <label className="text-slate-400 text-sm">Sort by:</label>
            <select
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-emerald-400"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="relative w-full md:w-72">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:ring-2 focus:ring-emerald-400"
              placeholder="Search reviews..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {paginated.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-32">
              <p className="text-slate-400 text-lg">No reviews found.</p>
            </div>
          ) : paginated.map((review, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8 flex flex-col gap-4 hover:shadow-emerald-500/20 transition-all duration-300">
              <div className="flex items-center gap-4">
                <img
                  src={review.userPhoto || review.appThumbnail || `https://ui-avatars.com/api/?name=${review.user}`}
                  alt={review.user}
                  className="w-12 h-12 rounded-full border-2 border-emerald-400 object-cover"
                />
                <div>
                  <div className="font-bold text-slate-100">{review.user}</div>
                  <div className="text-xs text-slate-400">{review.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className={i < review.rating ? 'text-amber-400' : 'text-slate-700'} />
                ))}
                <span className="ml-2 text-xs text-slate-400">for <span className="font-semibold text-emerald-400">{review.appName}</span></span>
              </div>
              <p className="text-slate-300">{review.comment}</p>
              <div className="flex gap-4 mt-2">
                <button
                  className={`flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors ${voteState[idx]?.up ? 'text-emerald-400' : ''}`}
                  onClick={() => handleVote(idx, 'up')}
                  aria-label="Mark as helpful"
                >
                  <FaThumbsUp /> <span>{review.likes || 0}</span>
                </button>
                <button
                  className={`flex items-center gap-1 text-slate-400 hover:text-rose-400 transition-colors ${voteState[idx]?.down ? 'text-rose-400' : ''}`}
                  onClick={() => handleVote(idx, 'down')}
                  aria-label="Mark as unhelpful"
                >
                  <FaThumbsDown /> <span>{review.dislikes || 0}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`px-4 py-2 rounded-lg font-semibold ${page === i + 1 ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-emerald-500 hover:text-white'} transition`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
        {/* Review Submission Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <form
              className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-6"
              onSubmit={handleFormSubmit}
            >
              <h2 className="text-2xl font-bold text-emerald-400 mb-2">Write a Review</h2>
              {formError && <div className="text-rose-400 text-sm">{formError}</div>}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">App</label>
                <select
                  name="appId"
                  className="w-full px-4 py-3 border border-slate-700 rounded-lg bg-slate-800 text-slate-100 focus:ring-2 focus:ring-emerald-400"
                  value={form.appId}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Select an app</option>
                  {appsData.map(app => (
                    <option key={app.id} value={app.id}>{app.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className={`text-2xl focus:outline-none ${form.rating >= star ? 'text-amber-400' : 'text-slate-700'}`}
                      onClick={() => setForm(f => ({ ...f, rating: star }))}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">Review</label>
                <textarea
                  name="comment"
                  className="w-full p-3 border border-slate-700 rounded-lg bg-slate-800 text-slate-100 focus:ring-2 focus:ring-emerald-400"
                  placeholder="Write your review..."
                  rows={4}
                  value={form.comment}
                  onChange={handleFormChange}
                  required
                  minLength={10}
                  maxLength={500}
                ></textarea>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-slate-700 text-slate-200 hover:bg-slate-800 transition"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-400 hover:from-emerald-600 hover:to-sky-500 text-white font-semibold shadow-md transition-all duration-200"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;