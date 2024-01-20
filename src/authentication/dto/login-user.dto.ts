import { IsString, Length } from "class-validator";


export class LoginDto {

  @IsString()
  @Length(6,12)
  password: string
  @IsString()
  @Length(5,15)
  email:string
}