"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const auth_guard_1 = require("../auth/guards/auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("./decorators/roles.decorator");
const roles_enum_1 = require("./enums/roles.enum");
const logging_interceptor_1 = require("../auth/interceptor/logging.interceptor");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
let UserController = class UserController {
    constructor(userService, logger) {
        this.userService = userService;
        this.logger = logger;
        console.log("usr controller");
    }
    async findAll() {
        try {
            const users = await this.userService.findAll();
            this.logger.log("info", ['Fetching all users', users]);
            return {
                success: true,
                message: 'Users retrieved successfully',
                data: users,
            };
        }
        catch (error) {
            console.error('Error retrieving users', error);
            throw new common_1.InternalServerErrorException({
                success: false,
                message: `Failed to retrieve user. Please try again later.`,
                error: error.message,
            });
        }
    }
    async getUserById(id) {
        try {
            const user = await this.userService.findById(id);
            return {
                success: true,
                message: `User with ID ${id} retrieved successfully`,
                data: user,
            };
        }
        catch (err) {
            console.error(err.message);
            throw new Error(err.message);
        }
    }
    async create(user) {
        try {
            console.log(user);
            const newUser = await this.userService.createUser(user);
            return {
                success: true,
                message: "User created succesfully",
                data: newUser
            };
        }
        catch (err) {
            console.log(err.message);
            throw new common_1.InternalServerErrorException({
                success: false,
                message: "Failed to create user.Please try again later.",
                error: err instanceof Error ? err.message : "Uknown Error"
            });
        }
    }
    async update(id, user) {
        try {
            const existingUser = await this.userService.updateUser(id, user);
            return {
                success: true,
                message: `User with ID ${id} updated successfully`,
                data: existingUser,
            };
        }
        catch (error) {
            console.error(`Error updating user with ID ${id}`, error);
            throw new common_1.InternalServerErrorException({
                success: false,
                message: `Failed to update user with ID ${id}. Please try again later.`,
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
    async deleteUser(id) {
        try {
            const deletedUser = await this.userService.remove(id);
            return {
                success: true,
                message: `User with ID ${id} deleted successfully`,
                data: deletedUser,
            };
        }
        catch (err) {
            console.log(err.message);
            throw new common_1.InternalServerErrorException({
                success: false,
                message: `Failed to delete user with ID ${id}. Please try again later.`,
                error: err instanceof Error ? err.message : 'Unknown error',
            });
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.SUPER_ADMIN),
    (0, common_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.SUPER_ADMIN, roles_enum_1.Role.CLIENT),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.SUPER_ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.SUPER_ADMIN),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.SUPER_ADMIN),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)(logging_interceptor_1.LoggingInterceptor),
    (0, common_1.Controller)('user'),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER)),
    __metadata("design:paramtypes", [user_service_1.UsersService,
        winston_1.Logger])
], UserController);
//# sourceMappingURL=user.controller.js.map