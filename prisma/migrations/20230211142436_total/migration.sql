/*
  Warnings:

  - Added the required column `progressPercentage` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "total" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Progress" ADD COLUMN     "progressPercentage" INTEGER NOT NULL;
