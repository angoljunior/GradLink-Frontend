
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
  BookmarkIcon,
  MailIcon,
} from "lucide-react";

const username = localStorage.getItem("name") || "Student";

const data = {
  user: {
    name: username,
    email: localStorage.getItem("email") || "student@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    { title: "Profile", url: "/student/profile", icon: UsersIcon },
    {
      title: "Dashboard",
      url: "/student/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "My Applications",
      url: "/student/applications",
      icon: ListIcon,
    },
    {
      title: "CV Builder",
      url: "/student/cv-builder",
      icon: FileTextIcon,
    },
    {
      title: "Documents",
      url: "/student/documents",
      icon: FileTextIcon,
    },
    {
      title: "Saved Jobs",
      url: "/student/saved-jobs",
      icon: BookmarkIcon,
    },
    {
      title: "Messages",
      url: "/student/messages",
      icon: MailIcon,
    },
    {
      title: "Notifications",
      url: "/student/notifications",
      icon: BellIcon,
    },
    {
      title: "Settings",
      url: "/student/settings",
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
              <a href="/student/dashboard">
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
