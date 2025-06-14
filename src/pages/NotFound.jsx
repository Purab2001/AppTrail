import Button1 from '../components/Button1';

const NAVBAR_HEIGHT = 72; // px, adjust if your navbar is taller

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100" style={{ paddingTop: `${NAVBAR_HEIGHT + 24}px` }}>
      <div className="text-center">
        <h1 className="text-[8rem] md:text-[10rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500 drop-shadow-lg select-none animate-fade-in">
          404
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 font-inter text-slate-100 animate-fade-in delay-100">Page Not Found</h2>
        <p className="mt-4 text-lg text-slate-400 animate-fade-in delay-200">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 animate-fade-in delay-300">
          <Button1 text="Back to Home" to="/" />
        </div>
      </div>
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(.4,0,.2,1) both;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
};

export default NotFound;