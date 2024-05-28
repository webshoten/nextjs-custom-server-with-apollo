import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
  date,
} from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  userId: serial('userId').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  fedId:varchar('fedId', { length: 256 }).notNull(),
  userType: varchar('userType', { length: 20 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
})

export const book = pgTable('book', {
  bookId: serial('bookId').primaryKey(),
  day: integer('day').notNull(),
  time: integer('time').notNull(),
  userId: integer('userId').references(() => user.userId),
  bookType: varchar('userType', { length: 20 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})