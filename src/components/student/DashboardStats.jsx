import {
  BriefcaseBusiness,
  Bookmark,
  CircleCheck,
  TrendingUp,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {/* Applied Jobs */}
      <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <CardContent className="p-7">
          <div className="flex items-start justify-between">
            <p className="text-slate-500 font-medium">Applied Jobs</p>

            <div className="h-11 w-11 rounded-full bg-yellow-50 flex items-center justify-center">
              <BriefcaseBusiness className="h-5 w-5 text-yellow-600" />
            </div>
          </div>

          <h2 className="mt-7 text-4xl font-extrabold text-slate-950">0</h2>
        </CardContent>
      </Card>

      {/* Saved Jobs */}
      <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <CardContent className="p-7">
          <div className="flex items-start justify-between">
            <p className="text-slate-500 font-medium">Saved Jobs</p>

            <div className="h-11 w-11 rounded-full bg-yellow-50 flex items-center justify-center">
              <Bookmark className="h-5 w-5 text-yellow-600" />
            </div>
          </div>

          <h2 className="mt-7 text-4xl font-extrabold text-slate-950">0</h2>
        </CardContent>
      </Card>

      {/* Profile Completion */}
      <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <CardContent className="p-7">
          <div className="flex items-start justify-between">
            <p className="text-slate-500 font-medium">Profile Completion</p>

            <div className="h-11 w-11 rounded-full bg-yellow-50 flex items-center justify-center">
              <CircleCheck className="h-5 w-5 text-yellow-600" />
            </div>
          </div>

          <h2 className="mt-7 text-4xl font-extrabold text-slate-950">88%</h2>

          <Progress value={88} className="mt-4 h-2 bg-yellow-100" />
        </CardContent>
      </Card>

      {/* AI CV Score */}
      <Card className="rounded-2xl border border-yellow-200 bg-[#fbfaf2] shadow-sm">
        <CardContent className="p-7">
          <div className="flex items-start justify-between">
            <p className="text-yellow-600 font-medium">AI CV Score</p>

            <div className="h-11 w-11 rounded-full bg-white flex items-center justify-center shadow-sm">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
          </div>

          <h2 className="mt-7 text-4xl font-extrabold text-slate-950">
            82/100
          </h2>

          <p className="mt-2 text-sm text-slate-500">Top 15% of graduates</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;