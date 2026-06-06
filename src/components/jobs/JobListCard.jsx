import { Building2, MapPin, Clock, Banknote, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const JobListCard = ({ job }) => {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-7">
        <div className="flex items-start gap-5">
          {/* Company icon */}
          <Link
            to={`/company/${job.companyId}`}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-white transition hover:border-yellow-500"
          >
            <Building2 className="h-5 w-5 text-slate-500" />
          </Link>

          {/* Job Content */}
          <div className="flex-1">
            <div className="flex justify-between gap-4">
              <div>
                <Link to={`/job/${job.id}`}>
                  <h3 className="truncate text-base font-semibold text-slate-900 transition hover:text-yellow-700">
                    {job.title}
                  </h3>
                </Link>

                <p className="mt-1 text-sm text-slate-500">{job.company}</p>
              </div>

              <button className="text-slate-500 hover:text-yellow-600 transition">
                <Bookmark className="h-5 w-5" />
              </button>
            </div>

            {/* Meta */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location}
              </span>

              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {job.posted}
              </span>

              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <Banknote className="h-4 w-4" />
                {job.salary}
              </span>
            </div>

            {/* Badges */}
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge className="bg-slate-950 hover:bg-slate-950 text-white rounded-md px-3">
                {job.type}
              </Badge>

              <Badge
                variant="outline"
                className="bg-white text-slate-600 rounded-md px-3"
              >
                {job.industry}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobListCard;
