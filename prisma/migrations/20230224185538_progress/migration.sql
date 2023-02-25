/*
  Warnings:

  - You are about to drop the `_ProgressToSection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProgressToSection" DROP CONSTRAINT "_ProgressToSection_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProgressToSection" DROP CONSTRAINT "_ProgressToSection_B_fkey";

-- DropTable
DROP TABLE "_ProgressToSection";

-- CreateTable
CREATE TABLE "_LectureToProgress" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LectureToProgress_AB_unique" ON "_LectureToProgress"("A", "B");

-- CreateIndex
CREATE INDEX "_LectureToProgress_B_index" ON "_LectureToProgress"("B");

-- AddForeignKey
ALTER TABLE "_LectureToProgress" ADD CONSTRAINT "_LectureToProgress_A_fkey" FOREIGN KEY ("A") REFERENCES "Lecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LectureToProgress" ADD CONSTRAINT "_LectureToProgress_B_fkey" FOREIGN KEY ("B") REFERENCES "Progress"("id") ON DELETE CASCADE ON UPDATE CASCADE;
