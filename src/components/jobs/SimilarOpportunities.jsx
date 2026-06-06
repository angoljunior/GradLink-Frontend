import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const similarJobs = [
  {
    id: 1,
    title: "Digital Marketing Graduate",
    company: "MTN Ghana",
    location: "Accra",
  },
  {
    id: 2,
    title: "National Service Personnel – IT Support",
    company: "MTN Ghana",
    location: "Accra",
  },
  {
    id: 3,
    title: "Graduate Sales Executive",
    company: "Vodafone Ghana",
    location: "Kumasi",
  },
];

const SimilarOpportunities = () => {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-7">
        <h2 className="text-xl font-extrabold text-slate-950">
          Similar Opportunities
        </h2>

        <div className="mt-6 space-y-4">
          {similarJobs.map((job) => (
            <div
              key={job.id}
              className="rounded-xl border border-slate-200 bg-white p-4 hover:bg-slate-50 transition"
            >
              <h3 className="font-semibold text-slate-950">{job.title}</h3>

              <p className="mt-1 text-sm text-slate-500">{job.company}</p>

              <Badge className="mt-3 rounded-md bg-slate-950 text-white hover:bg-slate-950">
                {job.location}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SimilarOpportunities;