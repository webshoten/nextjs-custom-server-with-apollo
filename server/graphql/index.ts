import { ApolloServer, BaseContext } from '@apollo/server'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import Todo from './model/todo'

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
  
  type Query {
    getTodo: Todo
  }
  `
  private resolvers = {
    Query: {
      getTodo: () => this.todo.getTodo(),
    },
  }

  public apolloServer = new ApolloServer<BaseContext>({
    typeDefs: this.typeDefs,
    resolvers: this.resolvers,
  })
}

export default GraphQL
