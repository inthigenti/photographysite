import { useState } from "react";
import { gallery } from "../data/gallery";
import { PhotoModal } from "./PhotoModal";

const categories = ["All", "Portrait", "Street", "Editorial", "Travel"];

// Layout for the "All" view, matching the original design:
// phone: 1 column, landscape photos wide
// tablet: 2 columns, the last photo full width
// desktop: a row of 3 tall photos, then a row of 2 wide ones
function layoutFor(index) {
  if (index < 3) {
    return { figure: "lg:col-span-2", image: "aspect-[4/5]" };
  }
  if (index === 3) {
    return {
      figure: "lg:col-span-3",
      image: "aspect-[3/2] sm:aspect-[4/5] lg:aspect-[3/2]",
    };
  }
  return { figure: "sm:col-span-2 lg:col-span-3", image: "aspect-[3/2]" };
}

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openPhotoId, setOpenPhotoId] = useState(null);
  const [ratings, setRatings] = useState({});

  const visiblePhotos =
    activeCategory === "All"
      ? gallery
      : gallery.filter((photo) => photo.category === activeCategory);

  // Which photo is open, and where it sits in the visible list
  const openIndex = visiblePhotos.findIndex(
    (photo) => photo.id === openPhotoId,
  );
  const openPhoto = visiblePhotos[openIndex];

  // Loop round: Previous from the first photo goes to the last, and vice versa
  const previousIndex =
    openIndex === 0 ? visiblePhotos.length - 1 : openIndex - 1;
  const nextIndex = openIndex === visiblePhotos.length - 1 ? 0 : openIndex + 1;

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-32"
    >
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4 lg:mb-10">
        <h2
          id="work-title"
          className="font-display text-2xl uppercase lg:text-3xl"
        >
          Selected Work
        </h2>

        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={
                activeCategory === category
                  ? "cursor-pointer text-text underline underline-offset-4"
                  : "cursor-pointer text-muted hover:text-text"
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:gap-y-14 ${
          activeCategory === "All" ? "lg:grid-cols-6" : "lg:grid-cols-3"
        }`}
      >
        {visiblePhotos.map((photo, index) => {
          const layout =
            activeCategory === "All"
              ? layoutFor(index)
              : { figure: "", image: "aspect-[4/5]" };

          return (
            <figure
              key={photo.id}
              className={`flex flex-col gap-2.5 ${layout.figure}`}
            >
              <button
                type="button"
                onClick={() => setOpenPhotoId(photo.id)}
                className="block cursor-zoom-in bg-line"
              >
                <img
                  src={photo.image}
                  alt={photo.alt}
                  loading="lazy"
                  className={`w-full object-cover transition-opacity hover:opacity-90 ${layout.image}`}
                />
              </button>
              <figcaption className="flex justify-between gap-4 text-sm">
                <span>{photo.title}</span>
                <span className="text-muted">
                  {photo.category}, {photo.year}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {openPhoto && (
        <PhotoModal
          photo={openPhoto}
          position={openIndex + 1}
          total={visiblePhotos.length}
          rating={ratings[openPhoto.id] || 0}
          onRate={(newRating) =>
            setRatings({ ...ratings, [openPhoto.id]: newRating })
          }
          onPrevious={() => setOpenPhotoId(visiblePhotos[previousIndex].id)}
          onNext={() => setOpenPhotoId(visiblePhotos[nextIndex].id)}
          onClose={() => setOpenPhotoId(null)}
        />
      )}
    </section>
  );
}
