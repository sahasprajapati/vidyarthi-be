/*
  Warnings:

  - You are about to drop the column `orderId` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[courseId,paidById]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_orderId_fkey";

-- DropIndex
DROP INDEX "Transaction_orderId_key";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "orderId",
ADD COLUMN     "courseId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_courseId_paidById_key" ON "Transaction"("courseId", "paidById");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
