import { PrismaService } from 'src/prisma.service';
import { Expense } from './expenses.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async createExpense(data: Expense) {
    return this.prisma.expense.create({
      data: {
        amount: data.amount,
        description: data.description,
        fixed: data.fixed,
        userId: data.userId,
        createdAt: data.createdAt,
      },
    });
  }

  async deleteExpense(id: string) {
    return this.prisma.expense.delete({
      where: {
        id: id,
      },
    });
  }

  async updateExpense(data: Expense) {
    return this.prisma.expense.update({
      where: {
        id: data.id,
      },
      data: {
        amount: data.amount,
        description: data.description,
        fixed: data.fixed,
      },
    });
  }

  async getAllUserExpensives() {
    return this.prisma.expense.findMany();
  }


  async getExpenseByMonth(userId: string, month: number) {
    const startDate = new Date(new Date().getFullYear(), month - 1, 1);
    const endDate = new Date(
      new Date().getFullYear(),
      month,
      0,
      23,
      59,
      59,
      999,
    );

    return this.prisma.expense.findMany({
      where: {
        userId: userId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
}
}