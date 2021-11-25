import { MikroORM } from '@mikro-orm/core';
import config from './mikro-orm.config';
import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import HelloResolver from './resolvers/helloResolver';
import PostResolver from './resolvers/post';
dotenv.config();

const main = async () => {
  const orm = await MikroORM.init(config);
  await orm.getMigrator().up();

  const app = express();

  const apollo = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false
    }),
    context: () => ({
      em: orm.em
    })
  });
  await apollo.start();
  apollo.applyMiddleware({ app });
  app.listen(process.env.PORT, () => {
    console.log(`server running on portt : ${process.env.PORT}`);
  });
};

main().catch(err => console.error(err));
