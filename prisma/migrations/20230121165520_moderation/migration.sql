-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reason" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,
    "stats_id" TEXT NOT NULL,
    CONSTRAINT "Report_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "Video" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Report_stats_id_fkey" FOREIGN KEY ("stats_id") REFERENCES "Stats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "country_code" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "last_stats_update" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stats_id" TEXT,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "User_stats_id_fkey" FOREIGN KEY ("stats_id") REFERENCES "Stats" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("country_code", "id", "last_stats_update", "rank", "stats_id", "username") SELECT "country_code", "id", "last_stats_update", "rank", "stats_id", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_stats_id_key" ON "User"("stats_id");
CREATE TABLE "new_Video" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "youtube_id" TEXT NOT NULL,
    "shown_rank" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "removed" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Video_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Video" ("id", "shown_rank", "user_id", "youtube_id") SELECT "id", "shown_rank", "user_id", "youtube_id" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
