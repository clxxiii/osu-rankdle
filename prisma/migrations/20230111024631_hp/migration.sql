-- CreateTable
CREATE TABLE "UserDay" (
    "stats_id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,

    PRIMARY KEY ("day", "stats_id"),
    CONSTRAINT "UserDay_stats_id_fkey" FOREIGN KEY ("stats_id") REFERENCES "Stats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Guess" (
    "input" INTEGER NOT NULL,
    "penalty" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "stats_id" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,

    PRIMARY KEY ("day", "video_id"),
    CONSTRAINT "Guess_day_stats_id_fkey" FOREIGN KEY ("day", "stats_id") REFERENCES "UserDay" ("day", "stats_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Guess_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "Video" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "streak" INTEGER NOT NULL,
    "longest_streak" INTEGER NOT NULL,
    "highest_score" INTEGER NOT NULL,
    "played_today" BOOLEAN NOT NULL,
    "hp" INTEGER NOT NULL DEFAULT 2000,
    "current_video_id" TEXT,
    CONSTRAINT "Stats_current_video_id_fkey" FOREIGN KEY ("current_video_id") REFERENCES "Video" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Stats" ("current_video_id", "highest_score", "id", "longest_streak", "played_today", "streak") SELECT "current_video_id", "highest_score", "id", "longest_streak", "played_today", "streak" FROM "Stats";
DROP TABLE "Stats";
ALTER TABLE "new_Stats" RENAME TO "Stats";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
