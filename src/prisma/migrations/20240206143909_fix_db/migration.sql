/*
  Warnings:

  - Made the column `userId` on table `Expense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Income` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_userId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_userId_fkey";

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Income" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
