/*
  Warnings:

  - Added the required column `gender` to the `Foresters` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ForesterGender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Foresters" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "gender" "ForesterGender" NOT NULL;
