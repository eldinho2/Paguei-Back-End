import { IsString, Length } from "class-validator";


export class LoginDto {
  @IsString()
  @Length(5,15)
  email:string
  @IsString()
  name:string
  @IsString()
  image:string
}