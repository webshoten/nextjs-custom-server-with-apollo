import { eq } from 'drizzle-orm'
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { book } from '../../db/model'

export type BookType = {
  bookId: string
  day: number
  time: number
  sub: string
  bookType: string
  createdAt: Date
  updatedAt: Date
}

export type GetBookBySubInputType = {
  input: {
    sub: string
  }
}

class Book {
  private db

  constructor(db: NeonHttpDatabase<Record<string, never>>) {
    this.db = db
  }

  getBookBySub = async (param: GetBookBySubInputType) => {
    const res = await this.db
      .select()
      .from(book)
      .where(eq(book.sub, param.input.sub))
    return res
  }
}

export default Book
