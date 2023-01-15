/*
  Warnings:

  - You are about to drop the column `notesId` on the `Lecture` table. All the data in the column will be lost.
  - Added the required column `listOrder` to the `Lecture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listOrder` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Lecture" DROP CONSTRAINT "Lecture_noteId_fkey";

-- AlterTable
ALTER TABLE "Lecture" DROP COLUMN "notesId",
ADD COLUMN     "listOrder" INTEGER NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "noteId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "noteDescription" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "listOrder" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Lecture" ADD CONSTRAINT "Lecture_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE;
