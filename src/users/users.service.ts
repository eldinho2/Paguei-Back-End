import { PrismaService } from "src/prisma.service";
import { User } from "./users.model";
import { ConflictException, Injectable } from "@nestjs/common";


@Injectable()
export class UsersService{

     constructor(private prisma: PrismaService){}

     async getAllUser():Promise<User[]>{
          return this.prisma.user.findMany();
     }


     async createUser(data:User): Promise<User>{      
          const existing = await this.prisma.user.findUnique({
               where: {
                 email: data.email,
               },
             });
         
             if (existing) {
               throw new ConflictException('username already exists');
             }

             console.log(data);
             
         
             return this.prisma.user.create({
               data: {
                  email: data.email,
                  name: data.name,
                  picture: data.picture
               }
             });
     }
}