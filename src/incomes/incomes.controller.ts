import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { IncomesService } from "./incomes.service";
import {Request,Response} from 'express'
import { JwtAuthGuard } from "src/authentication/auth.guard";


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

  @Get('/get-income-by-month')
  @UseGuards(JwtAuthGuard)
  async getIncomeByMonth(@Req() request: Request, @Res() response: Response):Promise<any>{
    try{
      const result = await this.usersService.getIncomeByMonth(request.body.userId, request.body.month);
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
        updateAt: undefined
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
}