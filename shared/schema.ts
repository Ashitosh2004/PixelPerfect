import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firebaseUid: text("firebase_uid").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const uploads = pgTable("uploads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  filename: text("filename").notNull(),
  uploadDate: timestamp("upload_date").notNull().defaultNow(),
  chartType: text("chart_type").notNull(),
  chartData: jsonb("chart_data").notNull(),
  xAxis: text("x_axis").notNull(),
  yAxis: text("y_axis").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertUploadSchema = createInsertSchema(uploads).omit({
  id: true,
  uploadDate: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertUpload = z.infer<typeof insertUploadSchema>;
export type Upload = typeof uploads.$inferSelect;
