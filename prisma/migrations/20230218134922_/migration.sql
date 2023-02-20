/*
  Warnings:

  - You are about to drop the column `socialProfileId` on the `TeacherProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[teacherProfileId]` on the table `SocialProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teacherProfileId` to the `SocialProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TeacherProfile" DROP CONSTRAINT "TeacherProfile_socialProfileId_fkey";

-- AlterTable
ALTER TABLE "SocialProfile" ADD COLUMN     "teacherProfileId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TeacherProfile" DROP COLUMN "socialProfileId";

-- CreateIndex
CREATE UNIQUE INDEX "SocialProfile_teacherProfileId_key" ON "SocialProfile"("teacherProfileId");

-- AddForeignKey
ALTER TABLE "SocialProfile" ADD CONSTRAINT "SocialProfile_teacherProfileId_fkey" FOREIGN KEY ("teacherProfileId") REFERENCES "TeacherProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
