import {
  Home,
  Calendar,
  Users,
  Bed,
  Martini,
  DollarSign,
  Tickets,
  UserCog,
  Receipt,
  BarChart3,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation } from "wouter";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Bookings", url: "/bookings", icon: Calendar },
  { title: "Rooms", url: "/rooms", icon: Bed },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Drinks", url: "/drinks", icon: Martini },
  { title: "Events", url: "/events", icon: Tickets},
  { title: "Payments", url: "/payments", icon: DollarSign },
  { title: "Staff", url: "/staff", icon: UserCog },
  { title: "Expenses", url: "/expenses", icon: Receipt },
  { title: "Reports", url: "/reports", icon: BarChart3 },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-tight">Hotel Manager</h2>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`link-${item.title.toLowerCase()}`}
                  >
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
