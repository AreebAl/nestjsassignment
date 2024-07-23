import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/user.service';
export declare class RolesGuard implements CanActivate {
    private reflector;
    private jwtService;
    private userService;
    private readonly configService;
    constructor(reflector: Reflector, jwtService: JwtService, userService: UsersService, configService: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
