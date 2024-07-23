import { AuthService } from './auth.service';
import { UsersService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
    login(userBody: LoginDto): Promise<{
        user: any;
        token: any;
        success?: undefined;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
        user?: undefined;
        token?: undefined;
    }>;
}
