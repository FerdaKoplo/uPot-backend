/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Twigs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Twigs_title_key" ON "Twigs"("title");
