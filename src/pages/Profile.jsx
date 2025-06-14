import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const NAVBAR_HEIGHT = 72; // px, adjust if your navbar is taller

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateUserProfile(name, photoURL);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 pb-16" style={{ paddingTop: `${NAVBAR_HEIGHT + 24}px` }}>
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-10 mt-10">
          <h2 className="text-3xl font-extrabold mb-8 font-inter text-emerald-400 text-center">My Profile</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
            <img
              src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}`}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-emerald-400 shadow-lg object-cover"
            />
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold font-inter text-slate-100">{user?.displayName}</h3>
              <p className="text-slate-400">{user?.email}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="block w-full px-4 py-3 border border-slate-700 rounded-lg bg-slate-800 text-slate-100 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">Photo URL</label>
              <input
                type="url"
                placeholder="Enter your photo URL"
                className="block w-full px-4 py-3 border border-slate-700 rounded-lg bg-slate-800 text-slate-100 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 rounded-2xl font-semibold text-lg shadow bg-gradient-to-r from-emerald-500 to-sky-400 hover:from-emerald-600 hover:to-sky-500 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </span>
                ) : (
                  'Update Profile'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;