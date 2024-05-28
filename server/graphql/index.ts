import { ApolloServer, BaseContext } from '@apollo/server'
/** local DB **/
//import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
/** neon DB **/
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import User, {CreateUserInputType,GetUserInputType} from './model/user'

class GraphQL {
  private user: User

  constructor(db: NeonHttpDatabase<Record<string, never>>) {
    this.user = new User(db)
  }

  private typeDefs = `
  type User {
    userId: ID!
    name: String
    fedId: String
    userType: String
    createdAt: String
    updatedAt: String
    deletedAt: String
  }

  input GetUserInput {
    userId: ID!
  }

  input CreateUserInput {
    name: String
    fedId: String
    userType: String
  }

  type Query {
    getUser(input: GetUserInput): User
  }

  type Mutation {
    createUser(input: CreateUserInput): User
  }
  `
  private resolvers = {
    Query: {
      getUser: (root: any, param:GetUserInputType) => {
        return this.user.getUser(param)
      }
    },
    Mutation: {
      createUser: (root: any, param:CreateUserInputType) =>
        this.user.createUser(param),
    },
  }

  public apolloServer = new ApolloServer<BaseContext>({
    typeDefs: this.typeDefs,
    resolvers: this.resolvers,
  })
}

export default GraphQL
