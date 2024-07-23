import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
export declare class AuthGuard implements CanActivate {
    private readonly jwtService;
    private reflector;
    private readonly configService;
    constructor(jwtService: JwtService, reflector: Reflector, configService: ConfigService);
    canActivate(context: ExecutionContext): Promise<any>;
    private extractTokenFromHeader;
}
