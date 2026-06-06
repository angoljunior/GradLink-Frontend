import { Card, CardContent } from "@/components/ui/card";

const ApplicationPipeline = () => {
  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-6">
        <div>
          <h2 className="text-base font-bold text-slate-950">
            Application Pipeline
          </h2>
          <p className="text-xs text-slate-500">
            Current status breakdown
          </p>
        </div>

        <div className="h-[300px] flex items-center justify-center text-sm text-slate-400">
          No pipeline data yet
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationPipeline;