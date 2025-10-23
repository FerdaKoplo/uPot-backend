/*
  Warnings:

  - Added the required column `roleId` to the `Forest_Members` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Forest_Members" ADD COLUMN     "roleId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Forest_Members" ADD CONSTRAINT "Forest_Members_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
