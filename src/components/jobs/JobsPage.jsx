import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "@/api/axios";
import JobsHero from "./JobsHero";
import JobFilters from "./JobFIlters";
import JobListCard from "./JobListCard";

export default function JobsPage() {
  const [params] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ search: params.get("search") || "", location: params.get("location") || "", types: [], industries: [] });
  useEffect(() => {
    let active = true;
    api.get("jobs/").then(({ data }) => { if (active) setJobs(Array.isArray(data) ? data : data.results || []); })
      .catch(() => { if (active) setError("Unable to load jobs. Please refresh and try again."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  const displayed = useMemo(() => jobs.map((job) => ({
    ...job, companyId: job.company?.id, company: job.company?.name || "Company", industry: job.company?.industry || "other",
    type: job.job_type_display, posted: new Date(job.posted_at).toLocaleDateString(),
    salary: job.salary_min ? `GHS ${job.salary_min}${job.salary_max ? ` - ${job.salary_max}` : ""}` : "Salary not specified",
  })).filter((job) => `${job.title} ${job.company} ${job.description}`.toLowerCase().includes(filters.search.toLowerCase()) && job.location.toLowerCase().includes(filters.location.toLowerCase()) && (!filters.types.length || filters.types.includes(job.job_type)) && (!filters.industries.length || filters.industries.includes(job.industry))), [jobs, filters]);
  return <div className="min-h-screen bg-[#f6f8fa]"><JobsHero /><section className="mx-auto max-w-7xl px-6 py-10"><div className="grid gap-8 lg:grid-cols-[320px_1fr]"><aside><JobFilters filters={filters} onChange={setFilters} /></aside><main aria-busy={loading}><h2 className="mb-6 text-xl font-bold">{loading ? "Loading jobs..." : `${displayed.length} Jobs Found`}</h2>{error && <p role="alert">{error}</p>}{!loading && !error && !displayed.length && <p>No jobs match your filters.</p>}<div className="space-y-5">{displayed.map((job) => <JobListCard key={job.id} job={job} />)}</div></main></div></section></div>;
}
