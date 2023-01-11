-- CreateTable
CREATE TABLE "VideoWatched" (
    "video_id" TEXT NOT NULL,
    "stats_id" TEXT NOT NULL,

    PRIMARY KEY ("video_id", "stats_id"),
    CONSTRAINT "VideoWatched_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "Video" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VideoWatched_stats_id_fkey" FOREIGN KEY ("stats_id") REFERENCES "Stats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CurrentVideoFor" (
    "video_id" TEXT NOT NULL,
    "stats_id" TEXT NOT NULL,

    PRIMARY KEY ("video_id", "stats_id"),
    CONSTRAINT "CurrentVideoFor_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "Video" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CurrentVideoFor_stats_id_fkey" FOREIGN KEY ("stats_id") REFERENCES "Stats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
