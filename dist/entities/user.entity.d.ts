import { Role } from 'src/user/enums/roles.enum';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    roles: Role;
    hashPassword(): Promise<void>;
}
