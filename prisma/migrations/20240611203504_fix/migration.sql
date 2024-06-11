/*
  Warnings:

  - You are about to drop the column `installments` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `installments` on the `Income` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "installments",
ADD COLUMN     "installment" INTEGER;

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "installments",
ADD COLUMN     "installment" INTEGER;
