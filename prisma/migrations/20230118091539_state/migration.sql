/*
  Warnings:

  - You are about to drop the column `state` on the `OsuOauth` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[state]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Session" ADD COLUMN "state" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OsuOauth" (
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires_in" DATETIME NOT NULL,
    "token_type" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "OsuOauth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OsuOauth" ("access_token", "expires_in", "refresh_token", "token_type", "user_id") SELECT "access_token", "expires_in", "refresh_token", "token_type", "user_id" FROM "OsuOauth";
DROP TABLE "OsuOauth";
ALTER TABLE "new_OsuOauth" RENAME TO "OsuOauth";
CREATE UNIQUE INDEX "OsuOauth_user_id_key" ON "OsuOauth"("user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Session_state_key" ON "Session"("state");
