import { InferModel } from "drizzle-orm";
import {
  pgTable,
  PgDelete,
  serial,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";
import { sql } from "@vercel/postgres";

import { drizzle } from "drizzle-orm/vercel-postgres";

export const todoTable = pgTable("todos", {
  id: serial("id").primaryKey(),
  task: varchar("task", { length: 255 }).notNull(),
  isDone: boolean("isdone").default(false),
});

export type Todo = InferModel<typeof todoTable>;
export type NewTodo = InferModel<typeof todoTable, "insert">;

export const db = drizzle(sql);
