import { Prisma } from "@prisma/client";

export class Expense implements Prisma.ExpenseUncheckedCreateInput {
  id?: string;
  amount: number;
  description: string;
  fixed: boolean;
  userId: string;
  createdAt?: string | Date;
}
