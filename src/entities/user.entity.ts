// src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/user/enums/roles.enum';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(()=>Int)
  id: number;

  @Field()
  @Column({ length: 50 })
  name: string;

  @Field()
  @Column({ unique: true, length: 100 })
  email: string;

  @Field()
  @Column({ length: 100 })
  password: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CLIENT,
  })
  roles: Role;



  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
