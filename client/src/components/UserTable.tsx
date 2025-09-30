import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MoreHorizontal, Shield, User as UserIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  uploads: number;
  joinedDate: string;
}

interface UserTableProps {
  users: User[];
  onRoleChange?: (userId: string, newRole: "admin" | "user") => void;
  onDelete?: (userId: string) => void;
}

export function UserTable({ users, onRoleChange, onDelete }: UserTableProps) {
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleRoleChange = (userId: string, userName: string, newRole: "admin" | "user") => {
    console.log("Changing role:", { userId, newRole });
    onRoleChange?.(userId, newRole);
    toast({
      title: "Role updated",
      description: `${userName} is now ${newRole === "admin" ? "an" : "a"} ${newRole}`,
    });
  };

  const handleDelete = (userId: string, userName: string) => {
    console.log("Deleting user:", userId);
    onDelete?.(userId);
    toast({
      title: "User deleted",
      description: `${userName} has been removed`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          data-testid="input-search-users"
        />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Uploads</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                    {user.role === "admin" ? (
                      <Shield className="h-3 w-3 mr-1" />
                    ) : (
                      <UserIcon className="h-3 w-3 mr-1" />
                    )}
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono">{user.uploads}</TableCell>
                <TableCell className="text-muted-foreground">{user.joinedDate}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        data-testid={`button-actions-${user.id}`}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleRoleChange(
                          user.id,
                          user.name,
                          user.role === "admin" ? "user" : "admin"
                        )}
                      >
                        Make {user.role === "admin" ? "User" : "Admin"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDelete(user.id, user.name)}
                      >
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
