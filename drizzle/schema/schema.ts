import { text, pgTable, uuid, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().unique().primaryKey(),
  email: text("email").unique().notNull(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  name: text("name"),
  avatar: text("avatar"),
  avatarId: text("avatar_id"),
  createdAt: timestamp("created_at").defaultNow(),
});
