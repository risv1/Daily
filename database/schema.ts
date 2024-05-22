import { pgTable, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role: text("role").notNull(),
  created_at: text("created_at").notNull(),
  updated_at: text("updated_at").notNull(),
});

export const events = pgTable("events", {
  id: text("id").primaryKey(),
  user_id: text("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(),
  label: text("label").notNull(),
  created_at: text("created_at").notNull(),
  updated_at: text("updated_at").notNull(),
});

export const links = pgTable("links", {
  id: text("id").primaryKey(),
  user_id: text("user_id").notNull(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  created_at: text("created_at").notNull(),
  updated_at: text("updated_at").notNull(),
});

export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  user_id: text("user_id").notNull().references(()=>users.id),
  name: text("title").notNull(),
  created_at: text("created_at").notNull(),
  updated_at: text("updated_at").notNull(),
})