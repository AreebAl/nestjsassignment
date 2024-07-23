"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const logging_interceptor_1 = require("./auth/interceptor/logging.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor(app.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER)));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map