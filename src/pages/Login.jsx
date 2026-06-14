import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowUpRight,
  FiArrowLeft,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Eyebrow } from "../components/Section";

function Field({ id, label, type = "text", value, onChange, icon, rightSlot, required, placeholder, pattern, title, autoComplete }) {
  const Icon = icon;
  return (
    <div>
      <label htmlFor={id} className="block text-[12px] font-mono tracking-widest uppercase text-[#6B6B6B]">
        {label}
      </label>
      <div className="mt-2 relative flex items-center">
        {Icon && (
          <Icon
            size={14}
            className="absolute left-4 text-[#9A9A95] pointer-events-none"
          />
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          pattern={pattern}
          title={title}
          autoComplete={autoComplete}
          className="w-full h-12 pl-10 pr-12 rounded-full bg-white border border-[#E5E5E0] text-[14.5px] text-[#0A0A0A] placeholder:text-[#9A9A95] outline-none focus:border-[#0A0A0A] transition-colors"
        />
        {rightSlot && <div className="absolute right-3">{rightSlot}</div>}
      </div>
    </div>
  );
}

function EditorialPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between bg-[#0A0A0A] text-[#FAFAF7] noise p-12 relative overflow-hidden">
      <Link to="/" className="relative z-10 inline-flex items-center gap-2.5">
        <span className="relative w-8 h-8 rounded-lg bg-[#FAFAF7] flex items-center justify-center">
          <span className="absolute inset-[3px] rounded-md bg-[#FF4A1C]" />
          <span className="relative font-display text-[#0A0A0A] text-[15px] font-semibold leading-none">
            a
          </span>
        </span>
        <span className="font-display text-[22px] font-semibold tracking-tight">
          AppTrail
        </span>
      </Link>

      <div className="relative z-10 max-w-md">
        <Eyebrow className="text-white/50">— Issue 01 / Sign in</Eyebrow>
        <h2 className="mt-5 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.02em]">
          Welcome
          <br />
          <span className="italic text-[#FF4A1C]">back.</span>
        </h2>
        <p className="mt-6 text-[14.5px] text-white/70 leading-relaxed max-w-sm">
          Pick up where you left off — your shelf, your reviews, your saved apps. Sign in to keep
          the thread going.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-3 gap-6 max-w-sm">
        {[
          { n: "12", l: "Saved apps" },
          { n: "04", l: "Reviews" },
          { n: "01", l: "Lists" },
        ].map((s) => (
          <div key={s.l}>
            <p className="font-display text-3xl tracking-tight">{s.n}</p>
            <p className="mt-1 font-mono text-[10px] tracking-widest uppercase text-white/50">
              {s.l}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const { login, googleLogin, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password);
      navigate(from, { replace: true });
    } catch {
      /* toast handled in context */
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
      await googleLogin();
      navigate(from, { replace: true });
    } catch {
      /* toast handled in context */
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    try {
      setForgotLoading(true);
      await resetPassword(forgotEmail);
      setForgotSent(true);
    } catch {
      /* toast handled in context */
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#FAFAF7]">
      <EditorialPanel />

      <div className="flex items-center justify-center px-6 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          {forgotMode ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setForgotMode(false);
                  setForgotSent(false);
                }}
                className="inline-flex items-center gap-1.5 text-[12px] font-mono tracking-widest uppercase text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors"
              >
                <FiArrowLeft size={12} /> Back to sign in
              </button>
              <Eyebrow>— Reset</Eyebrow>
              <h1 className="mt-3 font-display text-4xl sm:text-5xl leading-[1] tracking-tight">
                Forgot your <span className="italic text-[#FF4A1C]">password?</span>
              </h1>
              <p className="mt-3 text-[14px] text-[#6B6B6B]">
                Enter your email and we'll send you a reset link.
              </p>
              {forgotSent ? (
                <div className="mt-8 p-5 rounded-2xl border border-[#1F3D2B] bg-[#1F3D2B]/5">
                  <p className="font-display text-xl tracking-tight text-[#1F3D2B]">
                    Check your inbox.
                  </p>
                  <p className="mt-1 text-[13px] text-[#6B6B6B]">
                    We sent a reset link to <span className="text-[#0A0A0A]">{forgotEmail}</span>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleForgot} className="mt-8 space-y-5">
                  <Field
                    id="reset-email"
                    label="Email"
                    type="email"
                    icon={FiMail}
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full h-12 rounded-full bg-[#FF4A1C] text-white text-[14px] font-medium hover:bg-[#0A0A0A] transition-colors disabled:opacity-60"
                  >
                    {forgotLoading ? "Sending…" : "Send reset link"}
                  </button>
                </form>
              )}
            </>
          ) : (
            <>
              <Eyebrow>— Sign in</Eyebrow>
              <h1 className="mt-3 font-display text-4xl sm:text-5xl leading-[1] tracking-tight">
                Welcome <span className="italic text-[#FF4A1C]">back.</span>
              </h1>
              <p className="mt-3 text-[14px] text-[#6B6B6B]">
                New here?{" "}
                <Link to="/register" className="text-[#0A0A0A] link-underline">
                  Create an account
                </Link>
                .
              </p>

              <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  icon={FiMail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                <Field
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  icon={FiLock}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  autoComplete="current-password"
                  rightSlot={
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="p-2 text-[#9A9A95] hover:text-[#0A0A0A]"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                    </button>
                  }
                />

                <div className="flex items-center justify-between text-[12.5px]">
                  <label className="flex items-center gap-2 text-[#6B6B6B] cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-[#E5E5E0] text-[#FF4A1C] focus:ring-[#FF4A1C]"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotMode(true)}
                    className="text-[#0A0A0A] link-underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-full bg-[#FF4A1C] text-white text-[14px] font-medium hover:bg-[#0A0A0A] transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2"
                >
                  {loading ? "Signing in…" : "Sign in"}
                  {!loading && <FiArrowUpRight size={14} />}
                </button>
              </form>

              <div className="mt-8 flex items-center gap-3">
                <div className="flex-1 h-px bg-[#E5E5E0]" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#6B6B6B]">
                  or
                </span>
                <div className="flex-1 h-px bg-[#E5E5E0]" />
              </div>

              <button
                type="button"
                onClick={handleGoogle}
                disabled={loading}
                className="mt-5 w-full h-12 rounded-full bg-white border border-[#0A0A0A] text-[#0A0A0A] text-[14px] font-medium hover:bg-[#0A0A0A] hover:text-white transition-colors inline-flex items-center justify-center gap-2"
              >
                <FcGoogle size={18} /> Continue with Google
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
