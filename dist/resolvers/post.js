"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_1 = require("../entities/post");
const type_graphql_1 = require("type-graphql");
const core_1 = require("@mikro-orm/core");
let PostResolver = class PostResolver {
    getPosts({ em }) {
        return em.find(post_1.Post, {});
    }
    async getPost({ em }, id) {
        const post = await em.findOne(post_1.Post, { _id: id });
        if (post) {
            return post;
        }
        else {
            return null;
        }
    }
    async createPost({ em }, title) {
        let createPost = em.create(post_1.Post, { title });
        if (createPost) {
            await em.persistAndFlush(createPost);
        }
        else {
            createPost = 'failed to create post';
        }
        return createPost;
    }
    async updatePost({ em }, id, value) {
        let findPost = await em.findOne(post_1.Post, { _id: id });
        let newVal;
        if (findPost) {
            newVal = (0, core_1.wrap)(findPost).assign({ title: value }, { mergeObjects: true });
            await em.persistAndFlush(newVal);
            return newVal;
        }
        else {
            return null;
        }
    }
    async deletePost({ em }, id) {
        let findPost = await em.findOne(post_1.Post, { _id: id });
        if (findPost) {
            await em.removeAndFlush(findPost);
            return true;
        }
        else {
            return false;
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [post_1.Post]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getPosts", null);
__decorate([
    (0, type_graphql_1.Query)(() => post_1.Post, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getPost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => post_1.Post || String),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)('title', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => post_1.Post, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)('id', () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Arg)('value', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updatePost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
PostResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], PostResolver);
exports.default = PostResolver;
//# sourceMappingURL=post.js.map