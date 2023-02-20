/*
  Warnings:

  - You are about to drop the column `teacherNotificationId` on the `TeacherProfile` table. All the data in the column will be lost.
  - You are about to drop the `TeacherNotification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TeacherProfile" DROP CONSTRAINT "TeacherProfile_teacherNotificationId_fkey";

-- AlterTable
ALTER TABLE "TeacherProfile" DROP COLUMN "teacherNotificationId",
ADD COLUMN     "notifications" "TEACHER_NOTIFICATION_TYPE"[];

-- DropTable
DROP TABLE "TeacherNotification";
