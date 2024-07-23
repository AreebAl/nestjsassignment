import { Repository } from 'typeorm';
import { GlobalService } from '../global/global.service';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
export declare class UsersService {
    private readonly userRepository;
    private readonly globalService;
    constructor(userRepository: Repository<User>, globalService: GlobalService);
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    createUser(user: CreateUserDto | CreateUserInput): Promise<any>;
    updateUser(id: number, user: UpdateUserDto | UpdateUserInput): Promise<UpdateUserDto>;
    remove(id: number): Promise<User>;
}
