-- CreateTable
CREATE TABLE "ExpenseInstallment" (
    "id" TEXT NOT NULL,
    "expenseId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "IncomeInstallment" (
    "id" TEXT NOT NULL,
    "incomeId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseInstallment_id_key" ON "ExpenseInstallment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "IncomeInstallment_id_key" ON "IncomeInstallment"("id");

-- AddForeignKey
ALTER TABLE "ExpenseInstallment" ADD CONSTRAINT "ExpenseInstallment_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncomeInstallment" ADD CONSTRAINT "IncomeInstallment_incomeId_fkey" FOREIGN KEY ("incomeId") REFERENCES "Income"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
