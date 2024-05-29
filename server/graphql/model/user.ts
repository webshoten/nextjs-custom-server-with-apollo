import { eq } from 'drizzle-orm'
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import {OAuth2Client} from 'google-auth-library'
import {user} from '../../db/model'
import {} from '../../../src/graphql/generated'

export type UserType = {
    sub: string
    name: string
    email:string
    userType: string
    provider: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}

export type GetUserInputType = {
    input:{
      sub: string
    }
}

export type GetUserBySubInputType = {
    input:{
      sub: string
    }
}

export type CreateUserInputType = {
    input:{
      sub:string
      name:string
      email:string
      provider:string
      userType:string
    }
}

class User {
    private db

    constructor(db: NeonHttpDatabase<Record<string, never>>) {
      this.db = db
    }

    getUser = async (param:GetUserInputType) => {
        const res = await this.db
          .select()
          .from(user)
          .where(eq(user.sub, param.input.sub))
          .limit(1)
        return res[0]
    }

    getUserBySub = async (param:GetUserBySubInputType) => {
        const res = await this.db
          .select()
          .from(user)
          .where(eq(user.sub, param.input.sub))
          .limit(1)
        return res[0]
    }

    createUser = async (param: CreateUserInputType) => {
        const res = await this.db.insert(user).values(param.input).returning()
        return res[0]
    }
}

export default User