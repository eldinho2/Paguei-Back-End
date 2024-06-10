import { PrismaService } from '../prisma.service';
import { Income } from './incomes.model';
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
export class IncomesService {
  constructor(private prisma: PrismaService) {}

  async createIncome(data: Income) {
    if (data.installments > 1) {

      const amount = data.amount / data.installments;
      const expirationDate = new Date(data.createdAt);
      const creationMonth = expirationDate.getMonth(); 
    
      expirationDate.setMonth(creationMonth + data.installments - 1);
    
      return this.prisma.income.create({
        data: {
          amount: amount,
          description: data.description,
          fixed: data.fixed,
          userId: data.userId,
          createdAt: data.createdAt,
          expiresAt: expirationDate,
          installments: data.installments,
        },
      });
    } 
    
    return this.prisma.income.create({
      data: {
        amount: data.amount,
        description: data.description,
        fixed: data.fixed,
        userId: data.userId,
        createdAt: data.createdAt,
      },
    });
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
                createdAt: {
                  lte: startDate,
                },
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
  
    return incomes;
  }
}
