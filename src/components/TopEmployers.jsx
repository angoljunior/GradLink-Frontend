import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import {
  Building2,
  MapPin,
  Users,
  BriefcaseBusiness,
  ChevronRight,
  Loader2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import api from "@/api/axios";

const TopEmployers = ({ jobSearch = "", locationSearch = "" }) => {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getArrayData = (data) => {
    return Array.isArray(data) ? data : data.results || [];
  };

  const fetchTopEmployers = async () => {
    try {
      setLoading(true);

      const [companiesResponse, jobsResponse] = await Promise.all([
        api.get("/companies/"),
        api.get("/jobs/"),
      ]);

      const companiesData = getArrayData(companiesResponse.data);
      const jobsData = getArrayData(jobsResponse.data);

      const companiesWithJobs = companiesData.map((company) => {
        const companyJobs = jobsData.filter((job) => {
          const jobCompanyId = job.company?.id || job.company;
          return Number(jobCompanyId) === Number(company.id);
        });

        return {
          ...company,
          jobs: companyJobs,
          jobs_count: companyJobs.length,
        };
      });

      setEmployers(companiesWithJobs);
    } catch (error) {
      console.log(
        "Failed to fetch top employers:",
        error.response?.data || error,
      );

      toast.error("Failed to load top employers", {
        description: "Please refresh the page and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopEmployers();
  }, []);

  const filteredEmployers = useMemo(() => {
    const jobValue = jobSearch.toLowerCase().trim();
    const locationValue = locationSearch.toLowerCase().trim();

    let filtered = employers;

    if (jobValue) {
      filtered = filtered.filter((company) => {
        const companyName = company.name?.toLowerCase() || "";
        const companyIndustry = company.industry?.toLowerCase() || "";
        const companyIndustryDisplay =
          company.industry_display?.toLowerCase() || "";
        const companyDescription = company.description?.toLowerCase() || "";

        const matchesCompany =
          companyName.includes(jobValue) ||
          companyIndustry.includes(jobValue) ||
          companyIndustryDisplay.includes(jobValue) ||
          companyDescription.includes(jobValue);

        const matchesJob = company.jobs?.some((job) => {
          const jobTitle = job.title?.toLowerCase() || "";
          const jobType = job.job_type?.toLowerCase() || "";
          const jobTypeDisplay = job.job_type_display?.toLowerCase() || "";
          const workMode = job.work_mode?.toLowerCase() || "";
          const workModeDisplay = job.work_mode_display?.toLowerCase() || "";
          const categoryName = job.category?.name?.toLowerCase() || "";

          return (
            jobTitle.includes(jobValue) ||
            jobType.includes(jobValue) ||
            jobTypeDisplay.includes(jobValue) ||
            workMode.includes(jobValue) ||
            workModeDisplay.includes(jobValue) ||
            categoryName.includes(jobValue)
          );
        });

        return matchesCompany || matchesJob;
      });
    }

    if (locationValue) {
      filtered = filtered.filter((company) => {
        const companyLocation = company.location?.toLowerCase() || "";

        const matchesCompanyLocation = companyLocation.includes(locationValue);

        const matchesJobLocation = company.jobs?.some((job) => {
          const jobLocation = job.location?.toLowerCase() || "";
          return jobLocation.includes(locationValue);
        });

        return matchesCompanyLocation || matchesJobLocation;
      });
    }

    return filtered.slice(0, 4);
  }, [employers, jobSearch, locationSearch]);

  const getCompanySize = (company) => {
    return (
      company.size || company.industry_display || company.industry || "Company"
    );
  };

  const getShortDescription = (description) => {
    if (!description) return "No company description available.";

    return description.length > 95
      ? `${description.slice(0, 95)}...`
      : description;
  };

  return (
    <section id="top-employers" className="bg-[#f6f8fa] py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-9 flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Top Employers in Ghana
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Discover companies shaping the future and hiring graduates.
            </p>

            {(jobSearch || locationSearch) && (
              <p className="mt-2 text-sm text-yellow-700">
                Showing results for{" "}
                <span className="font-semibold">{jobSearch || "all jobs"}</span>{" "}
                {locationSearch && (
                  <>
                    in <span className="font-semibold">{locationSearch}</span>
                  </>
                )}
              </p>
            )}
          </div>

          <Button
            variant="outline"
            className="hidden items-center gap-2 rounded-lg bg-white shadow-sm sm:flex"
            asChild
          >
            <Link to="/companies">
              Explore companies
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {loading && (
          <div className="flex min-h-[220px] items-center justify-center">
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading top employers...
            </div>
          </div>
        )}

        {!loading && filteredEmployers.length === 0 && (
          <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              No matching employers found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try another job title, company name, industry, or location.
            </p>
          </div>
        )}

        {!loading && filteredEmployers.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {filteredEmployers.map((company) => (
              <Card
                key={company.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <Link to={`/company/${company.id}`} className="block">
                  <div className="relative h-20 bg-slate-100">
                    <div className="absolute bottom-[-26px] left-5 flex h-14 w-14 items-center justify-center rounded-lg border bg-white shadow-sm">
                      {company.logo ? (
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="h-9 w-9 object-contain"
                        />
                      ) : (
                        <Building2 className="h-6 w-6 text-slate-500" />
                      )}
                    </div>
                  </div>

                  <CardContent className="px-5 pb-5 pt-10">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="line-clamp-2 text-lg font-bold leading-tight text-slate-900 hover:text-yellow-600">
                        {company.name}
                      </h3>

                      {company.is_verified ? (
                        <Badge className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-600 hover:bg-blue-50">
                          Verified
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="rounded-full px-3 py-1 text-xs text-slate-500"
                        >
                          Pending
                        </Badge>
                      )}
                    </div>

                    <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>
                        {company.location || "Location not specified"}
                      </span>
                    </div>

                    <p className="mt-4 min-h-[48px] text-sm leading-relaxed text-slate-500">
                      {getShortDescription(company.description)}
                    </p>

                    <div className="my-5 h-px bg-slate-200" />

                    <div className="flex items-center gap-5 text-sm">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Users className="h-4 w-4" />
                        <span className="capitalize">
                          {getCompanySize(company)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 font-medium text-yellow-600">
                        <BriefcaseBusiness className="h-4 w-4" />
                        <span>
                          {company.jobs_count}{" "}
                          {company.jobs_count === 1 ? "job" : "jobs"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Link>

                <div className="border-t px-5 pb-5 pt-4">
                  <h4 className="mb-3 text-sm font-semibold text-slate-900">
                    Open Jobs
                  </h4>

                  {company.jobs.length > 0 ? (
                    <div className="space-y-2">
                      {company.jobs.slice(0, 2).map((job) => (
                        <Link
                          key={job.id}
                          to={`/job/${job.id}`}
                          className="block rounded-md border bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-700"
                        >
                          {job.title}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">
                      No open jobs available.
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center sm:hidden">
          <Button variant="outline" className="bg-white" asChild>
            <Link to="/companies">
              Explore companies
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopEmployers;
