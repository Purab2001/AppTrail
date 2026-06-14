import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiUser,
  FiImage,
  FiEye,
  FiEyeOff,
  FiArrowUpRight,
  FiCheck,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Eyebrow } from "../components/Section";

const PERKS = [
  "Save apps to your personal shelf",
  "Write and publish reviews",
  "Get the weekly editorial in your inbox",
  "No tracking, no upsell",
];

function Field({ id, label, type = "text", value, onChange, icon, rightSlot, required, placeholder, pattern, title, autoComplete }) {
  const Icon = icon;
  return (
    <div>
      <label htmlFor={id} className="block text-[12px] font-mono tracking-widest uppercase text-[#6B6B6B]">
        {label}
      </label>
      <div className="mt-2 relative flex items-center">
        {Icon && (
          <Icon size={14} className="absolute left-4 text-[#9A9A95] pointer-events-none" />
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
        <Eyebrow className="text-white/50">— Issue 01 / Membership</Eyebrow>
        <h2 className="mt-5 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.02em]">
          Open a
          <br />
          <span className="italic text-[#FF4A1C]">free account.</span>
        </h2>
        <p className="mt-6 text-[14.5px] text-white/70 leading-relaxed max-w-sm">
          A free account gets you a shelf, a voice, and the Friday dispatch. No card, no
          commitment, no upgrade nags.
        </p>
        <ul className="mt-8 space-y-3">
          {PERKS.map((p) => (
            <li key={p} className="flex items-center gap-3 text-[13.5px] text-white/80">
              <span className="w-6 h-6 rounded-full border border-white/15 flex items-center justify-center text-[#FF4A1C]">
                <FiCheck size={12} />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      <p className="relative z-10 font-mono text-[10px] tracking-widest uppercase text-white/40">
        — By joining, you agree to our terms & privacy.
      </p>
    </div>
  );
}

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await register(form.email, form.password, form.name, form.photoURL);
      navigate("/");
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
      navigate("/");
    } catch {
      /* toast handled in context */
    } finally {
      setLoading(false);
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
          <Eyebrow>— Create account</Eyebrow>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl leading-[1] tracking-tight">
            Join the <span className="italic text-[#FF4A1C]">library.</span>
          </h1>
          <p className="mt-3 text-[14px] text-[#6B6B6B]">
            Already a reader?{" "}
            <Link to="/login" className="text-[#0A0A0A] link-underline">
              Sign in
            </Link>
            .
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <Field
              id="name"
              label="Full name"
              icon={FiUser}
              value={form.name}
              onChange={set("name")}
              required
              placeholder="Ayesha Rahman"
              autoComplete="name"
            />
            <Field
              id="email"
              label="Email"
              type="email"
              icon={FiMail}
              value={form.email}
              onChange={set("email")}
              required
              placeholder="you@example.com"
              autoComplete="email"
            />
            <Field
              id="photoURL"
              label="Profile picture URL (optional)"
              type="url"
              icon={FiImage}
              value={form.photoURL}
              onChange={set("photoURL")}
              placeholder="https://…"
              autoComplete="url"
            />
            <div>
              <Field
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                icon={FiLock}
                value={form.password}
                onChange={set("password")}
                required
                placeholder="At least 6 characters"
                pattern="^(?=.*[a-z])(?=.*[A-Z]).{6,}$"
                title="Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long"
                autoComplete="new-password"
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
              <p className="mt-2 ml-1 text-[11px] font-mono text-[#6B6B6B]">
                Min. 6 chars, one uppercase, one lowercase.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full bg-[#FF4A1C] text-white text-[14px] font-medium hover:bg-[#0A0A0A] transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              {loading ? "Creating account…" : "Create account"}
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
        </motion.div>
      </div>
    </div>
  );
}
