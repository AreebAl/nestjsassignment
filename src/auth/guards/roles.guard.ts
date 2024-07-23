// src/auth/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from 'src/user/enums/roles.enum';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private userService: UsersService,
    private readonly configService:ConfigService
  ) {
    console.log(process.env.SECRET)
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
       return false
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret:this.configService.get<string>('SECRET'),
      });
      request.user = payload;
      console.log(payload,"payload");
      const user = await this.userService.findById(payload.sub);
      console.log(user)
      return roles.some(role => user.roles?.includes(role));
    } catch {
       throw new UnauthorizedException({
        success:false,
        message:"User Not Allowed"
       })
    }
  }

  private extractTokenFromHeader(request: any): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
