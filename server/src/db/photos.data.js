// Seed data: the 5 gallery photos from Week 2 (client/src/data/gallery.js).
// seed.js inserts these into the photos table.
// sortOrder keeps the gallery layout: 3 tall photos, then the 2 landscape ones.

export const photosData = [
  {
    id: "above-the-valley",
    title: "Above the Valley",
    category: "Portrait",
    year: 2025,
    image: "/images/portrait-1.jpg",
    alt: "A hand pouring beer from a bottle into a pint glass, against a dark background",
    sortOrder: 1,
  },
  {
    id: "marta-north-shore",
    title: "Marta, North Shore",
    category: "Street",
    year: 2025,
    image: "/images/portrait-2.jpg",
    alt: "Blue bellflowers on thin stems against a soft green background",
    sortOrder: 2,
  },
  {
    id: "roksolana",
    title: "Roksolana",
    category: "Editorial",
    year: 2023,
    image: "/images/portrait-3.jpg",
    alt: "Studio portrait of a woman with long brown hair, against a dark background",
    sortOrder: 3,
  },
  {
    id: "my-room",
    title: "My room",
    category: "Travel",
    year: 2023,
    image: "/images/landscape-1.jpg",
    alt: "A Canon lens with its cap on, resting in a canvas camera bag",
    sortOrder: 4,
  },
  {
    id: "canadian-maple-tree",
    title: "Canadian Maple Tree",
    category: "Street",
    year: 2023,
    image: "/images/landscape-2.jpg",
    alt: "Two wooden park benches on a path covered in orange autumn leaves",
    sortOrder: 5,
  },
];
