import { User } from 'src/entities/user.entity';
import { UsersService } from './user.service';
import { ResponseDto } from 'src/response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Logger } from 'winston';
export declare class UserController {
    private readonly userService;
    private readonly logger;
    constructor(userService: UsersService, logger: Logger);
    findAll(): Promise<ResponseDto<User[]>>;
    getUserById(id: number): Promise<ResponseDto<User>>;
    create(user: CreateUserDto): Promise<ResponseDto<User>>;
    update(id: number, user: UpdateUserDto): Promise<{
        success: boolean;
        message: string;
        data: UpdateUserDto;
    }>;
    deleteUser(id: any): Promise<any>;
}
