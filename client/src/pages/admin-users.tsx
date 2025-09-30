import { UserTable } from "@/components/UserTable";
import { StatsCard } from "@/components/StatsCard";
import { Users, UserPlus, Shield, Activity } from "lucide-react";
import { useRealtimeList } from "@/hooks/useRealtimeData";
import { User } from "@shared/schema";
import { useEffect, useState } from "react";
import { FirebaseService } from "@/services/firebase.service";
import { format } from "date-fns";

export default function AdminUsersPage() {
  const { data: users, loading } = useRealtimeList<User>('users');
  const [adminStats, setAdminStats] = useState({ totalUsers: 0, newThisMonth: 0, adminUsers: 0, activeToday: 0 });

  useEffect(() => {
    FirebaseService.getAdminStats().then(setAdminStats);
  }, [users]);

  const formattedUsers = users?.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    uploads: 0,
    joinedDate: format(new Date(user.createdAt), 'MMM yyyy'),
  })) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground mt-1">Manage users, roles, and permissions.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Users"
          value={adminStats.totalUsers}
          icon={Users}
          trend={{ value: "8%", positive: true }}
        />
        <StatsCard
          title="New This Month"
          value={adminStats.newThisMonth}
          icon={UserPlus}
          trend={{ value: "3%", positive: true }}
        />
        <StatsCard
          title="Admin Users"
          value={adminStats.adminUsers}
          icon={Shield}
        />
        <StatsCard
          title="Active Today"
          value={adminStats.activeToday}
          icon={Activity}
        />
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading users...</div>
      ) : (
        <UserTable users={formattedUsers} />
      )}
    </div>
  );
}
