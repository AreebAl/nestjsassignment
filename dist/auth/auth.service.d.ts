import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/user.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    generateJwtToken(user: any): Promise<any>;
}
