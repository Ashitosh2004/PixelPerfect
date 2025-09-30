import { UserTable } from "@/components/UserTable";
import { StatsCard } from "@/components/StatsCard";
import { Users, UserPlus, Shield, Activity } from "lucide-react";

export default function AdminUsersPage() {
  const mockUsers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "admin" as const,
      uploads: 24,
      joinedDate: "Jan 2024",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user" as const,
      uploads: 12,
      joinedDate: "Feb 2024",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "user" as const,
      uploads: 8,
      joinedDate: "Mar 2024",
    },
    {
      id: "4",
      name: "Alice Williams",
      email: "alice@example.com",
      role: "user" as const,
      uploads: 15,
      joinedDate: "Feb 2024",
    },
    {
      id: "5",
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "user" as const,
      uploads: 6,
      joinedDate: "Apr 2024",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground mt-1">Manage users, roles, and permissions.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Users"
          value={156}
          icon={Users}
          trend={{ value: "8%", positive: true }}
        />
        <StatsCard
          title="New This Month"
          value={12}
          icon={UserPlus}
          trend={{ value: "3%", positive: true }}
        />
        <StatsCard
          title="Admin Users"
          value={5}
          icon={Shield}
        />
        <StatsCard
          title="Active Today"
          value={89}
          icon={Activity}
        />
      </div>

      <UserTable users={mockUsers} />
    </div>
  );
}
