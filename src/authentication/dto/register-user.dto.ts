import { IsString, Length, IsOptional } from "class-validator";

export class RegisterUsersDto {
     @IsOptional()
     @IsString()
     @Length(6,12)
     password?: string
     @IsString()
     @Length(5,15)
     email:string
}