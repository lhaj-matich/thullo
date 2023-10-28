/*
  Warnings:

  - Made the column `description` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "coverImage" TEXT,
ALTER COLUMN "description" SET NOT NULL;
