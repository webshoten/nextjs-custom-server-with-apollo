import { ApolloServer, BaseContext } from '@apollo/server'
/** local DB **/
//import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
/** neon DB **/
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import User, {CreateUserInputType,GetUserInputType,GetUserBySubInputType} from './model/user'
import {OAuth2Client} from 'google-auth-library'

class GraphQL {
  private user: User
  private client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)

  constructor(db: NeonHttpDatabase<Record<string, never>>) {
    this.user = new User(db)
  }

  private typeDefs = `
  type User {
    userId: ID!
    name: String
    email: String
    sub: String
    provider: String
    userType: String
    createdAt: String
    updatedAt: String
    deletedAt: String
  }

  input GetUserInput {
    userId: ID!
  }

  input GetUserBySubInput {
    sub: String
  }

  input CreateUserInput {
    name: String
    email: String
    sub: String
    provider: String
    userType: String
  }

  input GoogleLoginInput {
    idToken: String
  }

  type Query {
    getUser(input: GetUserInput): User
    getUserBySub(input: GetUserBySubInput): User
  }

  type Mutation {
    createUser(input: CreateUserInput): User
    googleLogin(input: GoogleLoginInput): User
  }
  `
  private resolvers = {
    Query: {
      getUser: (root: any, param:GetUserInputType) => {
        return this.user.getUser(param)
      },
      getUserBySub: (root: any, param:GetUserBySubInputType) => {
        return this.user.getUserBySub(param)
      }
    },
    Mutation: {
      createUser: (root: any, param:CreateUserInputType) =>
        this.user.createUser(param),
      googleLogin:async (root: any, {input}:{input:{idToken:string}}) =>{
        console.log(input)
        const res = await this.client.verifyIdToken({idToken:input.idToken,audience:process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID})
        const user = await this.user.getUserBySub({input:{sub:res.getPayload()?.sub || ''}})
        let createdUser
        if(!user){
          const param = {
            input:{
              name:res.getPayload()?.name || '',
              email:res.getPayload()?.email || '',
              sub:res.getPayload()?.sub || '',
              provider:'google' ,
              userType:'default'
            }
          }
          createdUser = await this.user.createUser(param)
          return createdUser;
        }else{
          return user;
        }
      }
    },
  }

  public apolloServer = new ApolloServer<BaseContext>({
    typeDefs: this.typeDefs,
    resolvers: this.resolvers,
  })
}

export default GraphQL
