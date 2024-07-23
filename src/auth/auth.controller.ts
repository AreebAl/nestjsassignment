// src/auth/auth.controller.ts
import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import  jwtService from '@nestjs/jwt';
import { UsersService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { Roles } from 'src/user/decorators/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { RolesGuard } from './guards/roles.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@UseGuards(RolesGuard)
@Controller('auth')
export class AuthController {
  // jwtService: any;
  constructor(private readonly authService: AuthService, private readonly userService: UsersService) { }
 // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() userBody:LoginDto) {
    try{
      const { email, password } = userBody
      //const user = await this.userService.validateUser(email, password);
      const user=await this.authService.validateUser(email,password);
      const accessToken = await this.authService.generateJwtToken(user);
      return {user:user,token: accessToken };
    }catch(err){
        return {success:false,message:err.message};
    }
  }

  
  // @UseGuards(AuthGuard('jwt'))
  // @Post('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
