import { Controller, Get, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { IncomesService } from "./incomes.service";
import {Request,Response} from 'express'
import { JwtAuthGuard } from "../authentication/auth.guard";


@Controller('incomes')
export class IncomesController {
  constructor(private usersService: IncomesService) {}

  @Post('/create-income')
  @UseGuards(JwtAuthGuard)
  async createIncome(@Req() request: Request, @Res() response: Response):Promise<any>{
    try{
      const result = await this.usersService.createIncome(request.body);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result
      })
    }catch(err){
      return response.status(500).json({
        status: 'Ok!',
        message : 'Internal Server Error!'
      })
    }
  }

  @Get('/get-income-by-month/:month/:year/:email')
  @UseGuards(JwtAuthGuard)
  async getExpenseByMonth(@Req() request: Request, @Res() response: Response):Promise<any>{
    try{
      const result = await this.usersService.getIncomeByMonth({
        email: request.params.email,
        month: parseInt(request.params.month),
        year: parseInt(request.params.year)
      });
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result
      })
    }catch(err){
      return response.status(500).json({
        status: 'Ok!',
        message : 'Internal Server Error!'
      })
    }
  }

  @Get('/get-all-incomes/:email')
  @UseGuards(JwtAuthGuard)
  async getAllIncomes(@Req() request: Request, @Res() response: Response):Promise<any>{
    try{
      const result = await this.usersService.getAllUserIncomes({
        email: request.params.email,
        id: "",
        name: "",
        image: "",
        createdAt: undefined,
        updateAt: undefined,
        totalInstallments: 1
      });
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result
      })
    }catch(err){
      return response.status(500).json({
        status: 'Ok!',
        message : 'Internal Server Error!'
      })
    }
  }

  @Post('/delete-income')
  @UseGuards(JwtAuthGuard)
  async deleteExpense(@Req() request: Request, @Res() response: Response):Promise<any>{
    try{
      const result = await this.usersService.deleteIncome(request.body);
      console.log(result);
      
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result
      })
    }catch(err){
      return response.status(500).json({
        status: 'Ok!',
        message : err
      })
    }
  }

  @Put('/update-income')
  @UseGuards(JwtAuthGuard)
  async updateExpense(@Req() request: Request, @Res() response: Response):Promise<any>{
    try{
      const result = await this.usersService.updateIncome({
        id: request.params.id,
        amount: request.body.amount,
        isPaid: request.body.isPaid,
        description: request.body.description,
        fixed: request.body.fixed,
        userId: request.body.userId,
        createdAt: request.body.createdAt,
        totalInstallments: request.body.totalInstallments,
        expiresAt: request.body.expiresAt,
        groupId: request.body.groupId
      });
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result
      })
    }catch(err){
      return response.status(500).json({
        status: 'Ok!',
        message : err
      })
    }
  }
}