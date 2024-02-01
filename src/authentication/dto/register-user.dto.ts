import { IsString, Length } from "class-validator";

export class RegisterUsersDto {
  @IsString()
  @Length(5,15)
  email:string
  @IsString()
  name:string
  @IsString()
  picture:string
}