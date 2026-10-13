const stars = [1, 2, 3, 4, 5];

export function StarRating({ value, onChange, label }) {
  return (
    <div role="group" aria-label={`Rate ${label}`} className="flex gap-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          aria-label={`${star} out of 5`}
          aria-pressed={value === star}
          onClick={() => onChange(star === value ? 0 : star)}
          className={`cursor-pointer transition-opacity ${star <= value ? "opacity-100" : "opacity-40 hover:opacity-100"}`}
        >
          <img
            src={star <= value ? "/icons/star-fill.svg" : "/icons/star.svg"}
            alt=""
            className="size-6"
          />
        </button>
      ))}
    </div>
  );
}
