import { Controller, Get, Req, Res, UseGuards, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import {Request,Response} from 'express'
import { JwtAuthGuard } from "../authentication/auth.guard";


@Controller('users')
export class UsersController {
     constructor(private readonly userService : UsersService){}

     @Get()
     @UseGuards(JwtAuthGuard)
     async getAllUsers(@Req() request: Request, @Res() response: Response):Promise<any>{
          try{
               const result = await this.userService.getAllUser();
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

     @Get('/user/:email')
      async getUser(@Req() request: Request, @Res() response: Response):Promise<any>{
            try{
                const result = await this.userService.getUser(request.params.email);
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

      @Get('/wake')
      async getWakeStatus(@Req() request: Request, @Res() response: Response):Promise<any>{
            try{
                const result = await this.userService.getWakeStatus();
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

      @Post('/wake')
      async setWakeStatus(@Req() request: Request, @Res() response: Response):Promise<any>{
            try{
                const { text } = request.body;
                await this.userService.setWakeStatus(true, text);
                
                // Aguarda 10 segundos e seta para false
                setTimeout(async () => {
                    await this.userService.setWakeStatus(false, 'Wake status automaticamente desativado após 10 segundos');
                }, 10000);

                return response.status(200).json({
                      status: 'Ok!',
                      message: 'Wake status set to true for 10 seconds!'
                })
            }catch(err){
                return response.status(500).json({
                      status: 'Error!',
                      message : 'Internal Server Error!'
                })
            }
      }

      @Get('/wake/logs')
      async getWakeLogs(@Req() request: Request, @Res() response: Response):Promise<any>{
            try{
                const logs = await this.userService.getWakeLogs();
                return response.status(200).json({
                      status: 'Ok!',
                      message: 'Logs obtidos com sucesso!',
                      result: logs
                })
            }catch(err){
                return response.status(500).json({
                      status: 'Error!',
                      message : 'Erro interno do servidor!'
                })
            }
      }
}