-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "country_code" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "last_stats_update" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stats_id" TEXT,
    "removed_from_global_leaderboard" BOOLEAN NOT NULL DEFAULT false,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "User_stats_id_fkey" FOREIGN KEY ("stats_id") REFERENCES "Stats" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("admin", "country_code", "id", "last_stats_update", "rank", "stats_id", "username") SELECT "admin", "country_code", "id", "last_stats_update", "rank", "stats_id", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_stats_id_key" ON "User"("stats_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
