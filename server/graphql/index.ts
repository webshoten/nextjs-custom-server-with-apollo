import type { BaseContext } from '@apollo/server'
import { ApolloServer } from '@apollo/server'
import type { Request, Response } from 'express'
/** local DB **/
//import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
/** neon DB **/
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import type { OAuth2Client } from 'google-auth-library'
import nookies, { destroyCookie, setCookie } from 'nookies'
import type { VerifyGoogleInputType } from './auth/google'
import Google from './auth/google'
import type { GetUserInputType } from './model/user'
import User from './model/user'
import type { GetBookBySubInputType, CreateBookInputType } from './model/book'
import Book from './model/book'

class GraphQL {
  private user: User
  private book: Book
  private oauth2: Google

  constructor(
    db: NeonHttpDatabase<Record<string, never>>,
    oauth2: OAuth2Client,
  ) {
    this.user = new User(db)
    this.book = new Book(db)
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

  type Book {
    bookId: String!
    day: Int
    time: Int
    sub: String
    bookType: String
    createdAt: String
    updatedAt: String
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

  input GetBookBySubInput {
    sub: String!
  }

  input CreateBookInput {
    day: Int
    time: [Int!]
    sub: String
    bookType: String
  }

  type Query {
    getUser(input: GetUserInput): User
    getAuthSubByCookie: String
    getBookBySub(input: GetBookBySubInput): [Book]
  }

  type Mutation {
    createBook(input: CreateBookInput): [Book]
    googleLogin(input: GoogleLoginInput): User
    googleLogout: Boolean
  }
  `
  private resolvers = {
    Query: {
      getUser: async (
        root: unknown,
        param: GetUserInputType,
        ctx: { req: Request; res: Response },
      ) => {
        if (!this.getAuthSubByCookie(ctx)) throw 'no auth'
        return await this.user.getUser(param)
      },
      getAuthSubByCookie: async (
        root: unknown,
        {},
        ctx: { req: Request; res: Response },
      ) => {
        return await this.getAuthSubByCookie(ctx)
      },
      getBookBySub: async (
        root: unknown,
        param: GetBookBySubInputType,
        ctx: { req: Request; res: Response },
      ) => {
        return await this.book.getBookBySub(param)
      },
    },
    Mutation: {
      createBook: async (
        root: unknown,
        param: CreateBookInputType,
        ctx: { req: Request; res: Response },
      ) => {
        debugger
        console.log(param)

        const check = await this.book.getBookByDayTime(param)
        if (check.length > 0) {
          throw 'already exists'
        }

        const res = await this.book.createBook(param)

        /** トランザクションなしで一貫性を保ちたいため、登録予定と登録結果が異なれば登録済みを削除 */
        if (res.length > 0 && res.length !== param.input.time.length) {
          this.book.deleteBook({ input: { bookIds: res.map((r) => r.bookId) } })
          return []
        }

        return res
      },
      googleLogin: async (
        root: unknown,
        p: VerifyGoogleInputType,
        ctx: { req: Request; res: Response },
      ) => {
        if (!p.input?.idToken) throw 'no idToken'

        setCookie({ res: ctx.res }, 'idToken', p.input?.idToken, {
          maxAge: 60 * 60,
          secure: true,
          path: '/',
          httpOnly: true,
          sameSite: 'Lax',
        })

        const res = await this.oauth2.verifyGoogle({
          input: { idToken: p.input?.idToken },
        })
        const user = await this.user.getUserBySub({
          input: { sub: res.getPayload()?.sub || '' },
        })
        if (!user) {
          const param = {
            input: {
              name: res.getPayload()?.name || '',
              email: res.getPayload()?.email || '',
              sub: res.getPayload()?.sub || '',
              provider: 'google',
              userType: 'default',
            },
          }
          return await this.user.createUser(param)
        } else {
          return user
        }
      },
      googleLogout: async (
        root: unknown,
        {},
        ctx: { req: Request; res: Response },
      ) => {
        try {
          destroyCookie({ res: ctx.res }, 'idToken')
          return true
        } catch (error) {
          return false
        }
      },
    },
  }

  public apolloServer = new ApolloServer<BaseContext>({
    typeDefs: this.typeDefs,
    resolvers: this.resolvers,
  })

  private getAuthSubByCookie = async (ctx: { req: Request; res: Response }) => {
    const cookie = nookies.get(ctx)
    if (!cookie?.idToken) return null
    const res = await this.oauth2.verifyGoogle({
      input: { idToken: cookie?.idToken },
    })
    const me = await this.user.getUserBySub({
      input: { sub: res.getPayload()?.sub || '' },
    })
    if (!me) return null
    return res.getPayload()?.sub
  }
}

export default GraphQL
