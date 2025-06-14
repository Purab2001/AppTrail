import React from 'react';

const NAVBAR_HEIGHT = 72;

const Loading = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 to-slate-800" style={{ paddingTop: `${NAVBAR_HEIGHT + 24}px` }}>
      <div className="flex flex-col items-center gap-6">
        <svg className="animate-spin h-16 w-16 text-emerald-400 drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" aria-label="Loading">
          <circle className="opacity-25" cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="6" />
          <path className="opacity-75" fill="currentColor" d="M44 24c0-11.046-8.954-20-20-20v6c7.732 0 14 6.268 14 14h6z" />
        </svg>
        <span className="text-lg font-semibold text-slate-200 animate-fade-in">Loading...</span>
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
    </div>
  );
};

export default Loading;