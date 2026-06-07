import { Link } from "react-router-dom";
import { Building2, MapPin, Clock, Banknote, Bookmark } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CompanyRoleCard = ({ job }) => {
  const company = job.company;
  const companyName = company?.name || "Company";
  const companyId = company?.id || company;

  const formatSalary = () => {
    if (job.salary_min && job.salary_max) {
      return `GHS ${Number(job.salary_min).toLocaleString()} - ${Number(
        job.salary_max,
      ).toLocaleString()}`;
    }

    if (job.salary_min) {
      return `From GHS ${Number(job.salary_min).toLocaleString()}`;
    }

    if (job.salary_max) {
      return `Up to GHS ${Number(job.salary_max).toLocaleString()}`;
    }

    return "Not specified";
  };

  const formatPostedDate = (dateValue) => {
    if (!dateValue) return "Recently posted";

    const postedDate = new Date(dateValue);
    const today = new Date();

    const diffDays = Math.floor((today - postedDate) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Today";
    if (diffDays === 1) return "1 day ago";

    return `${diffDays} days ago`;
  };

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl border bg-slate-50">
              {company?.logo ? (
                <img
                  src={company.logo}
                  alt={companyName}
                  className="h-9 w-9 object-contain"
                />
              ) : (
                <Building2 className="h-7 w-7 text-slate-500" />
              )}
            </div>

            <div>
              <Link to={`/job/${job.id}`}>
                <h3 className="text-xl font-semibold text-slate-950 transition hover:text-yellow-700">
                  {job.title}
                </h3>
              </Link>

              <Link to={`/company/${companyId}`}>
                <p className="mt-2 text-slate-500 hover:text-yellow-700 hover:underline">
                  {companyName}
                </p>
              </Link>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </span>

                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatPostedDate(job.posted_at)}
                </span>

                <span className="flex items-center gap-1 text-emerald-600">
                  <Banknote className="h-4 w-4" />
                  {formatSalary()}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Badge className="rounded-full bg-slate-900 px-4 py-1.5 text-sm text-white">
                  {job.job_type_display || job.job_type}
                </Badge>

                <Badge className="rounded-full bg-slate-100 px-4 py-1.5 text-sm text-slate-700 hover:bg-slate-100">
                  {job.category?.name || "General"}
                </Badge>

                {job.work_mode && (
                  <Badge className="rounded-full bg-emerald-100 px-4 py-1.5 text-sm text-emerald-700 hover:bg-emerald-100">
                    {job.work_mode_display || job.work_mode}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <button className="text-slate-500 transition hover:text-yellow-600">
            <Bookmark className="h-5 w-5" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyRoleCard;
