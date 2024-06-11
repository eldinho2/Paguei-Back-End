import { Controller, Get, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { ExpensesService } from "./expenses.service";
import {Request,Response} from 'express'
import { JwtAuthGuard } from "../authentication/auth.guard";


@Controller('expenses')
export class ExpensesController {
  constructor(private usersService: ExpensesService) {}

  @Post('/create-expense')
  @UseGuards(JwtAuthGuard)
  async createExpense(@Req() request: Request, @Res() response: Response):Promise<any>{
    try{
      const result = await this.usersService.createExpense(request.body);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result
      })
    }catch(err){
      console.log(err);
      
      return response.status(500).json({
        status: 'Ok!',
        message : 'Internal Server Error!'
      })
    }
  }

  @Get('/get-expense-by-month/:month/:year/:email')
  @UseGuards(JwtAuthGuard)
  async getExpenseByMonth(@Req() request: Request, @Res() response: Response):Promise<any>{
    try{
      const result = await this.usersService.getExpenseByMonth({
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

  @Get('/get-all-expenses/:email')
  @UseGuards(JwtAuthGuard)
  async getAllExpenses(@Req() request: Request, @Res() response: Response):Promise<any>{
    try{
      const result = await this.usersService.getAllUserExpensives({
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

  @Post('/delete-expense')
  @UseGuards(JwtAuthGuard)
  async deleteExpense(@Req() request: Request, @Res() response: Response):Promise<any>{
    try{
      const result = await this.usersService.deleteExpense(request.body);      
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

  @Put('/update-expense')
  @UseGuards(JwtAuthGuard)
  async updateExpense(@Req() request: Request, @Res() response: Response):Promise<any>{
    try{
      const result = await this.usersService.updateExpense(request.body);
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
}