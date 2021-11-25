import { Post } from '../entities/post';
import { MyContext } from '../types';
import { Arg, Ctx, Query, Resolver, Int, Mutation } from 'type-graphql';
import { wrap } from '@mikro-orm/core';
@Resolver()
export default class PostResolver {
    @Query(() => [Post])
    getPosts(@Ctx() { em }: MyContext): Promise<Post[]> {
        return em.find(Post, {});
    }

    @Query(() => Post, { nullable: true })
    async getPost(@Ctx() { em }: MyContext, @Arg('id', () => Int) id: number): Promise<Post | null> {
        const post = await em.findOne(Post, { _id: id })

        if (post) {
            return post
        } else {
            return null
        }
    }

    @Mutation(() => Post || String)
    async createPost(@Ctx() { em }: MyContext, @Arg('title', () => String) title: string): Promise<Post | String> {
        let createPost: Post | String = em.create(Post, { title });


        if (createPost) {
            await em.persistAndFlush(createPost);

        } else {
            createPost = 'failed to create post'
        }
        return createPost


    }
    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Ctx() { em }: MyContext,
        @Arg('id', () => Int) id: number,
        @Arg('value', () => String) value: string): Promise<Post | null> {
        let findPost = await em.findOne(Post, { _id: id });
        let newVal: any;
        if (findPost) {
            newVal = wrap(findPost).assign({ title: value }, { mergeObjects: true })
            await em.persistAndFlush(newVal);
            return newVal
        } else {
            return null
        }


    }

    @Mutation(() => Boolean)
    async deletePost(
        @Ctx() { em }: MyContext,
        @Arg('id', () => Int) id: number,
    ): Promise<Boolean> {
        let findPost = await em.findOne(Post, { _id: id });

        if (findPost) {
            await em.removeAndFlush(findPost)
            return true
        } else {
            return false
        }


    }
}
