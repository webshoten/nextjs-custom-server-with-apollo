import { eq } from 'drizzle-orm'
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import {user} from '../../db/model'
import {} from '../../../src/graphql/generated'

export type UserType = {
    userId: number
    name: string
    fedId: string
    userType: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}

export type GetUserInputType = {
    input:{
      userId: number
    }
}

export type CreateUserInputType = {
    input:{
      name:string
      fedId:string
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
          .where(eq(user.userId, param.input.userId))
          .limit(1)
        return res[0]
    }

    createUser = async (param: CreateUserInputType) => {
        const res = await this.db.insert(user).values(param.input).returning()
        return res[0]
    }
}

export default User