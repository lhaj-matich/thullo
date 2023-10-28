/*
  Warnings:

  - You are about to drop the column `visibilty` on the `Board` table. All the data in the column will be lost.
  - Added the required column `visibility` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "visibilty",
ADD COLUMN     "visibility" BOOLEAN NOT NULL;
