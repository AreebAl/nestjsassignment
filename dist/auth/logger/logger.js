"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonConfig = void 0;
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
exports.winstonConfig = {
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp(), nest_winston_1.utilities.format.nestLike()),
        }),
        new winston.transports.File({
            filename: 'app.log',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),
    ],
};
//# sourceMappingURL=logger.js.map