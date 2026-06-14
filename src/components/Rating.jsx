import { FiStar } from "react-icons/fi";

export function StarRating({ value = 0, size = 12, showValue = true }) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <FiStar
            key={i}
            size={size}
            className={i <= Math.round(value) ? "fill-[#FF4A1C] text-[#FF4A1C]" : "text-[#E5E5E0]"}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-[11px] font-mono text-[#6B6B6B]">{value?.toFixed(1)}</span>
      )}
    </div>
  );
}

export function StarRow({ value = 0, total = 5, size = 14, color = "#FF4A1C", emptyColor = "#E5E5E0" }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <FiStar
          key={i}
          size={size}
          style={{
            color: i < value ? color : emptyColor,
            fill: i < value ? color : "transparent",
          }}
        />
      ))}
    </div>
  );
}

export function StarPicker({ value, onChange, size = 22 }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          className="p-0.5 transition-transform hover:scale-110"
          aria-label={`Rate ${i} stars`}
        >
          <FiStar
            size={size}
            style={{
              color: i <= value ? "#FF4A1C" : "#E5E5E0",
              fill: i <= value ? "#FF4A1C" : "transparent",
            }}
          />
        </button>
      ))}
    </div>
  );
}
