import {
  Building2,
  MapPin,
  Users,
  BriefcaseBusiness,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CompanyCard = ({ company }) => {
  return (

    <Link to={`/company/${company.id}`}>
      <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
      {/* Top background */}
      <div className="h-24 bg-slate-100 relative">
        <div className="absolute left-6 bottom-[-30px] h-16 w-16 rounded-lg border border-slate-200 bg-white flex items-center justify-center shadow-sm">
          <Building2 className="h-7 w-7 text-slate-500" />
        </div>
      </div>

      <CardContent className="pt-12 px-6 pb-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold text-slate-950 leading-tight">
            {company.name}
          </h3>

          <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50 rounded-full px-3 py-1">
            Verified
          </Badge>
        </div>

        <div className="mt-3 flex items-center gap-1 text-sm text-slate-500">
          <MapPin className="h-4 w-4" />
          <span>{company.location}</span>
        </div>

        <p className="mt-5 text-sm text-slate-500 leading-relaxed min-h-[48px]">
          {company.description}
        </p>

        <div className="my-5 h-px bg-slate-200" />

        <div className="flex items-center gap-5 text-sm">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Users className="h-4 w-4" />
            <span>{company.size}</span>
          </div>

          <div className="flex items-center gap-1.5 text-yellow-600 font-medium">
            <BriefcaseBusiness className="h-4 w-4" />
            <span>{company.jobs} jobs</span>
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>

    
  );
};

export default CompanyCard;