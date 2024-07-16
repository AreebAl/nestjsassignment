// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { use } from 'passport';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
     private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // async login(email: string, password: string): Promise<{ accessToken: string }> {
  //   //const user = await this.usersService.validateUser(email, password);
  //   // console.log(user);
  //   // const accessToken =  this.jwtService.sign({
  //   //   email: user.email,
  //   //   sub: user.id,
  //   // });
  //  // return { accessToken };
  // }

   async generateJwtToken(user: any): Promise<any>{
    console.log(user,"from user");
      const payload = { email: user.email, sub: user.id };
      console.log(payload)
      return this.jwtService.sign(payload);
    }
}
