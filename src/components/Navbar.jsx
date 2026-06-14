import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import {
  FiSearch,
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiCommand,
} from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import SearchPalette from "./SearchPalette";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/apps", label: "Categories" },
  { to: "/featured", label: "Featured" },
  { to: "/reviews", label: "Reviews" },
];

function Wordmark() {
  return (
    <NavLink to="/" className="group flex items-center gap-2.5">
      <span className="relative w-8 h-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
        <span className="absolute inset-[3px] rounded-md bg-[#FF4A1C] origin-bottom-left transition-transform duration-500 group-hover:rotate-12" />
        <span className="relative font-display text-white text-[15px] font-semibold leading-none">
          a
        </span>
      </span>
      <span className="font-display text-[22px] font-semibold tracking-tight text-[#0A0A0A]">
        AppTrail
      </span>
    </NavLink>
  );
}

function NavItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `relative px-3.5 py-2 text-[14px] font-medium tracking-tight transition-colors duration-300 ${
          isActive ? "text-[#0A0A0A]" : "text-[#6B6B6B] hover:text-[#0A0A0A]"
        }`
      }
    >
      {({ isActive }) => (
        <span className="relative inline-flex flex-col items-center">
          <span>{label}</span>
          <motion.span
            initial={false}
            animate={{ scaleX: isActive ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-1 left-0 right-0 h-px bg-[#FF4A1C] origin-left"
          />
        </span>
      )}
    </NavLink>
  );
}

export default function Navbar() {
  const { user, logOut } = useAuth();
  const [imgError, setImgError] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  const handleLogout = async () => {
    try {
      await logOut();
      setProfileOpen(false);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className={`mx-auto transition-all duration-500 ${
            scrolled
              ? "max-w-6xl mt-3 sm:mt-4 px-3"
              : "max-w-7xl mt-0 sm:mt-0 px-0"
          }`}
        >
          <div
            className={`flex items-center justify-between gap-3 px-4 sm:px-5 transition-all duration-500 ${
              scrolled
                ? "h-14 rounded-2xl bg-white/75 backdrop-blur-xl border border-[#E5E5E0] shadow-[0_2px_24px_-12px_rgba(10,10,10,0.18)]"
                : "h-16 sm:h-[72px] bg-[#FAFAF7] border-b border-transparent"
            }`}
          >
            <div className="flex items-center gap-6">
              <button
                className="lg:hidden p-2 -ml-1 rounded-lg hover:bg-[#F1EFE8] transition-colors"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
              <Wordmark />
            </div>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((l) => (
                <NavItem key={l.to} to={l.to} label={l.label} />
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 h-9 pl-3 pr-2 rounded-full border border-[#E5E5E0] bg-white/60 hover:bg-white hover:border-[#0A0A0A]/20 text-[#6B6B6B] hover:text-[#0A0A0A] transition-all duration-300"
                aria-label="Search"
              >
                <FiSearch size={14} />
                <span className="text-[12px] font-medium">Search</span>
                <span className="inline-flex items-center gap-0.5 ml-1 px-1.5 h-5 rounded border border-[#E5E5E0] bg-[#FAFAF7] font-mono text-[10px] text-[#6B6B6B]">
                  <FiCommand size={9} />K
                </span>
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                className="sm:hidden p-2 rounded-lg hover:bg-[#F1EFE8]"
                aria-label="Search"
              >
                <FiSearch size={18} />
              </button>

              {!user && (
                <button
                  onClick={() => navigate("/login")}
                  className="hidden sm:inline-flex items-center h-9 px-4 rounded-full bg-[#0A0A0A] text-white text-[13px] font-medium hover:bg-[#1F3D2B] transition-colors duration-300"
                >
                  Get Started
                </button>
              )}

              {user && (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen((v) => !v)}
                    className="flex items-center gap-2 pl-1 pr-2 h-9 rounded-full border border-[#E5E5E0] bg-white hover:border-[#0A0A0A]/30 transition-all"
                    aria-haspopup="true"
                    aria-expanded={profileOpen}
                  >
                    {user.photoURL && !imgError ? (
                      <img
                        src={user.photoURL}
                        alt=""
                        referrerPolicy="no-referrer"
                        onError={() => setImgError(true)}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    ) : (
                      <span className="w-7 h-7 rounded-full bg-[#1F3D2B] text-white flex items-center justify-center text-[12px] font-semibold">
                        {user.displayName?.[0]?.toUpperCase() || <FiUser size={12} />}
                      </span>
                    )}
                    <span className="hidden md:inline text-[12px] font-medium text-[#0A0A0A] max-w-[120px] truncate">
                      {user.displayName?.split(" ")[0] || "Account"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {profileOpen && (
                      <>
                        <button
                          aria-label="Close menu"
                          className="fixed inset-0 z-40 cursor-default"
                          onClick={() => setProfileOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute right-0 mt-2 w-60 rounded-2xl bg-white border border-[#E5E5E0] shadow-2xl overflow-hidden z-50"
                        >
                          <div className="px-4 py-3 border-b border-[#E5E5E0]">
                            <p className="text-[13px] font-medium text-[#0A0A0A] truncate">
                              {user.displayName || "Welcome"}
                            </p>
                            <p className="text-[11px] text-[#6B6B6B] truncate">{user.email}</p>
                          </div>
                          <div className="p-1.5">
                            <button
                              onClick={() => {
                                setProfileOpen(false);
                                navigate("/profile");
                              }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-[#0A0A0A] hover:bg-[#FAFAF7] transition-colors"
                            >
                              <FiUser size={14} /> Profile
                            </button>
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-[#FF4A1C] hover:bg-[#FFF1EC] transition-colors"
                            >
                              <FiLogOut size={14} /> Sign out
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-40 bg-[#FAFAF7]"
          >
            <div className="h-16" />
            <motion.div
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.4 }}
              className="px-6 pt-8 pb-4 flex items-center justify-between"
            >
              <Wordmark />
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 -mr-1 rounded-lg hover:bg-[#F1EFE8]"
                aria-label="Close"
              >
                <FiX size={22} />
              </button>
            </motion.div>
            <nav className="px-6 pt-8 flex flex-col gap-1">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block py-4 text-3xl font-display tracking-tight border-b border-[#E5E5E0] ${
                        isActive ? "text-[#FF4A1C]" : "text-[#0A0A0A]"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="absolute bottom-0 inset-x-0 p-6"
            >
              {!user ? (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/login");
                  }}
                  className="w-full h-12 rounded-full bg-[#0A0A0A] text-white text-[14px] font-medium"
                >
                  Get Started
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full h-12 rounded-full border border-[#0A0A0A] text-[#0A0A0A] text-[14px] font-medium"
                >
                  Sign out
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
