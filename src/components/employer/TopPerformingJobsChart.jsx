

import { Card, CardContent } from "@/components/ui/card";

const data = [
  {
    name: "Graduate Engineer - Network Operations",
    applications: 47,
  },
  {
    name: "Digital Marketing Graduate",
    applications: 32,
  },
  {
    name: "National Service Personnel – IT Support",
    applications: 12,
  },
];

const TopPerformingJobsChart = () => {
  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-6">
        <div>
          <h2 className="text-base font-bold text-slate-950">
            Top Performing Jobs
          </h2>
          <p className="text-xs text-slate-500">
            Number of applications per listing
          </p>
        </div>

        <div className="mt-6 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "#64748b" }}
                interval={0}
                height={50}
              />

              <YAxis
                tick={{ fontSize: 11, fill: "#64748b" }}
                domain={[0, 60]}
              />

              <Bar
                dataKey="applications"
                fill="#eab308"
                radius={[4, 4, 0, 0]}
                barSize={120}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopPerformingJobsChart;