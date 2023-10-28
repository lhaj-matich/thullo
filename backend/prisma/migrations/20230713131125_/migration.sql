/*
  Warnings:

  - You are about to drop the column `value` on the `Label` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tag]` on the table `Label` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tag` to the `Label` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Label_value_key";

-- AlterTable
ALTER TABLE "Label" DROP COLUMN "value",
ADD COLUMN     "tag" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Label_tag_key" ON "Label"("tag");
