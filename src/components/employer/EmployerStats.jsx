import {
  BriefcaseBusiness,
  FileText,
  Users,
  CircleCheck,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    title: "Active Jobs",
    value: "3",
    icon: BriefcaseBusiness,
  },
  {
    title: "Total Applications",
    value: "0",
    icon: FileText,
    growth: "+12%",
  },
  {
    title: "Candidates Shortlisted",
    value: "0",
    icon: Users,
  },
  {
    title: "Hired",
    value: "0",
    icon: CircleCheck,
  },
];

const EmployerStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            className="rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <p className="text-sm text-slate-500">{item.title}</p>

                <div className="h-9 w-9 rounded-full bg-yellow-50 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-yellow-600" />
                </div>
              </div>

              <h2 className="mt-5 text-3xl font-extrabold text-slate-950">
                {item.value}
              </h2>

              {item.growth && (
                <p className="mt-1 text-xs font-medium text-emerald-600">
                  {item.growth}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default EmployerStats;