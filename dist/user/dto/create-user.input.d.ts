import { Role } from 'src/user/enums/roles.enum';
export declare class CreateUserInput {
    name: string;
    email: string;
    password: string;
    roles: Role;
}
