import { z } from "zod";

export interface User {
  id: string;
  firebaseUid: string;
  email: string;
  name: string;
  role: "user" | "admin";
  createdAt: number;
}

export interface Upload {
  id: string;
  userId: string;
  filename: string;
  uploadDate: number;
  chartType: string;
  chartData: any;
  xAxis: string;
  yAxis: string;
  is3D?: boolean;
}

export interface Stats {
  totalUploads: number;
  chartsCreated: number;
  thisWeek: number;
  avgGrowth: string;
}

export interface AdminStats {
  totalUsers: number;
  newThisMonth: number;
  adminUsers: number;
  activeToday: number;
}

export const insertUserSchema = z.object({
  firebaseUid: z.string(),
  email: z.string().email(),
  name: z.string().min(1),
  role: z.enum(["user", "admin"]).default("user"),
});

export const insertUploadSchema = z.object({
  userId: z.string(),
  filename: z.string().min(1),
  chartType: z.string(),
  chartData: z.any(),
  xAxis: z.string(),
  yAxis: z.string(),
  is3D: z.boolean().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertUpload = z.infer<typeof insertUploadSchema>;
