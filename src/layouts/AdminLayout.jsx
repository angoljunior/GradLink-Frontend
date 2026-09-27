import { Link, Outlet } from "react-router-dom";
import {
  ActivityIcon, BellIcon, BookOpenIcon, BriefcaseIcon, Building2Icon,
  ChartNoAxesCombinedIcon, ClipboardCheckIcon, CommandIcon, CreditCardIcon,
  FileTextIcon, FlagIcon, LayoutDashboardIcon, Settings2Icon, ShieldCheckIcon, UsersIcon,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { SiteHeader } from "@/components/site-header";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider,
} from "@/components/ui/sidebar";

const navigation = [
  ["dashboard", "Dashboard", LayoutDashboardIcon],
  ["users", "Users", UsersIcon],
  ["employers", "Employers", Building2Icon],
  ["jobs", "Jobs", BriefcaseIcon],
  ["applications", "Applications", FileTextIcon],
  ["verifications", "Verification", ShieldCheckIcon],
  ["reports", "Reports", FlagIcon],
  ["subscriptions", "Payments", CreditCardIcon],
  ["content", "Career Content", BookOpenIcon],
  ["tests", "Psychometric Tests", ClipboardCheckIcon],
  ["notifications", "Notifications", BellIcon],
  ["analytics", "Analytics", ChartNoAxesCombinedIcon],
  ["activity", "Activity Logs", ActivityIcon],
  ["settings", "Settings", Settings2Icon],
].map(([path, title, icon]) => ({ title, icon, url: `/admin/${path}` }));

export default function AdminLayout() {
  const user = {
    name: localStorage.getItem("name") || "Admin",
    email: localStorage.getItem("email") || "",
    avatar: "",
  };

  return (
    <SidebarProvider style={{
      "--sidebar-width": "calc(var(--spacing) * 72)",
      "--header-height": "calc(var(--spacing) * 12)",
    }}>
      <Sidebar collapsible="offcanvas" variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
                <Link to="/admin/dashboard">
                  <CommandIcon className="size-5!" />
                  <span className="text-base font-semibold">{user.name}'s Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent><NavMain items={navigation} /></SidebarContent>
        <SidebarFooter><NavUser user={user} role="admin" showSignOut /></SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <SiteHeader />
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="@container/main flex min-w-0 flex-1 flex-col gap-2">
            <div className="space-y-6 px-4 py-4 lg:px-6 md:py-6">
              <Outlet />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
