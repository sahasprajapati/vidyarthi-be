/*
  Warnings:

  - Changed the type of `subtitle` on the `Course` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Level" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'PROFESSIONAL');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "level" "Level" DEFAULT 'BEGINNER',
ADD COLUMN     "subtitleLanguage" "Language" NOT NULL DEFAULT 'ENGLISH',
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "discountAmount" DROP NOT NULL,
ALTER COLUMN "discountPercent" DROP NOT NULL,
ALTER COLUMN "topic" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "welcomeMessage" DROP NOT NULL,
ALTER COLUMN "congratulationMessage" DROP NOT NULL,
ALTER COLUMN "thumbnail" DROP NOT NULL,
ALTER COLUMN "trailer" DROP NOT NULL,
DROP COLUMN "subtitle",
ADD COLUMN     "subtitle" TEXT NOT NULL;

-- DropEnum
DROP TYPE "LEVEL";

-- DropEnum
DROP TYPE "Subtitle";
