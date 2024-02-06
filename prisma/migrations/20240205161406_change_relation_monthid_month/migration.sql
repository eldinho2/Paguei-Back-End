/*
  Warnings:

  - A unique constraint covering the columns `[month]` on the table `Month` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `monthId` on the `Expense` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `monthId` on the `Income` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_monthId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_monthId_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "monthId",
ADD COLUMN     "monthId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "monthId",
ADD COLUMN     "monthId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Month_month_key" ON "Month"("month");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month"("month") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month"("month") ON DELETE RESTRICT ON UPDATE CASCADE;
