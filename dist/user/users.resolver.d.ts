import { User } from '../entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersService } from './user.service';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UsersService);
    getUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    createUser(createUserData: CreateUserInput): Promise<any>;
    updateUser(updateUserData: UpdateUserInput): Promise<import("./dto/update-user.dto").UpdateUserDto>;
    deleteUser(id: number): Promise<boolean>;
}
