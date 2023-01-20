/*
  Warnings:

  - You are about to drop the `VideoWatched` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Session_stats_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VideoWatched";
PRAGMA foreign_keys=on;
