import { and, eq, inArray } from 'drizzle-orm'
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

export type GetBookByDayTimeInputType = {
  input: {
    day: number
    time: number[]
  }
}

export type CreateBookInputType = {
  input: {
    day: number
    time: number[]
    sub: string
    bookType: string
  }
}

export type DeleteBookInputType = {
  input: {
    bookIds: number[]
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

  getBookByDayTime = async (param: GetBookByDayTimeInputType) => {
    const res = await this.db
      .select()
      .from(book)
      .where(
        and(
          inArray(book.time, param.input.time),
          eq(book.day, param.input.day),
        ),
      )
    return res
  }

  createBook = async (param: CreateBookInputType) => {
    const values = param.input.time.map((t) => {
      return {
        day: param.input.day,
        time: t,
        sub: param.input.sub,
        bookType: param.input.bookType,
      }
    })

    const res = await this.db
      .insert(book)
      .values(values)
      .onConflictDoNothing()
      .returning()

    return res
  }

  deleteBook = async (param: DeleteBookInputType) => {
    const res = await this.db
      .delete(book)
      .where(inArray(book.bookId, param.input.bookIds))
      .returning()
    return res
  }
}

export default Book
