/*
  Warnings:

  - A unique constraint covering the columns `[year]` on the table `Month` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `year` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_monthId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_monthId_fkey";

-- DropIndex
DROP INDEX "Month_month_key";

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Income" ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Month_year_key" ON "Month"("year");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month"("year") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month"("year") ON DELETE RESTRICT ON UPDATE CASCADE;
