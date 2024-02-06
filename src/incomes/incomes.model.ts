import { Prisma } from "@prisma/client";

export class Income implements Prisma.IncomeUncheckedCreateInput {
  id?: string;
  amount: number;
  description: string;
  fixed: boolean;
  userId: string;
  createdAt?: string | Date;
}
