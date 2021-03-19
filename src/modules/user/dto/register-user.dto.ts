import { IsEmail, IsOptional, IsString } from "class-validator";

export class RegisterUserDto {

  @IsString()
  public username: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public readonly name: string;

  @IsString()
  public salt: string;
}