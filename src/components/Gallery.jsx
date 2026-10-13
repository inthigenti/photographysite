import { useState } from "react";
import { gallery } from "../data/gallery";
import { SaveToggle } from "./SaveToggle";

const categories = ["All", "Portrait", "Street", "Editorial", "Travel"];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [saved, setSaved] = useState({});

  const visiblePhotos =
    activeCategory === "All"
      ? gallery
      : gallery.filter((photo) => photo.category === activeCategory);

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="mx-auto max-w-[1100px] px-6 pb-20 lg:pb-32"
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
                  ? "text-text underline underline-offset-4"
                  : "text-muted hover:text-text"
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePhotos.map((photo) => (
          <figure key={photo.id} className="flex flex-col gap-2.5">
            <img
              src={photo.image}
              alt={photo.alt}
              loading="lazy"
              className="aspect-[4/5] w-full bg-line object-cover"
            />
            <figcaption className="flex justify-between gap-4 text-sm">
              <span>{photo.title}</span>
              <span className="text-muted">
                {photo.category}, {photo.year}
              </span>
            </figcaption>
            <SaveToggle
              value={saved[photo.id] === true}
              onChange={(newValue) =>
                setSaved({ ...saved, [photo.id]: newValue })
              }
              label={photo.title}
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
