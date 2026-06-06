import {
  BriefcaseBusiness,
  MapPin,
  Banknote,
  CalendarDays,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const JobInfoCards = ({ job }) => {
  const formatSalary = () => {
    if (job.salary_min && job.salary_max) {
      return `GHS ${Number(job.salary_min).toLocaleString()} - ${Number(
        job.salary_max,
      ).toLocaleString()}/month`;
    }

    if (job.salary_min) {
      return `From GHS ${Number(job.salary_min).toLocaleString()}/month`;
    }

    if (job.salary_max) {
      return `Up to GHS ${Number(job.salary_max).toLocaleString()}/month`;
    }

    return "Not specified";
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "Not specified";

    return new Date(dateValue).toLocaleDateString("en-GH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const jobInfo = [
    {
      label: "Job Type",
      value: job.job_type_display || job.job_type || "Not specified",
      icon: BriefcaseBusiness,
      color: "text-yellow-600",
    },
    {
      label: "Work Mode",
      value: job.work_mode_display || job.work_mode || "Not specified",
      icon: MapPin,
      color: "text-yellow-600",
    },
    {
      label: "Salary",
      value: formatSalary(),
      icon: Banknote,
      color: "text-yellow-600",
    },
    {
      label: "Deadline",
      value: formatDate(job.deadline),
      icon: CalendarDays,
      color: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {jobInfo.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.label}
            className="rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            <CardContent className="p-6 text-center">
              <Icon className={`mx-auto h-6 w-6 ${item.color}`} />

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
