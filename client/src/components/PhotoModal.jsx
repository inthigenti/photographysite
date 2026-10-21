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
      className="fixed inset-0 z-20 flex flex-col bg-bg px-4 py-4 sm:px-6 lg:px-8"
    >
      <div className="flex items-center justify-between text-sm">
        <p className="text-muted">
          {position} / {total}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer transition-colors hover:text-muted"
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

      <div className="grid grid-cols-1 items-center justify-items-center gap-4 text-sm sm:grid-cols-[1fr_auto_1fr]">
        <p className="sm:justify-self-start">
          {photo.title}{" "}
          <span className="text-muted">
            {photo.category}, {photo.year}
          </span>
        </p>

        <StarRating value={rating} onChange={onRate} label={photo.title} />

        <div className="flex gap-6 sm:justify-self-end">
          <button
            type="button"
            onClick={onPrevious}
            className="cursor-pointer transition-colors hover:text-muted"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            className="cursor-pointer transition-colors hover:text-muted"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
