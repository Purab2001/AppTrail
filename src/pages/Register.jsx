import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FaLock, FaEnvelope, FaUser, FaImage, FaEye, FaEyeSlash } from 'react-icons/fa';

const NAVBAR_HEIGHT = 72;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await register(email, password, name, photoURL);
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await googleLogin();
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen pb-6 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100" style={{ paddingTop: `${NAVBAR_HEIGHT + 24}px` }}>
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-emerald-400">Create Account</h1>
          <p className="mt-2 text-sm text-slate-400">Join AppTrail to discover amazing apps</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-200">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="pl-10 block w-full px-4 py-3 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-slate-800 text-slate-100"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-200">
                Email Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 block w-full px-4 py-3 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-slate-800 text-slate-100"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="photoURL" className="block text-sm font-medium text-slate-200">
                Profile Picture URL (Optional)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaImage className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="photoURL"
                  type="url"
                  placeholder="https://example.com/your-photo.jpg"
                  className="pl-10 block w-full px-4 py-3 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-slate-800 text-slate-100"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-200">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 block w-full px-4 py-3 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-slate-800 text-slate-100"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  pattern="^(?=.*[a-z])(?=.*[A-Z]).{6,}$"
                  title="Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-slate-400 hover:text-slate-200" />
                  ) : (
                    <FaEye className="h-5 w-5 text-slate-400 hover:text-slate-200" />
                  )}
                </div>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Password must be at least 6 characters with uppercase and lowercase letters
              </p>
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-emerald-500 to-sky-400 hover:from-emerald-600 hover:to-sky-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200 cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900 text-slate-400">Or continue with</span>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 border border-slate-700 rounded-xl shadow-sm text-sm font-semibold text-slate-100 bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200 cursor-pointer"
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-emerald-400 hover:text-emerald-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;