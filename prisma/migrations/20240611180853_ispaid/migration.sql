/*
  Warnings:

  - You are about to drop the `ExpenseInstallment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IncomeInstallment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExpenseInstallment" DROP CONSTRAINT "ExpenseInstallment_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "IncomeInstallment" DROP CONSTRAINT "IncomeInstallment_incomeId_fkey";

-- DropTable
DROP TABLE "ExpenseInstallment";

-- DropTable
DROP TABLE "IncomeInstallment";
