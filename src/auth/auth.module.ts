// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../user/user.service'; // Adjust path as needed
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [

    JwtModule.registerAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), 
        signOptions: { expiresIn: '10D' }, 
      }),
      inject: [ConfigService], 
    }),
    UserModule, 
    PassportModule,
  ],
  providers: [AuthService, JwtStrategy,LocalStrategy], 
  controllers: [AuthController],
})
export class AuthModule {}
