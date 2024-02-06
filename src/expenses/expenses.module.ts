import { Module } from "@nestjs/common";
import { ExpensesController } from "./expenses.controller";
import { ExpensesService } from "./expenses.service";
import { PrismaService } from "src/prisma.service";



@Module({
     controllers: [ExpensesController],
     providers: [ExpensesService,PrismaService]
})
export class ExpensesModule{}