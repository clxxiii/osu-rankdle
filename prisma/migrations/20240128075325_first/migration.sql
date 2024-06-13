-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "youtube_id" TEXT NOT NULL,
    "shown_rank" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "removed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "country_code" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "last_stats_update" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stats_id" TEXT,
    "removed_from_global_leaderboard" BOOLEAN NOT NULL DEFAULT false,
    "admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OsuOauth" (
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires_in" TIMESTAMP(3) NOT NULL,
    "token_type" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "stats_id" TEXT NOT NULL,
    "state" TEXT,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stats" (
    "id" TEXT NOT NULL,
    "streak" INTEGER NOT NULL,
    "longest_streak" INTEGER NOT NULL,
    "highest_score" INTEGER NOT NULL,
    "played_today" BOOLEAN NOT NULL,
    "hp" INTEGER NOT NULL DEFAULT 2000,
    "current_video_id" TEXT,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDay" (
    "stats_id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,

    CONSTRAINT "UserDay_pkey" PRIMARY KEY ("day","stats_id")
);

-- CreateTable
CREATE TABLE "Guess" (
    "id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guess_num" INTEGER NOT NULL,
    "input" INTEGER NOT NULL,
    "penalty" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "video_id" TEXT NOT NULL,
    "stats_id" TEXT NOT NULL,
    "on_day_stats_id" TEXT NOT NULL,

    CONSTRAINT "Guess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,
    "stats_id" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_stats_id_key" ON "User"("stats_id");

-- CreateIndex
CREATE UNIQUE INDEX "OsuOauth_user_id_key" ON "OsuOauth"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_state_key" ON "Session"("state");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_stats_id_fkey" FOREIGN KEY ("stats_id") REFERENCES "Stats"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OsuOauth" ADD CONSTRAINT "OsuOauth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_stats_id_fkey" FOREIGN KEY ("stats_id") REFERENCES "Stats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_current_video_id_fkey" FOREIGN KEY ("current_video_id") REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDay" ADD CONSTRAINT "UserDay_stats_id_fkey" FOREIGN KEY ("stats_id") REFERENCES "Stats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guess" ADD CONSTRAINT "Guess_stats_id_fkey" FOREIGN KEY ("stats_id") REFERENCES "Stats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guess" ADD CONSTRAINT "Guess_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guess" ADD CONSTRAINT "Guess_day_on_day_stats_id_fkey" FOREIGN KEY ("day", "on_day_stats_id") REFERENCES "UserDay"("day", "stats_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_stats_id_fkey" FOREIGN KEY ("stats_id") REFERENCES "Stats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
