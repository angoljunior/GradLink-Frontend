import { Link } from "react-router-dom";

import { Building2, MapPin, Users, BriefcaseBusiness } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CompanyCard = ({ company }) => {
  const jobsCount = company.jobs_count || 0;
  const companySize =
    company.size || company.industry_display || company.industry || "Company";

  const shortDescription =
    company.description?.length > 110
      ? `${company.description.slice(0, 110)}...`
      : company.description || "No company description available.";

  return (
    <Link to={`/company/${company.id}`} className="block">
      <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        {/* Top background */}
        <div className="relative h-24 bg-slate-100">
          <div className="absolute bottom-[-30px] left-6 flex h-16 w-16 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm">
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="h-10 w-10 object-contain"
              />
            ) : (
              <Building2 className="h-7 w-7 text-slate-500" />
            )}
          </div>
        </div>

        <CardContent className="px-6 pb-6 pt-12">
          <div className="flex items-start justify-between gap-4">
            <h3 className="line-clamp-2 text-xl font-bold leading-tight text-slate-950">
              {company.name}
            </h3>

            {company.is_verified ? (
              <Badge className="rounded-full bg-blue-50 px-3 py-1 text-blue-600 hover:bg-blue-50">
                Verified
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="rounded-full px-3 py-1 text-slate-500"
              >
                Pending
              </Badge>
            )}
          </div>

          <div className="mt-3 flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="h-4 w-4" />
            <span>{company.location || "Location not specified"}</span>
          </div>

          <p className="mt-5 min-h-[72px] text-sm leading-relaxed text-slate-500">
            {shortDescription}
          </p>

          <div className="my-5 h-px bg-slate-200" />

          <div className="flex items-center gap-5 text-sm">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Users className="h-4 w-4" />
              <span className="capitalize">{companySize}</span>
            </div>

            <div className="flex items-center gap-1.5 font-medium text-yellow-600">
              <BriefcaseBusiness className="h-4 w-4" />
              <span>
                {jobsCount} {jobsCount === 1 ? "job" : "jobs"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CompanyCard;
