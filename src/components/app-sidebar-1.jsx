import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  LayoutDashboardIcon,
  ListIcon,
  BellIcon,
  UsersIcon,
  Settings2Icon,
  CommandIcon,
  FileTextIcon,
} from "lucide-react";

const username = localStorage.getItem("name") || "Student";

const data = {
  user: {
    name: username,
    email: localStorage.getItem("email") || "student@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/employer-dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Manage Jobs",
      url: "/employer-dashboard/manage-jobs",
      icon: ListIcon,
    },
    {
      title: "Applicants",
      url: "/employer-dashboard/applicants",
      icon: FileTextIcon,
    },
    {
      title: "Notifications",
      url: "/employer-dashboard/notifications",
      icon: BellIcon,
    },
    {
      title: "Settings",
      url: "/employer-dashboard/settings",
      icon: Settings2Icon,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/student-dashboard">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">
                  {username}'s Dashboard
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
