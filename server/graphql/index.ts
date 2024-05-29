import { Request,Response } from 'express'
import { ApolloServer, BaseContext,GraphQLServerContext } from '@apollo/server'
/** local DB **/
//import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
/** neon DB **/
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import {OAuth2Client} from 'google-auth-library'
import User, {CreateUserInputType,GetUserInputType,} from './model/user'
import Google,{VerifyGoogleInputType} from './auth/google'
import nookies,{destroyCookie,setCookie} from 'nookies'


class GraphQL {
  private user: User
  private oauth2: Google

  constructor(db: NeonHttpDatabase<Record<string, never>>,oauth2:OAuth2Client) {
    this.user = new User(db)
    this.oauth2 = new Google(oauth2)
  }

  private typeDefs = `
  type User {
    sub: String!
    name: String
    email: String
    provider: String
    userType: String
    createdAt: String
    updatedAt: String
    deletedAt: String
  }

  input GetUserInput {
    sub: String!
  }

  input GetUserInput {
    sub: String!
  }  

  input GoogleLoginInput {
    idToken: String
  }

  type Query {
    getUser(input: GetUserInput): User
    isAuthByIdToken(input: GoogleLoginInput): Boolean
  }

  type Mutation {
    googleLogin(input: GoogleLoginInput): User
    googleLogout: Boolean
  }
  `
  private resolvers = {
    Query: {
      getUser: async (root:any,param:GetUserInputType,ctx:{req:Request,res:Response}) => {
        if(!this.isAuthByCookie(ctx))throw "no auth"
        return await this.user.getUser(param)
      },
      isAuthByIdToken: async (root:any,param:VerifyGoogleInputType,ctx:{req:Request,res:Response}) => {
        return await this.isAuthByIdToken(param)
      },
    },
    Mutation: {
      googleLogin:async (root: any,p:VerifyGoogleInputType,ctx:{req:Request,res:Response}) =>{
        if(!p.input?.idToken) throw "no idToken"

        setCookie({res:ctx.res}, 'idToken', p.input?.idToken, {
          maxAge: 60 * 60,
          secure: true,
          path: '/',
          httpOnly:true
        }); 

        const res = await this.oauth2.verifyGoogle({input:{idToken:p.input?.idToken}})
        const user = await this.user.getUserBySub({input:{sub:res.getPayload()?.sub || ''}})
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
          return await this.user.createUser(param)
        }else{
          return user;
        }
      },
      googleLogout:async (root: any,{},ctx:{req:Request,res:Response}) =>{
        try {
          destroyCookie({res:ctx.res},"idToken")
          return true
        } catch (error) {
          return false
        }
      }
    },
  }

  public apolloServer = new ApolloServer<BaseContext>({
    typeDefs: this.typeDefs,
    resolvers: this.resolvers,
  })

  private isAuthByCookie = async (ctx:{req:Request,res:Response}) => {
    const cookie = nookies.get(ctx)
    if(!cookie?.idToken) throw "no idToken"
    const res = await this.oauth2.verifyGoogle({input:{idToken:cookie?.idToken}})
    const me = await this.user.getUserBySub({input:{sub:res.getPayload()?.sub || ''}})
    if(!me) return false
    return true
  }

  private isAuthByIdToken = async (param:VerifyGoogleInputType) => {
    if(!param.input.idToken) return false
    const res = await this.oauth2.verifyGoogle({input:{idToken:param.input.idToken}})
    const me = await this.user.getUserBySub({input:{sub:res.getPayload()?.sub || ''}})
    if(!me) return false
    return true
  }
}

export default GraphQL
