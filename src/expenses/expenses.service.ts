import { PrismaService } from '../prisma.service';
import { Expense } from './expenses.model';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

type User = {
  id: string;
  email: string;
  name: string;
  image: string;
  createdAt: Date;
  updateAt: Date;
  totalInstallments: number;
}

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async createExpense(data: Expense) {

    if (data.totalInstallments > 1) {
      const amount = data.amount / data.totalInstallments;
      const groupId = uuid();
      const expenses = [];

      for (let i = 0; i < data.totalInstallments; i++) {
        const expirationDate = new Date(data.createdAt);
        expirationDate.setMonth(expirationDate.getMonth() + i);

        expenses.push({
          amount: amount,
          isPaid: false,
          description: data.description,
          fixed: data.fixed,
          userId: data.userId,
          createdAt: new Date(data.createdAt),
          expiresAt: expirationDate,
          installment: i + 1,
          totalInstallments: data.totalInstallments,
          groupId: groupId,
        });
      }

      await this.prisma.expense.createMany({
        data: expenses,
      });

      const firstExpense = await this.prisma.expense.findFirst({
        where: { groupId: groupId },
        orderBy: { createdAt: 'asc' }
      });

      return {
          id: firstExpense.id,
          groupId: groupId,
          isPaid: false,
          amount: amount,
          description: data.description,
          fixed: data.fixed,
          installment: null,
          totalInstallments: data.totalInstallments,
          createdAt: new Date(data.createdAt),
          expiresAt: null,
          updatedAt: new Date(),
          userId: data.userId,
      };
    }

    const createdExpense = await this.prisma.expense.create({
      data: {
        amount: data.amount,
        isPaid: data.isPaid,
        description: data.description,
        fixed: data.fixed,
        userId: data.userId,
        createdAt: data.createdAt,
      },
    });

    return {
        id: createdExpense.id,
        groupId: createdExpense.groupId || null,
        isPaid: createdExpense.isPaid,
        amount: createdExpense.amount,
        description: createdExpense.description,
        fixed: createdExpense.fixed,
        installment: createdExpense.installment || null,
        totalInstallments: createdExpense.totalInstallments || null,
        createdAt: createdExpense.createdAt,
        expiresAt: createdExpense.expiresAt || null,
        updatedAt: createdExpense.updatedAt,
        userId: createdExpense.userId,
    };
  }

  async deleteExpense({ id, groupId, totalInstallments}) {
    if (totalInstallments > 1) {
      return this.prisma.expense.deleteMany({
        where: {
          groupId: groupId,
        },
      });
    }

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
    const startDate = new Date(data.year, data.month - 1, 1);
    const endDate = new Date(data.year, data.month, 0, 23, 59, 59, 999);
  
    const expenses = await this.prisma.expense.findMany({
      where: {
        userId: data.email,
        OR: [
          {
            AND: [
              {
                createdAt: {
                  gte: startDate,
                  lte: endDate,
                },
              },
              {
                installment: null,
              },
            ],
          },
          {
            fixed: true,
          },
          {
            AND: [
              {
                expiresAt: {
                  gte: startDate,
                  lte: endDate,
                },
              },
              {
                installment: {
                  not: null,
                },
              },
            ],
          },
        ],
      },
    });
  
    return expenses;
  }
  

}
