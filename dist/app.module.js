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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const global_module_1 = require("./global/global.module");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const nest_winston_1 = require("nest-winston");
const logger_1 = require("./auth/logger/logger");
const user_module_1 = require("./user/user.module");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const path_1 = require("path");
const logging_interceptor_1 = require("./auth/interceptor/logging.interceptor");
let AppModule = class AppModule {
    constructor(configService) {
        this.configService = configService;
        console.log("connected to db");
        console.log((0, path_1.join)(process.cwd(), 'src/user/user.graphql'));
        console.log(this.configService.get('DATABASE_HOST'));
        console.log(this.configService.get('DATABASE_PORT'));
        console.log(this.configService.get('DATABASE_USER'));
        console.log(this.configService.get('DATABASE_PASSWORD'));
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                playground: false,
                typePaths: ['./**/*.graphql'],
                installSubscriptionHandlers: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    type: 'postgres',
                    host: configService.get('DATABASE_HOST'),
                    port: configService.get('DATABASE_PORT'),
                    username: configService.get('DATABASE_USER'),
                    password: configService.get('DATABASE_PASSWORD'),
                    database: configService.get('DATABASE_NAME'),
                    synchronize: true,
                    entities: [user_entity_1.User],
                    ssl: {
                        rejectUnauthorized: false,
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            nest_winston_1.WinstonModule.forRoot(logger_1.winstonConfig),
            user_module_1.UserModule,
            global_module_1.GlobalModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, logging_interceptor_1.LoggingInterceptor],
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppModule);
//# sourceMappingURL=app.module.js.map