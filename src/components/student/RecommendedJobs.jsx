import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const recommendedJobs = [
  {
    id: 1,
    title: "Graduate Engineer – Network Operations",
    company: "MTN Ghana",
    location: "Accra",
    salary: "GHS 3,500",
    type: "Graduate",
  },
  {
    id: 2,
    title: "Digital Marketing Graduate",
    company: "MTN Ghana",
    location: "Accra",
    salary: "GHS 2,800",
    type: "Graduate",
  },
  {
    id: 3,
    title: "National Service Personnel – IT Support",
    company: "MTN Ghana",
    location: "Accra",
    salary: "GHS 800",
    type: "National Service",
  },
];

const RecommendedJobs = () => {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-7">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950">
            Recommended for You
          </h2>
          <p className="text-sm text-slate-500">
            Based on your profile and major
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {recommendedJobs.map((job) => (
            <div
              key={job.id}
              className="rounded-xl border border-slate-200 bg-white p-4 hover:bg-slate-50 transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-950">
                    {job.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {job.company} • {job.location}
                  </p>

                  <Badge className="mt-3 rounded-md bg-slate-950 text-white hover:bg-slate-950">
                    {job.type}
                  </Badge>
                </div>

                <p className="text-sm font-medium text-emerald-600 whitespace-nowrap">
                  {job.salary}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-7 w-full text-center text-sm font-medium text-slate-950 hover:text-yellow-600 transition">
          See more recommendations
        </button>
      </CardContent>
    </Card>
  );
};

export default RecommendedJobs;