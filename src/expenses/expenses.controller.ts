import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ExpensesService } from "./expenses.service";
import {Request,Response} from 'express'
import { JwtAuthGuard } from "src/authentication/auth.guard";


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
      return response.status(500).json({
        status: 'Ok!',
        message : 'Internal Server Error!'
      })
    }
  }

  @Get('/get-all-expenses')
  @UseGuards(JwtAuthGuard)
  async getAllExpenses(@Req() request: Request, @Res() response: Response):Promise<any>{
    try{
      const result = await this.usersService.getAllUserExpensives();
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