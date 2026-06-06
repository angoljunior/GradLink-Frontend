import { Badge } from "@/components/ui/badge";
import CompanyRoleCard from "./CompanyRoleCard";

const jobs = [
  {
    id: 1,
    title: "Graduate Engineer – Network Operations",
    company: "MTN Ghana",
    location: "Accra",
    posted: "10 days ago",
    salary: "GHS 3,500 - 5,000",
    type: "Graduate",
    industry: "Telecom",
  },
  {
    id: 2,
    title: "Digital Marketing Graduate",
    company: "MTN Ghana",
    location: "Accra",
    posted: "10 days ago",
    salary: "GHS 2,800 - 4,000",
    type: "Graduate",
    industry: "Telecom",
  },
  {
    id: 3,
    title: "National Service Personnel – IT Support",
    company: "MTN Ghana",
    location: "Accra",
    posted: "10 days ago",
    salary: "GHS 800 - 800",
    type: "NSS",
    industry: "Telecom",
  },
];

const CompanyOpenRoles = () => {
  return (
    <section>
      <div className="mb-6 flex items-center gap-3">
        <h2 className="text-2xl font-extrabold text-slate-950">
          Open Roles
        </h2>

        <Badge className="rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
          3
        </Badge>
      </div>

      <div className="space-y-5">
        {jobs.map((job) => (
          <CompanyRoleCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
};

export default CompanyOpenRoles;