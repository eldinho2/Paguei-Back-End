/*
  Warnings:

  - Added the required column `billType` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billType` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "billType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Income" ADD COLUMN     "billType" TEXT NOT NULL;
