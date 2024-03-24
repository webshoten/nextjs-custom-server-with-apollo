"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("@apollo/server");
var todo_1 = __importDefault(require("./model/todo"));
var GraphQL = /** @class */ (function () {
    function GraphQL(db) {
        var _this = this;
        this.typeDefs = "\n  type Todo {\n    id: ID\n    title: String\n    content: String\n    createdAt: String\n    updatedAt: String\n    deletedAt: String\n  }\n  \n  type Query {\n    getTodo: Todo\n  }\n  ";
        this.resolvers = {
            Query: {
                getTodo: function () { return _this.todo.getTodo(); },
            },
        };
        this.apolloServer = new server_1.ApolloServer({
            typeDefs: this.typeDefs,
            resolvers: this.resolvers,
        });
        this.todo = new todo_1.default(db);
    }
    return GraphQL;
}());
exports.default = GraphQL;
