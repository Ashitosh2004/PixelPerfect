import { Home, Upload, BarChart3, Users, Settings, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLocation } from "wouter";

export function AppSidebar({ userRole = "user" }: { userRole?: "user" | "admin" }) {
  const [location, navigate] = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: "Upload & Analyze",
      url: "/analyze",
      icon: Upload,
    },
    {
      title: "My Charts",
      url: "/charts",
      icon: BarChart3,
    },
  ];

  const adminItems = [
    {
      title: "User Management",
      url: "/admin/users",
      icon: Users,
    },
  ];

  const allItems = userRole === "admin" ? [...menuItems, ...adminItems] : menuItems;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold px-2 py-4">
            Excel Analytics
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {allItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.url)}
                    isActive={location === item.url}
                    data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton data-testid="nav-settings">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="hover-elevate">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">{userRole}</p>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton data-testid="button-logout">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
