/*
  Warnings:

  - You are about to drop the column `occupationId` on the `StudentProfile` table. All the data in the column will be lost.
  - You are about to drop the column `cartId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Occupation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CartToCourse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudentProfile" DROP CONSTRAINT "StudentProfile_occupationId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherProfile" DROP CONSTRAINT "TeacherProfile_socialProfileId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherProfile" DROP CONSTRAINT "TeacherProfile_teacherNotificationId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cartId_fkey";

-- DropForeignKey
ALTER TABLE "_CartToCourse" DROP CONSTRAINT "_CartToCourse_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartToCourse" DROP CONSTRAINT "_CartToCourse_B_fkey";

-- AlterTable
ALTER TABLE "StudentProfile" DROP COLUMN "occupationId",
ADD COLUMN     "occupation" TEXT,
ALTER COLUMN "dob" DROP NOT NULL,
ALTER COLUMN "highestQualification" DROP NOT NULL,
ALTER COLUMN "isEmailUpdates" SET DEFAULT true;

-- AlterTable
ALTER TABLE "TeacherProfile" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "biography" DROP NOT NULL,
ALTER COLUMN "phoneNumber" DROP NOT NULL,
ALTER COLUMN "teacherNotificationId" DROP NOT NULL,
ALTER COLUMN "socialProfileId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cartId";

-- DropTable
DROP TABLE "Cart";

-- DropTable
DROP TABLE "Occupation";

-- DropTable
DROP TABLE "_CartToCourse";

-- AddForeignKey
ALTER TABLE "TeacherProfile" ADD CONSTRAINT "TeacherProfile_teacherNotificationId_fkey" FOREIGN KEY ("teacherNotificationId") REFERENCES "TeacherNotification"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherProfile" ADD CONSTRAINT "TeacherProfile_socialProfileId_fkey" FOREIGN KEY ("socialProfileId") REFERENCES "SocialProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
