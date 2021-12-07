"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const helloResolver_1 = __importDefault(require("./resolvers/helloResolver"));
const post_1 = __importDefault(require("./resolvers/post"));
const UserResolver_1 = __importDefault(require("./resolvers/UserResolver"));
dotenv_1.default.config();
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    await orm.getMigrator().up();
    const app = (0, express_1.default)();
    const apollo = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [helloResolver_1.default, post_1.default, UserResolver_1.default],
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
//# sourceMappingURL=index.js.map