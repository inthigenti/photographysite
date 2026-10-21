import { db } from "./index.js";
import { photos } from "./schema.js";
import { photosData } from "./photos.data.js";

async function seed() {
  console.log("Seeding photos...");

  for (const p of photosData) {
    await db
      .insert(photos)
      .values(p)
      .onConflictDoNothing({ target: photos.id });
  }

  console.log(`Done — seeded ${photosData.length} photos.`);
  process.exit(0);
}

seed();
