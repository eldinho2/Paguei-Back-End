import { PrismaService } from '../prisma.service';
import { Income } from './incomes.model';
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
export class IncomesService {
  constructor(private prisma: PrismaService) {}

  async createIncome(data: Income) {  
    if (data.totalInstallments > 1) {
      const amount = data.amount / data.totalInstallments;
      const groupId = uuid();
      const incomes = [];
  
      for (let i = 0; i < data.totalInstallments; i++) {
        const expirationDate = new Date(data.createdAt);
        expirationDate.setMonth(expirationDate.getMonth() + i);
  
        incomes.push({
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
  
      await this.prisma.income.createMany({
        data: incomes,
      });
  
      return {
        status: "Ok!",
        message: "Successfully fetch data!",
        result: {
          id: groupId,
          groupId: groupId,
          isPaid: false,
          amount: data.amount,
          description: data.description,
          fixed: data.fixed,
          installment: 1,
          totalInstallments: data.totalInstallments,
          createdAt: data.createdAt,
          expiresAt: incomes[incomes.length - 1].expiresAt,
          updatedAt: data.createdAt,
          userId: data.userId,
        }
      };
    }
  
    const createdExpense = await this.prisma.income.create({
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
      status: "Ok!",
      message: "Successfully fetch data!",
      result: {
        data : createdExpense
      }
    };
  }

  async deleteIncome({ id }) {
    return this.prisma.income.delete({
      where: {
        id: id,
      },
    });
  }

  async updateIncome(data: Income) {
    return this.prisma.income.update({
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

  async getAllUserIncomes(data: User) {
    return this.prisma.income.findMany({
      where: {
        userId: data.email,
      },
    });
  }

  async getIncomeByMonth(data) {
    const startDate = new Date(data.year, data.month - 1, 1);
    const endDate = new Date(data.year, data.month, 0, 23, 59, 59, 999);
  
    const incomes = await this.prisma.income.findMany({
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
  
    return incomes;
  }
}
