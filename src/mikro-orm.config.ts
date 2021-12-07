import { MikroORM } from '@mikro-orm/core';
import { __PROD__ } from './constants';
import { Post } from './entities/post';
import path from 'path';
import dotenv from 'dotenv';
import { User } from './entities/user';

dotenv.config();

const password = process.env.DB_PASSWORD || '';
const user = process.env.DB_USER || '';
export default {
    debug: !__PROD__,
    migrations: {
        path: path.join(__dirname, './ migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/
    },
    entities: [Post, User],
    dbName: 'lirredit',
    password,
    user,
    type: 'postgresql'
} as Parameters<typeof MikroORM.init>[0];
