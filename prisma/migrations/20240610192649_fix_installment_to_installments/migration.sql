/*
  Warnings:

  - You are about to drop the column `installment` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `installment` on the `Income` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "installment",
ADD COLUMN     "installments" INTEGER;

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "installment",
ADD COLUMN     "installments" INTEGER;
