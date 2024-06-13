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
    console.log(data);
  
    if (data.totalInstallments > 1) {
      const amount = data.amount / data.totalInstallments;
      const groupId = uuid(); // Crie um UUID para agrupar as parcelas
      const expenses = [];
  
      for (let i = 0; i < data.totalInstallments; i++) {
        const expirationDate = new Date(data.createdAt);
        expirationDate.setMonth(expirationDate.getMonth() + i);
  
        expenses.push({
          amount: amount,
          is_paid: false,
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
  
      return this.prisma.expense.createMany({
        data: expenses,
      });
    } 
  
    return this.prisma.expense.create({
      data: {
        amount: data.amount,
        is_paid: data.isPaid,
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
