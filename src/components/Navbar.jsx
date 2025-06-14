// Navbar with dark color scheme and profile dropdown positioned lower
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { FiLogOut, FiUser, FiSearch, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { useState, useRef } from 'react';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/apps', label: 'Categories' },
  { to: '/featured', label: 'Featured' },
  { to: '/reviews', label: 'Reviews' },
];

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [imgError, setImgError] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Close dropdown on outside click
  const handleDropdownBlur = (e) => {
    if (!dropdownRef.current?.contains(e.relatedTarget)) {
      setDropdownOpen(false);
    }
  };

  const NavItem = ({ to, label, onClick }) => (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `relative px-5 py-2.5 mx-1 rounded-2xl font-semibold text-base tracking-wide transition-all duration-300 ease-out transform
        ${isActive 
          ? 'text-white bg-gradient-to-r from-indigo-700 to-slate-800 shadow-lg shadow-indigo-900 scale-105'
          : 'text-slate-200 hover:text-emerald-400 hover:bg-slate-800 hover:shadow-md hover:scale-105 active:scale-95'
        }`
      }
      style={{ letterSpacing: '0.02em' }}
    >
      <span className="relative z-10">{label}</span>
    </NavLink>
  );

  return (
    <nav className="w-full fixed z-30 bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 shadow-2xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Left: Logo/Brand */}
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-slate-800 transition-colors duration-200"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
          <NavLink to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <img src="/app-trail-logo.png" alt="AppTrail Logo" className="w-9 h-9 rounded-xl shadow-md" />
            <span className="text-2xl md:text-2xl font-extrabold tracking-tight text-emerald-400 select-none">AppTrail</span>
          </NavLink>
        </div>

        {/* Center: Desktop Nav */}
        <div className="hidden lg:flex gap-3 ml-10">
          {NAV_LINKS.map((link) => (
            <NavItem key={link.to} to={link.to} label={link.label} />
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-xl hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            aria-label="Search"
            tabIndex={0}
          >
            <FiSearch size={22} className="text-slate-200" />
          </button>
          {!user && (
            <button
              onClick={() => navigate('/login')}
              className="px-5 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-sky-400 hover:from-emerald-600 hover:to-sky-500 text-white font-semibold shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              Get Started
            </button>
          )}
          {user && (
            <div className="flex items-center gap-3 relative" ref={dropdownRef}>
              <button
                className="relative group focus:outline-none"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen((open) => !open)}
                onBlur={handleDropdownBlur}
                tabIndex={0}
              >
                {!imgError && user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-slate-700 shadow"
                    onError={() => setImgError(true)}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center text-white font-bold text-lg shadow">
                    {user.displayName ? user.displayName[0].toUpperCase() : <FiUser size={22} />}
                  </div>
                )}
                <FiChevronDown className="absolute -right-2 -bottom-2 text-slate-400 group-hover:text-emerald-400 transition" size={18} />
              </button>
              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-44 w-44 bg-slate-900 border border-slate-800 rounded-xl shadow-lg py-2 z-50 animate-fade-in"
                  tabIndex={-1}
                  onMouseDown={e => e.preventDefault()}
                >
                  <button
                    className="w-full text-left px-4 py-2 text-slate-100 hover:bg-slate-800 hover:text-emerald-400 transition rounded-xl"
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate('/profile');
                    }}
                  >
                    <FiUser className="inline mr-2" /> Profile
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-slate-100 hover:bg-slate-800 hover:text-emerald-400 transition rounded-xl"
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout();
                    }}
                  >
                    <FiLogOut className="inline mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ease-in-out
        ${mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'}
        `}
        aria-hidden={!mobileOpen}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileOpen(false)}
        />
        {/* Drawer */}
        <aside
          className={`absolute top-0 right-0 h-full w-72 max-w-full bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 shadow-2xl border-l border-slate-800
          transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
          flex flex-col rounded-l-3xl`}
          role="menu"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
            <NavLink to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
              <img src="/app-trail-logo.png" alt="AppTrail Logo" className="w-8 h-8 rounded-xl shadow" />
              <span className="text-xl font-bold tracking-tight text-emerald-400">AppTrail</span>
            </NavLink>
            <button
              className="p-2 rounded-xl hover:bg-slate-800 transition-colors duration-200"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <FiX size={26} />
            </button>
          </div>
          <nav className="flex flex-col gap-2 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <NavItem
                key={link.to}
                to={link.to}
                label={link.label}
                onClick={() => setMobileOpen(false)}
              />
            ))}
          </nav>
          <div className="mt-auto px-6 py-4 border-t border-slate-700 flex flex-col gap-3">
            {!user && (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  navigate('/login');
                }}
                className="w-full px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-sky-400 hover:from-emerald-600 hover:to-sky-500 text-white font-semibold shadow-md transition-all duration-200"
              >
                Get Started
              </button>
            )}
            {user && (
              <div className="flex items-center gap-3">
                {!imgError && user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-slate-700 shadow"
                    onError={() => setImgError(true)}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center text-white font-bold text-lg shadow">
                    {user.displayName ? user.displayName[0].toUpperCase() : <FiUser size={22} />}
                  </div>
                )}
                <span className="text-slate-100 font-medium">{user.displayName || 'User'}</span>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="p-2 rounded-xl hover:bg-slate-800 transition-colors duration-200"
                  aria-label="Logout"
                >
                  <FiLogOut size={22} className="text-slate-200" />
                </button>
              </div>
            )}
          </div>
        </aside>
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
    </nav>
  );
};

export default Navbar;