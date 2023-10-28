-- DropForeignKey
ALTER TABLE "Label" DROP CONSTRAINT "Label_cardId_fkey";

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
