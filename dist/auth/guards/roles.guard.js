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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../../user/user.service");
let RolesGuard = class RolesGuard {
    constructor(reflector, jwtService, userService, configService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.userService = userService;
        this.configService = configService;
        console.log(process.env.SECRET);
    }
    async canActivate(context) {
        const roles = this.reflector.get('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            return false;
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('SECRET'),
            });
            request.user = payload;
            console.log(payload, "payload");
            const user = await this.userService.findById(payload.sub);
            console.log(user);
            return roles.some(role => user.roles?.includes(role));
        }
        catch {
            throw new common_1.UnauthorizedException({
                success: false,
                message: "User Not Allowed"
            });
        }
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : null;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService,
        user_service_1.UsersService,
        config_1.ConfigService])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map