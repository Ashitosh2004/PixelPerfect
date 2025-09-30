import { UserTable } from "../UserTable";

export default function UserTableExample() {
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
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <UserTable
        users={mockUsers}
        onRoleChange={(id, role) => console.log("Role changed:", id, role)}
        onDelete={(id) => console.log("Delete user:", id)}
      />
    </div>
  );
}
