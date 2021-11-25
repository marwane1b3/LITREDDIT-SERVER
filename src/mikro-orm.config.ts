import { MikroORM } from '@mikro-orm/core';
import { __PROD__ } from './constants';
import { Post } from './entities/post';
import path from 'path';

export default {
  debug: !__PROD__,
  migrations: {
    path: path.join(__dirname, './ migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/
  },
  entities: [Post],
  dbName: 'lirredit',
  password: '123456',
  user: 'postgres',
  type: 'postgresql'
} as Parameters<typeof MikroORM.init>[0];
