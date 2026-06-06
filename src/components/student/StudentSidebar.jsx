import {
  LayoutDashboard,
  BriefcaseBusiness,
  FileText,
  MessageSquare,
  Bell,
  Settings,
} from "lucide-react";

const sidebarLinks = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: "My Applications",
    icon: BriefcaseBusiness,
  },
  {
    label: "CV Builder",
    icon: FileText,
  },
  {
    label: "Messages",
    icon: MessageSquare,
  },
  {
    label: "Notifications",
    icon: Bell,
  },
  {
    label: "Settings",
    icon: Settings,
  },
];

const StudentSidebar = () => {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 border-r border-slate-200 bg-white flex-col">
      <div className="px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Student Portal
        </p>
      </div>

      <nav className="px-2 space-y-2">
        {sidebarLinks.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                item.active
                  ? "bg-yellow-500 text-slate-950"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default StudentSidebar;