/*
  Warnings:

  - The primary key for the `Guess` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `Guess` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guess" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "input" INTEGER NOT NULL,
    "penalty" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "video_id" TEXT NOT NULL,
    "stats_id" TEXT NOT NULL,
    CONSTRAINT "Guess_stats_id_fkey" FOREIGN KEY ("stats_id") REFERENCES "Stats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Guess_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "Video" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Guess" ("id", "day", "input", "penalty", "stats_id", "video_id") SELECT "video_id", "day", "input", "penalty", "stats_id", "video_id" FROM "Guess";
DROP TABLE "Guess";
ALTER TABLE "new_Guess" RENAME TO "Guess";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
