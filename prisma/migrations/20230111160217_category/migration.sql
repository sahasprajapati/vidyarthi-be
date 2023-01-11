/*
  Warnings:

  - The `language` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `subCategoryId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "subCategoryId" INTEGER NOT NULL,
ADD COLUMN     "subtitle" "Subtitle" NOT NULL DEFAULT 'ENGLISH',
ADD COLUMN     "title" TEXT NOT NULL,
DROP COLUMN "language",
ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'ENGLISH';

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "courseId" INTEGER;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "courseCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
