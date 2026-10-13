import { StarRating } from "./StarRating";

export function PhotoModal({
  photo,
  position,
  total,
  rating,
  onRate,
  onPrevious,
  onNext,
  onClose,
}) {
  return (
    <div
      role="dialog"
      aria-label={`${photo.title}, full size`}
      className="fixed inset-0 z-20 flex flex-col bg-bg px-6 py-4"
    >
      <div className="flex items-center justify-between text-sm">
        <p className="text-muted">
          {position} / {total}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="transition-colors hover:text-muted"
        >
          Close
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center py-4">
        <img
          src={photo.image}
          alt={photo.alt}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
        <p>
          {photo.title}{" "}
          <span className="text-muted">
            {photo.category}, {photo.year}
          </span>
        </p>

        <StarRating value={rating} onChange={onRate} label={photo.title} />

        <div className="flex gap-6">
          <button
            type="button"
            onClick={onPrevious}
            className="transition-colors hover:text-muted"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            className="transition-colors hover:text-muted"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
