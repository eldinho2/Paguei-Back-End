/*
  Warnings:

  - The required column `group_id` was added to the `Expense` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `group_id` was added to the `Income` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "group_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Income" ADD COLUMN     "group_id" TEXT NOT NULL;
