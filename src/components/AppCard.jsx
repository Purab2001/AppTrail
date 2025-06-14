import React from 'react';
import { Link } from 'react-router';
import { FaStar, FaDownload } from 'react-icons/fa';

const AppCard = ({ app }) => {
  return (
    <div
      className="flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-emerald-500/20 hover:scale-105 transition-all duration-300 focus-within:ring-2 focus-within:ring-emerald-400"
      tabIndex={0}
      aria-label={`View details for ${app.name}`}
    >
      <Link to={`/apps/${app.id}`} tabIndex={-1} aria-label={app.name}>
        <img
          className="w-full h-48 object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
          src={app.thumbnail}
          alt={app.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
          }}
        />
      </Link>
      <div className="flex-1 flex flex-col p-6 gap-3">
        <Link to={`/apps/${app.id}`}>
          <h3 className="mb-1 text-xl font-bold font-inter text-slate-100 truncate hover:text-emerald-400 transition-colors duration-200">
            {app.name}
          </h3>
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
            <FaStar aria-label="Rating" /> {app.rating}
          </span>
          <span className="text-slate-500">•</span>
          <span className="inline-flex items-center gap-1 text-sky-400 font-semibold">
            <FaDownload aria-label="Downloads" /> {app.downloads.toLocaleString()}
          </span>
        </div>
        <p className="text-slate-400 text-sm mb-4 line-clamp-3">{app.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            {app.category || 'App'}
          </span>
          <Link
            to={`/apps/${app.id}`}
            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-sky-400 rounded-xl shadow hover:from-emerald-600 hover:to-sky-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200"
            aria-label={`View details for ${app.name}`}
          >
            View Details
            <svg className="w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppCard;