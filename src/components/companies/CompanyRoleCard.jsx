import {
  Building2,
  MapPin,
  Clock,
  Banknote,
  Bookmark,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CompanyRoleCard = ({ job }) => {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start gap-5">
          <div className="h-14 w-14 rounded-lg border border-slate-200 bg-white flex items-center justify-center shrink-0">
            <Building2 className="h-6 w-6 text-slate-500" />
          </div>

          <div className="flex-1">
            <div className="flex justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-950">
                  {job.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {job.company}
                </p>
              </div>

              <button className="text-slate-500 hover:text-yellow-600 transition">
                <Bookmark className="h-5 w-5" />
              </button>
            </div>

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

            <div className="mt-5 flex flex-wrap gap-2">
              <Badge className="rounded-md bg-slate-950 text-white hover:bg-slate-950 px-3">
                {job.type}
              </Badge>

              <Badge
                variant="outline"
                className="rounded-md bg-white text-slate-600 px-3"
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

export default CompanyRoleCard;