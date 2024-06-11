/*
  Warnings:

  - Added the required column `is_paid` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_paid` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "is_paid" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Income" ADD COLUMN     "is_paid" BOOLEAN NOT NULL;
