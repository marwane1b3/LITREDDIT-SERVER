"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const post_1 = require("./entities/post");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("./entities/user");
dotenv_1.default.config();
const password = process.env.DB_PASSWORD || '';
const user = process.env.DB_USER || '';
exports.default = {
    debug: !constants_1.__PROD__,
    migrations: {
        path: path_1.default.join(__dirname, './ migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/
    },
    entities: [post_1.Post, user_1.User],
    dbName: 'lirredit',
    password,
    user,
    type: 'postgresql'
};
//# sourceMappingURL=mikro-orm.config.js.map