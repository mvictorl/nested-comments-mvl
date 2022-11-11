/*
  Warnings:

  - Added the required column `activationLink` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activationLink" TEXT NOT NULL,
ADD COLUMN     "isActivated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Tocken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "refreshTocken" TEXT NOT NULL,

    CONSTRAINT "Tocken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tocken_userId_key" ON "Tocken"("userId");

-- AddForeignKey
ALTER TABLE "Tocken" ADD CONSTRAINT "Tocken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
