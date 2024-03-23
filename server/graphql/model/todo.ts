import { todo } from '../../db/model'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { setTimeout } from 'timers/promises'

class Todo {
  private db

  constructor(db: PostgresJsDatabase<Record<string, never>>) {
    this.db = db
  }

  getTodo = async () => {
    const res = await this.db.select().from(todo).limit(1)
    await setTimeout(1000)
    return res[0]
  }
}

export default Todo
