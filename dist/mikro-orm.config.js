"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const post_1 = require("./entities/post");
const path_1 = __importDefault(require("path"));
exports.default = {
    debug: !constants_1.__PROD__,
    migrations: {
        path: path_1.default.join(__dirname, './ migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/
    },
    entities: [post_1.Post],
    dbName: 'lirredit',
    password: '123456',
    user: 'postgres',
    type: 'postgresql'
};
//# sourceMappingURL=mikro-orm.config.js.map