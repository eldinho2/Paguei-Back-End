import { PrismaService } from 'src/prisma.service';
import { Expense } from './expenses.model';
import { Injectable } from '@nestjs/common';

type User = {
  id: string;
  email: string;
  name: string;
  image: string;
  createdAt: Date;
  updateAt: Date;
  installments: number;
}

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async createExpense(data: Expense) {
    if (data.installments > 1) {

      const amount = data.amount / data.installments;
      const expirationDate = new Date(data.createdAt);
      const creationMonth = expirationDate.getMonth(); 
    
      expirationDate.setMonth(creationMonth + data.installments - 1);
    
      return this.prisma.expense.create({
        data: {
          amount: amount,
          description: data.description,
          fixed: data.fixed,
          userId: data.userId,
          createdAt: data.createdAt,
          expiresAt: expirationDate,
        },
      });
    } 
    
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

  async deleteExpense({ id }) {
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

    return this.prisma.expense.findMany({
      where: {
        userId: data.email,
        OR: [
          {
            OR: [
              {
                createdAt: {
                  gte: startDate,
                  lte: endDate,
                },
              },
              {
                fixed: true,
              },
            ],
          },
          {
            AND: [
              {
                expiresAt: {
                  gte: startDate,
                },
              },
              {
                fixed: false,
              },
            ],
          },
        ],
      },
    });
  }
}
