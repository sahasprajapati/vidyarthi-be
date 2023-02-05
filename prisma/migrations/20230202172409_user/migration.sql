/*
  Warnings:

  - You are about to drop the column `studentProfileId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `teacherProfileId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `StudentProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `TeacherProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_studentProfileId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_teacherProfileId_fkey";

-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "TeacherProfile" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "studentProfileId",
DROP COLUMN "teacherProfileId";

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_userId_key" ON "StudentProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherProfile_userId_key" ON "TeacherProfile"("userId");

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherProfile" ADD CONSTRAINT "TeacherProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
