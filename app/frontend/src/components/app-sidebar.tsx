import { Home, ShoppingCart, Refrigerator, Receipt, History, Settings, User, UserPlus, LogOut  } from "lucide-react";

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

const items = [
  {
    title: "Home",
    url: "/homepage",
    icon: Home,
  },
  {
    title: "Shopping List",
    url: "/dashboard/shopping-list",
    icon: ShoppingCart,
  },
  {
    title: "Pantry",
    url: "/dashboard/pantry",
    icon: Refrigerator,
  },
  {
    title: "History",
    url: "/dashboard/shopping-history",
    icon: History,
  },
  {
    title: "Receipt",
    url: "/dashboard/receipt",
    icon: Receipt,
  },
  {
    title: "Account",
    url: "/dashboard/account",
    icon: User,
  },
  // {
  //   title: "Invite",
  //   url: "/dashboard/invite",
  //   icon: UserPlus,
  // },
  // {
  //   title: "Settings",
  //   url: "/dashboard/settings",
  //   icon: Settings,
  // },
  {
    title: "Sign out",
    url: "/",
    icon: LogOut,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        {/* Logo Section */}
        <div className="flex items-center justify-center p-4">
          <img
            src="/Logo.png"
            alt="App Logo"
            className="w-480 h-auto object-contain"
          />
        </div>
        
        {/* Main Sidebar Content */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
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
