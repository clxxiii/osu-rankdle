-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "youtube_id" TEXT NOT NULL,
    "shown_rank" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Video_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "country_code" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "last_stats_update" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stats_id" TEXT,
    CONSTRAINT "User_stats_id_fkey" FOREIGN KEY ("stats_id") REFERENCES "Stats" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stats_id" TEXT NOT NULL,
    CONSTRAINT "Session_stats_id_fkey" FOREIGN KEY ("stats_id") REFERENCES "Stats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Stats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "streak" INTEGER NOT NULL,
    "longest_streak" INTEGER NOT NULL,
    "highest_score" INTEGER NOT NULL,
    "played_today" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_stats_id_key" ON "User"("stats_id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_stats_id_key" ON "Session"("stats_id");
