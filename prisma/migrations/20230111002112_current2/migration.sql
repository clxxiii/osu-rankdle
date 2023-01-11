/*
  Warnings:

  - You are about to drop the `CurrentVideoFor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CurrentVideoFor";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "streak" INTEGER NOT NULL,
    "longest_streak" INTEGER NOT NULL,
    "highest_score" INTEGER NOT NULL,
    "played_today" BOOLEAN NOT NULL,
    "current_video_id" TEXT,
    CONSTRAINT "Stats_current_video_id_fkey" FOREIGN KEY ("current_video_id") REFERENCES "Video" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Stats" ("highest_score", "id", "longest_streak", "played_today", "streak") SELECT "highest_score", "id", "longest_streak", "played_today", "streak" FROM "Stats";
DROP TABLE "Stats";
ALTER TABLE "new_Stats" RENAME TO "Stats";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
