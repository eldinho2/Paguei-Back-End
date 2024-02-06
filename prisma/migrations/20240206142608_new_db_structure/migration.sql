/*
  Warnings:

  - You are about to drop the column `monthId` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `monthId` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the `Month` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_monthId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_monthId_fkey";

-- DropForeignKey
ALTER TABLE "Month" DROP CONSTRAINT "Month_userId_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "monthId",
DROP COLUMN "year",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "monthId",
DROP COLUMN "year",
ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "Month";

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
