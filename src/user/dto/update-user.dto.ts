// src/users/dto/update-user.dto.ts
import { IsEmail, IsString, IsOptional, MinLength, IsEnum } from 'class-validator';
import { Role } from '../enums/roles.enum';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';


export class UpdateUserDto extends PartialType(CreateUserDto){
  id:number;
  // @IsString()
  // @IsOptional()
  // name?: string;

  // @IsEmail()
  // @IsOptional()
  // email?: string;

  // @IsString()
  // @MinLength(6)
  // @IsOptional()
  // password?: string;

  // @IsOptional()
  // @IsEnum(Role, { each: true })
  // role: Role;
}
