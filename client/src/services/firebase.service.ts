import { ref, set, get, push, remove, update, query, orderByChild, equalTo } from "firebase/database";
import { database } from "@/lib/firebase";
import type { User, Upload, InsertUser, InsertUpload, Stats, AdminStats } from "@shared/schema";

export class FirebaseService {
  private static checkDatabase() {
    if (!database) {
      throw new Error("Firebase database not initialized");
    }
    return database;
  }

  static async createUser(userId: string, userData: InsertUser): Promise<User> {
    const db = this.checkDatabase();
    const user: User = {
      ...userData,
      id: userId,
      createdAt: Date.now(),
    };
    await set(ref(db, `users/${userId}`), user);
    return user;
  }

  static async getUser(userId: string): Promise<User | null> {
    const db = this.checkDatabase();
    const snapshot = await get(ref(db, `users/${userId}`));
    return snapshot.exists() ? snapshot.val() : null;
  }

  static async updateUser(userId: string, updates: Partial<User>): Promise<void> {
    const db = this.checkDatabase();
    await update(ref(db, `users/${userId}`), updates);
  }

  static async deleteUser(userId: string): Promise<void> {
    const db = this.checkDatabase();
    await remove(ref(db, `users/${userId}`));
  }

  static async getAllUsers(): Promise<User[]> {
    const db = this.checkDatabase();
    const snapshot = await get(ref(db, 'users'));
    if (!snapshot.exists()) return [];
    const users = snapshot.val();
    return Object.values(users);
  }

  static async createUpload(uploadData: InsertUpload): Promise<Upload> {
    const db = this.checkDatabase();
    const uploadsRef = ref(db, 'uploads');
    const newUploadRef = push(uploadsRef);
    const upload: Upload = {
      id: newUploadRef.key!,
      userId: uploadData.userId,
      filename: uploadData.filename,
      uploadDate: Date.now(),
      chartType: uploadData.chartType,
      chartData: uploadData.chartData,
      xAxis: uploadData.xAxis,
      yAxis: uploadData.yAxis,
      is3D: uploadData.is3D,
    };
    await set(newUploadRef, upload);
    return upload;
  }

  static async getUpload(uploadId: string): Promise<Upload | null> {
    const db = this.checkDatabase();
    const snapshot = await get(ref(db, `uploads/${uploadId}`));
    return snapshot.exists() ? snapshot.val() : null;
  }

  static async getUserUploads(userId: string): Promise<Upload[]> {
    const db = this.checkDatabase();
    const uploadsRef = ref(db, 'uploads');
    const userUploadsQuery = query(uploadsRef, orderByChild('userId'), equalTo(userId));
    
    const snapshot = await get(userUploadsQuery);
    if (!snapshot.exists()) return [];
    const uploads = snapshot.val();
    return Object.values(uploads) as Upload[];
  }

  static async getAllUploads(): Promise<Upload[]> {
    const db = this.checkDatabase();
    const snapshot = await get(ref(db, 'uploads'));
    if (!snapshot.exists()) return [];
    const uploads = snapshot.val();
    return Object.values(uploads);
  }

  static async updateUpload(uploadId: string, updates: Partial<Upload>): Promise<void> {
    const db = this.checkDatabase();
    await update(ref(db, `uploads/${uploadId}`), updates);
  }

  static async deleteUpload(uploadId: string): Promise<void> {
    const db = this.checkDatabase();
    await remove(ref(db, `uploads/${uploadId}`));
  }

  static async getUserStats(userId: string): Promise<Stats> {
    const uploads = await this.getUserUploads(userId);
    const now = Date.now();
    const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
    const thisWeek = uploads.filter(u => u.uploadDate >= oneWeekAgo).length;

    return {
      totalUploads: uploads.length,
      chartsCreated: uploads.length,
      thisWeek,
      avgGrowth: uploads.length > 0 ? "23%" : "0%",
    };
  }

  static async getAdminStats(): Promise<AdminStats> {
    const users = await this.getAllUsers();
    const now = Date.now();
    const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;
    const oneDayAgo = now - 24 * 60 * 60 * 1000;

    const newThisMonth = users.filter(u => u.createdAt >= oneMonthAgo).length;
    const adminUsers = users.filter(u => u.role === "admin").length;
    
    const allUploads = await this.getAllUploads();
    const activeToday = new Set(
      allUploads.filter(u => u.uploadDate >= oneDayAgo).map(u => u.userId)
    ).size;

    return {
      totalUsers: users.length,
      newThisMonth,
      adminUsers,
      activeToday,
    };
  }
}
