/*
  Warnings:

  - You are about to drop the column `refreshTocken` on the `Token` table. All the data in the column will be lost.
  - Added the required column `refreshToken` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token" DROP COLUMN "refreshTocken",
ADD COLUMN     "refreshToken" TEXT NOT NULL;
