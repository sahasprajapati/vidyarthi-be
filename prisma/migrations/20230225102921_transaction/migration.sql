/*
  Warnings:

  - You are about to drop the column `customerId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paidById` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paidToId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Transaction_serviceId_key";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "customerId",
DROP COLUMN "serviceId",
ADD COLUMN     "orderId" INTEGER NOT NULL,
ADD COLUMN     "paidById" INTEGER NOT NULL,
ADD COLUMN     "paidToId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_orderId_key" ON "Transaction"("orderId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_paidToId_fkey" FOREIGN KEY ("paidToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_paidById_fkey" FOREIGN KEY ("paidById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
