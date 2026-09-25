import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Users,
  MessageSquare,
  Building2,
} from "lucide-react";

const sidebarLinks = [
  {
    label: "Dashboard",
    path: "/employer/dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: "Manage Jobs",
    path: "/employer/jobs",
    icon: BriefcaseBusiness,
  },
  {
    label: "Applicants",
    path: "/employer/applicants",
    icon: Users,
  },
  {
    label: "Messages",
    path: "/employer/messages",
    icon: MessageSquare,
  },
  {
    label: "Company Profile",
    path: "/employer/company-profile",
    icon: Building2,
  },
];

const EmployerSidebar = () => {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 border-r border-slate-200 bg-white flex-col">
      <div className="px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Employer Portal
        </p>
      </div>

      <nav className="px-2 space-y-2">
        {sidebarLinks.map((item) => {
          const Icon = item.icon;

          return (
            <Link to={item.path}
              key={item.label}
              className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                item.active
                  ? "bg-yellow-500 text-slate-950"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default EmployerSidebar;