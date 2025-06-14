import React, { useState } from 'react';
import { Link } from 'react-router';
import { FiTwitter, FiInstagram, FiFacebook } from 'react-icons/fi';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    // Simple email validation
    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setError('Please enter a valid email address.');
      setSubmitted(false);
      return;
    }
    setError('');
    setSubmitted(true);
    setEmail('');
    // Here you would integrate with your newsletter backend
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 pt-16 pb-8 shadow-2xl mt-20">
      {/* Top SVG wave */}
      <svg
        className="absolute top-0 w-full h-8 -mt-6 text-slate-900"
        preserveAspectRatio="none"
        viewBox="0 0 1440 54"
      >
        <path
          fill="currentColor"
          d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
        />
      </svg>
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-700">
          {/* Brand & Newsletter */}
          <div className="md:col-span-2 flex flex-col gap-8">
            <div>
              <Link to="/" aria-label="Go home" title="AppTrail" className="inline-flex items-center gap-2">
                <img src="/app-trail-logo.png" alt="AppTrail Logo" className="w-12 h-12 rounded-xl shadow-lg" />
                <span className="text-2xl font-extrabold tracking-tight text-emerald-400">AppTrail</span>
              </Link>
              <p className="mt-4 text-base text-slate-300 leading-relaxed">
                Discover, install, and review the best apps tailored to your interests. Your one-stop destination for all your app needs.
              </p>
            </div>
            {/* Newsletter Signup */}
            <form
              className="mt-2 flex flex-col sm:flex-row items-start sm:items-end gap-3"
              onSubmit={handleNewsletter}
              autoComplete="off"
            >
              <label htmlFor="newsletter" className="text-sm font-semibold text-slate-200">
                Subscribe to our newsletter
              </label>
              <div className="flex gap-2 w-full">
                <input
                  id="newsletter"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-xl bg-slate-800 text-slate-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200 placeholder:text-slate-400"
                  required
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-400 hover:from-emerald-600 hover:to-sky-500 text-white font-semibold shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  Subscribe
                </button>
              </div>
              {error && <span className="text-rose-400 text-xs mt-1">{error}</span>}
              {submitted && !error && (
                <span className="text-emerald-400 text-xs mt-1 animate-fade-in">Thank you for subscribing!</span>
              )}
            </form>
          </div>
          {/* Navigation Links */}
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <p className="font-bold tracking-wide text-sky-300 mb-3 uppercase text-sm">Services</p>
              <ul className="space-y-2">
                <li>
                  <Link to="/services/branding" className="footer-link">Branding</Link>
                </li>
                <li>
                  <Link to="/services/design" className="footer-link">Design</Link>
                </li>
                <li>
                  <Link to="/services/marketing" className="footer-link">Marketing</Link>
                </li>
                <li>
                  <Link to="/services/advertisement" className="footer-link">Advertisement</Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-bold tracking-wide text-sky-300 mb-3 uppercase text-sm">Company</p>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="footer-link">About us</Link>
                </li>
                <li>
                  <Link to="/contact" className="footer-link">Contact</Link>
                </li>
                <li>
                  <Link to="/careers" className="footer-link">Jobs</Link>
                </li>
                <li>
                  <Link to="/press" className="footer-link">Press kit</Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-bold tracking-wide text-sky-300 mb-3 uppercase text-sm">Categories</p>
              <ul className="space-y-2">
                <li>
                  <Link to="/apps/education" className="footer-link">Education</Link>
                </li>
                <li>
                  <Link to="/apps/productivity" className="footer-link">Productivity</Link>
                </li>
                <li>
                  <Link to="/apps/gaming" className="footer-link">Gaming</Link>
                </li>
                <li>
                  <Link to="/apps/utilities" className="footer-link">Utilities</Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-bold tracking-wide text-sky-300 mb-3 uppercase text-sm">Legal</p>
              <ul className="space-y-2">
                <li>
                  <Link to="/terms" className="footer-link">Terms of use</Link>
                </li>
                <li>
                  <Link to="/privacy" className="footer-link">Privacy policy</Link>
                </li>
                <li>
                  <Link to="/cookies" className="footer-link">Cookie policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8">
          <p className="text-sm text-slate-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} AppTrail Industries Ltd. All rights reserved.
          </p>
          <div className="flex items-center space-x-5">
            <a
              href="https://twitter.com"
              className="footer-social"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FiTwitter size={22} />
            </a>
            <a
              href="https://instagram.com"
              className="footer-social"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FiInstagram size={22} />
            </a>
            <a
              href="https://facebook.com"
              className="footer-social"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FiFacebook size={22} />
            </a>
          </div>
        </div>
      </div>
      {/* Footer link and social icon styles */}
      <style>{`
        .footer-link {
          color: #e2e8f0;
          transition: color 0.2s, transform 0.2s;
          text-decoration: none;
          font-weight: 500;
          border-radius: 0.5rem;
          padding: 0.25rem 0.5rem;
          display: inline-block;
        }
        .footer-link:hover, .footer-link:focus {
          color: #38bdf8;
          background: rgba(56,189,248,0.08);
          transform: scale(1.06);
          outline: none;
        }
        .footer-social {
          color: #e2e8f0;
          transition: color 0.2s, transform 0.2s, box-shadow 0.2s;
          border-radius: 9999px;
          padding: 0.5rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .footer-social:hover, .footer-social:focus {
          color: #10b981;
          background: rgba(16,185,129,0.08);
          transform: scale(1.15);
          box-shadow: 0 2px 12px 0 rgba(16,185,129,0.15);
          outline: none;
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </footer>
  );
};

export default Footer;