import { Badge } from "@/components/ui/badge";
import CompanyRoleCard from "./CompanyRoleCard";

const CompanyOpenRoles = ({ jobs = [], company }) => {
  return (
    <section>
      <div className="mb-6 flex items-center gap-3">
        <h2 className="text-2xl font-extrabold text-slate-950">Open Roles</h2>

        <Badge className="rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
          {jobs.length}
        </Badge>
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            No open roles available
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            {company?.name || "This company"} has not posted any active jobs
            yet.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {jobs.map((job) => (
            <CompanyRoleCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CompanyOpenRoles;
