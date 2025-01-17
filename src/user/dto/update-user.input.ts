import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';
import { PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(()=>Int)
  @IsNotEmpty()
  id: number;
  
}
