import { MikroORM } from '@mikro-orm/core';
import config from './mikro-orm.config';
import { Post } from './entities/post';
const main = async () => {
  const orm = await MikroORM.init(config);
  await orm.getMigrator().up();
  const post = orm.em.create(Post, { title: 'testing query' });

  await orm.em.persistAndFlush(post);
};

main().catch(err => console.error(err));
