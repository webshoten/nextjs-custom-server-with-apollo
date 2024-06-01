import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
  date,
  unique,
} from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  sub: varchar('sub', { length: 256 }).primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  provider: varchar('provider', { length: 20 }).notNull(),
  userType: varchar('userType', { length: 20 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
})

export const book = pgTable(
  'book',
  {
    bookId: serial('bookId').primaryKey(),
    day: integer('day').notNull(),
    time: integer('time').notNull(),
    sub: varchar('sub').references(() => user.sub),
    bookType: varchar('bookType', { length: 20 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (t) => ({
    unq: unique('day_time').on(t.day, t.time),
  }),
)