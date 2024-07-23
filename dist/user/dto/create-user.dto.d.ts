import { Role } from '../enums/roles.enum';
export declare class CreateUserDto {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    roles: Role;
}
