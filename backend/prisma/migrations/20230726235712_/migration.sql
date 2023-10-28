-- AlterTable
ALTER TABLE "CheckList" ADD COLUMN     "cardId" TEXT;

-- AddForeignKey
ALTER TABLE "CheckList" ADD CONSTRAINT "CheckList_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE SET NULL ON UPDATE CASCADE;
