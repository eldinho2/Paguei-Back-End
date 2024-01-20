import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { UsersService } from "src/users/users.service";
import { LoginDto } from "./dto/login-user.dto";
import * as bcrypt from 'bcrypt';
import { RegisterUsersDto } from "./dto/register-user.dto";
import { User } from "src/users/users.model";

@Injectable()
export class AuthService{

     constructor(
          private readonly prismaService: PrismaService,
          private jwtService: JwtService,
          private readonly usersService: UsersService){}

     
     async login(loginDto: LoginDto):Promise<any>{
          const { email, password } = loginDto;

          const users = await this.prismaService.user.findUnique({
            where: { email: email }
          })

          if (!users) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
          }

          if (password) {
            const validatePassword = await bcrypt.compare(password, users.hashedPassword)

            if (!validatePassword) {
              throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
            }
          }

          return {
               token: this.jwtService.sign({ email: users.email})
          }
     }

     async register (createDto: RegisterUsersDto): Promise<any>{      
      const createUser = new User();

      createUser.email = createDto.email;

      if (createDto.password) {
        createUser.password = await bcrypt.hash(createDto.password, 10);
      }

      try{
        const user = await this.usersService.createUser(createUser);
        return this.jwtService.sign({ email: user.email })
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
     
}