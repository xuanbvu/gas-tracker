/*
  Warnings:

  - You are about to drop the column `userId` on the `Stats` table. All the data in the column will be lost.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user` to the `Stats` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL
);
INSERT INTO "new_User" ("id") SELECT "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE TABLE "new_Stats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gallons" DECIMAL NOT NULL,
    "pricePer" DECIMAL NOT NULL,
    "total" DECIMAL NOT NULL,
    "location" TEXT NOT NULL
);
INSERT INTO "new_Stats" ("createdAt", "gallons", "id", "location", "pricePer", "total") SELECT "createdAt", "gallons", "id", "location", "pricePer", "total" FROM "Stats";
DROP TABLE "Stats";
ALTER TABLE "new_Stats" RENAME TO "Stats";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
