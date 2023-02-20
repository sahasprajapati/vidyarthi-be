/*
  Warnings:

  - You are about to drop the `_Students` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Students" DROP CONSTRAINT "_Students_A_fkey";

-- DropForeignKey
ALTER TABLE "_Students" DROP CONSTRAINT "_Students_B_fkey";

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "progressId" INTEGER;

-- DropTable
DROP TABLE "_Students";

-- CreateTable
CREATE TABLE "CoursesOnStudents" (
    "courseId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "progressId" INTEGER NOT NULL,

    CONSTRAINT "CoursesOnStudents_pkey" PRIMARY KEY ("courseId","studentId")
);

-- CreateTable
CREATE TABLE "Progress" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoursesOnStudents" ADD CONSTRAINT "CoursesOnStudents_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursesOnStudents" ADD CONSTRAINT "CoursesOnStudents_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursesOnStudents" ADD CONSTRAINT "CoursesOnStudents_progressId_fkey" FOREIGN KEY ("progressId") REFERENCES "Progress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_progressId_fkey" FOREIGN KEY ("progressId") REFERENCES "Progress"("id") ON DELETE SET NULL ON UPDATE CASCADE;
