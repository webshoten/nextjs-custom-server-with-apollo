import { ApolloServer, BaseContext } from '@apollo/server'
/** local DB **/
//import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
/** neon DB **/
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import Todo, { CreateTodoInputType, GetTodoInputType } from './model/todo'

class GraphQL {
  private todo: Todo
  constructor(db: NeonHttpDatabase<Record<string, never>>) {
    this.todo = new Todo(db)
  }

  private typeDefs = `
  type Todo {
    id: ID!
    title: String
    content: String
    createdAt: String
    updatedAt: String
    deletedAt: String
  }

  input CreateTodoInput {
    title: String
    content: String
  }

  input GetTodoInput {
    id: ID!
  }
  
  type Query {
    getTodo(input: GetTodoInput): Todo
  }

  type Mutation {
    createTodo(input: CreateTodoInput): Todo
  }
  `
  private resolvers = {
    Query: {
      getTodo: (root: any, { input }: { input: GetTodoInputType }) => {
        return this.todo.getTodo(input)
      },
    },
    Mutation: {
      createTodo: (root: any, { input }: { input: CreateTodoInputType }) =>
        this.todo.createTodo(input),
    },
  }

  public apolloServer = new ApolloServer<BaseContext>({
    typeDefs: this.typeDefs,
    resolvers: this.resolvers,
  })
}

export default GraphQL
