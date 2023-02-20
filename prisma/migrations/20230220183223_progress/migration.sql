/*
  Warnings:

  - You are about to drop the column `progressId` on the `Section` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_progressId_fkey";

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "progressId";

-- CreateTable
CREATE TABLE "_ProgressToSection" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProgressToSection_AB_unique" ON "_ProgressToSection"("A", "B");

-- CreateIndex
CREATE INDEX "_ProgressToSection_B_index" ON "_ProgressToSection"("B");

-- AddForeignKey
ALTER TABLE "_ProgressToSection" ADD CONSTRAINT "_ProgressToSection_A_fkey" FOREIGN KEY ("A") REFERENCES "Progress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProgressToSection" ADD CONSTRAINT "_ProgressToSection_B_fkey" FOREIGN KEY ("B") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;
