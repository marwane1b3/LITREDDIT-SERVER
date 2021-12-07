
import { User } from '../entities/user';
import { MyContext } from 'src/types';
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';

import argon2 from 'argon2'
import { ApolloError } from 'apollo-server-express';
@InputType()
class UsernamePasswordInput {
    @Field()
    username: string
    @Field()
    password: string

}

@Resolver()
export default class UserResolver {
    @Mutation(() => User, { nullable: true })
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ): Promise<User | null> {
        const hashedPassword = await argon2.hash(options.password)
        const userExists = await em.find(User, { username: options.username });
        if (userExists) {
            throw new ApolloError('user already taken', '401')
        }
        const user = em.create(User, { username: options.username, password: hashedPassword });
        await em.persistAndFlush(user)
        return user;


    }
}
