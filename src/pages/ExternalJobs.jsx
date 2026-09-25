import React, { useEffect, useMemo, useState } from "react";
import {
  ExternalLink,
  Loader2,
  MapPin,
  Building2,
  RefreshCw,
  Search,
  BriefcaseBusiness,
  CalendarDays,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

import api from "@/api/axios";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const syncCompanies = [
  {
    slug: "anglogold",
    name: "AngloGold Ashanti",
    description: "Sync Ghana jobs from AngloGold Ashanti careers.",
  },
  {
    slug: "newmont",
    name: "Newmont",
    description: "Sync jobs from Newmont careers.",
  },
];

const ExternalJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [syncingCompany, setSyncingCompany] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState("All");

  const fetchExternalJobs = async () => {
    try {
      setLoading(true);

      const response = await api.get("/external-jobs/");

      const jobsData = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      setJobs(jobsData);
    } catch (error) {
      console.log(
        "Failed to fetch external jobs:",
        error.response?.data || error,
      );

      toast.error("Failed to load external jobs", {
        description: "Please refresh the page and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const syncCompanyJobs = async (companySlug) => {
    try {
      setSyncingCompany(companySlug);

      const response = await api.post(`/external-jobs/sync/${companySlug}/`);

      toast.success("Jobs synced successfully", {
        description:
          response.data?.message || "External jobs have been updated.",
      });

      await fetchExternalJobs();
    } catch (error) {
      console.log("Failed to sync jobs:", error.response?.data || error);

      toast.error("Failed to sync jobs", {
        description:
          error.response?.data?.detail ||
          "You may need admin permission to perform this action.",
      });
    } finally {
      setSyncingCompany(null);
    }
  };

  useEffect(() => {
    fetchExternalJobs();
  }, []);

  const companies = useMemo(() => {
    const companyNames = jobs
      .map((job) => job.company_name)
      .filter(Boolean)
      .filter((value, index, array) => array.indexOf(value) === index);

    return ["All", ...companyNames];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const searchValue = searchTerm.toLowerCase().trim();

    return jobs.filter((job) => {
      const title = job.title?.toLowerCase() || "";
      const companyName = job.company_name?.toLowerCase() || "";
      const location = job.location?.toLowerCase() || "";
      const department = job.department?.toLowerCase() || "";
      const source = job.source?.toLowerCase() || "";

      const matchesSearch =
        title.includes(searchValue) ||
        companyName.includes(searchValue) ||
        location.includes(searchValue) ||
        department.includes(searchValue) ||
        source.includes(searchValue);

      const matchesCompany =
        companyFilter === "All" || job.company_name === companyFilter;

      return matchesSearch && matchesCompany;
    });
  }, [jobs, searchTerm, companyFilter]);

  const formatDate = (dateValue) => {
    if (!dateValue) return "Not specified";

    return new Date(dateValue).toLocaleDateString("en-GH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCompanySlugFromName = (companyName) => {
    const value = companyName?.toLowerCase() || "";

    if (value.includes("anglogold")) return "AngloGold";
    if (value.includes("newmont")) return "Newmont";

    return "External";
  };

  return (
    <div className="px-4 py-6 lg:px-8">
      <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Badge className="mb-3 bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
              Verified External Openings
            </Badge>

            <h1 className="text-2xl font-bold">External Career Openings</h1>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Import recent job openings from verified company career pages and
              redirect students to the official company website to apply.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={fetchExternalJobs}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Refresh Jobs
          </Button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {syncCompanies.map((company) => (
            <div
              key={company.slug}
              className="rounded-xl border bg-slate-50 p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    {company.name}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {company.description}
                  </p>
                </div>

                <Button
                  onClick={() => syncCompanyJobs(company.slug)}
                  disabled={syncingCompany !== null}
                  className="bg-yellow-500 text-black hover:bg-yellow-600"
                >
                  {syncingCompany === company.slug ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="mr-2 h-4 w-4" />
                  )}
                  Sync
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-semibold">Imported Jobs</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Showing {filteredJobs.length} of {jobs.length} external jobs.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

              <Input
                type="text"
                placeholder="Search title, company, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 pl-9 sm:w-80"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

              <select
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                className="h-10 rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:border-black"
              >
                {companies.map((company) => (
                  <option key={company} value={company}>
                    {company === "All" ? "All Companies" : company}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex min-h-[250px] items-center justify-center rounded-xl border bg-white">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading external jobs...
          </div>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center">
          <Building2 className="mx-auto h-10 w-10 text-slate-400" />

          <h3 className="mt-4 text-lg font-semibold">No external jobs found</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Sync AngloGold Ashanti or Newmont jobs to display recent openings
            here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="flex flex-col rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <Badge className="mb-3 bg-slate-100 text-slate-700 hover:bg-slate-100">
                    {getCompanySlugFromName(job.company_name)}
                  </Badge>

                  <h2 className="line-clamp-2 text-lg font-semibold">
                    {job.title}
                  </h2>

                  <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    {job.company_name || "Company not specified"}
                  </p>
                </div>

                <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                  External
                </Badge>
              </div>

              <div className="mt-2 space-y-2">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {job.location || "Location not specified"}
                </p>

                {job.department && (
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BriefcaseBusiness className="h-4 w-4" />
                    {job.department}
                  </p>
                )}

                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  Posted: {formatDate(job.posted_at || job.fetched_at)}
                </p>
              </div>

              <div className="mt-4 rounded-lg bg-slate-50 p-3 text-xs text-muted-foreground">
                <p>
                  Source:{" "}
                  <span className="font-medium text-slate-700">
                    {job.source || "Company careers page"}
                  </span>
                </p>

                {job.fetched_at && (
                  <p className="mt-1">
                    Last synced:{" "}
                    <span className="font-medium text-slate-700">
                      {formatDate(job.fetched_at)}
                    </span>
                  </p>
                )}
              </div>

              <div className="mt-auto pt-5">
                <a
                  href={job.job_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Apply on Company Career Page
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExternalJobs;
