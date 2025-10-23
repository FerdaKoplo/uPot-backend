-- AlterTable
ALTER TABLE "Forests" ADD COLUMN     "ownerId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Forests" ADD CONSTRAINT "Forests_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Foresters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
