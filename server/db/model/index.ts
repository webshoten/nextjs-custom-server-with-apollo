import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

const id = {
  id: serial('id').primaryKey(),
}
const timestamps = {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
}
const schemaBase = {
  ...id,
  ...timestamps,
}

export const todo = pgTable('todo', {
  ...schemaBase,
  title: varchar('title', { length: 20 }).notNull(),
  content: varchar('content', { length: 256 }).notNull(),
})
