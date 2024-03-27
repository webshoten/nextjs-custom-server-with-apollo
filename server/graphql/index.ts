import { ApolloServer, BaseContext } from '@apollo/server'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import Todo, { CreateTodoInputType } from './model/todo'

class GraphQL {
  private todo: Todo
  constructor(db: PostgresJsDatabase<Record<string, never>>) {
    this.todo = new Todo(db)
  }

  private typeDefs = `
  type Todo {
    id: ID
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
  
  type Query {
    getTodo: Todo
    createTodo(input: CreateTodoInput): Todo
  }
  `
  private resolvers = {
    Query: {
      getTodo: () => this.todo.getTodo(),
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
