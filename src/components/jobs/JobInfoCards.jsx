import {
  BriefcaseBusiness,
  MapPin,
  Banknote,
  CalendarDays,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const jobInfo = [
  {
    label: "Job Type",
    value: "Graduate",
    icon: BriefcaseBusiness,
    color: "text-yellow-600",
  },
  {
    label: "Work Mode",
    value: "On-site",
    icon: MapPin,
    color: "text-yellow-600",
  },
  {
    label: "Salary",
    value: "GHS 3,500 - 5,000/month",
    icon: Banknote,
    color: "text-yellow-600",
  },
  {
    label: "Deadline",
    value: "Aug 31, 2026",
    icon: CalendarDays,
    color: "text-red-500",
  },
];

const JobInfoCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {jobInfo.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.label}
            className="rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            <CardContent className="p-6 text-center">
              <Icon className={`h-6 w-6 mx-auto ${item.color}`} />

              <p className="mt-4 text-sm text-slate-500">{item.label}</p>

              <h3 className="mt-2 text-base font-semibold text-slate-950">
                {item.value}
              </h3>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default JobInfoCards;