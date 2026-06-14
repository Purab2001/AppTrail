export function Eyebrow({ children, className = "" }) {
  return (
    <p
      className={`font-mono text-[11px] tracking-[0.2em] uppercase text-[#6B6B6B] ${className}`}
    >
      {children}
    </p>
  );
}

export function PageHeader({ eyebrow, title, italic, description, actions, align = "left" }) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {title && (
        <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] tracking-[-0.02em] text-[#0A0A0A]">
          {italic ? (
            <>
              {title} <span className="italic text-[#FF4A1C]">{italic}</span>
            </>
          ) : (
            title
          )}
        </h1>
      )}
      {description && (
        <p className="mt-5 text-[15.5px] leading-relaxed text-[#6B6B6B] max-w-lg">
          {description}
        </p>
      )}
      {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}
