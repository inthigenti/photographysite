export function SaveToggle({ value, onChange, label }) {
  return (
    <button
      type="button"
      aria-pressed={value}
      aria-label={`Save ${label}`}
      onClick={() => onChange(!value)}
      className={`text-sm transition-colors ${value ? "text-text" : "text-muted hover:text-text"}`}
    >
      {value ? "♥ Saved" : "♡ Save"}
    </button>
  );
}
