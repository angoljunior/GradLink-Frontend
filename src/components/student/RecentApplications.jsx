import { BriefcaseBusiness } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RecentApplications = () => {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm min-h-[430px]">
      <CardContent className="p-7">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-950">
              Recent Applications
            </h2>
            <p className="text-sm text-slate-500">
              Track your job application status
            </p>
          </div>

          <Button variant="outline" className="rounded-lg bg-white shadow-sm">
            View All
          </Button>
        </div>

        <div className="h-[320px] flex flex-col items-center justify-center text-center">
          <BriefcaseBusiness className="h-12 w-12 text-slate-500" />

          <h3 className="mt-6 text-xl font-semibold text-slate-950">
            No applications yet
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Start applying to jobs to track your progress here.
          </p>

          <Button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg px-8">
            Browse Jobs
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentApplications;