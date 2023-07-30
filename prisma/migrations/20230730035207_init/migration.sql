-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Stats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gallons" DECIMAL NOT NULL,
    "pricePer" DECIMAL NOT NULL,
    "total" DECIMAL NOT NULL,
    "location" TEXT NOT NULL
);
