// src/users/dto/create-user.dto.ts
import { IsEmail, IsString, IsNotEmpty, MinLength, IsNumber, isNotEmpty, IsOptional, IsDate, IsEnum } from 'class-validator';
import { Role } from '../enums/roles.enum';

export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsDate()
  createdAt:Date

  @IsOptional()
  @IsDate()
  updatedAt:Date
  
  @IsEnum(Role, { each: true })
  role: Role;

}
