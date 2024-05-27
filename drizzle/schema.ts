import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const todo = pgTable("todo", {
	id: serial("id").primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	title: varchar("title", { length: 20 }).notNull(),
	content: varchar("content", { length: 256 }).notNull(),
});