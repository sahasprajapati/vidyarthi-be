/*
  Warnings:

  - A unique constraint covering the columns `[courseId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `courseCategories` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "courseCategories" ALTER COLUMN "parentCategoryId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Course_courseId_key" ON "Course"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "courseCategories_name_key" ON "courseCategories"("name");
