-- CreateTable
CREATE TABLE "OsuOauth" (
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires_in" DATETIME NOT NULL,
    "token_type" TEXT NOT NULL,
    "state" TEXT,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "OsuOauth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "OsuOauth_state_key" ON "OsuOauth"("state");

-- CreateIndex
CREATE UNIQUE INDEX "OsuOauth_user_id_key" ON "OsuOauth"("user_id");
