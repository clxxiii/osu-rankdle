-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guess" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guess_num" INTEGER NOT NULL,
    "input" INTEGER NOT NULL,
    "penalty" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "video_id" TEXT NOT NULL,
    "stats_id" TEXT NOT NULL,
    "on_day_stats_id" TEXT NOT NULL,
    CONSTRAINT "Guess_stats_id_fkey" FOREIGN KEY ("stats_id") REFERENCES "Stats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Guess_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "Video" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Guess_day_on_day_stats_id_fkey" FOREIGN KEY ("day", "on_day_stats_id") REFERENCES "UserDay" ("day", "stats_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Guess" ("day", "guess_num", "id", "input", "on_day_stats_id", "penalty", "stats_id", "video_id") SELECT "day", "guess_num", "id", "input", "on_day_stats_id", "penalty", "stats_id", "video_id" FROM "Guess";
DROP TABLE "Guess";
ALTER TABLE "new_Guess" RENAME TO "Guess";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
