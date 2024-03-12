import { PrismaService } from 'src/prisma.service';
import { Expense } from './expenses.model';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

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

  async deleteExpense({id}) {
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

  async getAllUserExpensives(data: User) {    
    return this.prisma.expense.findMany({
      where: {
        userId: data.email,
      },
    });
  }


  async getExpenseByMonth(data) {
    const startDate = new Date(new Date().getFullYear(), data.month - 1, 1);
    const endDate = new Date(
      new Date().getFullYear(),
      data.month,
      0,  
      23,
      59,
      59,
      999,
    );

    return this.prisma.expense.findMany({
      where: {
        userId: data.email,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        fixed: true,
      },
    });
}
}