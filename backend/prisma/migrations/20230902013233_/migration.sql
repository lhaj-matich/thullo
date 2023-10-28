/*
  Warnings:

  - You are about to drop the column `checkListId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `CheckList` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cardId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CheckList" DROP CONSTRAINT "CheckList_cardId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_checkListId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "checkListId",
ADD COLUMN     "cardId" TEXT NOT NULL;

-- DropTable
DROP TABLE "CheckList";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
