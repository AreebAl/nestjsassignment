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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const global_service_1 = require("../global/global.service");
const user_entity_1 = require("../entities/user.entity");
let UsersService = class UsersService {
    constructor(userRepository, globalService) {
        this.userRepository = userRepository;
        this.globalService = globalService;
        this.globalService.getGlobalInfo();
    }
    findAll() {
        const user = this.userRepository.find();
        return this.userRepository.find();
    }
    findById(id) {
        return this.userRepository.findOneById(id);
    }
    async findByEmail(email) {
        return await this.userRepository.findOne({ where: { email } });
    }
    async createUser(user) {
        try {
            user.password = await bcrypt.hash(user.password, 10);
            console.log(user, "from service user");
            return this.userRepository.save(user);
        }
        catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }
    async updateUser(id, user) {
        const existingUser = await this.userRepository.findOne({ where: { id } });
        console.log("existinguser", existingUser);
        if (!existingUser) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        }
        this.userRepository.update(id, user);
        return user;
    }
    async remove(id) {
        const existingUser = await this.userRepository.findOne({ where: { id } });
        console.log("existing user", existingUser);
        if (!existingUser) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        const result = await this.userRepository.delete(id);
        console.log(result);
        return existingUser;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        global_service_1.GlobalService])
], UsersService);
//# sourceMappingURL=user.service.js.map