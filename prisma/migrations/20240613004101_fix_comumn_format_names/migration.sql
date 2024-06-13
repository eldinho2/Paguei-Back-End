/*
  Warnings:

  - You are about to drop the column `group_id` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `is_paid` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `total_installments` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `group_id` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `is_paid` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `total_installments` on the `Income` table. All the data in the column will be lost.
  - The required column `groupId` was added to the `Expense` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `isPaid` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - The required column `groupId` was added to the `Income` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `isPaid` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "group_id",
DROP COLUMN "is_paid",
DROP COLUMN "total_installments",
ADD COLUMN     "groupId" TEXT NOT NULL,
ADD COLUMN     "isPaid" BOOLEAN NOT NULL,
ADD COLUMN     "totalInstallments" INTEGER;

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "group_id",
DROP COLUMN "is_paid",
DROP COLUMN "total_installments",
ADD COLUMN     "groupId" TEXT NOT NULL,
ADD COLUMN     "isPaid" BOOLEAN NOT NULL,
ADD COLUMN     "totalInstallments" INTEGER;
