import { Link } from "react-router";
import { FiArrowUpRight } from "react-icons/fi";

const Button1 = ({ text, to = "#", onClick, variant = "solid", className = "" }) => {
  const base =
    "group inline-flex items-center justify-center gap-2 px-5 h-12 rounded-full text-[14px] font-medium tracking-tight transition-all duration-300 will-change-transform";
  const styles =
    variant === "ghost"
      ? "border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#FAFAF7]"
      : "bg-[#FF4A1C] text-white hover:bg-[#0A0A0A] hover:-translate-y-0.5";

  const content = (
    <>
      <span>{text}</span>
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45">
        <FiArrowUpRight size={14} />
      </span>
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={`${base} ${styles} ${className}`}>
        {content}
      </button>
    );
  }
  return (
    <Link to={to} onClick={onClick} className={`${base} ${styles} ${className}`}>
      {content}
    </Link>
  );
};

export default Button1;
