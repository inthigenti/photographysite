import { Router } from "express";
import { asc, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { photos } from "../db/schema.js";

export const photosRouter = Router();

// GET /api/photos — all photos, in gallery order
photosRouter.get("/", async (_req, res) => {
  const rows = await db.select().from(photos).orderBy(asc(photos.sortOrder));
  res.json(rows);
});

// GET /api/photos/:id — one photo, e.g. /api/photos/roksolana
photosRouter.get("/:id", async (req, res) => {
  const [row] = await db
    .select()
    .from(photos)
    .where(eq(photos.id, req.params.id))
    .limit(1);
  if (!row) return res.status(404).json({ error: "No such photo" });
  res.json(row);
});
