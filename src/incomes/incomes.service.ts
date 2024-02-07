import { PrismaService } from 'src/prisma.service';
import { Income } from './incomes.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IncomesService {
  constructor(private prisma: PrismaService) {}

  async createIncome(data: Income) {
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

  async deleteIncome(id: string) {
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

  async getAllUserIncomes() {
    return this.prisma.expense.findMany();
  }


  async getIncomeByMonth(userId: string, month: number) {
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

    return this.prisma.income.findMany({
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