import { todo } from '../../db/model'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { setTimeout } from 'timers/promises'

export type TodoType = {
  id: number
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export type CreateTodoInputType = {
  title: string
  content: string
}

class Todo {
  private db

  constructor(db: PostgresJsDatabase<Record<string, never>>) {
    this.db = db
  }

  getTodo = async () => {
    const res = await this.db.select().from(todo).limit(1)
    return res[0]
  }

  createTodo = async (input: CreateTodoInputType) => {
    const res = await this.db.insert(todo).values(input).returning()
    return res[0]
  }
}

export default Todo
