import { Building2, CircleCheck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CompanyInfoCard = () => {
  return (
    <Card className="rounded-2xl border border-yellow-200 bg-[#fbfaf2] shadow-sm">
      <CardContent className="p-7">
        <div className="flex items-center gap-3">
          <Building2 className="h-5 w-5 text-yellow-600" />

          <h2 className="text-xl font-extrabold text-slate-950">
            About MTN Ghana
          </h2>
        </div>

        <p className="mt-6 text-base leading-relaxed text-slate-500">
          A leading company in the Telecom sector, dedicated to excellence and
          innovation.
        </p>

        <div className="mt-6 flex items-center gap-3 text-slate-900">
          <CircleCheck className="h-5 w-5 text-yellow-600" />
          <span className="font-medium">Verified Employer</span>
        </div>

        <Button
          variant="outline"
          className="mt-7 h-11 w-full rounded-lg bg-transparent border-slate-200 hover:bg-white"
        >
          View Company Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default CompanyInfoCard;